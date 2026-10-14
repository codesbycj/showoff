#!/usr/bin/env node
// Read colours out of a reference image, instead of guessing at them.
//
//   node tools/preview/sample.js <image> border
//   node tools/preview/sample.js <image> at 12,30 400,118 ...
//   node tools/preview/sample.js <image> grid 6 4
//
// Three questions this answers, all of which otherwise get eyeballed:
//
//   `border`  — the mean and standard deviation of the outermost ring of
//               pixels. This is the cutout test from the house rules: a low
//               deviation means a flat backdrop that will key out cleanly, a
//               high one means the edge carries detail and a flood fill will
//               tear it.
//   `at`      — the exact colour at given pixel coordinates, for the handful
//               of fills a Stitch export leaves to a gradient or an alpha
//               blend and so never writes down as a hex.
//   `grid`    — a coarse map of the image, for finding out what is where
//               before asking for a point.
//
// Coordinates are in the image's own pixels. Divide by the scale `refwidth.js`
// reports if you are working from a dp measurement.
const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9349;
const [, , file, mode, ...rest] = process.argv;

if (!file || !mode) {
  console.error('usage: sample.js <image> border|at|grid [args]');
  process.exit(1);
}
const img = path.resolve(file);
if (!fs.existsSync(img)) {
  console.error('missing', img);
  process.exit(1);
}

const dataUrl =
  'data:image/' +
  (img.toLowerCase().endsWith('.png') ? 'png' : 'jpeg') +
  ';base64,' +
  fs.readFileSync(img).toString('base64');

const chrome = spawn(
  CHROME,
  [
    '--headless=new', '--no-sandbox', '--disable-gpu',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + path.join(os.tmpdir(), 'showoff-chrome-sample'),
    'about:blank',
  ],
  { stdio: 'ignore' },
);

const get = (p) =>
  new Promise((res, rej) => {
    http
      .get({ host: '127.0.0.1', port: PORT, path: p }, (r) => {
        let d = '';
        r.on('data', (c) => (d += c));
        r.on('end', () => res(JSON.parse(d)));
      })
      .on('error', rej);
  });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  let page;
  for (let i = 0; i < 90; i++) {
    try {
      const t = await get('/json/list');
      page = t.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
      if (page) break;
    } catch {}
    await sleep(400);
  }
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const send = (method, params = {}) =>
    new Promise((res) => {
      const myId = ++id;
      const onMsg = (e) => {
        const m = JSON.parse(e.data);
        if (m.id === myId) {
          ws.removeEventListener('message', onMsg);
          res(m.result);
        }
      };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id: myId, method, params }));
    });
  await new Promise((r) => ws.addEventListener('open', r));
  await send('Runtime.enable');

  const r = await send('Runtime.evaluate', {
    awaitPromise: true,
    returnByValue: true,
    expression: `(async () => {
      const img = new Image();
      await new Promise((res, rej) => { img.onload = res; img.onerror = rej; img.src = ${JSON.stringify(dataUrl)}; });
      const W = img.naturalWidth, H = img.naturalHeight;
      const c = document.createElement('canvas');
      c.width = W; c.height = H;
      const x = c.getContext('2d', { willReadFrequently: true });
      x.drawImage(img, 0, 0);
      const d = x.getImageData(0, 0, W, H).data;
      const at = (px, py) => {
        const i = ((py * W) + px) * 4;
        return [d[i], d[i+1], d[i+2], d[i+3]];
      };
      const mode = ${JSON.stringify(mode)};
      const rest = ${JSON.stringify(rest)};

      if (mode === 'border') {
        const ring = [];
        for (let px = 0; px < W; px++) { ring.push(at(px, 0)); ring.push(at(px, H - 1)); }
        for (let py = 0; py < H; py++) { ring.push(at(0, py)); ring.push(at(W - 1, py)); }
        const mean = [0,1,2].map(k => ring.reduce((a, p) => a + p[k], 0) / ring.length);
        const sd = [0,1,2].map(k =>
          Math.sqrt(ring.reduce((a, p) => a + (p[k] - mean[k]) ** 2, 0) / ring.length));
        return { W, H, kind: 'border', n: ring.length, mean, sd };
      }

      if (mode === 'grid') {
        const cols = +(rest[0] || 6), rows = +(rest[1] || 4);
        const cells = [];
        for (let gy = 0; gy < rows; gy++) {
          const row = [];
          for (let gx = 0; gx < cols; gx++) {
            row.push(at(Math.floor((gx + 0.5) * W / cols), Math.floor((gy + 0.5) * H / rows)));
          }
          cells.push(row);
        }
        return { W, H, kind: 'grid', cells };
      }

      return {
        W, H, kind: 'at',
        points: rest.map((s) => {
          const [px, py] = s.split(',').map(Number);
          return { px, py, rgba: at(px, py) };
        }),
      };
    })()`,
  });

  if (r.exceptionDetails) {
    console.error('failed:', JSON.stringify(r.exceptionDetails).slice(0, 400));
    process.exit(1);
  }

  const v = r.result.value;
  const hex = (p) => '#' + p.slice(0, 3).map((n) => Math.round(n).toString(16).padStart(2, '0')).join('');

  console.log(`${path.basename(img)}  ${v.W}x${v.H}`);

  if (v.kind === 'border') {
    console.log(`border ring: ${v.n} px`);
    console.log(`  mean  ${hex(v.mean)}  rgb(${v.mean.map((n) => n.toFixed(1)).join(', ')})`);
    console.log(`  stdev       rgb(${v.sd.map((n) => n.toFixed(2)).join(', ')})`);
    const worst = Math.max(...v.sd);
    console.log(
      worst < 2
        ? '  -> flat backdrop; it will key out cleanly'
        : worst < 8
          ? '  -> nearly flat; a flood fill with a tolerance will work'
          : '  -> the edge carries detail; do NOT flood fill it',
    );
  } else if (v.kind === 'grid') {
    for (const row of v.cells) console.log('  ' + row.map(hex).join('  '));
  } else {
    for (const p of v.points) {
      console.log(`  ${String(p.px + ',' + p.py).padEnd(12)} ${hex(p.rgba)}  alpha ${p.rgba[3]}`);
    }
  }

  ws.close();
  chrome.kill();
})();
