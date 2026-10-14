#!/usr/bin/env node
// Which width was a Stitch export rendered at?
//
//   node tools/preview/refwidth.js ref/<slug> [w1,w2,w3...]
//
// The PNG will not tell you. Stitch renders at a scale that is neither 1x nor
// written down anywhere — the bundles seen so far came out 390, 393, 412 and
// 438px wide for designs laid out at quite different widths. Read at the wrong
// one, every measurement is off by a constant ratio, which does not present as
// "wrong width": it presents as the build drifting a few dp low by the foot of
// the screen, and sends you looking for a bug in the layout.
//
// So: render `code.html` at each candidate, scale that render to the PNG's
// width, and diff. The right width wins by a mile rather than by a nose —
// PulseFit's came out 3.9 mean error against 11.5 for the next best — so a
// close result between two candidates means something else is wrong.
const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9347;
const [, , dir, widthsArg] = process.argv;

if (!dir) {
  console.error('usage: refwidth.js ref/<slug> [w1,w2,...]');
  process.exit(1);
}

const CANDIDATES = (widthsArg || '360,375,390,393,400,412,430,438')
  .split(',')
  .map(Number);

const html = path.resolve(dir, 'code.html');
const png = path.resolve(dir, 'screen.png');
for (const f of [html, png]) {
  if (!fs.existsSync(f)) {
    console.error('missing', f);
    process.exit(1);
  }
}

// The reference PNG's own pixel size, straight out of the IHDR.
const ihdr = fs.readFileSync(png).subarray(16, 24);
const REF_W = ihdr.readUInt32BE(0);
const REF_H = ihdr.readUInt32BE(4);

const SETTLE_MS = +(process.env.REFWIDTH_DELAY_MS || 7000);

const chrome = spawn(
  CHROME,
  [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + path.join(os.tmpdir(), 'showoff-chrome-refwidth'),
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
    await sleep(500);
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

  await send('Page.enable');
  await send('Runtime.enable');

  const refData = fs.readFileSync(png).toString('base64');
  console.log(`reference ${path.basename(png)}  ${REF_W}x${REF_H}`);
  console.log('');
  // The sharper discriminator, and the one to read first: scale the render's
  // own height by (refWidth / candidate) and see whether it lands on the PNG's
  // height. The content reflows at the wrong width, so only the right one
  // reproduces the reference's aspect — and it does so to within a pixel or
  // two, where the pixel diff is muddied by webfonts and remote images that
  // may not have landed.
  console.log(' width   render      implied ref h    (actual ' + REF_H + ')   mean abs error');

  const results = [];

  for (const w of CANDIDATES) {
    await send('Emulation.setDeviceMetricsOverride', {
      width: w, height: 900, deviceScaleFactor: 1, mobile: true,
    });
    await send('Page.navigate', { url: 'file:///' + html.replace(/\\/g, '/') });
    await sleep(SETTLE_MS);

    // Full page, so a screen taller than the viewport is compared whole.
    const metrics = await send('Page.getLayoutMetrics');
    const h = Math.ceil(metrics.cssContentSize.height);
    const shot = await send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: true,
      clip: { x: 0, y: 0, width: w, height: h, scale: 1 },
    });

    // Scale the render up to the reference's width and compare. Luminance only:
    // a hue difference between two renders of the same markup is a font or an
    // image that has not landed, and that is not what is being measured here.
    const r = await send('Runtime.evaluate', {
      awaitPromise: true, returnByValue: true,
      expression: `(async () => {
        const load = (src) => new Promise((res, rej) => {
          const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src;
        });
        const [a, b] = await Promise.all([
          load('data:image/png;base64,${refData}'),
          load('data:image/png;base64,${shot.data}'),
        ]);

        const W = ${REF_W};
        const H = Math.min(${REF_H}, Math.round(b.naturalHeight * W / b.naturalWidth));

        const draw = (img, sw, sh) => {
          const c = document.createElement('canvas');
          c.width = W; c.height = H;
          const x = c.getContext('2d', { willReadFrequently: true });
          x.imageSmoothingQuality = 'high';
          x.drawImage(img, 0, 0, sw, sh * (sh / sh), 0, 0, W, Math.round(sh * W / sw));
          return x.getImageData(0, 0, W, H).data;
        };

        const pa = draw(a, a.naturalWidth, a.naturalHeight);
        const pb = draw(b, b.naturalWidth, b.naturalHeight);

        let sum = 0;
        for (let i = 0; i < pa.length; i += 4) {
          const la = 0.2126*pa[i] + 0.7152*pa[i+1] + 0.0722*pa[i+2];
          const lb = 0.2126*pb[i] + 0.7152*pb[i+1] + 0.0722*pb[i+2];
          sum += Math.abs(la - lb);
        }
        return { err: sum / (pa.length / 4), h: H, renderH: b.naturalHeight };
      })()`,
    });

    if (r.exceptionDetails) {
      console.log(` ${String(w).padStart(5)}   <evaluate failed>`);
      continue;
    }
    const v = r.result.value;
    const implied = (v.renderH * REF_W) / w;
    const dh = Math.abs(implied - REF_H);
    results.push({ w, err: v.err, renderH: v.renderH, dh });
    console.log(
      ` ${String(w).padStart(5)}   ${String(w + 'x' + v.renderH).padEnd(11)} ` +
      `${implied.toFixed(1).padStart(13)}   ${(dh < 3 ? '  <== MATCH' : '          ').padEnd(12)} ` +
      `${v.err.toFixed(2).padStart(8)}`,
    );
  }

  // Rank on the height match first and the pixel diff only as a tie-break.
  results.sort((a, b) => a.dh - b.dh || a.err - b.err);
  const [best, next] = results;
  console.log('');
  if (best) {
    console.log(`height match: ${best.w}px reproduces the reference's aspect to ${best.dh.toFixed(1)}px`);
    const margin = next ? next.err / best.err : Infinity;
    console.log(`best: ${best.w}px  (mean ${best.err.toFixed(2)})`);
    if (next) {
      console.log(`next: ${next.w}px  (mean ${next.err.toFixed(2)}) — ${margin.toFixed(2)}x worse`);
    }
    console.log(
      margin > 1.4
        ? 'clear winner; build against this width'
        : 'NOT a clear winner — the two are close, which usually means the render ' +
          'has not settled (fonts, images) rather than that the width is ambiguous',
    );
    console.log(`implied scale of screen.png: ${(REF_W / best.w).toFixed(4)}x`);
  }

  ws.close();
  chrome.kill();
})();
