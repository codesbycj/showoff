// Shared CDP plumbing for the dashboards harness.
//
// Every script in this directory drives headless Chrome over the DevTools
// protocol directly. There is no Puppeteer dependency and nothing to install,
// because Node 22's built-in `WebSocket` is enough.
//
// Three things in here exist because of a trap rather than a preference:
//
//  - `evaluateFile` injects a page script read from disk rather than built as a
//    template literal. The websites harness measures through one long template
//    literal and lost a debugging round three times to it: a backtick in a
//    comment inside the literal ends it, and a backslash in a regex is eaten by
//    it (`\s` becomes `s`). A file on disk has neither problem.
//  - `shoot` warms up by default. The first capture after a cold Vite server is
//    pre-hydration: blank image boxes, un-run effects, the chart not drawn yet.
//    So the first shot is taken and thrown away unless `--fast` is passed.
//  - `wheel` scrolls whatever is under the pointer, which is how an inner scroll
//    region is scrolled. A dashboard is a fixed shell; `window.scrollTo` does
//    nothing in one.
const { spawn, execSync } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = process.env.CHROME || 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = +(process.env.CDP_PORT || 9413);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Minimal argv reader: `opt('w', 1440)` and `flag('reduced')`. */
function argv(list = process.argv.slice(2)) {
  return {
    rest: list.filter((a) => !a.startsWith('--')),
    opt: (name, dflt) => {
      const i = list.indexOf('--' + name);
      return i === -1 ? dflt : list[i + 1];
    },
    num: (name, dflt) => {
      const i = list.indexOf('--' + name);
      return i === -1 ? dflt : +list[i + 1];
    },
    flag: (name) => list.includes('--' + name),
  };
}

