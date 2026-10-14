#!/usr/bin/env node
// Compare the build's DOM against the reference's, element by element.
//
//   node tools/preview/boxes.js <ref code.html> "" 390 > ref.json
//   node tools/preview/boxes.js http://localhost:8082/<slug> "" 393 > mine.json
//   node tools/preview/diffboxes.js ref.json mine.json [--dy 59] [--dx 0]
//
// Matching is by the text a node carries, which is the one thing that survives
// the trip from a Tailwind span to a React Native `<Text>`: class names, tag
// names and tree shape all change, the words do not. Nodes with no text are
// skipped rather than guessed at.
//
// `--dy` is the reference's missing top inset. A Stitch export renders in
// desktop Chrome where `env(safe-area-inset-top)` is 0, so its page starts at
// y=0 and the build's starts below a status bar; without the offset every row
// reads as uniformly late and the real drift is buried under it.
//
// `--dx` is for width: a 390 reference read on a 393 harness puts centred
// content 1.5dp right and right-aligned content 3dp right, and neither is an
// error. Left-aligned content should not move at all, so it is left to the
// per-row numbers rather than folded into a global offset.
const fs = require('fs');

const args = process.argv.slice(2);
const files = args.filter((a) => !a.startsWith('--'));
const flag = (name, dflt) => {
  const i = args.indexOf('--' + name);
  return i < 0 ? dflt : Number(args[i + 1]);
};
const DY = flag('dy', 0);
const DX = flag('dx', 0);

if (files.length < 2) {
  console.error('usage: diffboxes.js <ref.json> <mine.json> [--dy N] [--dx N]');
  process.exit(1);
}

const norm = (s) =>
  (s || '')
    .replace(/\s+/g, ' ')
    .replace(/[‘’]/g, "'")
    .trim()
    .toLowerCase();

const load = (f) =>
  JSON.parse(fs.readFileSync(f, 'utf8'))
    .filter((n) => norm(n.txt))
    .map((n) => ({ ...n, key: norm(n.txt) }));

const ref = load(files[0]);
const mine = load(files[1]);

// Index the build's nodes by text, consuming each match so repeated strings
// (four identical stars, say) pair up in document order rather than all
// matching the first one.
const pool = new Map();
for (const n of mine) {
  if (!pool.has(n.key)) pool.set(n.key, []);
  pool.get(n.key).push(n);
}

let matched = 0;
const misses = [];
const rows = [];

for (const r of ref) {
  const bucket = pool.get(r.key);
  const m = bucket && bucket.length ? bucket.shift() : null;
  if (!m) {
    misses.push(r);
    continue;
  }
  matched++;
  rows.push({
    txt: r.txt.replace(/\s+/g, ' ').trim().slice(0, 30),
    dx: m.x - (r.x + DX),
    dy: m.y - (r.y + DY),
    dw: m.w - r.w,
    dh: m.h - r.h,
    fsRef: r.fs,
    fsMine: m.fs,
    lsRef: r.ls,
    lsMine: m.ls,
    cRef: r.c,
    cMine: m.c,
  });
}

const bad = (n, tol) => (Math.abs(n) > tol ? '  <--' : '');
console.log(
  'text                           dx     dy     dw     dh   size ref/mine   tracking ref/mine',
);
for (const r of rows) {
  const flagged =
    bad(r.dx, 1.5) || bad(r.dy, 1.5) || bad(r.dw, 2) || bad(r.dh, 1.5) ||
    (r.fsRef !== r.fsMine ? '  <--' : '');
  console.log(
    `${r.txt.padEnd(30)} ${r.dx.toFixed(1).padStart(5)} ${r.dy.toFixed(1).padStart(6)} ` +
    `${r.dw.toFixed(1).padStart(6)} ${r.dh.toFixed(1).padStart(6)}   ` +
    `${(r.fsRef + '/' + r.fsMine).padEnd(14)} ${(r.lsRef + '/' + r.lsMine).padEnd(18)}${flagged}`,
  );
}

const worst = (k) => rows.reduce((a, r) => Math.max(a, Math.abs(r[k])), 0);
const mean = (k) => rows.reduce((a, r) => a + Math.abs(r[k]), 0) / (rows.length || 1);

console.log('');
console.log(`matched ${matched}/${ref.length} text nodes`);
console.log(
  `mean |dx| ${mean('dx').toFixed(2)}  |dy| ${mean('dy').toFixed(2)}  ` +
  `|dw| ${mean('dw').toFixed(2)}  |dh| ${mean('dh').toFixed(2)}`,
);
console.log(
  `worst |dx| ${worst('dx').toFixed(1)}  |dy| ${worst('dy').toFixed(1)}  ` +
  `|dw| ${worst('dw').toFixed(1)}  |dh| ${worst('dh').toFixed(1)}`,
);
if (misses.length) {
  console.log('');
  console.log('not built yet (or text differs):');
  for (const m of misses) console.log('  ' + m.txt.replace(/\s+/g, ' ').trim().slice(0, 60));
}
