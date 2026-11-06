#!/usr/bin/env node
// Build a review page for a folder of shots, and open it.
//
//   node tools/review.js                 # shots/batch3 -> shots/batch3/index.html
//   node tools/review.js shots/batch3    # same, explicitly
//   node tools/review.js --no-open       # write it, do not launch a browser
//
// This exists because `record.js` is not the way to look at a batch.
// `record.js` drives a *staged reveal* — it points the boot redirect at one
// slug, preflights its blank/final tree and performs the steps. A showcase
// that is built but not yet staged has nothing for it to reset or check, so
// it stops, correctly, with "scaffolded but not built".
//
// Reviewing is a different job: thirty screens at once, side by side, with
// each one a click away from the live route. The page it writes is a grid of
// the shots at a readable size, grouped by app, every tile linking to
// `http://localhost:<port>/<slug>` so a running dev server turns the same
// page into a launcher.
const { execFile } = require('child_process');
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const args = process.argv.slice(2);
const noOpen = args.includes('--no-open');
const dir = args.find((a) => !a.startsWith('--')) || 'shots/batch3';
const port = process.env.EXPO_PORT || 8082;

const abs = path.join(root, dir);
if (!fs.existsSync(abs)) {
  console.error(`no such folder: ${dir}`);
  process.exit(1);
}

const shots = fs
  .readdirSync(abs)
  .filter((f) => f.endsWith('.png'))
  .sort();

if (!shots.length) {
  console.error(`no .png in ${dir} — shoot some first:`);
  console.error('  node tools/preview/shoot.js <slug> ' + dir + '/<slug>.png');
  process.exit(1);
}

/**
 * Group by app, inferred from the slug's leading word.
 *
 * The slugs are `<app><screen>` with no separator, so the app is the longest
 * prefix shared with another slug. That beats a hand-written map, which
 * would go stale the first time a batch is wiped.
 */
const names = shots.map((f) => path.basename(f, '.png'));
const appOf = (name) => {
  let best = name;
  for (const other of names) {
    if (other === name) continue;
    let i = 0;
    while (i < name.length && i < other.length && name[i] === other[i]) i++;
    // Three, not four: Glu's five screens share exactly 'glu' and were
    // landing in five groups of one.
    if (i >= 3 && i < best.length) best = name.slice(0, i);
  }
  return best === name ? name : best;
};

const groups = new Map();
for (const name of names) {
  const app = appOf(name);
  if (!groups.has(app)) groups.set(app, []);
  groups.get(app).push(name);
}

const sections = [...groups.entries()]
  .map(
    ([app, slugs]) => `
      <section>
        <h2>${app}<span>${slugs.length} screen${slugs.length > 1 ? 's' : ''}</span></h2>
        <div class="grid">
          ${slugs
            .map(
              (s) => `
            <figure>
              <a href="http://localhost:${port}/${s}" target="_blank" rel="noreferrer">
                <img src="${s}.png" alt="${s}" loading="lazy" />
              </a>
              <figcaption><code>${s}</code></figcaption>
            </figure>`,
            )
            .join('')}
        </div>
      </section>`,
  )
  .join('');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>${dir} — review</title>
<style>
  :root { color-scheme: light dark; --bg:#f4f4f6; --fg:#15161a; --dim:#6a6c75; --line:#e2e3e8; --card:#fff; }
  @media (prefers-color-scheme: dark) {
    :root { --bg:#0e0f12; --fg:#f2f2f5; --dim:#8e9099; --line:#23252b; --card:#17191d; }
  }
  * { box-sizing: border-box; }
  body { margin:0; background:var(--bg); color:var(--fg);
         font:15px/1.5 ui-sans-serif,-apple-system,"Segoe UI",system-ui,sans-serif; }
  header { position:sticky; top:0; z-index:2; padding:18px 24px;
           background:var(--bg); border-bottom:1px solid var(--line); }
  h1 { margin:0; font-size:17px; letter-spacing:-.2px; }
  header p { margin:4px 0 0; color:var(--dim); font-size:13px; }
  section { padding:4px 24px 26px; }
  h2 { font-size:13px; letter-spacing:.08em; text-transform:uppercase; color:var(--dim);
       margin:26px 0 12px; display:flex; gap:10px; align-items:baseline; }
  h2 span { font-size:11px; letter-spacing:0; text-transform:none; opacity:.7; }
  .grid { display:grid; gap:18px; grid-template-columns:repeat(auto-fill,minmax(230px,1fr)); }
  figure { margin:0; }
  a { display:block; border-radius:16px; overflow:hidden; background:var(--card);
      border:1px solid var(--line); line-height:0; transition:transform .12s ease; }
  a:hover { transform:translateY(-2px); }
  img { width:100%; height:auto; display:block; }
  figcaption { margin-top:7px; font-size:12px; color:var(--dim); }
  code { font:12px/1 ui-monospace,SFMono-Regular,Menlo,monospace; }
</style>
</head>
<body>
<header>
  <h1>${dir} — ${names.length} screens</h1>
  <p>Click any screen to open it live at <code>localhost:${port}</code>. Start the server first:
     <code>npx expo start --web --port ${port}</code></p>
</header>
${sections}
</body>
</html>
`;

const out = path.join(abs, 'index.html');
fs.writeFileSync(out, html, 'utf8');
console.log(`wrote ${path.relative(root, out)}  (${names.length} screens, ${groups.size} apps)`);

if (!noOpen) {
  // `start` is a cmd builtin, so it needs a shell and an empty title argument.
  execFile('cmd', ['/c', 'start', '', out], (err) => {
    if (err) console.log(`open it by hand: ${out}`);
  });
}