const getJSON = (p, port) =>
  new Promise((res, rej) => {
    http
      .get({ host: '127.0.0.1', port, path: p }, (r) => {
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

const KEYS = {
  Enter: { code: 'Enter', key: 'Enter', vk: 13, text: '\r' },
  Tab: { code: 'Tab', key: 'Tab', vk: 9 },
  Escape: { code: 'Escape', key: 'Escape', vk: 27 },
  Backspace: { code: 'Backspace', key: 'Backspace', vk: 8 },
  ArrowDown: { code: 'ArrowDown', key: 'ArrowDown', vk: 40 },
  ArrowUp: { code: 'ArrowUp', key: 'ArrowUp', vk: 38 },
  ArrowLeft: { code: 'ArrowLeft', key: 'ArrowLeft', vk: 37 },
  ArrowRight: { code: 'ArrowRight', key: 'ArrowRight', vk: 39 },
  Space: { code: 'Space', key: ' ', vk: 32, text: ' ' },
};

/**
 * Launch Chrome and return a session.
 *
 * @param {object} o
 * @param {number} o.w        viewport width  (default 1440)
 * @param {number} o.h        viewport height (default 900)
 * @param {number} o.dpr      deviceScaleFactor (default 1; 2 for a retina shot)
 * @param {boolean} o.reduced emulate prefers-reduced-motion: reduce
 * @param {string} o.scheme   'light' | 'dark' — emulate prefers-color-scheme
 * @param {boolean} o.fast    skip the warm-up capture
 */
async function launch(o = {}) {
  const W = o.w || 1440;
  const H = o.h || 900;
  const port = o.port || PORT;
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dashshot-'));

  const chrome = spawn(CHROME, [
    '--headless=new',
    `--remote-debugging-port=${port}`,
    `--user-data-dir=${profile}`,
    '--hide-scrollbars',
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-gpu',
    '--force-device-scale-factor=1',
    `--window-size=${W},${H}`,
    'about:blank',
  ]);
  chrome.on('error', (e) => {
    console.error('chrome:', e.message, '\nSet CHROME=<path to chrome.exe> if it is elsewhere.');
    process.exit(1);
  });

  let target = null;
  for (let i = 0; i < 80 && !target; i++) {
    try {
      target = (await getJSON('/json/list', port)).find((t) => t.type === 'page');
    } catch {
      await sleep(250);
    }
  }
  if (!target) {
    console.error('no CDP target after 20s');
    process.exit(1);
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

  await send('Page.enable');
  await send('Runtime.enable');
  await send('DOM.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: W,
    height: H,
    deviceScaleFactor: o.dpr || 1,
    mobile: false,
  });

  const media = [];
  if (o.reduced) media.push({ name: 'prefers-reduced-motion', value: 'reduce' });
  if (o.scheme) media.push({ name: 'prefers-color-scheme', value: o.scheme });
  if (media.length) await send('Emulation.setEmulatedMedia', { features: media });

  const unwrap = (r) => {
    if (r.exceptionDetails) {
      const e = r.exceptionDetails;
      throw new Error(
        'page threw: ' + (e.exception?.description || e.text) + ' @' + (e.lineNumber ?? '?'),
      );
    }
    return r.result?.value;
  };

  /** Evaluate an expression in the page and return its value. */
  const evaluate = (expression) =>
    send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }).then(unwrap);

  /**
   * Run a page script from disk. The file's contents are a function *body*
   * which returns a value; it receives one argument, `input`.
   *
   *   // probe.page.js
   *   const w = input.width; ... ; return { w };
   */
  const evaluateFile = (file, input = {}) => {
    const body = fs.readFileSync(file, 'utf8');
    const wrapped = '(function(input){\n' + body + '\n})(' + JSON.stringify(input) + ')';
    return send('Runtime.evaluate', {
      expression: wrapped,
      awaitPromise: true,
      returnByValue: true,
    }).then(unwrap);
  };

  const goto = async (url, wait = 2200) => {
    await send('Page.navigate', { url });
    await sleep(wait);
    // A dashboard is a fixed shell, but smooth scrolling still breaks any
    // measure-after-scroll: `scrollTo` animates and the rect read in the same
    // breath is the old one.
    await evaluate("document.documentElement.style.scrollBehavior = 'auto'");
  };

  /**
   * A point on the element that the pointer will actually land on, plus its box.
   *
   * Not simply the centre of the bounding box. **A donut segment's bounding box
   * is centred in the hole**, so hovering "the middle of the slice" hovers the
   * card behind it and the beat reports that the chart does nothing -- which is
   * how this was found. The same is true of an L-shaped region, a thin diagonal
   * stroke and anything with a sibling painted over its middle.
   *
   * So: try the centre, and if `elementFromPoint` there is not the element or
   * something inside it, scan a grid within the box for a point that is. Only
   * if nothing in the box hits does it fall back to the centre, so a genuinely
   * covered element still reports its position rather than null.
   */
  const boxOf = (sel) =>
    evaluateFile(path.join(__dirname, 'hitpoint.page.js'), { sel });

  const pointer = (x, y) =>
    send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, buttons: 0 });

  /** Park the pointer where nothing can be hovered. */
  const parkPointer = () => pointer(2, H - 2);

  const hover = async (sel) => {
    const b = await boxOf(sel);
    if (!b) return null;
    await pointer(b.x, b.y);
    return b;
  };

  const clickAt = async (x, y) => {
    await pointer(x, y);
    await send('Input.dispatchMouseEvent', {
      type: 'mousePressed',
      x,
      y,
      button: 'left',
      buttons: 1,
      clickCount: 1,
    });
    await send('Input.dispatchMouseEvent', {
      type: 'mouseReleased',
      x,
      y,
      button: 'left',
      buttons: 0,
      clickCount: 1,
    });
  };

  /**
   * A real click, dispatched as pointer events rather than `el.click()`.
   *
   * `el.click()` fires a click with no pointer history, so anything that arms
   * itself on pointerdown, anything that closes on an outside pointerdown, and
   * every `:active` style is skipped — and a tooltip that only exists while the
   * pointer is over the mark never appears.
   */
  const click = async (sel) => {
    const b = await boxOf(sel);
    if (!b) return null;
    await clickAt(b.x, b.y);
    return b;
  };

  /** Scroll the thing under the pointer. This is how an inner region scrolls. */
  const wheel = async (sel, deltaY) => {
    const b = sel ? await boxOf(sel) : { x: W / 2, y: H / 2 };
    if (!b) return null;
    await pointer(b.x, b.y);
    await send('Input.dispatchMouseEvent', {
      type: 'mouseWheel',
      x: b.x,
      y: b.y,
      deltaX: 0,
      deltaY,
      buttons: 0,
    });
    return b;
  };

  const key = async (name) => {
    const k = KEYS[name];
    if (!k) throw new Error('unknown key ' + name + '; add it to KEYS in cdp.js');
    const base = { key: k.key, code: k.code, windowsVirtualKeyCode: k.vk, nativeVirtualKeyCode: k.vk };
    await send('Input.dispatchKeyEvent', { type: k.text ? 'keyDown' : 'rawKeyDown', ...base, text: k.text });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', ...base });
  };

  /** Focus an input and type into it, as real input events React will see. */
  const fill = async (sel, text) => {
    const b = await click(sel);
    if (!b) return null;
    await evaluate('document.querySelector(' + JSON.stringify(sel) + ').select?.()');
    await send('Input.insertText', { text });
    return b;
  };

  let warmed = !!o.fast;
  /**
   * Capture the viewport (or a clip, in viewport coordinates) to a PNG.
   * Returns the raw buffer as well as writing it, so callers can diff.
   */
  const shoot = async (outPath, clip) => {
    if (!warmed) {
      await send('Page.captureScreenshot', { format: 'png' });
      warmed = true;
      await sleep(400);
    }
    const params = { format: 'png', captureBeyondViewport: false };
    if (clip) params.clip = { ...clip, scale: 1 };
    const shot = await send('Page.captureScreenshot', params);
    const buf = Buffer.from(shot.data, 'base64');
    if (outPath) {
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, buf);
    }
    return buf;
  };

  const close = () => {
    try {
      ws.close();
    } catch {}
    try {
      execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
    } catch {
      try {
        chrome.kill('SIGKILL');
      } catch {}
    }
    try {
      fs.rmSync(profile, { recursive: true, force: true });
    } catch {}
  };

  return {
    W,
    H,
    send,
    evaluate,
    evaluateFile,
    goto,
    boxOf,
    pointer,
    parkPointer,
    hover,
    click,
    clickAt,
    wheel,
    key,
    fill,
    shoot,
    close,
    sleep,
  };
}

module.exports = { launch, argv, sleep, CHROME };
