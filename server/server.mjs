// Minimal drop-in replacement for the parts of Supabase this site uses:
//   - GoTrue-style auth:  POST /auth/v1/token?grant_type=password|refresh_token, POST /auth/v1/logout
//   - PostgREST-style CRUD on three tables under /rest/v1/<table>
// Storage is a single SQLite file on a persistent volume, so the whole backend
// runs as one tiny container with no separate database service.
import http from 'node:http';
import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import bcrypt from 'bcryptjs';

const PORT = Number(process.env.PORT ?? 8080);
const DATA_DIR = process.env.DATA_DIR ?? './data';
const IMPORT_TOKEN = process.env.IMPORT_TOKEN ?? '';
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ?? 'https://imanamini.ir,http://localhost:4200')
  .split(',').map((s) => s.trim()).filter(Boolean);
const ACCESS_TTL = 3600;              // seconds, same as Supabase default
const REFRESH_TTL = 60 * 60 * 24 * 60; // 60 days

fs.mkdirSync(DATA_DIR, { recursive: true });

// The signing secret comes from env if set, otherwise it is generated once and
// kept on the data volume so sessions survive restarts without manual setup.
function loadJwtSecret() {
  if (process.env.JWT_SECRET) return process.env.JWT_SECRET;
  const file = path.join(DATA_DIR, 'jwt-secret');
  if (!fs.existsSync(file)) fs.writeFileSync(file, crypto.randomBytes(48).toString('hex'), { mode: 0o600 });
  return fs.readFileSync(file, 'utf8').trim();
}
const JWT_SECRET = loadJwtSecret();
const db = new DatabaseSync(path.join(DATA_DIR, 'app.db'));
db.exec(`
  PRAGMA journal_mode = WAL;
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY, email TEXT UNIQUE NOT NULL, password_hash TEXT NOT NULL
  );
  CREATE TABLE IF NOT EXISTS refresh_tokens (
    token TEXT PRIMARY KEY, user_id TEXT NOT NULL, expires_at INTEGER NOT NULL
  );
  CREATE TABLE IF NOT EXISTS expense_entries (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jalali_year INTEGER NOT NULL,
    jalali_month INTEGER NOT NULL CHECK (jalali_month BETWEEN 1 AND 12),
    kind TEXT NOT NULL CHECK (kind IN ('income','expense')),
    label TEXT NOT NULL DEFAULT '',
    amount REAL NOT NULL DEFAULT 0,
    checked INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE INDEX IF NOT EXISTS expense_entries_month_idx ON expense_entries (jalali_year, jalali_month);
  CREATE TABLE IF NOT EXISTS finance_snapshots (
    snapshot_date TEXT PRIMARY KEY,
    ayar REAL NOT NULL DEFAULT 0, ganj REAL NOT NULL DEFAULT 0, nahal REAL NOT NULL DEFAULT 0,
    tamashk REAL NOT NULL DEFAULT 0, synergy REAL NOT NULL DEFAULT 0, noghran REAL NOT NULL DEFAULT 0,
    noghrabi REAL NOT NULL DEFAULT 0, noghrin REAL NOT NULL DEFAULT 0,
    mofid_portfolio_total REAL NOT NULL DEFAULT 0, physical_gold_grams REAL NOT NULL DEFAULT 0,
    gold_price_per_gram REAL NOT NULL DEFAULT 0, crypto REAL NOT NULL DEFAULT 0,
    dollar_amount REAL NOT NULL DEFAULT 0, dollar_price_per_unit REAL NOT NULL DEFAULT 0,
    custom_assets TEXT NOT NULL DEFAULT '{}',
    gold_total REAL NOT NULL DEFAULT 0, silver_total REAL NOT NULL DEFAULT 0,
    stocks_total REAL NOT NULL DEFAULT 0, dollar_total REAL NOT NULL DEFAULT 0,
    grand_total REAL NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
  CREATE TABLE IF NOT EXISTS learning_progress (
    slug TEXT PRIMARY KEY, title TEXT NOT NULL, source_project TEXT, portfolio_route TEXT,
    total_days INTEGER NOT NULL DEFAULT 0, current_day INTEGER NOT NULL DEFAULT 1,
    completed TEXT NOT NULL DEFAULT '[]', last_activity TEXT,
    created_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),
    updated_at TEXT DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now'))
  );
`);

