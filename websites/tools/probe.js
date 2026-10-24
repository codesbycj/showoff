// Measure a design: what moves at rest, what is too small to tap, what is too
// pale to read, and how tall it is.
//
//   node probe.js <url> [--before]
//
// The point of running it on BOTH designs is that it has twice caught a
// failure in my own page rather than in the before's.
const { spawn } = require('child_process');
const http = require('http');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9413;
const url = process.argv[2];
const before = process.argv.includes('--before');
const wArg = process.argv.indexOf('--w');
const W = wArg === -1 ? 1440 : +process.argv[wArg + 1];
const H = 900;

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'probe-'));
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

// NOTE: everything from here to the closing backtick is a JS *template literal*.
// A backtick in a comment inside it ends the literal, and a backslash in a
// regex is eaten by it -- so comments carry no backticks and regexes double
// their backslashes. Three separate SyntaxErrors came from forgetting this.
const PROBE = (sel) => `(() => {
  // Both designs are mounted and stacked, so an unscoped query measures the
  // hidden one too. Everything below is scoped to the visible pane.
  const ROOT = document.querySelector(${JSON.stringify(sel)}) || document;
  const lum = (c) => {
    const [r, g, b] = c.map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const parse = (s) => {
    const m = s.match(/rgba?\\(([^)]+)\\)/);
    if (!m) return null;
    const p = m[1].split(/[ ,/]+/).filter(Boolean).map(Number);
    return { rgb: p.slice(0, 3), a: p.length > 3 ? p[3] : 1 };
  };
  // Returns null when the nearest ground is a gradient or a photograph: the
  // ratio under those is a different number at every pixel and reporting one
  // is worse than reporting none. Both designs have such a block (the 2016
  // hero, my own hero), and both put a scrim behind their type.
  const bgOf = (el) => {
    let n = el;
    while (n && n !== document.documentElement) {
      const cs = getComputedStyle(n);
      if (cs.backgroundImage && cs.backgroundImage !== 'none') return null;
      const c = parse(cs.backgroundColor);
      if (c && c.a > 0.5) return c.rgb;
      n = n.parentElement;
    }
    return [255, 255, 255];
  };
  const ratio = (a, b) => {
    const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
    return (x + 0.05) / (y + 0.05);
  };

  // 1. what is moving while nobody is touching it
  const moving = [];
  ROOT.querySelectorAll('*').forEach((el) => {
    const cs = getComputedStyle(el);
    if (cs.animationName && cs.animationName !== 'none' && cs.animationPlayState === 'running') {
      moving.push({
        name: cs.animationName,
        iter: cs.animationIterationCount,
        dur: cs.animationDuration,
      });
    }
  });
  const infinite = moving.filter((m) => m.iter === 'infinite');

  // 2. interactive targets under the 44px minimum (WCAG 2.5.5)
  const small = [];
  ROOT.querySelectorAll('a,button,input,summary,[role="button"]').forEach((el) => {
    const r = el.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (Math.min(r.width, r.height) < 44) {
      small.push({
        tag: el.tagName.toLowerCase(),
        w: Math.round(r.width),
        h: Math.round(r.height),
        text: (el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 34),
      });
    }
  });

  // 3. the palest readable text
  const contrast = [];
  let overArt = 0;
  ROOT.querySelectorAll('p,span,a,li,h1,h2,h3,h4,div,button,summary,blockquote').forEach((el) => {
    const direct = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim().length > 2);
    if (!direct) return;
    const cs = getComputedStyle(el);
    if (cs.visibility === 'hidden' || +cs.opacity < 0.2) return;
    const fg = parse(cs.color);
    if (!fg || fg.a < 0.2) return;
    const bg = bgOf(el);
    if (!bg) {
      overArt++;
      return;
    }
    // Flatten a translucent foreground onto its ground before comparing.
    const flat = fg.rgb.map((v, i) => v * fg.a + bg[i] * (1 - fg.a));
    const px = parseFloat(cs.fontSize);
    const bold = +cs.fontWeight >= 700;
    const large = px >= 24 || (px >= 18.66 && bold);
    const r = ratio(flat, bg);
    contrast.push({
      r: +r.toFixed(2),
      need: large ? 3 : 4.5,
      px: Math.round(px),
      text: el.textContent.trim().slice(0, 30),
    });
  });
  const fails = contrast.filter((c) => c.r < c.need).sort((a, b) => a.r - b.r);

  // 4. how much of the page is actually text
  //
  // The question an episode about images-of-text has to answer with a number:
  // of the characters a reader sees, how many can be selected, searched,
  // translated, resized or read aloud? An image of a heading contributes none,
  // and its alt attribute -- when it has one -- is not in the page's text
  // either as far as find-in-page is concerned.
  const chars = (ROOT.innerText || '').replace(/\s+/g, ' ').trim().length;
  const imgs = Array.from(ROOT.querySelectorAll('img'));
  const textImages = imgs.filter((im) =>
    /[/](h-|p-|t-|logo|strap|banner)/.test(im.currentSrc || im.src),
  );
  const emptyHeads = Array.from(ROOT.querySelectorAll('h1,h2,h3,h4')).filter(
    (h) => !h.innerText.trim(),
  ).length;

  // 5. does it fit the viewport?
  //
  // scrollWidth of the document, not the widest element: a marquee row is
  // legitimately wider than the screen inside its own clipped, masked parent,
  // and flagging it would bury the real finding. What matters is whether the
  // *page* scrolls sideways, which is what a fixed-width layout does and what
  // a reader on a phone actually experiences.
  const overflowPx = Math.max(
    0,
    document.documentElement.scrollWidth - document.documentElement.clientWidth,
  );

  // 6. the heading outline
  const headings = {};
  ['h1', 'h2', 'h3'].forEach((t) => {
    headings[t] = ROOT.querySelectorAll(t).length;
  });

  return {
    chars,
    images: imgs.length,
    textImages: textImages.length,
    headingsWithNoText: emptyHeads,
    overflowPx,
    // The pane's own content width. The two designs are stacked inside an
    // overflow: clip container -- which exists so the hidden pane does not
    // extend the page's scroll -- and that clip also hides a fixed-width
    // layout's sideways pan, so overflowPx reads 0 for a page that does not
    // fit. This is the number that says whether it fits.
    paneContentPx: ROOT === document ? 0 : Math.round(ROOT.scrollWidth),
    viewportPx: document.documentElement.clientWidth,
    headings,
    height: ROOT === document ? document.documentElement.scrollHeight : ROOT.scrollHeight,
    animated: moving.length,
    infinite: infinite.length,
    infiniteNames: [...new Set(infinite.map((m) => m.name + ' ' + m.dur))],
    // 44px is the AAA figure (2.5.5); 24px is the AA minimum (2.5.8) and the
    // one a text link in a list actually has to clear.
    under44: small.length,
    under24: small.filter((t) => Math.min(t.w, t.h) < 24).length,
    smallest: small.sort((a, b) => Math.min(a.w, a.h) - Math.min(b.w, b.h)).slice(0, 6),
    // The entrance count, and whether it is a one-off. The before's class is
    // toggled off again on exit; the after's are unobserved once they are in.
    revealed: ROOT.querySelectorAll('.b-aos, .rise, .deal').length,
    replays: ROOT.querySelectorAll('.b-aos').length,
    textNodes: contrast.length,
    overArtwork: overArt,
    contrastFails: fails.length,
    worstContrast: fails.slice(0, 6),
    minRatio: contrast.length ? Math.min(...contrast.map((c) => c.r)) : null,
  };
})()`;

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
  const ev = (expr) =>
    send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }).then(
      (r) => r.result.value,
    );

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: W,
    height: H,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Page.navigate', { url });
  await sleep(before ? 8000 : 3000);
  if (before) {
    await ev(`document.querySelector('.b-modal-x')?.click()`);
  } else {
    await ev(
      `[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='After CJ')?.click()`,
    );
  }
  await sleep(1500);
  // Walk the whole page so every lazy entrance has fired before measuring.
  const h = await ev('document.documentElement.scrollHeight');
  for (let y = 0; y < h; y += 700) {
    await ev(`window.scrollTo(0, ${y})`);
    await sleep(120);
  }
  await ev('window.scrollTo(0, 0)');
  await sleep(1200);

  const sel = before ? '[data-pane="before"]' : '[data-pane="after"]';
  const raw = await send('Runtime.evaluate', {
    expression: PROBE(sel),
    awaitPromise: true,
    returnByValue: true,
  });
  if (raw.exceptionDetails) {
    console.error(raw.exceptionDetails.exception?.description || raw.exceptionDetails.text);
    process.exitCode = 1;
  } else {
    console.log(JSON.stringify(raw.result.value, null, 2));
  }
  ws.close();
  try {
    require('child_process').execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
  } catch {}
})();
