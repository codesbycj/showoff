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
  const out = { text: [], img: [], svg: [], shell: [], grounds: [] };

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
      // A full-bleed <svg> is the page's ground, not content: several of
      // these designs paint their background as a gradient rather than a
      // flat fill, and that is the drawn equivalent of a `backgroundColor`
      // on the root, which is live in frame one on every screen here.
      // `audit.js` draws the same line for the same reason.
      if (r.width >= 391 && r.height >= 850) {
        out.grounds.push('svg ' + box);
        continue;
      }
      // An <svg> whose shapes are all staged out paints nothing - the
      // element is still in the tree but the frame is flat. Count the shapes
      // that would actually mark the page, ignoring anything inside <defs>,
      // which only defines gradients and clips.
      const marks = Array.from(
        el.querySelectorAll('path,circle,rect,ellipse,line,polygon,polyline,text,image,use'),
      ).filter((m) => !m.closest('defs'));
      if (marks.length) out.svg.push(box + ' ' + marks.length + ' marks');
      continue;
    }
    // A leaf with characters in it. The status bar is not part of the app.
    if (el.children.length === 0) {
      const t = (el.textContent || '').trim();
      if (t) out.text.push(box + ' ' + JSON.stringify(t.slice(0, 40)));
    }
    // A painted box. Full-bleed is the page's ground and is always live;
    // anything smaller is a shell the reveal left behind - a sheet, a card,
    // a disc - and it is on screen before the first step runs.
    const bg = style(el).backgroundColor;
    if (bg && bg !== 'rgba(0, 0, 0, 0)' && r.width * r.height > 200) {
      if (r.width >= 391 && r.height >= 850) out.grounds.push(bg + ' ' + box);
      else out.shell.push(bg + ' ' + box);
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
    const n =
      (v.text || []).length + (v.img || []).length + (v.svg || []).length + (v.shell || []).length;
    const grounds = [...new Set(v.grounds || [])].length;
    if (n === 0) {
      console.log(`${slug.padEnd(14)} blank  (${grounds} ground${grounds === 1 ? '' : 's'})`);
      // The shapes that are painting, for when the shot is not one flat
      // colour: a shell left live by a descent is legitimate, but it is worth
      // being able to name it rather than guess.
      if (process.env.BLANK_GROUNDS) {
        for (const g of [...new Set(v.grounds || [])]) console.log(`    GROUND ${g}`);
      }
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
    for (const x of (v.shell || []).slice(0, 8)) console.log(`    SHELL ${x}`);
  }

  ws.close();
  try {
    execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
  } catch {}
  process.exit(bad ? 1 : 0);
})();
