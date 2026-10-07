// Screenshot an expo web export at exact iPhone 14/15 Pro metrics (393x852 @3x)
// so output is directly comparable to the Mobbin reference screenshots.
//
// SHOOT_DELAY_MS shortens or lengthens the settle wait. A splash that advances
// itself has to be caught before it navigates; a screen with photography in it
// wants longer.
const { spawn } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');
const fs = require('fs');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
// SHOOT_HEIGHT stretches the emulated viewport without dropping to 1x.
// A React Native ScrollView is an `overflow: auto` div on web, so a full-page
// capture sees only the first 852dp of a screen that scrolls — `captureBeyond
// Viewport` grows the *document*, and the document is not what is tall. Giving
// Chrome a 1400dp phone instead renders the whole screen in one pass, at the
// same 3x, and the reference exports are full-page renders of exactly that.
const [, , url, outFile, fullHeightArg, wArg, hArg] = process.argv;
const W = +(wArg||393), H = +(process.env.SHOOT_HEIGHT || hArg || 852), DSF = wArg ? 1 : 3;
const PORT = 9334;
const SETTLE_MS = +(process.env.SHOOT_DELAY_MS || 4000);
// Safe-area insets to report to the page, "top,right,bottom,left". Chrome has
// no notch, so react-native-safe-area-context measures zero on web and every
// inset-anchored element lands 59dp off the reference. Default to the iPhone
// 14 Pro the references were captured on; SHOOT_INSETS=0,0,0,0 opts out.
const INSETS = (process.env.SHOOT_INSETS || '59,0,34,0').split(',').map(Number);

const chrome = spawn(CHROME, [
  '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
  `--remote-debugging-port=${PORT}`, '--user-data-dir=' + path.join(os.tmpdir(), 'showoff-chrome'),
  'about:blank',
], { stdio: 'ignore' });

const get = (p) => new Promise((res, rej) => {
  http.get({ host: '127.0.0.1', port: PORT, path: p }, r => {
    let d = ''; r.on('data', c => d += c); r.on('end', () => res(JSON.parse(d)));
  }).on('error', rej);
});

(async () => {
  let page;
  for (let i = 0; i < 60; i++) {
    try {
      const t = await get('/json/list');
      page = t.find(x => x.type === 'page' && x.webSocketDebuggerUrl);
      if (page) break;
    } catch {}
    await new Promise(r => setTimeout(r, 500));
  }
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  let id = 0;
  const send = (method, params = {}) => new Promise(res => {
    const myId = ++id;
    const onMsg = (e) => {
      const m = JSON.parse(e.data);
      if (m.id === myId) { ws.removeEventListener('message', onMsg); res(m.result); }
    };
    ws.addEventListener('message', onMsg);
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
  await new Promise(r => ws.addEventListener('open', r));
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: W, height: H, deviceScaleFactor: DSF, mobile: true,
  });
  // The library probes insets by reading the computed padding of a hidden div
  // whose inline padding is env(safe-area-inset-*). Answer that one query with
  // the reference device's numbers, before any app code runs.
  if (INSETS.some((v) => v)) {
    const [t, r, b, l] = INSETS;
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source: `(() => {
        const real = window.getComputedStyle.bind(window);
        const fake = { paddingTop: '${t}px', paddingRight: '${r}px',
                       paddingBottom: '${b}px', paddingLeft: '${l}px' };
        window.getComputedStyle = function (el, pe) {
          const cs = real(el, pe);
          if (el && el.style && String(el.style.paddingTop).includes('safe-area-inset')) {
            return new Proxy(cs, {
              get(target, key) {
                if (key in fake) return fake[key];
                const v = Reflect.get(target, key);
                return typeof v === 'function' ? v.bind(target) : v;
              },
            });
          }
          return cs;
        };
      })();`,
    });
  }

  await send('Page.navigate', { url });
  await new Promise(r => setTimeout(r, SETTLE_MS));

  let clip = { x: 0, y: 0, width: W, height: H, scale: 1 };
  if (fullHeightArg === 'full') {
    const m = await send('Page.getLayoutMetrics');
    clip.height = Math.ceil(m.cssContentSize.height);
  }
  const shot = await send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true });
  fs.writeFileSync(outFile, Buffer.from(shot.data, 'base64'));
  const b = fs.readFileSync(outFile);
  console.log(outFile, b.readUInt32BE(16) + 'x' + b.readUInt32BE(20));
  ws.close();
  try { require('child_process').execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' }); } catch {}
  process.exit(0);
})();
