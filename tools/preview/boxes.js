#!/usr/bin/env node
// Read a reference's layout out of its own DOM instead of measuring its PNG.
//
//   node tools/preview/boxes.js file:///.../ref/<slug>/code.html > boxes.json
//   node tools/preview/boxes.js <url> [selector] [width]
//
// For a Google Stitch export this replaces measuring entirely. `code.html` is
// a real page with every size written down as an explicit Tailwind px value,
// so rendering it at the harness's own 393px and reading each element's
// `getBoundingClientRect` and computed style gives exact boxes, exact resolved
// letter-spacing (the tokens set it in `em` and the markup then overrides the
// tracking on most strings) and exact composited fills — none of which survive
// a trip through a screenshot.
//
// It also settles the question a PNG cannot answer on its own: **what width
// was the export rendered at?** Render the markup at a few candidates and diff
// each against the PNG; the right one wins by a mile. PulseFit's came out 390,
// not the 393 its status-bar pill implied, and read at 393 that looks like
// everything drifting 2-3dp low down the screen.
//
// Prints one JSON array of { t, txt, x, y, w, h, fs, lh, fw, ls, c, bg, br,
// pad, gap, ff } — tag and classes, text if the node is a leaf, the box in
// CSS px, and the styles worth comparing against.
const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [, , url, sel, widthArg] = process.argv;
if (!url) {
  console.error('usage: boxes.js <url> [selector] [width]');
  process.exit(1);
}
const WIDTH = +(widthArg || 393);
const PORT = 9336;
// Long enough for the webfonts and the Tailwind CDN script, which every Stitch
// export pulls at runtime. A box measured before the face lands is the wrong
// box, and nothing downstream says so.
const SETTLE_MS = +(process.env.BOXES_DELAY_MS || 6000);

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + path.join(os.tmpdir(), 'showoff-chrome-boxes'),
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

(async () => {
  let page;
  for (let i = 0; i < 60; i++) {
    try {
      const t = await get('/json/list');
      page = t.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
      if (page) break;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
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
  // A tall viewport so a fixed footer sits where the full-page render puts it
  // and nothing is measured mid-scroll.
  await send('Emulation.setDeviceMetricsOverride', {
    width: WIDTH,
    height: 1400,
    deviceScaleFactor: 1,
    mobile: true,
  });
  await send('Page.navigate', { url });
  await new Promise((r) => setTimeout(r, SETTLE_MS));

  const expr = `(() => {
    const out = [];
    const root = ${sel ? JSON.stringify(sel) : 'null'};
    for (const el of document.querySelectorAll(root || '*')) {
      const r = el.getBoundingClientRect();
      if (!r.width && !r.height) continue;
      const cs = getComputedStyle(el);
      out.push({
        t: el.tagName.toLowerCase() +
          (typeof el.className === 'string' && el.className.trim()
            ? '.' + el.className.trim().split(/\\s+/).join(' ')
            : ''),
        txt: el.children.length === 0 ? (el.textContent || '').trim().slice(0, 60) : '',
        x: +r.x.toFixed(2), y: +(r.y + window.scrollY).toFixed(2),
        w: +r.width.toFixed(2), h: +r.height.toFixed(2),
        fs: cs.fontSize, lh: cs.lineHeight, fw: cs.fontWeight, ls: cs.letterSpacing,
        c: cs.color, bg: cs.backgroundColor, br: cs.borderRadius,
        pad: cs.padding, gap: cs.gap, ff: cs.fontFamily.split(',')[0],
      });
    }
    return JSON.stringify(out);
  })()`;
  const res = await send('Runtime.evaluate', { expression: expr, returnByValue: true });
  console.log(res.result.value);
  ws.close();
  try {
    require('child_process').execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
  } catch {}
  process.exit(0);
})();
