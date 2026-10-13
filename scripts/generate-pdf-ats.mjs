#!/usr/bin/env node
/**
 * ATS-first resume PDF: single column, real text, standard section names, literal bullet
 * characters, no icons / images / tables, so applicant-tracking parsers read it in order.
 *
 * Usage:  RESUME_MD=resumes/ats-frontend.md RESUME_PDF="resumes/out/Iman Amini Resume.pdf" node scripts/generate-pdf-ats.mjs
 *
 * Data source: a resume markdown file in the RESUME.md format (parsed by scripts/parse-resume.mjs).
 * Requirements: Google Chrome / Chromium.
 */

import { execSync } from 'child_process';
import { writeFileSync, rmSync, readFileSync, existsSync, readdirSync, mkdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import { parseResume } from './parse-resume.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TMP = '/tmp/_iman_resume_ats.html';
const OUTPUT = process.env.RESUME_PDF
  ? resolve(process.env.RESUME_PDF)
  : resolve(ROOT, 'resumes', 'out', 'Iman Amini Resume.pdf');
const FONTS_CSS = resolve(__dirname, 'fonts', 'fonts.css');

const R = parseResume(process.env.RESUME_MD ? resolve(process.env.RESUME_MD) : resolve(ROOT, 'resumes', 'ats-frontend.md'));

// ─── helpers ─────────────────────────────────────────────────────────────────

const e = (s) => String(s ?? '')
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

/** Escaped text with **bold** markup turned into <b>. */
const rich = (s) => e(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

/** Literal "•" glyphs in the text stream — CSS list markers are not reliably extracted by parsers. */
const bullets = (items) => items.length ? `
<ul class="bullets">${items.map(b => `
  <li><span class="dot">•</span><span class="txt">${rich(b)}</span></li>`).join('')}
</ul>` : '';

function fontCss() {
  if (existsSync(FONTS_CSS)) return readFileSync(FONTS_CSS, 'utf-8');
  return `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`;
}

/** One job or project: role line, org line, one-line description, technologies, bullets. */
const entry = (x) => `
<article class="entry">
  <div class="entry__head">
    <h3 class="entry__role">${e(x.role)}</h3>
    <span class="entry__period">${e(x.period)}</span>
  </div>
  <div class="entry__org">${e(x.company)}${x.location ? `<span class="sep">·</span>${e(x.location)}` : ''}</div>
  ${x.about ? `<p class="entry__about">${rich(x.about)}</p>` : ''}
  ${x.tags && x.tags.length ? `<p class="entry__tech"><span class="entry__tech-label">Technologies:</span> ${e(x.tags.join(', '))}</p>` : ''}
  ${bullets([...(x.featured || []), ...(x.bullets || [])])}
</article>`;

/** Dated courses get a line each; undated ones from the same provider share one line so nothing is cut. */
function courseLines() {
  const dated = R.courses.filter(c => c.year);
  const grouped = new Map();
  for (const c of R.courses.filter(c => !c.year)) grouped.set(c.provider, [...(grouped.get(c.provider) || []), c.name]);
  return [
    ...dated.map(c => `<div class="course">${e(c.name)} <span class="course__meta">— ${e(c.provider)}, ${e(c.year)}</span></div>`),
    ...[...grouped].map(([provider, names]) => `<div class="course"><span class="course__meta">${e(provider)}:</span> ${names.map(e).join('<span class="sep">·</span>')}</div>`),
  ].join('');
}

const section = (title, inner) => `
<section class="section">
  <h2 class="sec-title">${e(title)}</h2>
  ${inner}
</section>`;

// ─── html ────────────────────────────────────────────────────────────────────

function buildHtml() {
  const P = R.profile;
  const contact = [
    P.location,
    P.phone,
    P.email,
    P.links.find(l => l.label === 'LinkedIn')?.value,
    P.links.find(l => l.label === 'GitHub')?.value,
    P.links.find(l => l.label === 'Portfolio')?.value,
  ].filter(Boolean);

  const hrefFor = (v) => {
    const l = P.links.find(l => l.value === v);
    if (l) return l.href;
    if (v === P.email) return `mailto:${P.email}`;
    return '';
  };

  const projects = R.projects.map(p => ({
    role: p.sub ? `${p.name} — ${p.sub}` : p.name,   // project name is the headline …
    company: p.role,                                 // … and the role / engagement type sits under it
    location: p.international || '',
    period: p.period,
    about: p.about || p.body,
    tags: p.stack,
    bullets: p.bullets,
  }));

  const skillRows = Object.entries(R.toolkit)
    .filter(([, v]) => v && v.length)
    .map(([label, items]) => {
      const text = items.map(it => Array.isArray(it) ? (it[1] ? `${it[0]} (${it[1]})` : it[0]) : it);
      return `<div class="skill-row"><span class="skill-label">${e(R.toolkitLabels[label] || label)}:</span> <span class="skill-items">${e(text.join(', '))}</span></div>`;
    }).join('');

  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="author" content="${e(P.name)}">
<title>${e(P.name)} — ${e(P.role)} Resume</title>
<style>
${fontCss()}

@page { size: A4; margin: 10.5mm 13mm 10.5mm; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink: #111827;
  --body: #1f2937;
  --muted: #4b5563;
  --faint: #6b7280;
  --line: #d1d5db;
  --accent: #0f4c81;
}

html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
body {
  font-family: 'Inter', Arial, Helvetica, sans-serif;
  font-size: 9.1pt;
  line-height: 1.4;
  color: var(--body);
  background: #fff;
}
a { color: inherit; text-decoration: none; }
b { font-weight: 600; color: var(--ink); }

/* ── header ── */
.header { border-bottom: 1.5px solid var(--accent); padding-bottom: 7px; margin-bottom: 10px; }
.header__name { font-size: 21pt; font-weight: 700; letter-spacing: -0.02em; color: var(--ink); line-height: 1.1; }
.header__role { margin-top: 3px; font-size: 12pt; font-weight: 600; color: var(--accent); }
.header__sub { font-size: 9pt; color: var(--muted); margin-top: 1px; }
.header__contact { margin-top: 6px; font-size: 8.8pt; color: var(--body); line-height: 1.5; }
.header__avail { font-size: 8.6pt; color: var(--muted); margin-top: 1px; }
.sep { color: var(--faint); margin: 0 5px; }
.nowrap { white-space: nowrap; }

/* ── sections ── */
.section { margin-bottom: 6px; }
.sec-title {
  font-size: 10pt;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--accent);
  border-bottom: 1px solid var(--line);
  padding-bottom: 2px;
  margin-bottom: 6px;
  break-after: avoid;
  page-break-after: avoid;
}
.summary { font-size: 9.1pt; line-height: 1.48; }

/* ── entries ── */
.entry + .entry { margin-top: 7px; }
.entry__head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; break-after: avoid; page-break-after: avoid; }
.entry__role { font-size: 11pt; font-weight: 700; color: var(--ink); letter-spacing: -0.01em; }
.entry__period { font-size: 9pt; font-weight: 500; color: var(--muted); white-space: nowrap; }
.entry__org { font-size: 9.6pt; font-weight: 600; color: var(--accent); margin-top: 1px; break-after: avoid; }
.entry__about { font-size: 8.9pt; color: var(--muted); font-style: italic; margin-top: 2px; }
.entry__tech { font-size: 8.7pt; color: var(--muted); margin-top: 2px; }
.entry__tech-label { font-weight: 600; color: var(--body); }

/* ── bullets ── */
.bullets { list-style: none; margin-top: 4px; }
.bullets li { display: grid; grid-template-columns: 10px 1fr; gap: 4px; font-size: 8.8pt; line-height: 1.38; margin-bottom: 1.5px; break-inside: avoid; page-break-inside: avoid; }
.dot { color: var(--accent); font-weight: 700; }

/* ── skills ── */
.skill-row { font-size: 8.8pt; margin-bottom: 1.5px; line-height: 1.4; }
.skill-label { font-weight: 700; color: var(--ink); }

/* ── education / languages / courses ── */
.edu__degree { font-size: 10.2pt; font-weight: 700; color: var(--ink); }
.edu__school { font-size: 9.2pt; color: var(--muted); }
.lang { font-size: 9pt; margin-bottom: 1px; }
.course { font-size: 8.6pt; margin-bottom: 0; line-height: 1.35; }
.course__meta { color: var(--muted); }
</style>
</head>
<body>

<header class="header">
  <h1 class="header__name">${e(P.name)}</h1>
  <div class="header__role">${e(P.role)}</div>
  ${P.subtitle ? `<div class="header__sub">${e(P.subtitle)}</div>` : ''}
  <div class="header__contact">${contact.map(v => `<span class="nowrap">${hrefFor(v) ? `<a href="${hrefFor(v)}">${e(v)}</a>` : e(v)}</span>`).join('<span class="sep">·</span>')}</div>
  ${P.availability ? `<div class="header__avail">${e(P.availability)}</div>` : ''}
</header>

${section('Summary', `<p class="summary">${rich(R.pitch)}</p>`)}

${section('Technical Skills', skillRows)}

${section('Professional Experience', R.experience.map(entry).join(''))}

${projects.length ? section(P.projectsTitle, projects.map(entry).join('')) : ''}

${section('Education', R.education.map(ed => `
<div class="edu">
  <div class="edu__degree">${e(ed.degree)}</div>
  <div class="edu__school">${e(ed.institution)}${ed.location ? `, ${e(ed.location)}` : ''}<span class="sep">·</span>${e(ed.period)}</div>
</div>`).join(''))}

${R.languages.length ? section('Languages', `<div class="lang">${R.languages.map(l => `<b>${e(l.name)}</b> — ${e(l.level)}`).join('<span class="sep">·</span>')}</div>`) : ''}

${R.courses.length ? section('Courses & Certifications', courseLines()) : ''}

</body>
</html>`;
}

// ─── chrome ──────────────────────────────────────────────────────────────────

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;
  const cacheRoot = join(homedir(), '.cache', 'puppeteer', 'chrome');
  try {
    for (const b of readdirSync(cacheRoot).sort().reverse()) {
      const candidate = join(cacheRoot, b, 'chrome-linux64/chrome');
      if (existsSync(candidate)) return candidate;
    }
  } catch { /* no puppeteer cache */ }
  return '/usr/bin/google-chrome';
}

// ─── main ────────────────────────────────────────────────────────────────────

const CHROME = findChrome();
mkdirSync(dirname(OUTPUT), { recursive: true });
writeFileSync(TMP, buildHtml(), 'utf-8');
console.log(`▸ Running Chrome headless (${CHROME})…`);
try {
  execSync(
    `"${CHROME}" --headless --no-sandbox --disable-gpu --disable-dev-shm-usage ` +
    `--run-all-compositor-stages-before-draw --no-pdf-header-footer ` +
    `--print-to-pdf="${OUTPUT}" "file://${TMP}"`,
    { stdio: 'pipe' },
  );
  console.log(`✓  PDF saved to: ${OUTPUT}`);
} catch (err) {
  console.error('✗  Chrome failed:\n', err.stderr?.toString() ?? err.message);
  process.exit(1);
} finally {
  rmSync(TMP, { force: true });
}
