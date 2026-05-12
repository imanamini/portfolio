#!/usr/bin/env node
/**
 * Generates public/Iman Amini Resume.pdf using Chrome headless.
 *
 * Usage:  node scripts/generate-pdf.mjs
 *    or:  npm run pdf
 *
 * Requirements: Google Chrome at /usr/bin/google-chrome
 *               (override with env var CHROME_PATH)
 *
 * Update the resume data constants at the top of this file
 * whenever the content changes, then re-run to regenerate the PDF.
 */

import { execSync } from 'child_process';
import { writeFileSync, rmSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const TMP = '/tmp/_iman_resume.html';
const OUTPUT = resolve(ROOT, 'public', 'Iman Amini Resume.pdf');
const CHROME = process.env.CHROME_PATH ?? '/usr/bin/google-chrome';

// ─── Resume data ─────────────────────────────────────────────────────────────

const PROFILE = {
  name: 'Iman Amini',
  role: 'Frontend Engineer',
  availability: 'Remote · Hybrid · On-site',
  email: 'iman.fa88@gmail.com',
  linkedin: 'linkedin.com/in/imanamini78',
  github: 'github.com/imanamini',
  website: 'imanamini.ir',
  pitch: 'Frontend engineer leading Credit & BNPL frontend at a 10M+ user fintech, with 5+ years across Angular and React in production. Setting technical direction, mentoring engineers, and shipping financial journeys that 10M+ people rely on daily. Open to roles on international teams — remote, hybrid, or on-site.',
};

const STATS = [
  { value: '10M+', label: 'users on flows I own' },
  { value: '5+',   label: 'years in fintech frontend' },
  { value: 'Lead', label: 'Credit & BNPL team' },
  { value: '14',   label: 'shared npm packages' },
];

const EXPERIENCE = [
  {
    company: 'Digipay',
    role: 'Senior Front-End Engineer',
    period: 'Dec 2021 — Present',
    location: 'Tehran',
    tags: ['Angular', 'TypeScript', 'NX Monorepo', 'RxJS'],
    featured: [
      'Led frontend for Credit & BNPL journeys serving 10M+ users — complex multi-step financial flows in Angular + TypeScript.',
      'Architected and published 14 shared npm packages, reducing cross-team code duplication and accelerating delivery across all product lines.',
      'Leading the Credit & BNPL line, mentoring engineers and setting the technical direction.',
    ],
    bullets: [
      'Migrated three standalone Angular apps into a unified NX monorepo with shared libs, consolidating dependencies and enabling cross-app code reuse.',
      'Established a multi-layer testing strategy across 75 packages: Karma/Jasmine unit tests, Playwright E2E, and a dual snapshot system (style + visual) as backward-compatibility guards.',
      'Engineered a 7-step credit pre-registration state machine with conditional step-skipping, BehaviorSubject-driven reactive state, and bidirectional URL↔step sync.',
      'Built zero-dependency pinch-to-zoom, pan, and double-tap gesture directives — multi-touch distance calculation, boundary-constrained CSS transforms, rAF-throttled magnifier.',
      'Designed a Claude AI-assisted test generation pipeline for 75 Angular packages — a 900-line reusable prompt specification encoding testing principles and Angular patterns.',
      'Built a zero-maintenance test collection CLI that auto-discovers spec files, counts test cases via regex, and generates a typed data file powering a live status dashboard.',
      'Adopted Angular 17+ standalone components, OnPush change detection, and signal-based computed properties across the Credit/BNPL library.',
      'Implemented custom Angular preloading strategy using route metadata with retryImport wrappers for network-resilient lazy module loading.',
      'Built biometric identity verification with selfie-video capture and liveness photo for digital document signing.',
    ],
  },
  {
    company: 'Adowing',
    role: 'Front-End Developer',
    period: 'Oct 2019 — Dec 2021',
    location: 'Tehran',
    tags: ['Vue', 'Nuxt', 'Agile'],
    bullets: [
      'Developed internal panels for marketing, accounting and other departments using Vue/Nuxt.',
      'Researched and implemented agile process with the product team.',
      'Mentored a front-end developer intern.',
    ],
  },
  {
    company: 'Carnotic',
    role: 'Front-End Developer',
    period: 'Oct 2019 — Dec 2021',
    location: 'Tehran',
    tags: ['Nuxt', 'SEO'],
    bullets: [
      'Built a responsive freight-forwarding platform with pixel-perfect implementations.',
      'Implemented a Nuxt.js app for SEO optimization.',
      'Documented components and wrote test cases for all methods.',
    ],
  },
];

const PROJECTS = [
  {
    name: 'Pita',
    sub: 'Restaurant Kiosk + Kitchen Display System',
    role: 'Architect & Lead Frontend',
    period: '2024 — 2025',
    stack: ['React', 'NX Monorepo', 'WebSockets', 'Docker', 'TypeScript'],
    body: 'Two-app React/NX monorepo for self-service restaurant ordering: a customer-facing kiosk and a kitchen display, sharing @pita/api and @pita/ui libraries, deployed as separate Docker images behind nginx routing.',
    bullets: [
      'Integrated Epson ePOS SDK for thermal receipt printing with automatic network → USB fallback — probes configured IP first, then scans localhost proxy ports for USB printers, with mobile-device and browser-print fallbacks.',
      'Real-time order sync between kiosk and kitchen via Laravel Echo + Pusher WebSockets, with a 10-second polling safety net and a live KDS board showing in-process vs ready orders.',
      'Zero-downtime version checker for always-on kiosk hardware — polls /version.json with cache-busting every 5 min and forces a hard reload on new builds.',
    ],
    featured: true,
  },
  {
    name: 'Pharma',
    sub: 'Prescription Drug E-commerce PWA',
    role: 'Frontend Engineer',
    period: '2024',
    stack: ['Angular 17', 'PWA', 'Signals', 'Service Worker'],
    body: 'Full Angular 17 PWA for prescription pharmaceutical e-commerce with a server-driven adaptive questionnaire engine and offline support.',
    bullets: [
      'Server-driven adaptive medical questionnaire (SingleChoice / MultipleChoice / FormFill / Terminate) — each question fetched dynamically from the API based on the previous answer, enabling personalised eligibility screening.',
      'Signal-based session management, CAPTCHA-protected auth, multi-step drug selection & checkout, in-app support chat, and Service Worker for offline use.',
    ],
    featured: true,
  },
  { name: 'Talent Academy', sub: 'Interactive video learning platform',  stack: ['Vue', 'Custom video player'], body: 'Interactive video player with playlists, instructor feedback messages, and global SSO for internal platforms.' },
  { name: 'Majid',         sub: 'Online form builder (confidential)',      stack: ['Angular', 'Complex JSON'],   body: 'Drag-and-drop form builder (JotForm-style) — schema-driven UI with deep nested JSON handling and live preview.' },
];

const STACK = {
  core:      [['Angular', '5y'], ['React / Next.js', '4y'], ['TypeScript', '5y'], ['NX Monorepo', '3y']],
  proficient: ['RxJS', 'Vue', 'Nuxt', 'Playwright', 'Karma/Jasmine', 'SCSS / Tailwind', 'PWA / Service Workers'],
  familiar:  ['WebSockets', 'Pusher', 'Laravel Echo', 'Docker', 'Git', 'REST APIs', 'Figma', 'Agile/Scrum'],
};

const EDUCATION = [
  { degree: 'B.Sc. Computer Engineering', school: 'Islamic Azad University, Tehran', period: '2017 — 2022' },
];

const COURSES = [
  { name: 'Claude Code in Action',                               source: 'Anthropic', year: '2026' },
  { name: 'The Complete Guide to Becoming a Software Architect', source: 'Udemy',     year: '2025' },
  { name: 'Angular — The Complete Guide',                        source: 'Udemy',     year: '2024' },
];

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

// ─── HTML template ───────────────────────────────────────────────────────────

function buildHtml() {
  const featuredProjects = PROJECTS.filter(p => p.featured);
  const otherProjects    = PROJECTS.filter(p => !p.featured);

  return /* html */`<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${e(PROFILE.name)} — Resume</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
@page { size: A4; margin: 17mm 20mm 13mm; }

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', ui-sans-serif, system-ui, -apple-system, Arial, sans-serif;
  font-size: 8.8pt;
  color: #1a1a1a;
  background: #fff;
  line-height: 1.42;
  -webkit-print-color-adjust: exact;
  print-color-adjust: exact;
}

/* ── header ── */
.header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding-bottom: 11px;
  border-bottom: 2px solid #1e8c47;
  margin-bottom: 12px;
}
.header__name {
  font-size: 26pt;
  font-weight: 600;
  letter-spacing: -0.035em;
  color: #0a0a0a;
  line-height: 1;
}
.header__role {
  margin-top: 4px;
  font-size: 9.5pt;
  color: #555;
}
.header__avail {
  margin-top: 5px;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5pt;
  color: #1e8c47;
  letter-spacing: 0.02em;
}
.header__links {
  text-align: right;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 8pt;
  color: #555;
  line-height: 1.8;
}

/* ── stats strip ── */
.stats {
  display: flex;
  gap: 0;
  border: 0.5px solid #e5e5e5;
  border-radius: 7px;
  overflow: hidden;
  margin-bottom: 11px;
  background: #fafafa;
}
.stat {
  flex: 1;
  padding: 7px 12px;
  border-right: 0.5px solid #e5e5e5;
}
.stat:last-child { border-right: none; }
.stat__value {
  font-size: 13pt;
  font-weight: 600;
  letter-spacing: -0.02em;
  color: #0a0a0a;
  line-height: 1;
}
.stat__label {
  margin-top: 2px;
  font-size: 7pt;
  color: #888;
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  letter-spacing: 0.02em;
}

/* ── pitch ── */
.pitch {
  font-size: 9pt;
  line-height: 1.5;
  color: #333;
  margin-bottom: 14px;
  font-weight: 400;
}

/* ── section ── */
.section { margin-bottom: 13px; }

.kicker {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5pt;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #1e8c47;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 9px;
}
.kicker::after {
  content: '';
  flex: 1;
  height: 0.5px;
  background: #ddd;
}

/* ── experience entry ── */
.exp {
  margin-bottom: 11px;
  page-break-inside: avoid;
}
.exp__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.exp__company {
  font-size: 12pt;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: #0a0a0a;
}
.exp__period {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5pt;
  color: #999;
}
.exp__role-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 5px;
}
.exp__role  { font-size: 8.5pt; color: #555; }
.exp__loc   { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 7.5pt; color: #999; }

.tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.tag {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7pt;
  padding: 1.5px 6px;
  border-radius: 4px;
  background: #f2f2f2;
  color: #555;
  border: 0.5px solid #ddd;
}

/* ── bullets ── */
.bullets { list-style: none; display: grid; gap: 3px; }
.bullet {
  display: grid;
  grid-template-columns: 14px 1fr;
  gap: 5px;
  font-size: 8.5pt;
  line-height: 1.45;
  color: #333;
  align-items: start;
}
.b-dot {
  color: #1e8c47;
  font-weight: 700;
  font-size: 10pt;
  line-height: 1.25;
}
.b-num {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7pt;
  color: #c0c0c0;
  line-height: 1.65;
}

/* ── project card ── */
.project {
  margin-bottom: 11px;
  page-break-inside: avoid;
}
.project__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.project__name {
  font-size: 11.5pt;
  font-weight: 600;
  color: #0a0a0a;
}
.project__sub  { font-size: 8pt; color: #666; margin-bottom: 3px; }
.project__stack {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5pt;
  color: #1e8c47;
  margin-bottom: 4px;
}
.project__body { font-size: 8.5pt; line-height: 1.45; color: #444; margin-bottom: 5px; }

/* ── compact "also" list ── */
.also { border-top: 0.5px solid #eaeaea; padding-top: 7px; margin-top: 5px; }
.also__label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7pt;
  color: #c0c0c0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 5px;
}
.also__grid { display: grid; grid-template-columns: 1fr 1fr; gap: 5px 28px; }
.also__name  { font-size: 8.5pt; font-weight: 600; }
.also__stack { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 7pt; color: #999; margin-left: 6px; }
.also__body  { font-size: 7.5pt; color: #666; margin-top: 1px; line-height: 1.4; }

/* ── toolkit ── */
.stack-grid {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 4px 14px;
  align-items: baseline;
}
.stack-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7.5pt;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.stack-val  { font-size: 8.5pt; color: #333; }
.stack-dim  { color: #bbb; }
.stack-fam  { color: #666; }

/* ── background ── */
.bg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0 36px; }
.edu__degree  { font-size: 9.5pt; font-weight: 500; }
.edu__school  { font-size: 8.5pt; color: #555; margin-top: 1px; }
.edu__period  { font-family: 'JetBrains Mono', ui-monospace, monospace; font-size: 7.5pt; color: #999; margin-top: 3px; }
.courses-label {
  font-family: 'JetBrains Mono', ui-monospace, monospace;
  font-size: 7pt;
  color: #c0c0c0;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 6px;
}
.course { margin-bottom: 4px; }
.course__name { font-size: 8.5pt; font-weight: 500; }
.course__meta { font-size: 7.5pt; color: #888; }

/* ── page break ── */
.page-2 { page-break-before: always; }
</style>
</head>
<body>

<!-- ─── HEADER ─── -->
<div class="header">
  <div>
    <div class="header__name">${e(PROFILE.name)}</div>
    <div class="header__role">${e(PROFILE.role)}</div>
    <div class="header__avail">${e(PROFILE.availability)}</div>
  </div>
  <div class="header__links">
    ${e(PROFILE.email)}<br>
    ${e(PROFILE.linkedin)}<br>
    ${e(PROFILE.github)}<br>
    ${e(PROFILE.website)}
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
  <div class="kicker"><span>01 — Experience</span></div>

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
    ${job.featured ? bullets(job.featured, 'dot') : ''}
    ${job.bullets  ? bullets(job.bullets,  'num') : ''}
  </div>`).join('')}