// Column type maps drive (de)serialisation and act as the column whitelist.
const TABLES = {
  expense_entries: {
    pk: 'id',
    cols: { id: 'int', jalali_year: 'int', jalali_month: 'int', kind: 'text', label: 'text',
            amount: 'num', checked: 'bool', created_at: 'text' },
  },
  finance_snapshots: {
    pk: 'snapshot_date',
    cols: Object.fromEntries([
      ['snapshot_date', 'text'], ['custom_assets', 'json'], ['created_at', 'text'], ['updated_at', 'text'],
      ...['ayar','ganj','nahal','tamashk','synergy','noghran','noghrabi','noghrin','mofid_portfolio_total',
          'physical_gold_grams','gold_price_per_gram','crypto','dollar_amount','dollar_price_per_unit',
          'gold_total','silver_total','stocks_total','dollar_total','grand_total'].map((c) => [c, 'num']),
    ]),
  },
  learning_progress: {
    pk: 'slug',
    cols: { slug: 'text', title: 'text', source_project: 'text', portfolio_route: 'text',
            total_days: 'int', current_day: 'int', completed: 'json', last_activity: 'text',
            created_at: 'text', updated_at: 'text' },
  },
};

const toDb = (type, v) => {
  if (v === null || v === undefined) return null;
  if (type === 'bool') return v ? 1 : 0;
  if (type === 'json') return JSON.stringify(v);
  return v;
};
const fromDb = (t, row) => {
  const out = {};
  for (const [k, v] of Object.entries(row)) {
    const type = TABLES[t].cols[k];
    out[k] = v === null ? null : type === 'bool' ? !!v : type === 'json' ? JSON.parse(v) : v;
  }
  return out;
};

// ── tokens ───────────────────────────────────────────────────────────────────
const b64u = (buf) => Buffer.from(buf).toString('base64url');
const sign = (data) => crypto.createHmac('sha256', JWT_SECRET).update(data).digest('base64url');
function issueAccess(userId) {
  const payload = b64u(JSON.stringify({ sub: userId, exp: Math.floor(Date.now() / 1000) + ACCESS_TTL }));
  return `at.${payload}.${sign(payload)}`;
}
// Returns user id, null for "anonymous" (publishable key / no header), or false for a bad/expired token.
function authenticate(req) {
  const h = req.headers.authorization ?? '';
  const token = h.startsWith('Bearer ') ? h.slice(7) : '';
  if (!token.startsWith('at.')) return null;
  const [, payload, sig] = token.split('.');
  if (!payload || !sig) return false;
  const expected = sign(payload);
  if (sig.length !== expected.length || !crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected))) return false;
  try {
    const { sub, exp } = JSON.parse(Buffer.from(payload, 'base64url').toString());
    return exp > Date.now() / 1000 ? sub : false;
  } catch { return false; }
}
function issueSession(userId) {
  const refresh = crypto.randomBytes(32).toString('base64url');
  db.prepare('DELETE FROM refresh_tokens WHERE expires_at < ?').run(Date.now());
  db.prepare('INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES (?,?,?)')
    .run(refresh, userId, Date.now() + REFRESH_TTL * 1000);
  return { access_token: issueAccess(userId), token_type: 'bearer', expires_in: ACCESS_TTL, refresh_token: refresh };
}

// Crude brute-force guard for the password endpoint.
const attempts = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const list = (attempts.get(ip) ?? []).filter((t) => now - t < 15 * 60_000);
  list.push(now);
  attempts.set(ip, list);
  return list.length > 10;
}

// ── PostgREST-ish query parsing ─────────────────────────────────────────────
function parseQuery(table, params) {
  const { cols } = TABLES[table];
  const where = [], args = [];
  let select = '*', order = '', onConflict = null;
  for (const [key, value] of params) {
    if (key === 'select') {
      if (value !== '*') {
        const list = value.split(',').map((s) => s.trim());
        if (list.some((c) => !cols[c])) throw new HttpError(400, 'bad select');
        select = list.join(', ');
      }
    } else if (key === 'order') {
      order = ' ORDER BY ' + value.split(',').map((part) => {
        const [c, dir = 'asc'] = part.split('.');
        if (!cols[c] || !['asc', 'desc'].includes(dir)) throw new HttpError(400, 'bad order');
        return `${c} ${dir.toUpperCase()}`;
      }).join(', ');
    } else if (key === 'on_conflict') {
      onConflict = value;
    } else if (cols[key]) {
      const m = /^eq\.(.*)$/s.exec(value);
      if (!m) throw new HttpError(400, 'only eq filters are supported');
      where.push(`${key} = ?`);
      args.push(cols[key] === 'bool' ? (m[1] === 'true' ? 1 : 0) : m[1]);
    } else {
      throw new HttpError(400, `unknown param ${key}`);
    }
  }
  return { select, order, onConflict, where: where.length ? ' WHERE ' + where.join(' AND ') : '', args };
}

