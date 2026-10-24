// Survey a reference page once, offline-ably.
//
//   node tools/dump.js https://reference.example/ ./out [--w 1440] [--h 900]
//
// Writes into ./out:
//   dom.json        every painted element: box, text, and the computed styles that
//                   decide how it looks
//   styles.css      every stylesheet the page loaded, concatenated, with its URL
//   inline.js       every inline <script> block, with an index
//   page.html       the served HTML
//   fonts.json      every @font-face the page resolved, and what actually rendered
//   images.json     every image the page paints, from the DOM rather than the markup
//
// Rule 4: do this before watching anything play. One browser round trip, and then every
// subsequent question — "what is the gap between those two sections", "what weight is
// that label", "is that a background-image or an <img>" — is answered from a file in
// milliseconds. Going back to the browser per question is what makes a survey take a day.
const { spawn } = require('child_process');
const http = require('http');
const https = require('https');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const PORT = 9421;

const argv = process.argv.slice(2);
const url = argv[0];
const outDir = argv[1] || './out';
const opt = (n, d) => {
  const i = argv.indexOf('--' + n);
  return i === -1 ? d : argv[i + 1];
};
const W = +opt('w', 1440);
const H = +opt('h', 900);
const WAIT = +opt('wait', 6000);

// The computed properties worth recording. Everything that decides a box's size, its
// place, its type, its colour, its corner, its shadow and its motion -- and nothing
// else, because a full computed style is ~340 properties and the file becomes unusable.
const PROPS = [
  'display','position','zIndex','overflow','boxSizing',
  'width','height','minWidth','maxWidth','minHeight','maxHeight',
  'marginTop','marginRight','marginBottom','marginLeft',
  'paddingTop','paddingRight','paddingBottom','paddingLeft',
  'flexDirection','flexWrap','justifyContent','alignItems','alignSelf','gap','order','flex',
  'gridTemplateColumns','gridTemplateRows','gridColumn','gridRow',
  'fontFamily','fontSize','fontWeight','fontStyle','lineHeight','letterSpacing',
  'textTransform','textAlign','textDecorationLine','whiteSpace','fontVariationSettings',
  'color','backgroundColor','backgroundImage','backgroundSize','backgroundPosition','backgroundRepeat',
  'borderTopWidth','borderRightWidth','borderBottomWidth','borderLeftWidth',
  'borderTopColor','borderStyle','borderRadius',
  'boxShadow','opacity','transform','transformOrigin','filter','mixBlendMode',
  'transitionProperty','transitionDuration','transitionTimingFunction','transitionDelay',
  'animationName','animationDuration','animationTimingFunction','animationIterationCount',
  'objectFit','objectPosition','aspectRatio','cursor','clipPath','maskImage',
];

const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'dump-'));
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
chrome.on('error', (e) => {
  console.error('chrome:', e.message);
  process.exit(1);
});

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

const fetchText = (u) =>
  new Promise((res) => {
    const lib = u.startsWith('https') ? https : http;
    lib
      .get(u, { headers: { 'user-agent': 'Mozilla/5.0 Chrome/131.0.0.0 Safari/537.36' } }, (r) => {
        if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
          return res(fetchText(new URL(r.headers.location, u).href));
        }
        let d = '';
        r.on('data', (c) => (d += c));
        r.on('end', () => res(d));
      })
      .on('error', () => res(''));
  });

