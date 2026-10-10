#!/usr/bin/env node
// Register a showcase that is filmed as motion rather than as a speed-build.
//
//   node tools/timelapse/snapshot.js pantry          capture the current tree
//   node tools/timelapse/snapshot.js pantry --check  report drift, write nothing
//
// A showcase built from a **video** is recorded by using it — tapping and
// swiping through the flow — so there is nothing to reveal element by element
// and no blank state to strip back to. Those showcases still need
// `apply.js <slug> final` to work, because that is how a tree that has
// drifted gets put back before a take.
//
// This writes the two things `final` needs — a manifest, and a
// `finished/<name>.final` per file — and nothing else. No `blank/`, no
// `steps.json`. `verify`, `rehearse` and the per-screen reveal stay
// unavailable for such a showcase by design, and say so rather than failing
// on a missing file.
const fs = require('fs');
const path = require('path');

const here = __dirname;
const root = path.resolve(here, '../..');

const [, , slug, ...flags] = process.argv;
const check = flags.includes('--check');

if (!slug) {
  console.error('usage: snapshot.js <slug> [--check]');
  process.exit(1);
}

/** Every file that belongs to the showcase, with the name it is stored under. */
function collect() {
  const out = [];
  const add = (rel, name) => out.push({ rel, name });

  // Routes live under src/app/<slug> or src/app/animated/<slug>.
  const appDirs = [`src/app/${slug}`, `src/app/animated/${slug}`].filter((d) =>
    fs.existsSync(path.join(root, d)),
  );
  if (!appDirs.length) {
    console.error(`no src/app/${slug} or src/app/animated/${slug} - is that the right slug?`);
    process.exit(1);
  }
  for (const d of appDirs) {
    for (const f of fs.readdirSync(path.join(root, d)).sort()) {
      if (f.endsWith('.tsx')) add(`${d}/${f}`, `${path.basename(f, '.tsx')}-screen`);
    }
  }

  const featDir = path.join(root, 'src/features', slug);
  if (!fs.existsSync(featDir)) {
    console.error(`no src/features/${slug}`);
    process.exit(1);
  }
  for (const f of fs.readdirSync(featDir).sort()) {
    if (fs.statSync(path.join(featDir, f)).isDirectory()) continue;
    if (/\.tsx?$/.test(f)) add(`src/features/${slug}/${f}`, path.basename(f, path.extname(f)));
  }
  for (const [sub, suffix] of [
    ['data', '-data'],
    ['components', '-ui'],
  ]) {
    const d = path.join(featDir, sub);
    if (!fs.existsSync(d)) continue;
    for (const f of fs.readdirSync(d).sort()) {
      if (!/\.tsx?$/.test(f)) continue;
      add(`src/features/${slug}/${sub}/${f}`, path.basename(f, path.extname(f)) + suffix);
    }
  }
  return out;
}

const files = collect();

// Names are the manifest's keys, so a collision would silently drop a file.
const seen = new Map();
for (const { rel, name } of files) {
  if (seen.has(name)) {
    console.error(`name collision "${name}": ${seen.get(name)} and ${rel}`);
    process.exit(1);
  }
  seen.set(name, rel);
}

const dir = path.join(here, 'showcases', slug);
const finished = path.join(dir, 'finished');
const manifestPath = path.join(dir, 'manifest.json');

if (check) {
  if (!fs.existsSync(manifestPath)) {
    console.error(`${slug} is not registered - run snapshot.js ${slug}`);
    process.exit(1);
  }
  let drift = 0;
  for (const { rel, name } of files) {
    const stored = path.join(finished, name + '.final');
    if (!fs.existsSync(stored)) {
      console.log(`NEW     ${rel}`);
      drift++;
    } else if (
      fs.readFileSync(stored, 'utf8') !== fs.readFileSync(path.join(root, rel), 'utf8')
    ) {
      console.log(`DRIFT   ${rel}`);
      drift++;
    }
  }
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  for (const name of Object.keys(manifest)) {
    if (!seen.has(name)) {
      console.log(`GONE    ${manifest[name]}`);
      drift++;
    }
  }
  console.log(drift ? `${drift} file(s) differ from the snapshot` : 'snapshot matches the tree');
  process.exit(drift ? 1 : 0);
}

fs.mkdirSync(finished, { recursive: true });
const manifest = {};
for (const { rel, name } of files) {
  manifest[name] = rel;
  fs.copyFileSync(path.join(root, rel), path.join(finished, name + '.final'));
}
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 1) + '\n', 'utf8');

console.log(`${slug}: ${files.length} file(s) captured as finished`);
console.log(`  manifest  ${path.relative(root, manifestPath).replace(/\\/g, '/')}`);
console.log('  no blank state - this showcase is filmed by using it, not by building it');
