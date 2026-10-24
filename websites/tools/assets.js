// Download every image a reference page actually paints.
//
//   node tools/assets.js <dumpDir> <outDir> [--max 40] [--min 60] [--host example.com]
//
// Reads `images.json` written by `dump.js` — which collected them from the **DOM**, so
// it has the `currentSrc` the browser chose, every `srcset` candidate, every `<source>`,
// every computed `background-image` and every external `<use href>`. Parsing the HTML
// instead misses all of the last three and most of the first.
//
// Rule 0: the images do not change. Rule 10: take them at the largest size offered, keep
// the format served, re-encode only to save bytes.
//
// For a Shopify or Webflow reference the same photograph appears at a dozen widths. The
// downloader groups by the URL with its size parameters stripped and keeps **one** file
// per group: the widest. 271 URLs on the partakefoods home page collapse to 46 images.
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const argv = process.argv.slice(2);
const dumpDir = argv[0];
const outDir = argv[1] || path.join(dumpDir, 'img');
const opt = (n, d) => {
  const i = argv.indexOf('--' + n);
  return i === -1 ? d : argv[i + 1];
};
/** Skip anything painted smaller than this in either axis — icons come from the SVG. */
const MIN = +opt('min', 0);
const HOST = opt('host', '');

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/131.0.0.0 Safari/537.36';

function get(u, depth = 0) {
  return new Promise((res) => {
    if (depth > 5) return res(null);
    const lib = u.startsWith('https') ? https : http;
    lib
      .get(u, { headers: { 'user-agent': UA, accept: 'image/*,*/*' } }, (r) => {
        if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
          r.resume();
          return res(get(new URL(r.headers.location, u).href, depth + 1));
        }
        if (r.statusCode !== 200) {
          r.resume();
          return res(null);
        }
        const chunks = [];
        r.on('data', (c) => chunks.push(c));
        r.on('end', () => res({ buf: Buffer.concat(chunks), type: r.headers['content-type'] || '' }));
      })
      .on('error', () => res(null));
  });
}

/**
 * The identity of a photograph, independent of the size it was asked for.
 *
 * Shopify encodes the width into the filename (`foo_1400x.jpg`) *and* into a `width=`
 * query parameter, and serves the same picture at both. Strip both and the twelve
 * variants of one photograph collapse to one key.
 */
function groupKey(u) {
  const url = new URL(u);
  url.search = '';
  return url.href
    .replace(/_(\d{2,5})x(\d{2,5})?(_crop_[a-z]+)?(?=\.)/i, '')
    .replace(/@\dx(?=\.)/i, '')
    .replace(/-\d{3,4}w(?=\.)/i, '');
}

function widthOf(u) {
  const q = new URL(u).searchParams.get('width');
  if (q) return +q;
  const m = u.match(/_(\d{2,5})x/);
  if (m) return +m[1];
  return 0;
}

function nameFor(u, used) {
  const base = decodeURIComponent(new URL(u).pathname.split('/').pop() || 'asset')
    .replace(/_(\d{2,5})x(\d{2,5})?(_crop_[a-z]+)?(?=\.)/i, '')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  let n = base || 'asset';
  let i = 2;
  while (used.has(n)) {
    const dot = base.lastIndexOf('.');
    n = dot === -1 ? `${base}-${i}` : `${base.slice(0, dot)}-${i}${base.slice(dot)}`;
    i++;
  }
  used.add(n);
  return n;
}

(async () => {
  const images = JSON.parse(fs.readFileSync(path.join(dumpDir, 'images.json'), 'utf8'));
  fs.mkdirSync(outDir, { recursive: true });

  const groups = new Map();
  for (const im of images) {
    if (HOST && !im.url.includes(HOST)) continue;
    if (MIN && im.w !== null && im.w < MIN && im.h !== null && im.h < MIN) continue;
    const k = groupKey(im.url);
    const w = widthOf(im.url);
    const prev = groups.get(k);
    if (!prev || w > prev.w) groups.set(k, { url: im.url, w, how: im.how, paintedW: im.w, paintedH: im.h });
  }

  console.log('%d urls -> %d distinct images', images.length, groups.size);

  const used = new Set();
  const manifest = [];
  let ok = 0;
  for (const g of groups.values()) {
    const r = await get(g.url);
    if (!r || r.buf.length < 200) {
      console.log('MISS '.padEnd(46), ' '.repeat(8), g.url.slice(0, 100));
      continue;
    }
    const name = nameFor(g.url, used);
    fs.writeFileSync(path.join(outDir, name), r.buf);
    manifest.push({ file: name, url: g.url, bytes: r.buf.length, type: r.type, how: g.how, paintedW: g.paintedW, paintedH: g.paintedH });
    ok++;
    console.log(name.padEnd(46), String(r.buf.length).padStart(8), g.how);
  }

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 1));
  console.log('\n%d files, %d KB', ok, Math.round(manifest.reduce((a, m) => a + m.bytes, 0) / 1024));
})();
