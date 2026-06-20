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
const OUTPUT = resolve(ROOT, 'public', 'Iman Amini Resume.pdf');
const FONTS_CSS = resolve(__dirname, 'fonts', 'fonts.css');

// ─── Resume data (from RESUME.md via parse-resume.mjs) ───────────────────────

const R = parseResume();

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
const COURSES = R.courses.map(c => ({ name: c.name, source: c.provider, year: c.year || '' }));

// ─── HTML builder helpers ────────────────────────────────────────────────────

const e = (s) => String(s)
  .replace(/&/g, '&amp;')
  .replace(/</g, '&lt;')
  .replace(/>/g, '&gt;');

const tags = (arr) => arr.map(t => `<span class="tag">${e(t)}</span>`).join('');

const bullets = (items, type = 'dot') =>
  `<ul class="bullets">${items.map((b, i) => `
    <li class="bullet">
      ${type === 'dot'
        ? `<span class="b-dot">▸</span>`
        : `<span class="b-num">${String(i + 1).padStart(2, '0')}</span>`}
      <span>${e(b)}</span>
    </li>`).join('')}</ul>`;

// Font CSS — embedded if available (offline-safe), else fall back to Google Fonts.
function fontCss() {
  if (existsSync(FONTS_CSS)) return readFileSync(FONTS_CSS, 'utf-8');
  return `@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');`;
}

// ─── HTML template ───────────────────────────────────────────────────────────

function buildHtml() {
  const featuredProjects = PROJECTS.filter(p => p.featured);
  const otherProjects    = PROJECTS.filter(p => !p.featured);

  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${e(PROFILE.name)} — Resume</title>
<style>
${fontCss()}

@page { size: A4; margin: 13mm 15mm 13mm; }

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --green: #16a34a;
  --green-deep: #0f7a38;
  --green-tint: #f3faf5;
  --ink: #0a0a0a;
  --body: #2b2b2b;
  --muted: #6b7280;
  --faint: #9aa0a6;
  --line: #e7e7e7;
}

body {
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, Arial, sans-serif;
  font-size: 8.8pt;
  color: var(--body);
  background: #fff;
  line-height: 1.45;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

a { color: inherit; text-decoration: none; }

/* ── header ── */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 24px;
  padding-bottom: 12px;
  border-bottom: 2px solid var(--green);
  margin-bottom: 13px;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 9px;
}
.brand__mark {
  width: 17px; height: 17px;
  border-radius: 5px;
  background: var(--green);
  color: #fff;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5pt;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  letter-spacing: -0.02em;
}
.brand__word {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8pt;
  color: var(--muted);
  letter-spacing: 0.01em;
}
.brand__word b { color: var(--ink); font-weight: 500; }
.brand__dot { color: var(--green); }

.header__name {
  font-size: 27pt;
  font-weight: 700;
  letter-spacing: -0.038em;
  color: var(--ink);
  line-height: 0.98;
}
.header__role {
  margin-top: 5px;
  font-size: 10pt;
  font-weight: 500;
  color: var(--green-deep);
}
.header__tagline {
  margin-top: 6px;
  font-size: 9.5pt;
  color: var(--body);
  max-width: 46ch;
  line-height: 1.4;
}
.header__avail {
  margin-top: 8px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7pt;
  color: var(--muted);
  letter-spacing: 0.01em;
}

/* contact rail */
.contact {
  flex-shrink: 0;
  display: grid;
  gap: 6px;
  min-width: 168px;
}
.contact__row {
  display: grid;
  grid-template-columns: 50px 1fr;
  align-items: baseline;
  gap: 8px;
}
.contact__label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 6.5pt;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--faint);
}
.contact__value {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.8pt;
  color: var(--body);
  text-align: right;
}
.contact__row--primary .contact__value {
  font-size: 9pt;
  font-weight: 500;
  color: var(--green-deep);
}
.contact__row--primary .contact__label { color: var(--green); }

/* ── stats strip ── */
.stats {
  display: flex;
  border: 0.75px solid var(--line);
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 12px;
  background: linear-gradient(180deg, #fff 0%, var(--green-tint) 100%);
}
.stat {
  flex: 1;
  padding: 8px 13px;
  border-right: 0.75px solid var(--line);
}
.stat:last-child { border-right: none; }
.stat__value {
  font-size: 14pt;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: var(--green-deep);
  line-height: 1;
}
.stat__label {
  margin-top: 3px;
  font-size: 6.8pt;
  color: var(--muted);
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.01em;
}

/* ── pitch ── */
.pitch {
  font-size: 9pt;
  line-height: 1.5;
  color: var(--body);
  margin-bottom: 12px;
}
.pitch b { font-weight: 600; color: var(--ink); }

/* ── section ── */
.section { margin-bottom: 9px; }

.kicker {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5pt;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--green);
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}
.kicker__num { font-weight: 500; }
.kicker__label { color: var(--ink); font-weight: 500; }
.kicker::after {
  content: '';
  flex: 1;
  height: 0.75px;
  background: var(--line);
}

