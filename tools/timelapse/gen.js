#!/usr/bin/env node
// Build a showcase's steps.json by walking the markers in its blank files.
//
//   node tools/timelapse/gen.js structured
//
// Hand-writing the step list was the largest authoring cost of the first two
// apps (141 entries for Revolut) and the source of its worst class of bug: a
// step whose needle text no longer matched the file it pointed at. Here the
// blank file is the only source of truth — a step exists because a marker
// exists, and its needle is read off the very line it will act on.
//
// Markers, all of which disappear as their step runs:
//
//   // STEP 1.04 import the page dots
//   // import { PageDots } from '...';        -> imp
//
//   {/* STEP 1.09 the hero flat-lay
//   <WelcomeHero />
//   */}                                        -> jsx
//
//   // STEP 1.06 the green tile
//   // {
//   //   key: 'orchard',                      -> block ('entry', if one line)
//
//   // MISTAKE 1.06 wrong module path
//   import { Dots } from './page-dot';         -> cutfirst (removes both lines)
//
//   {/* STEP 1.08 a stray second row | FIX 1.09 take it back out
//   <PageDots count={3} active={2} />
//   */}                                        -> jsx, then cutel
//
// Mistakes come in those two shapes for a reason. A `// MISTAKE` line is safe
// wherever JS comments are (inside an object literal, say), but a JSX comment
// cannot be nested inside the `{/* */}` block staging it — the inner `*/` would
// close the outer one and the blank file would not parse. So a mistake made of
// JSX is staged as its own block, revealed by one step and cut by the next.
//
// Screen and order come from the `<screen>.<nn>` number, so steps can be
// spread across as many files as the screen touches.
const fs = require('fs');
const path = require('path');

const here = __dirname;
const root = path.resolve(here, '../..');

const slug = process.argv[2];
if (!slug) {
  console.error('usage: gen.js <slug>');
  process.exit(1);
}

const dir = path.join(here, 'showcases', slug);
const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));

const STEP = /^\s*\/\/\s*STEP (\d+)\.(\d+)\s+(.*)$/;
const JSXSTEP = /^\s*\{\/\*\s*STEP (\d+)\.(\d+)\s+(.*)$/;
const FIX = /\|\s*FIX (\d+)\.(\d+)\s+(.*)$/;
// A mistake is staged inside the block it belongs to, so it only appears once
// that part of the screen is revealed — never red-screening from step one.
// It may be a line comment (inside an object literal) or a JSX comment.
const MISTAKE = /^\s*(\/\/|\{\/\*)\s*MISTAKE (\d+)\.(\d+)\s+(.*)$/;
const MODULE = /from\s+'([^']+)'/;
const KEY = /\b(?:key|id):\s*'([^']+)'/;

const found = [];
const touched = {};

for (const [name, rel] of Object.entries(manifest)) {
  const src = path.join(dir, 'blank', name + '.blank');
  if (!fs.existsSync(src)) continue;
  const lines = fs.readFileSync(src, 'utf8').split('\n');

  lines.forEach((line, i) => {
    const jsxm = JSXSTEP.exec(line);
    if (jsxm) {
      const [, screen, n, rest] = jsxm;
      const fix = FIX.exec(rest);
      const label = fix ? rest.slice(0, fix.index).trim() : rest.trim();
      found.push({ screen, n: +n, label, op: 'jsx', args: [rel, `STEP ${screen}.${n}`] });
      if (fix) {
        const needle = (lines[i + 1] ?? '').trim();
        if (!needle) throw new Error(`${name}.blank:${i + 2}: FIX ${fix[1]}.${fix[2]} has nothing to cut`);
        found.push({
          screen,
          n: +fix[2],
          label: fix[3].trim(),
          op: 'cutel',
          args: [rel, needle],
        });
      }
      (touched[screen] ??= new Set()).add(name);
      return;
    }

    const stepm = STEP.exec(line);
    if (stepm) {
      const [, screen, n, label] = stepm;
      const next = lines[i + 1] ?? '';
      if (/^\s*\/\/\s*import\b/.test(next)) {
        const mod = MODULE.exec(next);
        if (!mod) throw new Error(`${name}.blank:${i + 2}: no module path on the import`);
        found.push({ screen, n: +n, label, op: 'imp', args: [rel, mod[1]] });
        (touched[screen] ??= new Set()).add(name);
        return;
      }
      // Otherwise the step stages one entry of a data array: a commented `{`
      // opens a multi-line entry, anything else is a one-liner. Either way the
      // step is keyed, never positional, so reordering the array cannot aim it
      // at the wrong entry.
      if (!/^\s*\/\//.test(next)) {
        throw new Error(`${name}.blank:${i + 2}: STEP ${screen}.${n} is followed by neither an import nor a commented entry`);
      }
      const multi = /^\s*\/\/\s*\{\s*$/.test(next);
      let key = null;
      for (let k = i + 1; k < lines.length && /^\s*\/\//.test(lines[k]); k += 1) {
        const m = KEY.exec(lines[k]);
        if (m) {
          key = m[1];
          break;
        }
        if (!multi) break;
      }
      if (!key) throw new Error(`${name}.blank:${i + 2}: STEP ${screen}.${n} has no key on its entry`);
      found.push({ screen, n: +n, label, op: multi ? 'block' : 'entry', args: [rel, key] });
      (touched[screen] ??= new Set()).add(name);
      return;
    }

    const badm = MISTAKE.exec(line);
    if (badm) {
      const [, opener, screen, n, label] = badm;
      const bad = (lines[i + 1] ?? '').trim();
      if (!bad) throw new Error(`${name}.blank:${i + 2}: MISTAKE ${screen}.${n} has no line under it`);
      found.push({
        screen,
        n: +n,
        label,
        op: 'cutfirst',
        args: [rel, [`${opener} MISTAKE ${screen}.${n}`, bad]],
      });
      (touched[screen] ??= new Set()).add(name);
    }
  });
}

const out = {};
for (const screen of Object.keys(touched).sort()) {
  const steps = found
    .filter((s) => s.screen === screen)
    .sort((a, b) => a.n - b.n)
    .map(({ op, args, label }) => ({ op, args, label }));

  const seen = new Set();
  for (const s of steps) {
    const key = s.op + JSON.stringify(s.args);
    if (seen.has(key)) throw new Error(`duplicate step in screen ${screen}: ${key}`);
    seen.add(key);
  }

  // The tidy-up beat: every file the screen touched goes to its finished copy,
  // which is what clears the STEP banners left behind in its components.
  steps.push({
    op: 'final',
    args: [...touched[screen]].sort().map((name) => [name, manifest[name]]),
    label: 'tidy up',
  });

  out[screen] = steps;
}

const numbers = {};
for (const s of found) {
  const key = `${s.screen}.${s.n}`;
  if (numbers[key]) throw new Error(`step number ${key} used twice`);
  numbers[key] = true;
}

fs.writeFileSync(path.join(dir, 'steps.json'), JSON.stringify(out, null, 1) + '\n');
for (const screen of Object.keys(out)) {
  console.log(`screen ${screen}: ${out[screen].length} steps`);
}