// NOTE: the page-side blocks below are template literals. A backtick in a comment ends
// the literal and a backslash in a regex is eaten by it -- so comments here carry no
// backticks and regexes double their backslashes.
const DOM = `(() => {
  const PROPS = ${JSON.stringify(PROPS)};
  const out = [];
  const walk = (el, depth, pathStr) => {
    const r = el.getBoundingClientRect();
    const cs = getComputedStyle(el);
    // Skip what never paints. A 0x0 element with no background is layout plumbing.
    const paints = r.width > 0 && r.height > 0 && cs.display !== 'none' && cs.visibility !== 'hidden';
    if (paints) {
      const style = {};
      PROPS.forEach((p) => {
        const v = cs[p];
        if (v && v !== 'none' && v !== 'normal' && v !== 'auto' && v !== '0px' && v !== 'rgba(0, 0, 0, 0)') {
          style[p] = v;
        }
      });
      const ownText = [...el.childNodes]
        .filter((n) => n.nodeType === 3)
        .map((n) => n.textContent.replace(/\\s+/g, ' ').trim())
        .filter(Boolean)
        .join(' ');
      out.push({
        i: out.length,
        depth,
        path: pathStr,
        tag: el.tagName.toLowerCase(),
        id: el.id || undefined,
        cls: el.className && typeof el.className === 'string' ? el.className : undefined,
        box: {
          x: Math.round(r.left + window.scrollX),
          y: Math.round(r.top + window.scrollY),
          w: Math.round(r.width),
          h: Math.round(r.height),
        },
        text: ownText || undefined,
        src: el.currentSrc || el.getAttribute('src') || undefined,
        srcset: el.getAttribute('srcset') || undefined,
        href: el.tagName === 'A' ? el.getAttribute('href') : undefined,
        alt: el.getAttribute('alt') || undefined,
        d: el.tagName.toLowerCase() === 'path' ? el.getAttribute('d') : undefined,
        style,
      });
    }
    let n = 0;
    for (const child of el.children) {
      walk(child, depth + 1, pathStr + '>' + child.tagName.toLowerCase() + ':' + n);
      n++;
    }
  };
  walk(document.body, 0, 'body');
  return out;
})()`;

const SHEETS = `(() => {
  return [...document.styleSheets].map((s) => {
    let text = null;
    try {
      text = [...s.cssRules].map((r) => r.cssText).join('\\n');
    } catch (e) {
      text = null;
    }
    return { href: s.href, inline: !s.href, text };
  });
})()`;

const IMAGES = `(() => {
  const found = new Map();
  const add = (u, how, el) => {
    if (!u || u.startsWith('data:')) return;
    const abs = new URL(u, location.href).href;
    if (!found.has(abs)) {
      const r = el ? el.getBoundingClientRect() : null;
      found.set(abs, { url: abs, how, w: r ? Math.round(r.width) : null, h: r ? Math.round(r.height) : null });
    }
  };
  document.querySelectorAll('img').forEach((im) => {
    add(im.currentSrc || im.src, 'img', im);
    (im.getAttribute('srcset') || '').split(',').forEach((part) => {
      const u = part.trim().split(/\\s+/)[0];
      add(u, 'srcset', im);
    });
  });
  document.querySelectorAll('source').forEach((s) => {
    (s.getAttribute('srcset') || '').split(',').forEach((part) => {
      add(part.trim().split(/\\s+/)[0], 'source', s.parentElement);
    });
  });
  document.querySelectorAll('video').forEach((v) => {
    add(v.currentSrc || v.src, 'video', v);
    v.querySelectorAll('source').forEach((s) => add(s.src, 'video-source', v));
  });
  document.querySelectorAll('*').forEach((el) => {
    const bg = getComputedStyle(el).backgroundImage;
    if (bg && bg !== 'none') {
      [...bg.matchAll(/url\\(["']?([^"')]+)["']?\\)/g)].forEach((m) => add(m[1], 'background', el));
    }
  });
  document.querySelectorAll('use').forEach((u) => {
    const h = u.getAttribute('href') || u.getAttribute('xlink:href');
    if (h && !h.startsWith('#')) add(h, 'use', u);
  });
  return [...found.values()];
})()`;

