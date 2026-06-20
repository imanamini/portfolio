/**
 * parse-resume.mjs
 * Parses RESUME.md into structured JS objects consumed by generate-pdf.mjs and sync-resume.mjs.
 * Zero external dependencies — pure Node.js string processing.
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
export const RESUME_MD_PATH = resolve(__dirname, '..', 'RESUME.md');

// ─── Low-level helpers ───────────────────────────────────────────────────────

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error('RESUME.md: frontmatter block (--- ... ---) not found');
  const fm = {};
  for (const line of match[1].split('\n')) {
    const i = line.indexOf(':');
    if (i === -1) continue;
    fm[line.slice(0, i).trim()] = line.slice(i + 1).trim();
  }
  return { fm, body: match[2] };
}

/** Split body into { sectionName: rawContent } */
function splitSections(body) {
  const map = {};
  const parts = ('\n' + body).split(/\n## /);
  for (const part of parts) {
    if (!part.trim()) continue;
    const nl = part.indexOf('\n');
    const title = (nl === -1 ? part : part.slice(0, nl)).trim().toLowerCase();
    const content = nl === -1 ? '' : part.slice(nl + 1).trim();
    map[title] = content;
  }
  return map;
}

/** Parse a block into named sub-sections: `#### name` → string[] of bullets */
function parseSubsections(text) {
  const subs = {};
  let current = '__plain__';
  subs[current] = [];

  for (const raw of text.split('\n')) {
    const line = raw.trim();
    if (line.startsWith('#### ')) {
      current = line.slice(5).trim().toLowerCase();
      subs[current] = [];
    } else if (line.startsWith('- ')) {
      subs[current].push(line.slice(2).trim());
    } else if (line && !line.startsWith('#') && current === '__plain__') {
      subs['__plain__'].push(line);
    }
  }
  return subs;
}

/** Parse metadata lines like `key: value` or `key: a, b, c` */
function parseMeta(lines) {
  const meta = {};
  for (const line of lines) {
    const t = line.trim();
    const i = t.indexOf(':');
    if (i === -1 || t.startsWith('-') || t.startsWith('#')) continue;
    meta[t.slice(0, i).trim().toLowerCase()] = t.slice(i + 1).trim();
  }
  return meta;
}

/** Split `### Entry` blocks within a section */
function splitEntries(text) {
  return ('\n' + text)
    .split(/\n### /)
    .filter(Boolean)
    .map(block => {
      const nl = block.indexOf('\n');
      return {
        header: (nl === -1 ? block : block.slice(0, nl)).trim(),
        body: nl === -1 ? '' : block.slice(nl + 1),
      };
    });
}

/** `a | b | c | d` → [a, b, c, d] */
const pipe = s => s.split('|').map(f => f.trim());

/** `a, b, c` → [a, b, c] */
const csv = s => s.split(',').map(f => f.trim()).filter(Boolean);

// ─── Section parsers ─────────────────────────────────────────────────────────

function parsePitch(text) {
  return text.replace(/\n+/g, ' ').trim();
}

function parseSummary(text) {
  return text.replace(/\n+/g, ' ').trim();
}

function parseStats(text) {
  return text
    .split('\n')
    .filter(l => l.trim().startsWith('- '))
    .map(l => {
      const parts = l.slice(2).trim().split('·').map(p => p.trim());
      return { value: parts[0], label: parts.slice(1).join('·').trim() };
    });
}

function parseSkills(text) {
  return csv(text.replace(/\n/g, ','));
}

function parseExperience(text) {
  return splitEntries(text).map(({ header, body }) => {
    const [company, location, role, period] = pipe(header);
    const lines = body.split('\n');
    const meta = parseMeta(lines.filter(l => !l.startsWith('#### ') && !l.startsWith('- ')));
    const subs = parseSubsections(body);
    const tags = meta.tags ? csv(meta.tags) : [];
    const be = subs['backend'];
    return {
      company, location, role, period,
      tags,
      featured: subs['featured'] || [],
      bullets: subs['bullets'] || [],
      ...(be && be.length ? { backendBullets: be } : {}),
    };
  });
}

function parseProjects(text) {
  return splitEntries(text).map(({ header, body }) => {
    const [name, sub, role, period] = pipe(header);
    const lines = body.split('\n');
    const meta = parseMeta(lines);
    // Strip metadata lines (key: value) and #### headers before extracting plain text
    const KNOWN_META = /^(stack|featured|tags|role):/i;
    const bodyWithoutMeta = lines
      .filter(l => !KNOWN_META.test(l.trim()))
      .join('\n');
    const subs = parseSubsections(bodyWithoutMeta);
    const plain = (subs['__plain__'] || []).join(' ').trim();
    const stack = meta.stack ? csv(meta.stack) : [];
    return {
      name, sub, role, period,
      stack,
      featured: meta.featured === 'true',
      body: plain,
      bullets: subs['bullets'] || [],
    };
  });
}

function parseToolkit(text) {
  const result = { core: [], proficient: [], backend: [], familiar: [] };
  for (const { header, body } of splitEntries(text)) {
    const key = header.trim().toLowerCase();
    const raw = body.trim();
    if (key === 'core') {
      result.core = csv(raw).map(item => {
        const [name, years] = item.split('·').map(s => s.trim());
        return [name, years || ''];
      });
    } else {
      result[key] = csv(raw);
    }
  }
  return result;
}

function parseEducation(text) {
  return splitEntries(text).map(({ header }) => {
    const [institution, location, degree, period] = pipe(header);
    return { institution, location, degree, period };
  });
}

function parseCourses(text) {
  return text
    .split('\n')
    .filter(l => l.trim().startsWith('- '))
    .map(l => {
      const [name, provider, year] = pipe(l.slice(2).trim());
      return { name, provider, ...(year ? { year } : {}) };
    });
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function parseResume(mdPath = RESUME_MD_PATH) {
  const raw = readFileSync(mdPath, 'utf-8');
  const { fm, body } = parseFrontmatter(raw);
  const sec = splitSections(body);

  return {
    profile: {
      name: fm.name,
      role: fm.role,
      tagline: fm.tagline,
      availability: fm.availability,
      email: fm.email,
      phone: fm.phone,
      links: [
        { label: 'Portfolio', value: fm.portfolio_label, href: fm.portfolio_url, primary: true },
        { label: 'Email',    value: fm.email,            href: `mailto:${fm.email}` },
        { label: 'LinkedIn', value: fm.linkedin_label,   href: fm.linkedin_url },
        { label: 'GitHub',   value: fm.github_label,     href: fm.github_url },
      ],
    },
    pitch:       parsePitch(sec['pitch'] || ''),
    summary:     parseSummary(sec['summary'] || ''),
    stats:       parseStats(sec['stats'] || ''),
    skills:      parseSkills(sec['skills'] || ''),
    experience:  parseExperience(sec['experience'] || ''),
    projects:    parseProjects(sec['projects'] || ''),
    toolkit:     parseToolkit(sec['toolkit'] || ''),
    education:   parseEducation(sec['education'] || ''),
    courses:     parseCourses(sec['courses'] || ''),
  };
}
