#!/usr/bin/env node
/**
 * Regenerates scripts/fonts/fonts.css — a self-contained @font-face stylesheet
 * with Inter (300–700) and JetBrains Mono (400, 500) embedded as base64 TTF.
 *
 * Static TTFs, not the variable woff2 a modern browser gets: Chrome embeds a
 * variable font in a PDF as Type 3 outlines with no hinting, which renders
 * jagged and unevenly spaced in many PDF viewers. Requesting the stylesheet
 * without a browser User-Agent makes Google Fonts return one static TTF per
 * weight, which Chrome embeds as a regular TrueType font.
 *
 * Run this when you want to refresh the fonts:
 *
 *   node scripts/fonts/embed-fonts.mjs
 *
 * Requires network access to fonts.googleapis.com at run time only; the
 * resulting fonts.css is fully offline and is what generate-pdf.mjs inlines.
 */
import { writeFileSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), 'fonts.css');
const SRC = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';

const css = await (await fetch(SRC)).text();   // no User-Agent → static TTFs
const blocks = css.split('@font-face').slice(1);

let out = '';
for (const chunk of blocks) {
  const fam = /font-family:\s*'([^']+)'/.exec(chunk)[1];
  const wght = /font-weight:\s*(\d+)/.exec(chunk)[1];
  const url = /url\((https:[^)]+\.ttf)\)/.exec(chunk)[1];
  const b64 = Buffer.from(await (await fetch(url)).arrayBuffer()).toString('base64');
  out += `@font-face{font-family:'${fam}';font-style:normal;font-weight:${wght};font-display:swap;src:url(data:font/ttf;base64,${b64}) format('truetype');}\n`;
  console.error(`embedded ${fam} ${wght}`);
}
writeFileSync(OUT, out);
console.error('wrote', OUT, `(${(out.length / 1024).toFixed(0)} KB)`);