class HttpError extends Error { constructor(status, msg) { super(msg); this.status = status; } }

function insertRow(table, obj, upsert) {
  const { cols, pk } = TABLES[table];
  const keys = Object.keys(obj).filter((k) => cols[k] && !(k === 'id' && table === 'expense_entries'));
  const sql = `INSERT INTO ${table} (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})` +
    (upsert ? ` ON CONFLICT(${pk}) DO UPDATE SET ${keys.filter((k) => k !== pk).map((k) => `${k} = excluded.${k}`)
      .concat(table !== 'expense_entries' ? ["updated_at = strftime('%Y-%m-%dT%H:%M:%fZ','now')"] : []).join(', ')}` : '') +
    ' RETURNING *';
  return fromDb(table, db.prepare(sql).get(...keys.map((k) => toDb(cols[k], obj[k]))));
}

function handleRest(req, res, table, params, body, user) {
  const q = parseQuery(table, params);
  const { cols } = TABLES[table];

  if (req.method === 'GET') {
    if (!user) return send(res, 200, []); // mimic RLS: anon sees nothing
    const rows = db.prepare(`SELECT ${q.select} FROM ${table}${q.where}${q.order}`).all(...q.args);
    return send(res, 200, rows.map((r) => fromDb(table, r)));
  }
  if (!user) return send(res, 401, { message: 'not authenticated' });

  if (req.method === 'POST') {
    const upsert = q.onConflict === TABLES[table].pk || /merge-duplicates/.test(req.headers.prefer ?? '');
    const items = Array.isArray(body) ? body : [body];
    db.exec('BEGIN');
    try {
      const out = items.map((it) => insertRow(table, it, upsert));
      db.exec('COMMIT');
      return send(res, 201, out);
    } catch (e) { db.exec('ROLLBACK'); throw new HttpError(400, e.message); }
  }
  if (req.method === 'PATCH') {
    if (!q.where) throw new HttpError(400, 'filter required');
    const keys = Object.keys(body ?? {}).filter((k) => cols[k] && k !== TABLES[table].pk);
    if (!keys.length) throw new HttpError(400, 'empty patch');
    const rows = db.prepare(`UPDATE ${table} SET ${keys.map((k) => `${k} = ?`).join(', ')}${q.where} RETURNING *`)
      .all(...keys.map((k) => toDb(cols[k], body[k])), ...q.args);
    return send(res, 200, rows.map((r) => fromDb(table, r)));
  }
  if (req.method === 'DELETE') {
    if (!q.where) throw new HttpError(400, 'filter required');
    const rows = db.prepare(`DELETE FROM ${table}${q.where} RETURNING *`).all(...q.args);
    return send(res, 200, rows.map((r) => fromDb(table, r)));
  }
  throw new HttpError(405, 'method not allowed');
}

// ── one-shot import (used once to move data off Supabase) ───────────────────
function handleImport(body) {
  db.exec('BEGIN');
  try {
    for (const u of body.users ?? []) {
      db.prepare('INSERT OR REPLACE INTO users (id, email, password_hash) VALUES (?,?,?)')
        .run(u.id, u.email.toLowerCase(), u.password_hash);
    }
    for (const table of Object.keys(TABLES)) {
      for (const row of body[table] ?? []) {
        const { cols } = TABLES[table];
        const keys = Object.keys(row).filter((k) => cols[k]);
        db.prepare(`INSERT OR REPLACE INTO ${table} (${keys.join(', ')}) VALUES (${keys.map(() => '?').join(', ')})`)
          .run(...keys.map((k) => toDb(cols[k], row[k])));
      }
    }
    db.exec('COMMIT');
  } catch (e) { db.exec('ROLLBACK'); throw new HttpError(400, e.message); }
  return Object.fromEntries(['users', ...Object.keys(TABLES)].map((t) =>
    [t, db.prepare(`SELECT count(*) AS c FROM ${t}`).get().c]));
}

