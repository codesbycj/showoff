#!/usr/bin/env node
// Manage showcases — one app design each.
//
//   node tools/showcase.js new <slug>     scaffold folders and point boot at it
//   node tools/showcase.js use <slug>     repoint the boot redirect for recording
//   node tools/showcase.js list           what exists, and which one boots
//   node tools/showcase.js rm <slug>      delete one showcase, once recorded
//   node tools/showcase.js wipe --yes     delete every showcase (no git to undo)
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const showcases = path.join(root, 'tools/timelapse/showcases');
const BOOT = path.join(root, 'src/app/index.tsx');

const dirsFor = (slug) => [
  routeDir(slug),
  `src/features/${slug}/components`,
  `src/features/${slug}/data`,
  `assets/images/${slug}`,
  `tools/timelapse/showcases/${slug}/blank`,
  `tools/timelapse/showcases/${slug}/finished`,
];

/**
 * Showcases built from a video live under `src/app/animated/<slug>`, so
 * `animated` is a grouping folder and never a slug of its own. Everything
 * here has to look one level deeper for those, or `animated` shows up in the
 * listing as a showcase and the real one does not show up at all.
 */
const GROUPS = ['animated'];

function existing() {
  const appDir = path.join(root, 'src/app');
  if (!fs.existsSync(appDir)) return [];
  const out = [];
  for (const d of fs.readdirSync(appDir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    if (GROUPS.includes(d.name)) {
      for (const g of fs.readdirSync(path.join(appDir, d.name), { withFileTypes: true })) {
        if (g.isDirectory()) out.push(g.name);
      }
    } else {
      out.push(d.name);
    }
  }
  return out;
}

/** Where a slug's routes actually live — grouped or not. */
function routeDir(slug) {
  for (const g of GROUPS) {
    if (fs.existsSync(path.join(root, 'src/app', g, slug))) return `src/app/${g}/${slug}`;
  }
  return `src/app/${slug}`;
}

/** The route a slug boots to, which is its path under src/app. */
function routeHref(slug) {
  return '/' + routeDir(slug).replace(/^src\/app\//, '');
}

function bootSlug() {
  if (!fs.existsSync(BOOT)) return null;
  const m = fs.readFileSync(BOOT, 'utf8').match(/href="\/([^"]+)"/);
  if (!m) return null;
  // "animated/pantry" -> "pantry"; "fashora" -> "fashora".
  const parts = m[1].split('/');
  return parts[parts.length - 1];
}

function writeBoot(slug) {
  fs.writeFileSync(
    BOOT,
    `import { Redirect } from 'expo-router';\n\n` +
      `/** The app opens on the showcase currently being built or recorded. */\n` +
      `export default function Index() {\n  return <Redirect href="${routeHref(slug)}" />;\n}\n`,
    'utf8',
  );
}

const [, , cmd, arg] = process.argv;

if (cmd === 'list') {
  const boot = bootSlug();
  const staged = fs.existsSync(showcases) ? fs.readdirSync(showcases) : [];
  // Three states, not two. `new` creates both the components folder and the
  // staging folder, so neither of those existing means anything — a slug can
  // sit here as an empty route with an empty staging folder behind it, which
  // is what a batch scaffold leaves, and it used to report "staged". The
  // signals that actually mean something are a component on disk and a
  // generated `steps.json`.
  const hasFiles = (p) => fs.existsSync(p) && fs.readdirSync(p).length > 0;
  for (const s of existing()) {
    const built = hasFiles(path.join(root, `src/features/${s}/components`));
    const hasSteps = fs.existsSync(path.join(showcases, s, 'steps.json'));
    const marks = [hasSteps ? 'staged' : built ? 'built, not staged' : 'SCAFFOLD ONLY'];
    if (s === boot) marks.push('BOOTS');
    console.log(`${s.padEnd(16)} ${marks.join(', ')}`);
  }
  if (!existing().length) console.log('(no showcases)');
  process.exit(0);
}

if (cmd === 'new') {
  if (!arg) {
    console.error('usage: showcase.js new <slug>');
    process.exit(1);
  }
  if (existing().includes(arg)) {
    console.error(`"${arg}" already exists`);
    process.exit(1);
  }
  for (const d of dirsFor(arg)) fs.mkdirSync(path.join(root, d), { recursive: true });

  fs.writeFileSync(
    path.join(root, `src/features/${arg}/theme.ts`),
    `/** ${arg} brand tokens, measured off the reference screens. */\n` +
      `export const theme = {\n  black: '#000000',\n  white: '#FFFFFF',\n} as const;\n`,
    'utf8',
  );
  fs.writeFileSync(
    path.join(root, `src/app/${arg}/index.tsx`),
    `import { StatusBar } from 'expo-status-bar';\nimport { View } from 'react-native';\n\n` +
      `/** Screen 1 — built component by component. */\n` +
      `export default function ${arg.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())}Screen() {\n` +
      `  return (\n    <View className="flex-1 bg-white">\n      <StatusBar style="dark" />\n    </View>\n  );\n}\n`,
    'utf8',
  );
  fs.writeFileSync(
    path.join(root, `assets/images/${arg}/CREDITS.md`),
    `# ${arg} imagery\n\nBrand photography is not redistributable; these stand in for it.\n\n` +
      `| File | Source | License |\n|---|---|---|\n`,
    'utf8',
  );
  writeBoot(arg);
  console.log(`scaffolded ${arg}; boot redirect now points at ${routeHref(arg)}`);
  console.log('expo-router typed routes are now stale - tsc will fail until the dev');
  console.log('server picks the new route up, or you run an export.');
  process.exit(0);
}

if (cmd === 'use') {
  if (!existing().includes(arg)) {
    console.error(`unknown showcase "${arg}" — have: ${existing().join(', ') || 'none'}`);
    process.exit(1);
  }
  writeBoot(arg);
  console.log(`boot redirect now points at ${routeHref(arg)}`);
  process.exit(0);
}

function removeSlug(slug) {
  for (const d of dirsFor(slug).map((x) => x.replace(/\/(components|data|blank|finished)$/, ''))) {
    fs.rmSync(path.join(root, d), { recursive: true, force: true });
  }
}

function bootFallback() {
  const left = existing();
  if (left.length) {
    writeBoot(left[0]);
    console.log(`boot redirect now points at ${routeHref(left[0])}`);
    return;
  }
  fs.writeFileSync(
    BOOT,
    `import { Redirect } from 'expo-router';

` +
      `/** No showcase yet - scaffold one with tools/showcase.js new <slug>. */
` +
      `export default function Index() {
  return <Redirect href="/_sitemap" />;
}
`,
    'utf8',
  );
  console.log('no showcases left; boot redirect points at /_sitemap');
}

if (cmd === 'rm') {
  if (!existing().includes(arg)) {
    console.error(`unknown showcase "${arg}" - have: ${existing().join(', ') || 'none'}`);
    process.exit(1);
  }
  if (!process.argv.includes('--yes')) {
    console.error(`rm deletes "${arg}" permanently - routes, components, assets and staging.`);
    console.error('There is no git here. Re-run with --yes to confirm.');
    process.exit(1);
  }
  removeSlug(arg);
  console.log(`removed ${arg}`);
  bootFallback();
  process.exit(0);
}

if (cmd === 'wipe') {
  if (!process.argv.includes('--yes')) {
    console.error('wipe deletes every showcase permanently. There is no git here.');
    console.error(`would remove: ${existing().join(', ') || 'nothing'}`);
    console.error('re-run with --yes to confirm.');
    process.exit(1);
  }
  for (const slug of existing()) {
    removeSlug(slug);
    console.log(`wiped ${slug}`);
  }
  fs.writeFileSync(
    BOOT,
    `import { Redirect } from 'expo-router';\n\n` +
      `/** No showcase yet — scaffold one with tools/showcase.js new <slug>. */\n` +
      `export default function Index() {\n  return <Redirect href="/_sitemap" />;\n}\n`,
    'utf8',
  );
  process.exit(0);
}

console.error('usage: showcase.js <new|use|list|rm|wipe> [slug]');
process.exit(1);