</div>

<!-- ─── PAGE 2 ─── -->
<div class="page-2">

<!-- ─── PROJECTS ─── -->
<div class="section">
  <div class="kicker"><span>02 — Projects</span></div>

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
    <div class="also__label">Also</div>
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
  <div class="kicker"><span>03 — Toolkit</span></div>
  <div class="stack-grid">
    <div class="stack-label">Core</div>
    <div class="stack-val">${STACK.core.map(([n, y]) => `${e(n)} <span class="stack-dim">${e(y)}</span>`).join(' · ')}</div>
    <div class="stack-label">Proficient</div>
    <div class="stack-val">${STACK.proficient.map(e).join(' · ')}</div>
    <div class="stack-label">Familiar</div>
    <div class="stack-val stack-fam">${STACK.familiar.map(e).join(' · ')}</div>
  </div>
</div>

<!-- ─── BACKGROUND ─── -->
<div class="section">
  <div class="kicker"><span>04 — Background</span></div>
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
      <div class="courses-label">Recent Courses</div>
      ${COURSES.map(c => `
      <div class="course">
        <span class="course__name">${e(c.name)}</span>
        <span class="course__meta"> — ${e(c.source)}, ${e(c.year)}</span>
      </div>`).join('')}
    </div>
  </div>
</div>

</div><!-- end .page-2 -->
</body>
</html>`;
}

// ─── Main ────────────────────────────────────────────────────────────────────

console.log('▸ Building HTML…');
writeFileSync(TMP, buildHtml(), 'utf-8');

console.log('▸ Running Chrome headless…');
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
