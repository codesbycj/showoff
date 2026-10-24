// Photograph every hover on a page, as a contact sheet of before/after crops.
//
//   node hovers.js <url> <out.png> <spec.json>
//
// spec.json: [{ "name": "...", "sel": "css", "pad": 24 }, ...]
//
// Rule 5 of the series: a transition is evidence of a hover, and the only way
// to know a hover is right is to look at it. A real pointer is dispatched via
// Input.dispatchMouseEvent, because :hover does not respond to anything else.
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9412;
const [, , url, out, specPath] = process.argv;
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const W = 1440;
const H = 900;

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'hovers-'));
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
  for (let i = 0; i < 60 && !target; i++) {
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
  const ev = (expr) =>
    send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }).then(
      (r) => r.result.value,
    );

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: W,
    height: H,
    deviceScaleFactor: 2,
    mobile: false,
  });
  await send('Page.navigate', { url });
  await sleep(3000);
  if (!process.argv.includes('--before')) {
    await ev(
      `[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='After CJ')?.click()`,
    );
  } else {
    // Episode 6's before put a newsletter modal up at 6s, which arrived over
    // every crop. Harmless where there is no modal.
    await sleep(4200);
    await ev(`document.querySelector('.b-modal-x')?.click()`);
  }
  await sleep(1200);
  // Resolve every entrance so nothing is mid-transition when a crop is taken.
  await ev(
    `document.querySelectorAll('.rise,.deal').forEach(e=>e.classList.add('is-in'));document.querySelectorAll('.b-aos').forEach(e=>e.classList.add('b-in'))`,
  );
  await sleep(900);

  const shots = [];
  for (const item of spec) {
    /*
     * A "pre" field runs one expression before the element is measured. It is
     * here for chrome that cannot be photographed as it stands, and episode
     * 10's header needed all three of the things it does:
     *
     *   * `scroll-behavior: smooth` makes `window.scrollTo` animate, so a
     *     scroll and a measurement in the same breath measures the old
     *     position. Set `scrollBehavior = 'auto'` first.
     *   * `position: fixed` cannot be clipped. captureBeyondViewport renders
     *     the page at the clip's offset, where a fixed element is not, and
     *     turning captureBeyondViewport *off* returns a blank white surface
     *     under a device-metrics override. Make it `absolute` instead.
     *   * `backdrop-filter` is not painted into a beyond-viewport capture at
     *     all -- not the blur and not the element's own background -- so a
     *     frosted bar comes back invisible over whatever is behind it. Clear
     *     the filter and give it a flat fill for the shot.
     */
    if (item.pre) {
      await ev(item.pre);
      await sleep(400);
    }
    const box = await ev(`(() => {
      const el = document.querySelector(${JSON.stringify(item.sel)});
      if (!el) return null;
      // A "scroll" field instead of centring the element: a fixed header does not
      // respond to scrollIntoView, and a header that only drops in once you
      // have left the hero is off the top of the screen until the page has
      // been scrolled, so the crop comes back as a band of hero.
      ${item.scroll != null ? `window.scrollTo(0, ${+item.scroll});` : `el.scrollIntoView({ block: 'center', behavior: 'instant' });`}
      return null;
    })()`);
    void box;
    await sleep(450);
    const rect = await ev(`(() => {
      const el = document.querySelector(${JSON.stringify(item.sel)});
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { x: r.left, y: r.top, w: r.width, h: r.height };
    })()`);
    if (!rect) {
      console.log('MISS  ' + item.name + '  ' + item.sel);
      continue;
    }
    const pad = item.pad ?? 18;
    const scrollY = await ev('window.scrollY');
    const clip = {
      x: Math.max(0, rect.x - pad),
      y: Math.max(0, scrollY + rect.y - pad),
      width: Math.min(W, rect.w + pad * 2),
      height: rect.h + pad * 2,
      scale: 1,
    };

    // Pointer away, then the resting state.
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: 2, y: 2, buttons: 0 });
    await sleep(500);
    const rest = await send('Page.captureScreenshot', {
      format: 'png',
      clip,
      captureBeyondViewport: true,
    });

    await send('Input.dispatchMouseEvent', {
      type: 'mouseMoved',
      x: rect.x + rect.w / 2,
      y: rect.y + rect.h / 2,
      buttons: 0,
    });
    await sleep(750);
    // `"press": true` photographs the pressed state instead of the hovered
    // one. Episode 10's reference lightens its only button on `active:` and
    // has no hover rule on it at all, which a pointer-move capture cannot
    // show -- it comes back identical to the rest shot and reads as a bug in
    // the build rather than as the reference's own decision.
    if (item.press) {
      await send('Input.dispatchMouseEvent', {
        type: 'mousePressed',
        x: rect.x + rect.w / 2,
        y: rect.y + rect.h / 2,
        button: 'left',
        buttons: 1,
        clickCount: 1,
      });
      await sleep(260);
    }
    const hov = await send('Page.captureScreenshot', {
      format: 'png',
      clip,
      captureBeyondViewport: true,
    });
    if (item.press) {
      await send('Input.dispatchMouseEvent', {
        type: 'mouseReleased',
        x: rect.x + rect.w / 2,
        y: rect.y + rect.h / 2,
        button: 'left',
        buttons: 0,
        clickCount: 1,
      });
    }

    fs.writeFileSync(`${out}-${item.name}-rest.png`, Buffer.from(rest.data, 'base64'));
    fs.writeFileSync(`${out}-${item.name}-hover.png`, Buffer.from(hov.data, 'base64'));
    shots.push(item.name);
    console.log('ok    ' + item.name);
  }

  console.log('\n' + shots.length + ' pairs');
  ws.close();
  try {
    require('child_process').execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
  } catch {}
})();