/* ── experience entry ── */
.exp {
  margin-bottom: 10px;
}
.exp__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.exp__company {
  font-size: 12.5pt;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--ink);
}
.exp__period {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5pt;
  color: var(--muted);
}
.exp__role-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
}
.exp__role  { font-size: 8.8pt; color: var(--green-deep); font-weight: 500; }
.exp__loc   { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 7.5pt; color: var(--faint); }

.tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 8px;
}
.tag {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7pt;
  padding: 1.5px 7px;
  border-radius: 5px;
  background: #f4f4f5;
  color: var(--muted);
  border: 0.5px solid var(--line);
}

/* featured highlight block */
.featured {
  background: var(--green-tint);
  border-left: 2.5px solid var(--green);
  border-radius: 0 6px 6px 0;
  padding: 8px 11px 8px 12px;
  margin-bottom: 8px;
}
.featured .bullet { color: #1f2937; font-size: 8.7pt; }
.featured .b-dot { color: var(--green); }

/* ── bullets ── */
.bullets { list-style: none; display: grid; gap: 3px; }
.bullet {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 6px;
  font-size: 8.5pt;
  line-height: 1.48;
  color: var(--body);
  align-items: start;
}
.b-dot {
  color: var(--green);
  font-weight: 700;
  font-size: 9pt;
  line-height: 1.3;
}
.b-num {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7pt;
  color: #c4c4c4;
  line-height: 1.7;
}

/* ── project card ── */
.project {
  margin-bottom: 10px;
  page-break-inside: avoid;
}
.project__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.project__name {
  font-size: 12pt;
  font-weight: 600;
  color: var(--ink);
}
.project__sub  { font-size: 8pt; color: var(--muted); margin-bottom: 4px; }
.project__stack {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5pt;
  color: var(--green-deep);
  margin-bottom: 5px;
}
.project__body { font-size: 8.5pt; line-height: 1.48; color: var(--body); margin-bottom: 6px; }

/* ── compact "also" list ── */
.also { border-top: 0.75px solid var(--line); padding-top: 7px; margin-top: 5px; }
.also__label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7pt;
  color: var(--faint);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 7px;
}
.also__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 7px 30px; }
.also__name  { font-size: 8.7pt; font-weight: 600; color: var(--ink); }
.also__stack { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 7pt; color: var(--green-deep); margin-left: 6px; }
.also__body  { font-size: 7.6pt; color: var(--muted); margin-top: 2px; line-height: 1.42; }

/* ── toolkit ── */
.stack-grid {
  display: grid;
  grid-template-columns: 62px 1fr;
  gap: 5px 14px;
  align-items: baseline;
}
.stack-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5pt;
  color: var(--faint);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.stack-val  { font-size: 8.6pt; color: var(--body); }
.stack-dim  { color: #b8b8b8; }
.stack-fam  { color: var(--muted); }

/* ── background ── */
.bg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 36px; }
.edu__degree  { font-size: 9.5pt; font-weight: 600; color: var(--ink); }
.edu__school  { font-size: 8.5pt; color: var(--muted); margin-top: 2px; }
.edu__period  { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 7.5pt; color: var(--faint); margin-top: 3px; }
.courses-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7pt;
  color: var(--faint);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-bottom: 7px;
}
.course { margin-bottom: 5px; }
.course__name { font-size: 8.6pt; font-weight: 500; color: var(--ink); }
.course__meta { font-size: 7.6pt; color: var(--muted); }

/* ── closing line ── */
.closing {
  margin-top: 12px;
  padding-top: 10px;
  border-top: 0.75px solid var(--line);
  page-break-inside: avoid;
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 14px;
}
.closing__text { font-size: 8.6pt; color: var(--body); }
.closing__text b { color: var(--ink); font-weight: 600; }
.closing__cta {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8.5pt;
  font-weight: 500;
  color: var(--green-deep);
  white-space: nowrap;
}