// ── http plumbing ────────────────────────────────────────────────────────────
function send(res, status, data) {
  res.writeHead(status, { 'Content-Type': 'application/json', ...corsHeaders(res.reqOrigin) });
  res.end(data === undefined ? '' : JSON.stringify(data));
}
function corsHeaders(origin) {
  if (!ALLOWED_ORIGINS.includes(origin)) return {};
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'authorization,apikey,content-type,prefer',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin',
  };
}
async function readBody(req) {
  const chunks = [];
  let size = 0;
  for await (const c of req) {
    size += c.length;
    if (size > 5 * 1024 * 1024) throw new HttpError(413, 'body too large');
    chunks.push(c);
  }
  if (!chunks.length) return undefined;
  try { return JSON.parse(Buffer.concat(chunks).toString()); } catch { throw new HttpError(400, 'invalid json'); }
}

const server = http.createServer(async (req, res) => {
  res.reqOrigin = req.headers.origin ?? '';
  const url = new URL(req.url, 'http://x');
  try {
    if (req.method === 'OPTIONS') { res.writeHead(204, corsHeaders(res.reqOrigin)); return res.end(); }
    if (url.pathname === '/health') return send(res, 200, { ok: true });

    if (url.pathname === '/auth/v1/token' && req.method === 'POST') {
      const body = (await readBody(req)) ?? {};
      const grant = url.searchParams.get('grant_type');
      if (grant === 'password') {
        const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() ?? req.socket.remoteAddress;
        if (rateLimited(ip)) return send(res, 429, { error_description: 'Too many attempts, try later' });
        const u = db.prepare('SELECT * FROM users WHERE email = ?').get(String(body.email ?? '').toLowerCase());
        const ok = u && await bcrypt.compare(String(body.password ?? ''), u.password_hash);
        if (!ok) return send(res, 400, { error: 'invalid_grant', error_description: 'Invalid login credentials' });
        return send(res, 200, issueSession(u.id));
      }
      if (grant === 'refresh_token') {
        const row = db.prepare('SELECT * FROM refresh_tokens WHERE token = ?').get(String(body.refresh_token ?? ''));
        if (!row || row.expires_at < Date.now()) return send(res, 400, { error: 'invalid_grant', error_description: 'Invalid refresh token' });
        db.prepare('DELETE FROM refresh_tokens WHERE token = ?').run(row.token); // rotate
        return send(res, 200, issueSession(row.user_id));
      }
      throw new HttpError(400, 'unsupported grant_type');
    }
    if (url.pathname === '/auth/v1/logout' && req.method === 'POST') {
      const user = authenticate(req);
      if (user) db.prepare('DELETE FROM refresh_tokens WHERE user_id = ?').run(user);
      return send(res, 204);
    }

    if (url.pathname === '/admin/import' && req.method === 'POST') {
      const given = (req.headers.authorization ?? '').replace(/^Bearer /, '');
      if (!IMPORT_TOKEN || given.length !== IMPORT_TOKEN.length ||
          !crypto.timingSafeEqual(Buffer.from(given), Buffer.from(IMPORT_TOKEN))) {
        return send(res, 401, { message: 'unauthorized' });
      }
      return send(res, 200, handleImport(await readBody(req)));
    }

    const m = /^\/rest\/v1\/([a-z_]+)$/.exec(url.pathname);
    if (m && TABLES[m[1]]) {
      const user = authenticate(req);
      if (user === false) return send(res, 401, { message: 'JWT expired' });
      const body = ['POST', 'PATCH'].includes(req.method) ? await readBody(req) : undefined;
      return handleRest(req, res, m[1], url.searchParams, body, user);
    }
    send(res, 404, { message: 'not found' });
  } catch (e) {
    const status = e instanceof HttpError ? e.status : 500;
    if (status === 500) console.error(e);
    send(res, status, { message: e.message });
  }
});

server.listen(PORT, () => console.log(`api listening on :${PORT}, data in ${DATA_DIR}`));
for (const sig of ['SIGTERM', 'SIGINT']) process.on(sig, () => server.close(() => { db.close(); process.exit(0); }));
