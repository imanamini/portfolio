#!/usr/bin/env node
/**
 * Generates public/Iman Amini Resume.pdf using Chrome headless.
 *
 * Usage:  node scripts/generate-pdf.mjs
 *    or:  npm run pdf
 *
 * Data source: RESUME.md (parsed by scripts/parse-resume.mjs)
 * To update resume content, edit RESUME.md and run: npm run pdf
 *
 * Tailored variants: RESUME_MD=<variant.md> RESUME_PDF=<out.pdf> node scripts/generate-pdf.mjs
 *
 * Requirements: Google Chrome / Chromium.
 */

import { execSync } from 'child_process';
import { writeFileSync, rmSync, readFileSync, existsSync, readdirSync } from 'fs';
import { resolve, dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { homedir } from 'os';
import { parseResume } from './parse-resume.mjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TMP = '/tmp/_iman_resume.html';
const OUTPUT = process.env.RESUME_PDF
  ? resolve(process.env.RESUME_PDF)
  : resolve(ROOT, 'public', 'Iman Amini Resume.pdf');
const FONTS_CSS = resolve(__dirname, 'fonts', 'fonts.css');

// ─── Resume data (from RESUME.md via parse-resume.mjs) ───────────────────────

const R = parseResume(process.env.RESUME_MD ? resolve(process.env.RESUME_MD) : undefined);

const PROFILE  = { ...R.profile, pitch: R.pitch };
const STATS    = R.stats;
const EXPERIENCE = R.experience;
const PROJECTS = R.projects;
const STACK    = R.toolkit;
const EDUCATION = R.education.map(ed => ({
  degree: ed.degree,
  school: ed.location ? ed.institution + ', ' + ed.location : ed.institution,
  period: ed.period,
}));
const LANGUAGES = R.languages;
const COURSES = R.courses.map(c => ({ name: c.name, source: c.provider, year: c.year || '' }));

// ─── HTML builder helpers ────────────────────────────────────────────────────

const e = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const tags = (arr) => arr.map(t => `<span class="tag">${e(t)}</span>`).join('');

/** Escaped text with **bold** markup turned into <b>. */
const rich = (s) => e(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>');

const bullets = (items, variant = '') =>
  `<ul class="bullets${variant ? ` bullets--${variant}` : ''}">${items.map(b => `
    <li class="bullet"><span class="b-dot"></span><span>${rich(b)}</span></li>`).join('')}</ul>`;

// Font CSS — embedded if available (offline-safe), else fall back to Google Fonts.
function fontCss() {
  if (existsSync(FONTS_CSS)) return readFileSync(FONTS_CSS, 'utf-8');
  return `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`;
}

// ─── HTML template ───────────────────────────────────────────────────────────

// Accent rotation: neighbouring blocks get different colours so the page never reads as one flat tone.
const ACCENTS = ['#0d9488', '#4f46e5', '#d97706', '#e11d48', '#0284c7'];
const acc = (i) => ACCENTS[i % ACCENTS.length];

const section = (title, i, inner) => `
<section class="section" style="--acc:${acc(i)}">
  <h2 class="sec-title"><span class="sec-bar"></span>${e(title)}</h2>
  ${inner}
</section>`;

const intlPill = (where) => where ? `<span class="intl">International · ${e(where)}</span>` : '';

const challengeBox = (c) => c ? `
<div class="challenge">
  <div class="challenge__label">Most important challenge</div>
  <div class="challenge__title">${rich(c.title)}</div>
  ${c.body ? `<div class="challenge__body">${rich(c.body)}</div>` : ''}
</div>` : '';

/** One experience or project entry: the role is the headline, the company sits under it. */
const entry = (x, i) => `
<div class="entry" style="--acc:${acc(i)}">
  <div class="entry__head">
    <h3 class="entry__role">${e(x.role)}</h3>
    <div class="entry__period">${e(x.period)}</div>
  </div>
  <div class="entry__org">
    <span class="entry__company">${e(x.company)}</span>
    ${x.location ? `<span class="entry__loc">${e(x.location)}</span>` : ''}
    ${intlPill(x.international)}
  </div>
  ${x.about ? `<div class="entry__about">${rich(x.about)}</div>` : ''}
  ${x.tags && x.tags.length ? `<div class="tags">${tags(x.tags)}</div>` : ''}
  ${x.featured && x.featured.length ? bullets(x.featured, 'lead') : ''}
  ${x.bullets && x.bullets.length ? bullets(x.bullets) : ''}
  ${x.backendBullets && x.backendBullets.length ? `
  <div class="backend-block">
    <div class="backend-label">${e(x.backendLabel)}${x.backendStack ? `<span class="backend-stack">${e(x.backendStack)}</span>` : ''}</div>
    ${bullets(x.backendBullets)}
  </div>` : ''}
  ${challengeBox(x.challenge)}
</div>`;

function buildHtml() {
  // Projects render through the same entry layout as jobs.
  const projectEntries = PROJECTS.map(p => ({
    role: p.role,
    period: p.period,
    company: p.sub ? `${p.name} — ${p.sub}` : p.name,
    location: '',
    international: p.international,
    about: p.about || p.body,
    tags: p.stack,
    bullets: p.bullets,
    challenge: p.challenge,
  }));

  let n = 0;
  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${e(PROFILE.name)} — Resume</title>
<style>
${fontCss()}

@page { size: A4; margin: 11mm 13mm 12mm; }
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --ink: #0f172a;
  --body: #334155;
  --muted: #64748b;
  --faint: #94a3b8;
  --line: #e2e8f0;
  --navy: #0f172a;
  --navy-2: #1e293b;
}

body {
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, Arial, sans-serif;
  font-size: 9pt;
  color: var(--body);
  background: #fff;
  line-height: 1.45;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}
a { color: inherit; text-decoration: none; }
b { color: var(--ink); font-weight: 600; }

/* ── header band ── */
.header {
  display: flex;
  justify-content: space-between;
  gap: 22px;
  padding: 16px 18px 15px;
  border-radius: 10px;
  background: linear-gradient(120deg, var(--navy) 0%, var(--navy-2) 70%, #134e4a 100%);
  color: #e2e8f0;
  margin-bottom: 12px;
}
.header__name {
  font-size: 25pt;
  font-weight: 700;
  letter-spacing: -0.035em;
  color: #fff;
  line-height: 1;
}
.header__role {
  margin-top: 5px;
  font-size: 12.5pt;
  font-weight: 600;
  color: #5eead4;
  letter-spacing: -0.01em;
}
.header__headline {
  margin-top: 6px;
  font-size: 8.8pt;
  line-height: 1.45;
  color: #cbd5e1;
  max-width: 62ch;
}
.header__headline b { color: #fff; }
.header__avail {
  margin-top: 8px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}
.chip {
  font-size: 7.3pt;
  padding: 2px 8px;
  border-radius: 99px;
  background: rgba(94, 234, 212, 0.12);
  border: 0.75px solid rgba(94, 234, 212, 0.45);
  color: #99f6e4;
}
.contact {
  flex-shrink: 0;
  display: grid;
  align-content: start;
  gap: 5px;
  min-width: 165px;
  text-align: right;
}
.contact__label {
  display: block;
  font-size: 6.4pt;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: #94a3b8;
}
.contact__value { font-size: 8.2pt; color: #f1f5f9; }
.contact__row--primary .contact__value { color: #5eead4; font-weight: 600; font-size: 9pt; }

/* ── highlights ── */
.stats {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 7px;
  margin-bottom: 11px;
}
.stat {
  padding: 7px 10px 8px;
  border-radius: 8px;
  border: 0.75px solid var(--line);
  border-top: 2.5px solid var(--acc);
  background: color-mix(in srgb, var(--acc) 5%, #fff);
}
.stat__value {
  font-size: 15pt;
  font-weight: 700;
  letter-spacing: -0.03em;
  color: var(--acc);
  line-height: 1.05;
}
.stat__label { margin-top: 2px; font-size: 7.3pt; color: var(--muted); line-height: 1.3; }

/* ── sections ── */
.section { margin: 0 0 18px; }
.sec-title {
  display: flex;
  align-items: center;
  gap: 9px;
  font-size: 10.5pt;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: color-mix(in srgb, var(--acc) 80%, #000);
  background: color-mix(in srgb, var(--acc) 10%, #fff);
  border-bottom: 1.5px solid var(--acc);
  border-radius: 6px 6px 0 0;
  padding: 5px 10px 4px;
  margin-bottom: 10px;
  page-break-after: avoid;
  break-after: avoid;
}
.sec-bar { width: 5px; height: 13px; border-radius: 2px; background: var(--acc); }

.summary { font-size: 9.2pt; line-height: 1.55; color: var(--body); }

/* ── entries (jobs & projects) ── */
.entry {
  padding: 0 0 0 10px;
  border-left: 2px solid color-mix(in srgb, var(--acc) 35%, #fff);
}
.entry + .entry {
  margin-top: 12px;
  padding-top: 11px;
  border-top: 0.75px dashed #cbd5e1;
}
.entry__head, .entry__org, .entry__about { break-after: avoid; }
.entry__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  page-break-after: avoid;
}
.entry__role {
  font-size: 12pt;
  font-weight: 700;
  letter-spacing: -0.015em;
  color: var(--ink);
}
.entry__period { font-size: 8pt; color: var(--muted); white-space: nowrap; font-weight: 500; }
.entry__org {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 4px 8px;
  margin-top: 1px;
}
.entry__company { font-size: 9.6pt; font-weight: 500; color: var(--acc); }
.entry__loc { font-size: 8pt; color: var(--faint); }
.entry__loc::before { content: '· '; }
.intl {
  font-size: 7.2pt;
  font-weight: 700;
  padding: 1.5px 7px;
  border-radius: 99px;
  background: #eef2ff;
  color: #4338ca;
  border: 0.75px solid #c7d2fe;
}
.entry__about {
  margin-top: 2px;
  font-size: 8.3pt;
  font-style: italic;
  color: var(--muted);
}
.tags { display: flex; flex-wrap: wrap; gap: 3px; margin: 5px 0 5px; }
.tag {
  font-size: 7pt;
  padding: 1px 6px;
  border-radius: 4px;
  background: color-mix(in srgb, var(--acc) 8%, #fff);
  color: color-mix(in srgb, var(--acc) 75%, #000);
}

/* ── bullets ── */
.bullets { list-style: none; display: grid; gap: 2.5px; margin-top: 4px; }
.bullet {
  break-inside: avoid;
  display: grid;
  grid-template-columns: 9px 1fr;
  gap: 5px;
  font-size: 8.7pt;
  line-height: 1.45;
}
.b-dot {
  width: 4px; height: 4px;
  border-radius: 50%;
  background: var(--acc);
  margin-top: 0.62em;
}
.bullets--lead .bullet { color: var(--ink); }

/* ── challenge ── */
.challenge {
  margin-top: 6px;
  padding: 7px 10px 8px;
  border-radius: 7px;
  background: #fffbeb;
  border: 0.75px solid #fde68a;
  page-break-inside: avoid;
  break-inside: avoid;
}
.challenge__label {
  font-size: 6.8pt;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #b45309;
  margin-bottom: 2px;
}
.challenge__title { font-size: 8.9pt; font-weight: 600; color: var(--ink); }
.challenge__body { font-size: 8.4pt; color: #44403c; margin-top: 2px; line-height: 1.45; }

/* ── backend sub-block ── */
.backend-block {
  margin-top: 6px;
  padding: 7px 10px 8px;
  border-radius: 7px;
  background: #eff6ff;
  border: 0.75px solid #bfdbfe;
  --acc: #2563eb;
  page-break-inside: avoid;
  break-inside: avoid;
}
.backend-label {
  font-size: 6.8pt;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1d4ed8;
  display: flex;
  gap: 8px;
  align-items: baseline;
}
.backend-stack { font-weight: 500; letter-spacing: 0.03em; color: #3b82f6; }
.backend-block .bullet { color: #1e3a5f; }

/* ── skills ── */
.skills { display: grid; grid-template-columns: 70px 1fr; gap: 4px 12px; align-items: baseline; }
.skills__label { font-size: 7.6pt; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; }
.skills__val { font-size: 8.7pt; }
.skills__dim { color: var(--faint); font-size: 7.8pt; }

/* ── education / languages / courses ── */
.grid-2 { display: grid; grid-template-columns: 1.3fr 1fr; gap: 0 28px; page-break-inside: avoid; }
.edu__degree { font-size: 9.6pt; font-weight: 600; color: var(--ink); }
.edu__school { font-size: 8.4pt; color: var(--muted); }
.edu__period { font-size: 7.8pt; color: var(--faint); margin-bottom: 4px; }
.lang { display: flex; justify-content: space-between; font-size: 8.8pt; margin-bottom: 3px; }
.lang__level { color: var(--muted); }
.courses { display: grid; grid-template-columns: 1fr 1fr; gap: 3px 28px; }
.course__name { font-size: 8.5pt; font-weight: 500; color: var(--ink); }
.course__meta { font-size: 7.8pt; color: var(--muted); }
</style>
</head>
<body>

<header class="header">
  <div>
    <h1 class="header__name">${e(PROFILE.name)}</h1>
    <div class="header__role">${e(PROFILE.role)}</div>
    <div class="header__headline">${rich(PROFILE.headline || PROFILE.tagline)}</div>
    ${PROFILE.availability ? `<div class="header__avail">${PROFILE.availability.split('·').map(s => `<span class="chip">${e(s.trim())}</span>`).join('')}</div>` : ''}
  </div>
  <div class="contact">
    ${PROFILE.links.map(l => `
    <a class="contact__row${l.primary ? ' contact__row--primary' : ''}" href="${l.href}">
      <span class="contact__label">${e(l.label)}</span>
      <span class="contact__value">${e(l.value)}</span>
    </a>`).join('')}
    ${PROFILE.phone ? `<div class="contact__row"><span class="contact__label">Phone</span><span class="contact__value">${e(PROFILE.phone)}</span></div>` : ''}
  </div>
</header>

${STATS.length ? `
<div class="stats">
  ${STATS.map((s, i) => `
  <div class="stat" style="--acc:${acc(i)}">
    <div class="stat__value">${e(s.value)}</div>
    <div class="stat__label">${e(s.label)}</div>
  </div>`).join('')}
</div>` : ''}

${section('Summary', n++, `<p class="summary">${rich(PROFILE.pitch)}</p>`)}

${section('Experience', n++, EXPERIENCE.map((job, i) => entry(job, i)).join(''))}

${projectEntries.length ? section(PROFILE.projectsTitle, n++, projectEntries.map((p, i) => entry(p, i + 3)).join('')) : ''}

${section('Skills', n++, `
<div class="skills">
  <div class="skills__label" style="color:${acc(0)}">Core</div>
  <div class="skills__val"><b>${STACK.core.map(([nm, y]) => `${e(nm)}${y ? ` <span class="skills__dim">${e(y)}</span>` : ''}`).join(' · ')}</b></div>
  ${STACK.backend && STACK.backend.length ? `
  <div class="skills__label" style="color:${acc(1)}">Backend</div>
  <div class="skills__val">${STACK.backend.map(e).join(' · ')}</div>` : ''}
  ${STACK.ai && STACK.ai.length ? `
  <div class="skills__label" style="color:${acc(4)}">AI</div>
  <div class="skills__val"><b>${STACK.ai.map(e).join(' · ')}</b></div>` : ''}
  <div class="skills__label" style="color:${acc(2)}">Proficient</div>
  <div class="skills__val">${STACK.proficient.map(e).join(' · ')}</div>
  <div class="skills__label" style="color:${acc(3)}">Tools</div>
  <div class="skills__val">${STACK.familiar.map(e).join(' · ')}</div>
</div>`)}

<div class="grid-2">
  ${section('Education', n++, EDUCATION.map(ed => `
  <div>
    <div class="edu__degree">${e(ed.degree)}</div>
    <div class="edu__school">${e(ed.school)}</div>
    <div class="edu__period">${e(ed.period)}</div>
  </div>`).join(''))}
  ${LANGUAGES.length ? section('Languages', n++, LANGUAGES.map(l => `
  <div class="lang"><b>${e(l.name)}</b><span class="lang__level">${e(l.level)}</span></div>`).join('')) : ''}
</div>

${COURSES.length ? section('Courses', n++, `
<div class="courses">
  ${COURSES.map(c => `
  <div><span class="course__name">${e(c.name)}</span> <span class="course__meta">— ${e(c.source)}${c.year ? `, ${e(c.year)}` : ''}</span></div>`).join('')}
</div>`) : ''}

</body>
</html>`;
}

// ─── Chrome lookup ─────────────────────────────────────────────────────────

function findChrome() {
  if (process.env.CHROME_PATH) return process.env.CHROME_PATH;

  // puppeteer cache: ~/.cache/puppeteer/chrome/<platform-version>/chrome-linux64/chrome
  const cacheRoot = join(homedir(), '.cache', 'puppeteer', 'chrome');
  try {
    const builds = readdirSync(cacheRoot).sort().reverse();
    for (const b of builds) {
      for (const sub of ['chrome-linux64/chrome', 'chrome-mac-x64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing']) {
        const candidate = join(cacheRoot, b, sub);
        if (existsSync(candidate)) return candidate;
      }
    }
  } catch { /* no puppeteer cache */ }

  return '/usr/bin/google-chrome';
}

// ─── Main ────────────────────────────────────────────────────────────────────

const CHROME = findChrome();

console.log('▸ Building HTML…');
writeFileSync(TMP, buildHtml(), 'utf-8');

console.log(`▸ Running Chrome headless (${CHROME})…`);
try {
  execSync(
    `"${CHROME}" ` +
    `--headless ` +
    `--no-sandbox ` +
    `--disable-gpu ` +
    `--disable-dev-shm-usage ` +
    `--run-all-compositor-stages-before-draw ` +
    `--print-to-pdf="${OUTPUT}" ` +
    `--no-pdf-header-footer ` +
    `"file://${TMP}"`,
    { stdio: 'pipe' }   // suppress Chrome's verbose stderr
  );
  console.log(`✓  PDF saved to: ${OUTPUT}`);
} catch (err) {
  console.error('✗  Chrome failed:\n', err.stderr?.toString() ?? err.message);
  process.exit(1);
} finally {
  rmSync(TMP, { force: true });
}