/* ── backend contributions sub-section ── */
.backend-block {
  margin-top: 10px;
  background: #eff6ff;
  border-left: 2.5px solid #3b82f6;
  border-radius: 0 6px 6px 0;
  padding: 8px 11px 8px 12px;
}
.backend-block .bullet { color: #1e3a5f; font-size: 8.5pt; }
.backend-block .b-dot { color: #3b82f6; }
.backend-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 6.8pt;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1d4ed8;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  gap: 8px;
}
.backend-label::after {
  content: 'Java / Spring Boot  ·  PHP';
  font-weight: 400;
  font-size: 6.5pt;
  color: #3b82f6;
  letter-spacing: 0.04em;
}

/* ── flow control ── */
.page-2 { } /* sections flow naturally; cards avoid internal breaks */
</style>
</head>
<body>

<!-- ─── HEADER ─── -->
<div class="header">
  <div>
    <a class="brand" href="https://imanamini.ir">
      <span class="brand__mark">IA</span>
      <span class="brand__word">iman<span class="brand__dot">.</span>amini</span>
    </a>
    <div class="header__name">${e(PROFILE.name)}</div>
    <div class="header__role">${e(PROFILE.role)}</div>
    <div class="header__tagline">${e(PROFILE.tagline)}</div>
    <div class="header__avail">${e(PROFILE.availability)}</div>
  </div>
  <div class="contact">
    ${PROFILE.links.map(l => `
    <a class="contact__row${l.primary ? ' contact__row--primary' : ''}" href="${l.href}">
      <span class="contact__label">${e(l.label)}</span>
      <span class="contact__value">${e(l.value)}</span>
    </a>`).join('')}
  </div>
</div>

<!-- ─── STATS ─── -->
<div class="stats">
  ${STATS.map(s => `
  <div class="stat">
    <div class="stat__value">${e(s.value)}</div>
    <div class="stat__label">${e(s.label)}</div>
  </div>`).join('')}
</div>

<!-- ─── PITCH ─── -->
<p class="pitch">${e(PROFILE.pitch)}</p>

<!-- ─── EXPERIENCE ─── -->
<div class="section">
  <div class="kicker"><span class="kicker__num">01</span><span class="kicker__label">Experience</span></div>

  ${EXPERIENCE.map(job => `
  <div class="exp">
    <div class="exp__head">
      <div class="exp__company">${e(job.company)}</div>
      <div class="exp__period">${e(job.period)}</div>
    </div>
    <div class="exp__role-row">
      <div class="exp__role">${e(job.role)}</div>
      <div class="exp__loc">${e(job.location)}</div>
    </div>
    <div class="tags">${tags(job.tags)}</div>
    ${job.featured && job.featured.length ? `<div class="featured">${bullets(job.featured, 'dot')}</div>` : ''}
    ${job.bullets  && job.bullets.length  ? bullets(job.bullets,  'num') : ''}
    ${job.backendBullets && job.backendBullets.length ? `
    <div class="backend-block">
      <div class="backend-label">Backend Contributions</div>
      ${bullets(job.backendBullets, 'dot')}
    </div>` : ''}
  </div>`).join('')}
</div>

<!-- ─── PAGE 2 ─── -->
<div class="page-2">

<!-- ─── PROJECTS ─── -->
<div class="section">
  <div class="kicker"><span class="kicker__num">02</span><span class="kicker__label">Projects</span></div>

  ${featuredProjects.map(p => `
  <div class="project">
    <div class="project__head">
      <div class="project__name">${e(p.name)}</div>
      <div class="exp__period">${e(p.period)} · ${e(p.role)}</div>
    </div>
    <div class="project__sub">${e(p.sub)}</div>
    <div class="project__stack">${p.stack.map(e).join(' · ')}</div>
    <p class="project__body">${e(p.body)}</p>
    ${p.bullets ? bullets(p.bullets, 'num') : ''}
  </div>`).join('')}

  <div class="also">
    <div class="also__label">Also shipped</div>
    <div class="also__grid">
      ${otherProjects.map(p => `
      <div>
        <div><span class="also__name">${e(p.name)}</span><span class="also__stack">${p.stack.join(' · ')}</span></div>
        <div class="also__body">${e(p.body)}</div>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ─── TOOLKIT ─── -->
<div class="section">
  <div class="kicker"><span class="kicker__num">03</span><span class="kicker__label">Toolkit</span></div>
  <div class="stack-grid">
    <div class="stack-label">Core</div>
    <div class="stack-val">${STACK.core.map(([n, y]) => `${e(n)} <span class="stack-dim">${e(y)}</span>`).join(' · ')}</div>
    <div class="stack-label">Proficient</div>
    <div class="stack-val">${STACK.proficient.map(e).join(' · ')}</div>
    ${STACK.backend && STACK.backend.length ? `
    <div class="stack-label" style="color:#1d4ed8">Backend</div>
    <div class="stack-val" style="color:#1d4ed8;font-weight:500">${STACK.backend.map(e).join(' · ')}</div>` : ''}
    <div class="stack-label">Familiar</div>
    <div class="stack-val stack-fam">${STACK.familiar.map(e).join(' · ')}</div>
  </div>
</div>

<!-- ─── BACKGROUND ─── -->
<div class="section">
  <div class="kicker"><span class="kicker__num">04</span><span class="kicker__label">Background</span></div>
  <div class="bg-grid">
    <div>
      ${EDUCATION.map(ed => `
      <div>
        <div class="edu__degree">${e(ed.degree)}</div>
        <div class="edu__school">${e(ed.school)}</div>
        <div class="edu__period">${e(ed.period)}</div>
      </div>`).join('')}
    </div>
    <div>
      <div class="courses-label">Recent courses</div>
      ${COURSES.map(c => `
      <div class="course">
        <span class="course__name">${e(c.name)}</span>
        <span class="course__meta"> — ${e(c.source)}, ${e(c.year)}</span>
      </div>`).join('')}
    </div>
  </div>
</div>

<!-- ─── CLOSING ─── -->
<div class="closing">
  <div class="closing__text">Thanks for reading to the end — <b>let's build something great together.</b></div>
  <a class="closing__cta" href="https://imanamini.ir">imanamini.ir ↗</a>
</div>

</div><!-- end .page-2 -->
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
