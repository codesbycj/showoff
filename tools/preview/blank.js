#!/usr/bin/env node
// Measure a showcase's blank state: what, if anything, is still on screen
// before the first step runs.
//
//   node tools/preview/blank.js <slug> [<slug> ...]
//
// The done-gate asks for a screenshot of every blank state because it is the
// first frame of every recording and nothing else checks it renders. A
// screenshot answers "does it render" and nothing else, and that is the weaker
// half of the question: what matters is that no *content* is live. A staged
// block that failed to wrap leaves one element painted, and one glyph on a
// flat ground is invisible at thumbnail size — which is how it ships.
//
// Counting colours was the first attempt and it is the wrong measure. A sheet
// or a card shell left live by a descent is *meant* to be there: the shape
// appears, then it fills, which is what a speed-build looks like. Its rounded
// corners alone put a few hundred antialiased colours in the frame. So this
// asks the DOM instead, and reports only the three things that are never
// legitimately in a blank frame:
//
//   TEXT   a leaf element with visible characters
//   IMG    a photograph
//   SVG    a drawn glyph or mark
//
// Anything it lists is a staging bug. A flat ground of one or two fills, with
// none of the above, is a correct blank state however many colours it has.
const { spawn, execSync } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.error('usage: blank.js <slug> [<slug> ...]');
  process.exit(2);
}
const EXPO_PORT = process.env.EXPO_PORT || 8082;
const PORT = 9343;
const W = 393;
const H = 852;
const SETTLE_MS = +(process.env.AUDIT_DELAY_MS || 3500);
const INSETS = (process.env.SHOOT_INSETS || '59,0,34,0').split(',').map(Number);

function probe() {
  const style = (el) => window.getComputedStyle(el);
  const out = { text: [], img: [], svg: [], grounds: [] };

  const shown = (el) => {
    const s = style(el);
    if (s.display === 'none' || s.visibility === 'hidden') return false;
    if (parseFloat(s.opacity) === 0) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0.5 && r.height > 0.5 && r.bottom > 0 && r.top < 852;
  };

  for (const el of Array.from(document.querySelectorAll('body *'))) {
    if (!shown(el)) continue;
    const tag = el.tagName.toLowerCase();
    const r = el.getBoundingClientRect();
    const box = [r.left, r.top, r.width, r.height].map(Math.round).join(',');

    if (tag === 'img') {
      out.img.push(box + ' ' + (el.getAttribute('src') || '').split('/').pop());
      continue;
    }
    if (tag === 'svg') {
      out.svg.push(box);
      continue;
    }
    // A leaf with characters in it. The status bar is not part of the app.
    if (el.children.length === 0) {
      const t = (el.textContent || '').trim();
      if (t) out.text.push(box + ' ' + JSON.stringify(t.slice(0, 40)));
    }
    // What is painting the ground, for the report line only.
    const bg = style(el).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && r.width * r.height > 393 * 852 * 0.08) {
      out.grounds.push(bg + ' ' + box);
    }
  }
  return out;
}

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

const chrome = spawn(
  CHROME,
  [
    '--headless=new',
    '--no-sandbox',
    '--disable-gpu',
    '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`,
    '--user-data-dir=' + path.join(os.tmpdir(), 'showoff-chrome-blank'),
    'about:blank',
  ],
  { stdio: 'ignore' },
);

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
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: W,
    height: H,
    deviceScaleFactor: 1,
    mobile: true,
  });
  const [t, r, b, l] = INSETS;
  await send('Page.addScriptToEvaluateOnNewDocument', {
    source:
      '(() => {const real = window.getComputedStyle.bind(window);' +
      `const fake = { paddingTop: '${t}px', paddingRight: '${r}px', paddingBottom: '${b}px', paddingLeft: '${l}px' };` +
      'window.getComputedStyle = function (el, pe) { const cs = real(el, pe);' +
      "if (el && el.style && String(el.style.paddingTop).includes('safe-area-inset')) {" +
      'return new Proxy(cs, { get(target, key) { if (key in fake) return fake[key];' +
      "const v = Reflect.get(target, key); return typeof v === 'function' ? v.bind(target) : v; } });" +
      '} return cs; };})();',
  });

  const call = '(' + probe.toString() + ')()';
  let bad = 0;

  // A dead dev server renders Chrome's own error page, whose eight lines of
  // text this probe would dutifully report as live content on every slug.
  // Check once, up front, rather than printing 29 wrong answers.
  await new Promise((res, rej) => {
    http
      .get({ host: 'localhost', port: EXPO_PORT, path: '/' }, res)
      .on('error', () => {
        console.error(`no dev server on :${EXPO_PORT} — start one with \`npx expo start --web\``);
        try {
          execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
        } catch {}
        process.exit(2);
      });
  });

  for (const slug of slugs) {
    await send('Page.navigate', { url: `http://localhost:${EXPO_PORT}/${slug}` });
    await new Promise((x) => setTimeout(x, SETTLE_MS));
    // The first read after a navigate can be pre-hydration, which reads as an
    // empty screen and would pass every check here for the wrong reason.
    await send('Runtime.evaluate', { expression: call, returnByValue: true });
    await new Promise((x) => setTimeout(x, 900));
    const res = await send('Runtime.evaluate', { expression: call, returnByValue: true });
    const v = (res && res.result && res.result.value) || {};
    const n = (v.text || []).length + (v.img || []).length + (v.svg || []).length;
    const grounds = [...new Set(v.grounds || [])].length;
    if (n === 0) {
      console.log(`${slug.padEnd(14)} blank  (${grounds} ground${grounds === 1 ? '' : 's'})`);
      continue;
    }
    bad += 1;
    console.log(
      `${slug.padEnd(14)} LIVE   ${(v.text || []).length} text, ${(v.img || []).length} img, ${
        (v.svg || []).length
      } svg`,
    );
    for (const x of (v.text || []).slice(0, 6)) console.log(`    TEXT  ${x}`);
    for (const x of (v.img || []).slice(0, 6)) console.log(`    IMG   ${x}`);
    for (const x of (v.svg || []).slice(0, 6)) console.log(`    SVG   ${x}`);
  }

  ws.close();
  try {
    execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
  } catch {}
  process.exit(bad ? 1 : 0);
})();
