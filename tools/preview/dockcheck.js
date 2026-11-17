#!/usr/bin/env node
// Measure a screen's bottom bar: how tall it is, and whether what is in it
// actually sits in the middle of it.
//
//   node tools/preview/dockcheck.js <slug> [<slug> ...]
//
// "The icons are not in the middle" is the kind of thing that is obvious on
// a device and invisible in code, because the bar is usually centred *as a
// flex box* while the thing inside it is a glyph with a label hanging off
// the bottom — so the ink sits high even though the boxes are centred.
//
// This reports the bar's own box and the union of the ink inside it, and
// prints the gap above and below that ink. Equal is centred; a difference of
// more than about 2dp is what the eye picks up.
const { spawn, execSync } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const slugs = process.argv.slice(2);
if (!slugs.length) {
  console.error('usage: dockcheck.js <slug> [<slug> ...]');
  process.exit(2);
}
const EXPO_PORT = process.env.EXPO_PORT || 8082;
const PORT = 9341;
const W = 393;
const H = 852;
const SETTLE_MS = +(process.env.AUDIT_DELAY_MS || 4000);
const INSETS = (process.env.SHOOT_INSETS || '59,0,34,0').split(',').map(Number);

function probe() {
  const W = 393;
  const H = 852;
  const style = (el) => window.getComputedStyle(el);
  const all = Array.from(document.querySelectorAll('body *'));

  const shown = (el) => {
    const s = style(el);
    if (s.display === 'none' || s.visibility === 'hidden') return false;
    const r = el.getBoundingClientRect();
    return r.width > 0.5 && r.height > 0.5;
  };

  const alpha = (c) => {
    const m = /rgba?\(([^)]+)\)/.exec(c || '');
    if (!m) return 0;
    const p = m[1].split(',').map((n) => parseFloat(n));
    return p.length > 3 ? p[3] : 1;
  };

  // The bar: the widest shallow box whose bottom is near the screen's foot.
  //
  // **It is the box that PAINTS**, not the tidiest box inside it. Preferring
  // the shallowest match made the probe skip the slab and measure an inner
  // row, so a bar with 40dp of dead height under its labels reported as a
  // neat, perfectly centred 44dp bar — twice over, because the padding was
  // subtracted as well. A painted box is the one the eye calls "the bar", so
  // among the candidates that have a fill, the tallest wins.
  let bar = null;
  for (const el of all) {
    if (!shown(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < W * 0.6 || r.height > 150 || r.height < 30) continue;
    if (r.bottom < H - 130 || r.top > H - 20) continue;
    // Tabs are tabs, buttons or links — a dock built with `accessibilityRole
    // ="tab"` has no [role="button"] in it at all, and counting only buttons
    // walked straight past every one of them.
    const sel = '[role="button"],[role="tab"],[role="link"]';
    const tabs = Array.from(el.children).filter(
      (c) => (c.matches && c.matches(sel)) || c.querySelector(sel),
    ).length;
    if (tabs < 2) continue;
    const filled = alpha(style(el).backgroundColor) > 0.1;
    if (
      !bar ||
      (filled && !bar.filled) ||
      (filled === bar.filled &&
        (tabs > bar.tabs || (tabs === bar.tabs && (filled ? r.height > bar.h : r.height < bar.h))))
    ) {
      bar = { x: r.left, y: r.top, w: r.width, h: r.height, bottom: r.bottom, tabs, filled, el };
    }
  }
  if (!bar) return { found: false };

  // The ink inside it: leaf text, images and svg.
  let top = Infinity;
  let bottom = -Infinity;
  for (const el of Array.from(bar.el.querySelectorAll('*'))) {
    if (!shown(el)) continue;
    const tag = el.tagName.toLowerCase();
    const leafText = el.children.length === 0 && (el.textContent || '').trim().length > 0;
    if (!(leafText || tag === 'svg' || tag === 'img')) continue;
    const r = el.getBoundingClientRect();
    if (r.top < bar.y - 2 || r.bottom > bar.bottom + 2) continue;
    top = Math.min(top, r.top);
    bottom = Math.max(bottom, r.bottom);
  }
  if (!isFinite(top)) return { found: true, bar, ink: null };

  // The bar's own bottom padding is excluded from the CENTRING measurement:
  // it is the home-indicator zone, not part of the band the icons live in,
  // and counting it made every correctly centred dock look 34dp top-heavy.
  //
  // It is NOT excluded from everything. Subtracting it quietly is what let a
  // bar with 40dp of dead height under its own labels report as a tidy,
  // perfectly centred 44dp bar — the instrument had been taught to ignore the
  // defect. `under` is the honest number: ink bottom to painted bottom, with
  // the padding counted (I11).
  const padBottom = parseFloat(style(bar.el).paddingBottom) || 0;
  const bandBottom = bar.bottom - padBottom;

  return {
    found: true,
    barTop: Math.round(bar.y),
    barH: Math.round(bar.h - padBottom),
    barBottom: Math.round(bar.bottom),
    above: Math.round(top - bar.y),
    below: Math.round(bandBottom - bottom),
    inkH: Math.round(bottom - top),
    gapToEdge: Math.round(H - bar.bottom),
    pad: Math.round(padBottom),
    total: Math.round(bar.h),
    under: Math.round(bar.bottom - bottom),
  };
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
    '--user-data-dir=' + path.join(os.tmpdir(), 'showoff-chrome-dock'),
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
  // What fails a build is not dead height, it is **lopsided** dead height.
  //
  // `under` alone condemns an honest floating dock: a 66dp pill holding 20dp
  // glyphs has 23dp above its ink and 23dp below, and there is nothing wrong
  // with it. The defect is slack piled under the labels and not over them —
  // a bar that reserved `insets.bottom` on top of its own height reads 15dp
  // above and 54dp below, and what the eye calls that is "the tab bar is too
  // long" (I11).
  //
  // So: `skew` = under - above, with the padding counted. It is the centring
  // check done honestly; the Δ beside it measures the same thing with the
  // padding subtracted, which is what hid this for a whole batch.
  const SKEW_MAX = 12;
  let failed = 0;
  console.log('slug            barH  pad total above below  Δ  under skew  edge');
  for (const slug of slugs) {
    await send('Page.navigate', { url: `http://localhost:${EXPO_PORT}/${slug}` });
    await new Promise((x) => setTimeout(x, SETTLE_MS));
    await send('Runtime.evaluate', { expression: call, returnByValue: true });
    await new Promise((x) => setTimeout(x, 900));
    const res = await send('Runtime.evaluate', { expression: call, returnByValue: true });
    const v = (res && res.result && res.result.value) || {};
    if (!v.found || v.above === undefined) {
      console.log(`${slug.padEnd(15)} no bar found`);
      continue;
    }
    const delta = v.above - v.below;
    const skew = v.under - v.above;
    const flags = [];
    if (Math.abs(delta) > 2) flags.push('off-centre');
    if (skew > SKEW_MAX) {
      flags.push(`FAIL ${skew}dp more slack below the labels than above (max ${SKEW_MAX})`);
      failed++;
    }
    console.log(
      `${slug.padEnd(15)} ${String(v.barH).padStart(4)} ${String(v.pad).padStart(4)} ${String(
        v.total,
      ).padStart(5)} ${String(v.above).padStart(5)} ${String(v.below).padStart(5)} ${String(
        delta,
      ).padStart(4)} ${String(v.under).padStart(5)} ${String(skew).padStart(4)} ${String(
        v.gapToEdge,
      ).padStart(5)}${flags.length ? '  <- ' + flags.join(', ') : ''}`,
    );
  }

  ws.close();
  try {
    execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
  } catch {}
  if (failed) {
    console.error(
      `\n${failed} bar(s) carry more slack below their labels than above them (max ${SKEW_MAX}dp).`,
    );
    console.error('The fix is to stop the bar reserving insets.bottom (I11), not to move the ink.');
  }
  process.exit(failed ? 1 : 0);
})();
