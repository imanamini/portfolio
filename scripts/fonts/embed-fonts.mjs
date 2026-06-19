#!/usr/bin/env node
/**
 * Regenerates scripts/fonts/fonts.css — a self-contained @font-face stylesheet
 * with the `latin` subset of Inter (300–700) and JetBrains Mono (400, 500)
 * embedded as base64 woff2. Run this when you want to refresh the fonts:
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
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
const SRC = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap';

const css = await (await fetch(SRC, { headers: { 'User-Agent': UA } })).text();
const blocks = css.split(/\/\*\s*([\w-]+)\s*\*\//).slice(1);

let out = '';
for (let i = 0; i < blocks.length; i += 2) {
  if (blocks[i] !== 'latin') continue;            // latin subset only
  const chunk = blocks[i + 1];
  const fam = /font-family:\s*'([^']+)'/.exec(chunk)[1];
  const wght = /font-weight:\s*(\d+)/.exec(chunk)[1];
  const url = /url\((https:[^)]+\.woff2)\)/.exec(chunk)[1];
  const b64 = Buffer.from(await (await fetch(url)).arrayBuffer()).toString('base64');
  out += `@font-face{font-family:'${fam}';font-style:normal;font-weight:${wght};font-display:swap;src:url(data:font/woff2;base64,${b64}) format('woff2');}\n`;
  console.error(`embedded ${fam} ${wght}`);
}
writeFileSync(OUT, out);
console.error('wrote', OUT, `(${(out.length / 1024).toFixed(0)} KB)`);
