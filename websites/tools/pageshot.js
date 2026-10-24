// Shoot a desktop page over CDP, in bands, with optional interaction first.
//
//   node pageshot.js <url> <outPrefix> [--w 1440] [--h 900] [--band 2200]
//                    [--bands 6] [--click <sel>] [--hover <sel>] [--wait ms]
//                    [--reduced] [--eval "<js>"] [--full]
//
// Bands rather than one captureBeyondViewport pass: a 9,000px page captured in
// one go re-triggers every IntersectionObserver entrance at once and the shot
// comes back mid-animation. Scrolling and shooting the viewport is what the
// reader actually sees.
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9411;

const argv = process.argv.slice(2);
const url = argv[0];
const out = argv[1];
const opt = (name, dflt) => {
  const i = argv.indexOf('--' + name);
  return i === -1 ? dflt : argv[i + 1];
};
const flag = (name) => argv.includes('--' + name);

const W = +opt('w', 1440);
const H = +opt('h', 900);
const BANDS = +opt('bands', 6);
const WAIT = +opt('wait', 1800);

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'pageshot-'));
const chrome = spawn(CHROME, [
  '--headless=new',
  `--remote-debugging-port=${PORT}`,
  `--user-data-dir=${profile}`,
  '--hide-scrollbars',
  '--no-first-run',
  '--disable-gpu',
  `--window-size=${W},${H}`,
  'about:blank',
]);
chrome.on('error', (e) => { console.error('chrome:', e.message); process.exit(1); });

const getJSON = (p) =>
  new Promise((res, rej) => {
    http.get({ host: '127.0.0.1', port: PORT, path: p }, (r) => {
      let d = '';
      r.on('data', (c) => (d += c));
      r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
    }).on('error', rej);
  });

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  let target = null;
  for (let i = 0; i < 60 && !target; i++) {
    try {
      const list = await getJSON('/json/list');
      target = list.find((t) => t.type === 'page');
    } catch { await sleep(250); }
  }
  if (!target) { console.error('no target'); process.exit(1); }

  // Node's built-in WebSocket (22+). No `ws` dependency to install next to a
  // temp script.
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));

  let id = 0;
  const pending = new Map();
  ws.addEventListener('message', (ev) => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { res, rej } = pending.get(msg.id);
      pending.delete(msg.id);
      msg.error ? rej(new Error(JSON.stringify(msg.error))) : res(msg.result);
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

  /*
   * Block the bolted-on third-party apps at the network layer rather than deleting
   * their elements afterwards.
   *
   * A Klaviyo popup, a Gorgias chat bubble, a cookie bar and an accessibility widget are
   * Shopify apps, not the reference's design, and every one of them sits over the page
   * in a capture. Removing them from the DOM does not work: they are on timers and come
   * back between the eval and the first band, and a sweeper on an interval is a race
   * that is sometimes lost. Not loading them cannot be lost.
   */
  const blocked = (opt('block', '') || '').split(',').filter(Boolean);
  if (blocked.length) {
    await send('Network.enable');
    await send('Network.setBlockedURLs', { urls: blocked.flatMap((b) => [`*${b}*`]) });
  }
  await send('Emulation.setDeviceMetricsOverride', {
    width: W, height: H, deviceScaleFactor: 1, mobile: false,
  });
  if (flag('reduced')) {
    await send('Emulation.setEmulatedMedia', {
      features: [{ name: 'prefers-reduced-motion', value: 'reduce' }],
    });
  }

  await send('Page.navigate', { url });
  await sleep(WAIT);

  const evaluate = (expr) => send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true });

  if (opt('click')) {
    await evaluate(`document.querySelector(${JSON.stringify(opt('click'))})?.click()`);
    await sleep(900);
  }
  if (opt('eval')) {
    await evaluate(opt('eval'));
    await sleep(600);
  }

  if (opt('hover')) {
    const box = (await evaluate(`(() => {
      const el = document.querySelector(${JSON.stringify(opt('hover'))});
      if (!el) return null;
      el.scrollIntoView({ block: 'center' });
      const r = el.getBoundingClientRect();
      return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
    })()`)).result.value;
    if (!box) { console.error('hover target not found'); }
    else {
      await sleep(500);
      await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: box.x, y: box.y, buttons: 0 });
      await sleep(700);
      const shot = await send('Page.captureScreenshot', { format: 'png' });
      fs.writeFileSync(`${out}.png`, Buffer.from(shot.data, 'base64'));
      console.log(`${out}.png (hover)`);
      ws.close(); kill(); return;
    }
  }

  const height = (await evaluate('document.documentElement.scrollHeight')).result.value;
  console.log('page height', height);

  for (let i = 0; i < BANDS; i++) {
    const y = Math.min(i * H, Math.max(0, height - H));
    await evaluate(`window.scrollTo(0, ${y})`);
    await sleep(+opt('settle', 2600));
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${out}-${String(i).padStart(2, '0')}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`${out}-${String(i).padStart(2, '0')}.png  y=${y}`);
    if (y >= height - H) break;
  }

  ws.close();
  kill();
})();

function kill() {
  try { require('child_process').execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' }); } catch {}
}
