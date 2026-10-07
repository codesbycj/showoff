#!/usr/bin/env node
// Flip a showcase between its filming state (every element commented out, with
// staged mistakes) and its finished state.
//
//   node tools/timelapse/apply.js revolut blank           ready to film
//   node tools/timelapse/apply.js revolut final           everything restored
//   node tools/timelapse/apply.js revolut blank screen2   one file only
//   node tools/timelapse/apply.js list                    known showcases
const fs = require('fs');
const path = require('path');

const here = __dirname;
const root = path.resolve(here, '../..');
const showcases = path.join(here, 'showcases');

// The root layout and boot redirect are backups only, never part of a switch.
const BACKUP_ONLY = new Set(['root-index', 'root-layout']);

function known() {
  if (!fs.existsSync(showcases)) return [];
  return fs
    .readdirSync(showcases)
    .filter((d) => fs.existsSync(path.join(showcases, d, 'manifest.json')));
}

const [, , slug, mode, only] = process.argv;

if (slug === 'list') {
  console.log(known().join('\n') || '(no showcases)');
  process.exit(0);
}

if (!slug || (mode !== 'blank' && mode !== 'final')) {
  console.error('usage: apply.js <slug> <blank|final> [name]');
  console.error('       apply.js list');
  console.error('showcases: ' + (known().join(', ') || 'none'));
  process.exit(1);
}

const dir = path.join(showcases, slug);
if (!fs.existsSync(path.join(dir, 'manifest.json'))) {
  console.error(`unknown showcase "${slug}" — have: ${known().join(', ') || 'none'}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(path.join(dir, 'manifest.json'), 'utf8'));
const ext = mode === 'blank' ? '.blank' : '.final';
const sub = mode === 'blank' ? 'blank' : 'finished';
const names = only ? [only] : Object.keys(manifest).filter((n) => !BACKUP_ONLY.has(n));

let count = 0;
for (const name of names) {
  const dest = manifest[name];
  if (!dest) {
    console.error(`unknown name "${name}" in ${slug}`);
    process.exit(1);
  }
  const src = path.join(dir, sub, name + ext);
  // Not every file needs a blank variant; skip those quietly.
  if (!fs.existsSync(src)) continue;
  fs.copyFileSync(src, path.join(root, dest));
  console.log(`${mode.padEnd(5)} → ${dest}`);
  count++;
}
console.log(`${count} file(s) updated`);
