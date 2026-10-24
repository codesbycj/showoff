// Download a reference's images from the page's own loaded resources.
//
//   node tools/assets-cdp.js <url> <outDir> [--wait 11000] [--block a,b] [--min 60]
//
// Use this when `assets.js` comes back with nothing but 403s. Some references
// serve their images from a CDN that rejects any request which is not the page
// itself — no user agent, referer or cookie gets you in, and fetching from
// *inside* the page fails too because the CDN sends no CORS header, so the
// response is opaque to JavaScript.
//
// CDP does not care about either. With the Network domain enabled the browser
// keeps every response body it receives, so listening for `responseReceived`
// and then asking `Network.getResponseBody` for each image hands back the exact
// bytes the page got — no second request, no CORS, no 403.
//
// (`Page.getResourceContent` looks like the obvious call and is not: Chrome
// does not retain image bodies in the resource tree and every one comes back
// empty.)
//
// Rule 0: the images do not change. This is how you get them when the usual
// route is closed.
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9451;
const argv = process.argv.slice(2);
const url = argv[0];
const outDir = argv[1];
const opt = (n, d) => {
  const i = argv.indexOf('--' + n);
  return i === -1 ? d : argv[i + 1];
};
const WAIT = +opt('wait', 11000);
const MIN = +opt('min', 2000);

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'acdp-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--hide-scrollbars',
  '--no-first-run',
  '--disable-gpu',
  '--window-size=1440,900',
  'about:blank',
]);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const getJSON = (p) =>
  new Promise((res, rej) => {
    http
      .get({ host: '127.0.0.1', port: PORT, path: p }, (r) => {
        let d = '';
        r.on('data', (c) => (d += c));
        r.on('end', () => {
          try {
            res(JSON.parse(d));
          } catch (e) {
            rej(e);
          }
        });
      })
      .on('error', rej);
  });

function nameFor(u, used) {
  const base = decodeURIComponent(new URL(u).pathname.split('/').pop() || 'asset')
    .replace(/[^a-zA-Z0-9._-]+/g, '-')
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
  let target = null;
  for (let i = 0; i < 80 && !target; i++) {
    try {
      target = (await getJSON('/json/list')).find((t) => t.type === 'page');
    } catch {
      await sleep(250);
    }
  }
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { res, rej } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? rej(new Error(JSON.stringify(m.error))) : res(m.result);
    }
  });
  const send = (method, params = {}) =>
    new Promise((res, rej) => {
      const n = ++id;
      pending.set(n, { res, rej });
      ws.send(JSON.stringify({ id: n, method, params }));
    });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Network.enable', { maxResourceBufferSize: 256 * 1024 * 1024 });

  // Record every image/media/font response as it arrives; the bodies are
  // fetched after the page has settled.
  const seen = new Map();
  ws.addEventListener('message', (ev) => {
    const m = JSON.parse(ev.data);
    if (m.method !== 'Network.responseReceived') return;
    const { type, response, requestId } = m.params;
    const mime = response.mimeType || '';
    // Match on the **mime type**, not only CDP's resource type. A CDN that
    // serves `foo.png?format=webp` through an image proxy is often reported as
    // `Other` or `XHR`, and filtering on type alone caught the fonts and
    // nothing else.
    const wanted =
      ['Image', 'Media', 'Font'].includes(type) ||
      /^(image|video|audio|font)\//.test(mime) ||
      mime === 'application/font-woff2';
    if (!wanted) return;
    if (response.url.startsWith('data:')) return;
    seen.set(requestId, { url: response.url, mime });
  });
  await send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  const blocked = (opt('block', '') || '').split(',').filter(Boolean);
  if (blocked.length) {
    await send('Network.setBlockedURLs', { urls: blocked.map((b) => `*${b}*`) });
  }
  await send('Page.navigate', { url });
  await sleep(WAIT);

  // Scroll the whole page so every lazy image has actually been requested.
  const h = (
    await send('Runtime.evaluate', {
      expression: 'document.documentElement.scrollHeight',
      returnByValue: true,
    })
  ).result.value;
  for (let y = 0; y < h; y += 700) {
    await send('Runtime.evaluate', { expression: `window.scrollTo(0, ${y})` });
    await sleep(140);
  }
  await sleep(2500);

  console.log('%d responses captured', seen.size);
  fs.mkdirSync(outDir, { recursive: true });
  const used = new Set();
  const manifest = [];
  let ok = 0;

  for (const [requestId, info] of seen) {
    let body;
    try {
      body = await send('Network.getResponseBody', { requestId });
    } catch {
      console.log('no body'.padEnd(44), info.url.slice(0, 90));
      continue;
    }
    const buf = body.base64Encoded
      ? Buffer.from(body.body, 'base64')
      : Buffer.from(body.body, 'utf8');
    if (buf.length < MIN) continue;
    const name = nameFor(info.url, used);
    fs.writeFileSync(path.join(outDir, name), buf);
    manifest.push({ file: name, url: info.url, bytes: buf.length, type: info.mime });
    ok++;
    console.log(name.padEnd(44), String(buf.length).padStart(9), info.mime);
  }

  fs.writeFileSync(path.join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 1));
  console.log(
    '\n%d files, %d KB',
    ok,
    Math.round(manifest.reduce((a, m) => a + m.bytes, 0) / 1024),
  );

  ws.close();
  try {
    require('child_process').execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
  } catch {}
})();
