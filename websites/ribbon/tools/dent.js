// Does the hover move the card's SILHOUETTE?
//
// The claim behind the dent is that it does not: the dome is 1 at the centre and
// exactly 0 along every edge, so the middle bows back while the rim stays
// exactly where it was. That is what lets it be a hover on a strip where every
// material runs depthTest false and a card that grew would draw over its
// neighbour.
//
// Two passes, because one cannot answer both halves:
//
//   geometry — `?silhouette` renders flat white cards with shading off, so the
//              only thing that can change a pixel is the card moving. The dent
//              must produce essentially NO change. Thresholding brightness on
//              the real cards cannot test this: the dent changes the shading, so
//              dark pixels near the edge cross any threshold you pick and the
//              test reports an outline moving when only the light did. That is a
//              real false positive this script used to produce.
//
//   shading  — the normal page, where the interior must change a lot, and only
//              on the hovered card.
import { spawn } from 'node:child_process';
import http from 'node:http';
import os from 'node:os';
import path from 'node:path';

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9345;
// Flags first, so a `--silhouette` in argv[2] is never read as the width.
const FLAGS = process.argv.slice(2).filter((a) => a.startsWith('--'));
const ARGS = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const FLAT = FLAGS.includes('--silhouette');
const W = +(ARGS[0] || 1600);
const H = +(ARGS[1] || 900);

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--no-sandbox',
    '--hide-scrollbars',
    '--use-gl=angle',
    '--use-angle=swiftshader',
    '--enable-unsafe-swiftshader',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + path.join(os.tmpdir(), 'ribbon-dent-chrome'),
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
  const send = (m, p = {}) =>
    new Promise((res) => {
      const myId = ++id;
      const onMsg = (e) => {
        const x = JSON.parse(e.data);
        if (x.id === myId) {
          ws.removeEventListener('message', onMsg);
          res(x.result);
        }
      };
      ws.addEventListener('message', onMsg);
      ws.send(JSON.stringify({ id: myId, method: m, params: p }));
    });
  await new Promise((r) => ws.addEventListener('open', r));

  await send('Emulation.setDeviceMetricsOverride', {
    width: W,
    height: H,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Page.enable');
  await send('Runtime.enable');
  await send('Page.navigate', {
    url: 'http://localhost:5196/' + (FLAT ? '?silhouette' : ''),
  });
  await sleep(9000);

  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', {
      expression: expr,
      returnByValue: true,
      awaitPromise: true,
    });
    if (r.exceptionDetails) {
      console.error('EXC', JSON.stringify(r.exceptionDetails).slice(0, 700));
      return null;
    }
    return r.result.value;
  };

  const grab = async () => (await send('Page.captureScreenshot', { format: 'png' })).data;

  const rest = await grab();
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: W / 2, y: H / 2 });
  await sleep(1600); // the tween is 0.5s; well settled
  const hover = await grab();
  const flat = FLAT;

  // Decode both in the page and compare. "Lit" means not the black background,
  // so the lit set per image is that image's silhouette.
  await ev(
    `window.__a = 'data:image/png;base64,${rest}'; window.__b = 'data:image/png;base64,${hover}'; 'ok'`,
  );

  const out = await ev(`(async () => {
    const load = (src) => new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.src = src; });
    const [A, B] = await Promise.all([load(window.__a), load(window.__b)]);
    const px = (img) => {
      const c = document.createElement('canvas');
      c.width = ${W}; c.height = ${H};
      const x = c.getContext('2d', { willReadFrequently: true });
      x.drawImage(img, 0, 0);
      return x.getImageData(0, 0, ${W}, ${H}).data;
    };
    const a = px(A), b = px(B);

    const LIT = 26;            // above this, a pixel belongs to a card
    const CHANGE = 10;         // below this, two pixels are the same

    let onlyA = 0, onlyB = 0, both = 0;
    let changedInside = 0, maxDiff = 0;
    // Columns across the middle card, to show where the change actually lives.
    const bands = new Array(16).fill(0);

    for (let i = 0; i < a.length; i += 4) {
      const la = Math.max(a[i], a[i+1], a[i+2]) > LIT;
      const lb = Math.max(b[i], b[i+1], b[i+2]) > LIT;
      if (la && lb) both++;
      else if (la) onlyA++;
      else if (lb) onlyB++;

      if (la && lb) {
        const d = Math.max(Math.abs(a[i]-b[i]), Math.abs(a[i+1]-b[i+1]), Math.abs(a[i+2]-b[i+2]));
        if (d > maxDiff) maxDiff = d;
        if (d > CHANGE) {
          changedInside++;
          const p = i / 4, x = p % ${W};
          bands[Math.min(15, Math.floor(x / ${W} * 16))]++;
        }
      }
    }
    return { onlyA, onlyB, both, changedInside, maxDiff, bands };
  })()`);

  const silhouette = out.onlyA + out.onlyB;
  const pct = (n) => ((n / out.both) * 100).toFixed(2) + '%';

  console.log('');
  console.log(
    flat
      ? 'PASS 1 - geometry (flat white cards, shading off)'
      : 'PASS 2 - shading (the real cards)',
  );
  console.log('card pixels in both shots:', out.both);

  if (flat) {
    const moved = silhouette + out.changedInside;
    console.log('pixels that changed at all:', moved, pct(moved));
    console.log(
      '  ->',
      moved / out.both < 0.004
        ? 'OK - the outline is pinned; nothing but shading can move on hover'
        : '<-- THE CARD MOVED',
    );
  } else {
    console.log('card only at rest        :', out.onlyA, pct(out.onlyA));
    console.log('card only when hovered   :', out.onlyB, pct(out.onlyB));
    console.log(
      'interior pixels changed  :',
      out.changedInside,
      pct(out.changedInside),
      out.changedInside / out.both > 0.05
        ? '  OK (the surface answered)'
        : '  <-- NOTHING HAPPENED',
    );
    console.log('largest channel change   :', out.maxDiff, '/255');
  }
  if (flat) {
    ws.close();
    chrome.kill();
    return;
  }
  console.log('where the change sits, left to right across the frame:');
  const peak = Math.max(...out.bands, 1);
  out.bands.forEach((n, i) => {
    const w = Math.round((n / peak) * 44);
    console.log('  ' + String(i).padStart(2), '#'.repeat(w) || '.', n);
  });

  ws.close();
  chrome.kill();
})();