const FONTS = `(() => {
  const faces = [];
  [...document.styleSheets].forEach((s) => {
    try {
      [...s.cssRules].forEach((r) => {
        if (r.constructor.name === 'CSSFontFaceRule') {
          faces.push({ family: r.style.fontFamily, weight: r.style.fontWeight, style: r.style.fontStyle, src: r.style.src });
        }
      });
    } catch (e) { /* cross-origin */ }
  });
  const used = {};
  document.querySelectorAll('*').forEach((el) => {
    const t = [...el.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim());
    if (!t) return;
    const cs = getComputedStyle(el);
    const k = cs.fontFamily + ' | ' + cs.fontWeight + ' | ' + Math.round(parseFloat(cs.fontSize)) + 'px';
    used[k] = (used[k] || 0) + 1;
  });
  return { faces, used };
})()`;

(async () => {
  fs.mkdirSync(outDir, { recursive: true });

  let target = null;
  for (let i = 0; i < 80 && !target; i++) {
    try {
      target = (await getJSON('/json/list')).find((t) => t.type === 'page');
    } catch {
      await sleep(250);
    }
  }
  if (!target) {
    console.error('no chrome target');
    process.exit(1);
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
  const ev = async (expr) => {
    const r = await send('Runtime.evaluate', {
      expression: expr,
      awaitPromise: true,
      returnByValue: true,
    });
    if (r.exceptionDetails) {
      throw new Error(r.exceptionDetails.exception?.description || r.exceptionDetails.text);
    }
    return r.result.value;
  };

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
    width: W,
    height: H,
    deviceScaleFactor: 1,
    mobile: false,
  });
  await send('Page.navigate', { url });
  await sleep(WAIT);

  // Scroll the whole page so lazy images load and every scroll-triggered entrance has
  // fired, then come back. A dump taken at the top records placeholders.
  const height = await ev('document.documentElement.scrollHeight');
  for (let y = 0; y < height; y += Math.round(H * 0.8)) {
    await ev(`window.scrollTo(0, ${y})`);
    await sleep(260);
  }
  await ev('window.scrollTo(0, 0)');
  await sleep(1200);

  const html = await ev('document.documentElement.outerHTML');
  fs.writeFileSync(path.join(outDir, 'page.html'), html);

  const dom = await ev(DOM);
  fs.writeFileSync(path.join(outDir, 'dom.json'), JSON.stringify(dom, null, 1));
  console.log('dom.json      %d painted elements', dom.length);

  const images = await ev(IMAGES);
  fs.writeFileSync(path.join(outDir, 'images.json'), JSON.stringify(images, null, 1));
  console.log('images.json   %d images', images.length);

  const fonts = await ev(FONTS);
  fs.writeFileSync(path.join(outDir, 'fonts.json'), JSON.stringify(fonts, null, 1));
  console.log('fonts.json    %d faces, %d distinct used', fonts.faces.length, Object.keys(fonts.used).length);

  // Stylesheets. Same-origin ones come back through the CSSOM; cross-origin ones throw
  // on `cssRules` and have to be fetched over the network instead.
  const sheets = await ev(SHEETS);
  let css = '';
  let got = 0;
  for (const s of sheets) {
    let text = s.text;
    if (text === null && s.href) text = await fetchText(s.href);
    if (!text) continue;
    got++;
    css += `\n/* ===== ${s.href || 'inline'} ===== */\n${text}\n`;
  }
  fs.writeFileSync(path.join(outDir, 'styles.css'), css);
  console.log('styles.css    %d of %d sheets, %d KB', got, sheets.length, Math.round(css.length / 1024));

  const scripts = await ev(
    `[...document.querySelectorAll('script:not([src])')].map((s) => s.textContent)`,
  );
  fs.writeFileSync(
    path.join(outDir, 'inline.js'),
    scripts.map((t, i) => `\n/* ===== inline block ${i} (${t.length} chars) ===== */\n${t}\n`).join(''),
  );
  console.log('inline.js     %d blocks', scripts.length);

  ws.close();
  try {
    require('child_process').execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
  } catch {}
})();
