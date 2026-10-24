// Run a JS file against a page and print what it returns.
//
//   node tools/eval.js <url> <script.js> [--wait 5000] [--w 1440] [--block a,b]
//
// The measuring counterpart to `probe.js`: `probe.js` answers the same fixed
// questions every time, this runs a one-off. Used for things like "how wide is
// this string at each of twenty width-axis values" — which has to happen in the
// page, with the page's own fonts loaded, and is not worth a screenshot.
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9441;
const argv = process.argv.slice(2);
const url = argv[0];
const file = argv[1];
const opt = (n, d) => {
  const i = argv.indexOf('--' + n);
  return i === -1 ? d : argv[i + 1];
};
const W = +opt('w', 1440);
const WAIT = +opt('wait', 5000);

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'eval-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--hide-scrollbars',
  '--no-first-run',
  '--disable-gpu',
  `--window-size=${W},900`,
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
  await send('Emulation.setDeviceMetricsOverride', {
    width: W,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  });
  const blocked = (opt('block', '') || '').split(',').filter(Boolean);
  if (blocked.length) {
    await send('Network.enable');
    await send('Network.setBlockedURLs', { urls: blocked.map((b) => `*${b}*`) });
  }
  await send('Page.navigate', { url });
  await sleep(WAIT);

  const r = await send('Runtime.evaluate', {
    expression: fs.readFileSync(file, 'utf8'),
    awaitPromise: true,
    returnByValue: true,
  });
  if (r.exceptionDetails) {
    console.error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    process.exitCode = 1;
  } else {
    const v = r.result.value;
    console.log(typeof v === 'string' ? v : JSON.stringify(v, null, 1));
  }

  ws.close();
  try {
    require('child_process').execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
  } catch {}
})();
