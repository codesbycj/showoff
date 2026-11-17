#!/usr/bin/env node
// Audit a screen for the defects that keep shipping. Reads the DOM of the web
// render, not its pixels, so every finding comes with the element that caused
// it rather than a band of suspicious colour.
//
//   node tools/preview/audit.js <slug>/<screen>      # dev server must be up
//   node tools/preview/audit.js <slug>               # same, route is <slug>
//   EXPO_PORT=8082 node tools/preview/audit.js voltprompt
//
// Exits 1 if anything FAILs. Every check here exists because a screen shipped
// with that exact defect and the eye did not catch it:
//
//   OFFSCREEN  text or a control painting past the 393dp edge, with no
//              horizontal scroller to justify it -- a line of body copy
//              running off the right of the phone and losing its last word.
//   CLIPPED    a text box sticking out of an ancestor that clips, so the
//              glyphs are cut in half -- a caption over a photo, cropped by
//              the photo's own rounded box.
//   COVERED    something painted on top of something else: a floating control
//              rail sitting over the chart bars it belongs to, a disc over a
//              label. Over text it is a failure, over anything else a warning.
//   GAP        a run of empty canvas *between* blocks. foot.py only measures
//              the foot, so a screen that ends on a pinned bar passes it with
//              a quarter of the screen empty in the middle. This is the check
//              that catches that, and it is the complaint that keeps coming
//              back.
//   FOOT       the same dead-canvas measurement foot.py makes, from the DOM.
//              Two independent measurements of the same number; if they
//              disagree, trust foot.py and find out why.
//   TAP        a control under 44dp.
//   CONTRAST   body text under 4.5:1 on a resolvable flat background.
//   COPY       one text run longer than a reference would ever carry.
//
// The DOM is the right instrument for all of these. A screenshot can show a
// gap; only the DOM can say which View owns it.
const { spawn, execSync } = require('child_process');
const http = require('http');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const [, , routeArg, ...rest] = process.argv;
if (!routeArg) {
  console.error('usage: audit.js <slug>[/<screen>]   (dev server must be running)');
  process.exit(2);
}
const json = rest.includes('--json');
const EXPO_PORT = process.env.EXPO_PORT || 8082;
const PORT = 9338;
const W = 393;
const H = 852;
const SETTLE_MS = +(process.env.AUDIT_DELAY_MS || 4500);
const INSETS = (process.env.SHOOT_INSETS || '59,0,34,0').split(',').map(Number);
const url = `http://localhost:${EXPO_PORT}/${routeArg.replace(/^\//, '')}`;

// Thresholds. Stated here once so the rules file and the tool cannot drift.
const LIMITS = {
  gapFail: 72, // dp of empty canvas between two blocks
  gapWarn: 48,
  footFail: 24, // dp of dead canvas at the foot, below the safe area
  tap: 44, // dp, the smallest a control may be
  copyWarn: 110, // characters in one text run
  edge: 1, // dp of slop before "past the edge" counts
};

/**
 * Runs inside the page. Returns plain data only -- it is serialised through
 * CDP, so nothing here may reference anything outside itself. It is sent with
 * `Function.prototype.toString`, never interpolated into a template literal:
 * a backtick or a regex backslash in here would otherwise be eaten on the way
 * in and the failure arrives as a bare `undefined`.
 */
function probe(limits) {
  const W = 393;
  const H = 852;
  const SAFE_BOTTOM = 34;
  const findings = [];
  const add = (level, check, detail, where) =>
    findings.push({ level: level, check: check, detail: detail, where: where });

  const all = Array.from(document.querySelectorAll('body *'));
  const style = (el) => window.getComputedStyle(el);

  const name = (el) => {
    if (!el) return '?';
    const txt = (el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 40);
    const tag = el.tagName.toLowerCase();
    const r = el.getBoundingClientRect();
    const box =
      Math.round(r.x) +
      ',' +
      Math.round(r.y) +
      ' ' +
      Math.round(r.width) +
      'x' +
      Math.round(r.height);
    return (txt ? JSON.stringify(txt) : tag) + ' [' + box + ']';
  };

  const alpha = (c) => {
    const m = (c || '').match(/[\d.]+/g);
    if (!m) return 0;
    return m.length > 3 ? parseFloat(m[3]) : 1;
  };
  const rgb = (c) => {
    const m = (c || '').match(/[\d.]+/g);
    return m ? [+m[0], +m[1], +m[2]] : null;
  };

  const shown = (el) => {
    const s = style(el);
    if (s.display === 'none' || s.visibility === 'hidden') return false;
    if (parseFloat(s.opacity) < 0.05) return false;
    const r = el.getBoundingClientRect();
    return r.width > 0.5 && r.height > 0.5;
  };

  const isLeafText = (el) => el.children.length === 0 && (el.textContent || '').trim().length > 0;
  const isPicture = (el) =>
    el.tagName === 'IMG' ||
    el.tagName.toLowerCase() === 'svg' ||
    style(el).backgroundImage !== 'none';
  const hasFill = (el) => alpha(style(el).backgroundColor) > 0.08;
  const hasBorder = (el) => {
    const s = style(el);
    return parseFloat(s.borderTopWidth) + parseFloat(s.borderBottomWidth) > 0;
  };
  /** Does this element put ink on the screen itself, rather than via a child? */
  const paints = (el) => isLeafText(el) || isPicture(el) || hasFill(el) || hasBorder(el);

  const clips = (el) => {
    const s = style(el);
    return /hidden|clip|scroll|auto/.test(s.overflowX + ' ' + s.overflowY);
  };
  const scrollsX = (el) => {
    const s = style(el);
    return /auto|scroll/.test(s.overflowX) && el.scrollWidth > el.clientWidth + 2;
  };

  /**
   * Is this element inside something rotated?
   *
   * `getBoundingClientRect` is axis-aligned, so for a rotated subtree it
   * reports a box that is wider and taller than the element and no longer
   * lines up with the clip its parent applies. Comparing those boxes made a
   * posed card's own digits look 13dp clipped when nothing was clipped at
   * all. Rotated content is checked by eye; the geometric checks skip it.
   */
  const rotated = (el) => {
    let p = el;
    while (p && p !== document.body) {
      const t = style(p).transform;
      if (t && t !== 'none') {
        const m = t.match(/matrix\(([^)]+)\)/);
        if (m) {
          const n = m[1].split(',').map(parseFloat);
          if (Math.abs(n[1]) > 0.001 || Math.abs(n[2]) > 0.001) return true;
        } else if (/rotate/.test(t)) return true;
      }
      p = p.parentElement;
    }
    return false;
  };

  const vis = all.filter(shown);

  // ---- OFFSCREEN -------------------------------------------------------
  // Past the left or right edge with nothing to scroll it back into view.
  for (const el of vis) {
    if (!paints(el)) continue;
    if (rotated(el)) continue;
    const r = el.getBoundingClientRect();
    if (r.right <= W + limits.edge && r.left >= -limits.edge) continue;
    let p = el.parentElement;
    let scrolled = false;
    while (p && p !== document.body) {
      if (scrollsX(p)) {
        scrolled = true;
        break;
      }
      p = p.parentElement;
    }
    if (scrolled) continue;
    // A child only repeats its parent's offence; report the outermost.
    if (el.parentElement) {
      const pr = el.parentElement.getBoundingClientRect();
      if (pr.right > W + limits.edge || pr.left < -limits.edge) continue;
    }
    const over = Math.round(Math.max(r.right - W, -r.left));
    add(isLeafText(el) ? 'FAIL' : 'WARN', 'OFFSCREEN', over + 'dp past the screen edge', name(el));
  }

  // ---- CLIPPED ---------------------------------------------------------
  // A text box sticking out of an ancestor that cuts it off.
  for (const el of vis) {
    if (!isLeafText(el)) continue;
    if (rotated(el)) continue;
    const r = el.getBoundingClientRect();
    let p = el.parentElement;
    while (p && p !== document.body) {
      if (clips(p)) {
        const pr = p.getBoundingClientRect();
        const outB = r.bottom - pr.bottom;
        const outR = r.right - pr.right;
        const outT = pr.top - r.top;
        const outL = pr.left - r.left;
        const worst = Math.max(outB, outR, outT, outL);
        // A scroller is meant to hold more than it shows.
        const scroller = /auto|scroll/.test(style(p).overflowX + ' ' + style(p).overflowY);
        if (worst > 1.5 && !scroller) {
          add(
            'FAIL',
            'CLIPPED',
            Math.round(worst) + 'dp of the text is cut off by ' + name(p),
            name(el),
          );
          break;
        }
        // Keep walking. Stopping at the first clipping ancestor misses the
        // one that actually cuts: a card that clips its own corners sits
        // inside a band that clips the screen edge, and only the outer box
        // was taking the text's last word off.
      }
      p = p.parentElement;
    }
  }

  // ---- COVERED ---------------------------------------------------------
  // Something opaque painted on top. Sample the centre and four inset
  // corners: a rail down the right edge misses a centre-only probe.
  const covering = (el) => {
    const r = el.getBoundingClientRect();
    // A grid, not a centre and four corners. A rail down the right edge
    // overlaps the last bar by a third of its width and nothing else; five
    // points walked straight past it, which is how it shipped.
    const pts = [];
    const N = 5;
    for (let a = 0; a < N; a++) {
      for (let b = 0; b < N; b++) {
        pts.push([r.left + (r.width * (a + 0.5)) / N, r.top + (r.height * (b + 0.5)) / N]);
      }
    }
    for (const pt of pts) {
      if (pt[0] < 0 || pt[0] > W || pt[1] < 0 || pt[1] > H) continue;
      const stack = document.elementsFromPoint(pt[0], pt[1]);
      const i = stack.indexOf(el);
      if (i <= 0) continue; // not hit, or already topmost
      for (let k = 0; k < i; k++) {
        const over = stack[k];
        // Never accept an ancestor as a cover: a parent paints below its
        // child, and elementsFromPoint lists it only because it is there.
        if (over.contains(el) || el.contains(over)) continue;
        if (!hasFill(over) && !isPicture(over)) continue;
        if (alpha(style(over).backgroundColor) < 0.6 && !isPicture(over)) continue;
        const orect = over.getBoundingClientRect();
        if (orect.width >= W - 2 && orect.height >= H - 2) continue; // page ground
        return over;
      }
    }
    return null;
  };

  const seenCover = new Set();
  for (const el of vis) {
    if (!paints(el)) continue;
    // Leaves only. A card is *meant* to have things on top of it -- that is
    // what a card is -- and checking containers reported every icon as
    // covering the tile it sits in. What cannot be covered is content: a
    // line of text, a photo, a bar in a chart.
    if (el.children.length > 0 && el.tagName.toLowerCase() !== 'svg') continue;
    const r = el.getBoundingClientRect();
    if (r.width < 6 || r.height < 6) continue;
    if (r.width >= W - 2 && r.height >= H - 2) continue;
    const over = covering(el);
    if (!over) continue;
    // Same box = the same thing drawn twice: an Image and its own tint, a
    // Pressable's inner View. Layered by design, not by accident.
    const or_ = over.getBoundingClientRect();
    if (
      Math.abs(or_.left - r.left) < 2 &&
      Math.abs(or_.top - r.top) < 2 &&
      Math.abs(or_.width - r.width) < 2 &&
      Math.abs(or_.height - r.height) < 2
    )
      continue;
    // Wholly inside means it is *on* it by design -- a photo on its coloured
    // ground, an icon in its tile. A collision straddles an edge: the disc
    // that sits half on the last bar and half off it.
    if (
      or_.left >= r.left - 1 &&
      or_.right <= r.right + 1 &&
      or_.top >= r.top - 1 &&
      or_.bottom <= r.bottom + 1
    )
      continue;
    const key = name(el) + '|' + name(over);
    if (seenCover.has(key)) continue;
    seenCover.add(key);

    // Chrome over a list that can still scroll is a scroll position, not a
    // collision: a floating dock is *meant* to have content pass under it,
    // and what is under it is one flick away. The same bar over content that
    // has run out is the real defect -- a "Join waitlist" button parked on
    // the last line of a page nobody can scroll past. The test is therefore
    // not "is it chrome" but "can the reader still get to what it hides".
    // Is it edge chrome? Ask the covering element *and its ancestors*: the
    // topmost thing at a point inside a dock is one 46dp tab tile, not the
    // 353dp bar it sits in, and judged on the tile alone a scrolled list
    // passing under the bar reads as a collision.
    let chrome = null;
    for (let a = over; a && a !== document.body; a = a.parentElement) {
      const ar = a.getBoundingClientRect();
      // Wide, shallow, and against an edge. Without the height test the walk
      // reaches the scroll content container -- full width, top above the
      // fold, bottom far below it -- and every overlap on the page starts
      // counting as "under chrome".
      if (
        ar.width >= W * 0.7 &&
        ar.height <= 140 &&
        (ar.top < 120 || ar.bottom > H - 120)
      ) {
        chrome = ar;
        break;
      }
    }
    const wide = !!chrome;
    const atEdge = !!chrome;
    let reachable = false;
    if (wide && atEdge) {
      let p = el.parentElement;
      while (p && p !== document.body) {
        const ps = style(p);
        if (/auto|scroll/.test(ps.overflowY) && p.scrollHeight > p.clientHeight + 4) {
          reachable = p.scrollHeight - p.clientHeight - p.scrollTop > 8;
          break;
        }
        p = p.parentElement;
      }
      if (!reachable) {
        const d = document.documentElement;
        reachable = d.scrollHeight - d.clientHeight - d.scrollTop > 8;
      }
      if (reachable) {
        add('INFO', 'COVERED', 'under edge chrome, reachable by scrolling', name(el));
        continue;
      }
    }
    add(isLeafText(el) ? 'FAIL' : 'WARN', 'COVERED', 'painted over by ' + name(over), name(el));
  }

  // ---- GAP and FOOT ----------------------------------------------------
  // Which rows of the screen have anything on them at all.
  const rows = new Array(H).fill(false);
  for (const el of vis) {
    if (!paints(el)) continue;
    const r = el.getBoundingClientRect();
    // The page's own ground is not content -- but a full-bleed photograph is,
    // and excluding by size alone read a swipe screen's whole photo as 452dp
    // of empty canvas.
    //
    // The line between them is a **bitmap**. A photograph is one; a decorative
    // ground is a full-screen <svg> gradient or a filled div, and counting
    // that as content marks every row of the screen painted and blinds this
    // check completely. That is not hypothetical: an onboarding screen with a
    // radial-gradient background passed with 190dp of empty ground under its
    // hero.
    //
    // The test used to be `tagName === 'IMG'`, which is wrong under
    // react-native-web: an `<Image>` renders as a div carrying a
    // `background-image`, never as an `<img>`. So every full-bleed photograph
    // in this repo was being read as decorative ground, and a travel splash
    // whose whole middle *is* its photograph reported 375dp of empty canvas.
    const bitmap = el.tagName === 'IMG' || /url\(/.test(style(el).backgroundImage);
    if (r.width >= W - 2 && r.height >= H - 2 && !bitmap && !isLeafText(el)) continue;
    const top = Math.max(0, Math.floor(r.top));
    const bot = Math.min(H - 1, Math.ceil(r.bottom));
    for (let y = top; y <= bot; y++) rows[y] = true;
  }
  let first = rows.indexOf(true);
  let last = rows.lastIndexOf(true);
  if (first < 0) {
    add('FAIL', 'GAP', 'nothing painted at all', 'the screen');
  } else {
    let run = 0;
    let worst = 0;
    let worstEnd = 0;
    for (let y = first; y <= Math.min(last, H - SAFE_BOTTOM); y++) {
      if (rows[y]) {
        if (run > worst) {
          worst = run;
          worstEnd = y;
        }
        run = 0;
      } else run++;
    }
    if (run > worst) {
      worst = run;
      worstEnd = Math.min(last, H - SAFE_BOTTOM);
    }
    if (worst >= limits.gapWarn) {
      add(
        worst >= limits.gapFail ? 'FAIL' : 'WARN',
        'GAP',
        worst + 'dp of empty canvas between blocks (y ' + (worstEnd - worst) + '-' + worstEnd + ')',
        'the screen',
      );
    }
    const dead = Math.max(0, H - SAFE_BOTTOM - last);
    if (dead > limits.footFail) {
      add('FAIL', 'FOOT', dead + 'dp of dead canvas at the foot', 'the screen');
    }
    findings.push({
      level: 'INFO',
      check: 'FOOT',
      detail: dead + 'dp dead at the foot, content ' + first + '-' + last,
      where: 'the screen',
    });
  }

  // ---- SCROLL ----------------------------------------------------------
  // How far past the frame the screen runs. The recording is the first
  // frame; a screen that carries three screens of invented content below
  // the fold is not the design, it is padding with extra steps.
  let deepest = document.documentElement.scrollHeight;
  for (const el of vis) {
    const s = style(el);
    if (/auto|scroll/.test(s.overflowY) && el.scrollHeight > el.clientHeight + 4) {
      deepest = Math.max(deepest, Math.round(el.scrollHeight));
    }
    // A ScrollView does not always report a scrollHeight on the web render,
    // so ask the content instead: how far down does anything actually paint?
    if (paints(el)) deepest = Math.max(deepest, Math.round(el.getBoundingClientRect().bottom));
  }
  const depth = deepest / H;
  findings.push({
    level: depth > 1.6 ? 'WARN' : 'INFO',
    check: 'SCROLL',
    detail: deepest + 'dp of content, ' + depth.toFixed(2) + ' screens',
    where: 'the screen',
  });

  // ---- TAP -------------------------------------------------------------
  const controls = Array.from(
    document.querySelectorAll('[role="button"], button, a, [tabindex]'),
  ).filter(shown);
  for (const el of controls) {
    if (el.querySelector('[role="button"], button')) continue; // report the inner one
    const r = el.getBoundingClientRect();
    const small = Math.min(r.width, r.height);
    if (small < limits.tap - 0.5) {
      add('WARN', 'TAP', Math.round(r.width) + 'x' + Math.round(r.height) + 'dp control', name(el));
    }
  }

  // ---- CONTRAST and COPY ----------------------------------------------
  const lum = (c) => {
    const f = c.map((v) => {
      const s = v / 255;
      return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * f[0] + 0.7152 * f[1] + 0.0722 * f[2];
  };
  for (const el of vis) {
    if (!isLeafText(el)) continue;
    const text = (el.textContent || '').trim().replace(/\s+/g, ' ');
    if (text.length > limits.copyWarn) {
      add(
        'WARN',
        'COPY',
        text.length + ' characters in one run',
        JSON.stringify(text.slice(0, 60)),
      );
    }
    const s = style(el);
    const fg = rgb(s.color);
    if (!fg || alpha(s.color) < 0.9) continue;
    // What is actually behind this text, read off the hit stack rather than
    // the ancestor chain. A caption over a photograph is usually a sibling of
    // the Image, not a child of it, so walking parents finds the page's own
    // white and reports white-on-white at 1.00:1 -- which is how three
    // perfectly legible lines over a photo came back as failures.
    const tr = el.getBoundingClientRect();
    const cx = Math.min(W - 1, Math.max(0, tr.left + tr.width / 2));
    const cy = Math.min(H - 1, Math.max(0, tr.top + tr.height / 2));
    const stack = document.elementsFromPoint(cx, cy);
    const start = stack.indexOf(el);
    let bg = null;
    let overPicture = false;
    if (start >= 0) {
      for (let k = start + 1; k < stack.length; k++) {
        const under = stack[k];
        if (isPicture(under)) {
          overPicture = true;
          break;
        }
        if (alpha(style(under).backgroundColor) > 0.9) {
          bg = rgb(style(under).backgroundColor);
          break;
        }
      }
    }
    if (overPicture || !bg) continue; // text on a photo: judged by eye, not here
    const l1 = lum(fg);
    const l2 = lum(bg);
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
    const size = parseFloat(s.fontSize);
    const weight = parseInt(s.fontWeight, 10) || 400;
    const large = size >= 24 || (size >= 18.66 && weight >= 700);
    const floor = large ? 3 : 4.5;
    if (ratio < floor) {
      add(
        ratio < 3 ? 'FAIL' : 'WARN',
        'CONTRAST',
        ratio.toFixed(2) + ':1 at ' + Math.round(size) + 'dp (needs ' + floor + ')',
        name(el),
      );
    }
  }

  return findings;
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
    '--user-data-dir=' + path.join(os.tmpdir(), 'showoff-chrome-audit'),
    'about:blank',
  ],
  { stdio: 'ignore' },
);

const die = (code) => {
  try {
    execSync('taskkill /F /T /PID ' + chrome.pid, { stdio: 'ignore' });
  } catch {}
  process.exit(code);
};

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
  if (!page) {
    console.error('could not reach headless Chrome');
    die(2);
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
  // The same faked insets shoot.js uses: web reports zero, so every
  // inset-anchored block lands 59dp off and the foot measurement is wrong.
  if (INSETS.some((v) => v)) {
    const [t, r, b, l] = INSETS;
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source:
        '(() => {' +
        'const real = window.getComputedStyle.bind(window);' +
        "const fake = { paddingTop: '" +
        t +
        "px', paddingRight: '" +
        r +
        "px', paddingBottom: '" +
        b +
        "px', paddingLeft: '" +
        l +
        "px' };" +
        'window.getComputedStyle = function (el, pe) {' +
        'const cs = real(el, pe);' +
        "if (el && el.style && String(el.style.paddingTop).includes('safe-area-inset')) {" +
        'return new Proxy(cs, { get(target, key) {' +
        'if (key in fake) return fake[key];' +
        'const v = Reflect.get(target, key);' +
        "return typeof v === 'function' ? v.bind(target) : v; } });" +
        '} return cs; };})();',
    });
  }

  await send('Page.navigate', { url });
  await new Promise((r) => setTimeout(r, SETTLE_MS));

  // Probe until it settles. The first pass after a cold start, a new asset
  // or a route Metro is still compiling reads a pre-hydration tree, exactly
  // as the first screenshot does -- and in a sweep of thirty routes that
  // showed up as two phantom failures on a screen that passes on its own.
  // Two consecutive identical results, or four tries.
  const call = '(' + probe.toString() + ')(' + JSON.stringify(LIMITS) + ')';
  let res = null;
  let prev = null;
  for (let i = 0; i < 4; i++) {
    res = await send('Runtime.evaluate', { expression: call, returnByValue: true });
    const now = JSON.stringify(res && res.result && res.result.value);
    if (i > 0 && now === prev) break;
    prev = now;
    await new Promise((r) => setTimeout(r, 1400));
  }

  if (!res || !res.result || res.result.subtype === 'error') {
    console.error('probe failed:', res && res.result && res.result.description);
    die(2);
  }
  const findings = res.result.value || [];

  if (json) {
    console.log(JSON.stringify(findings, null, 2));
  } else {
    const order = { FAIL: 0, WARN: 1, INFO: 2 };
    findings.sort((a, b) => order[a.level] - order[b.level] || a.check.localeCompare(b.check));
    console.log(routeArg);
    for (const f of findings) {
      console.log(
        '  ' + f.level.padEnd(4) + ' ' + f.check.padEnd(9) + ' ' + f.detail + '  <- ' + f.where,
      );
    }
    const fails = findings.filter((f) => f.level === 'FAIL').length;
    const warns = findings.filter((f) => f.level === 'WARN').length;
    console.log('  ' + (fails ? fails + ' FAIL' : 'no failures') + ', ' + warns + ' warnings');
  }
  ws.close();
  die(findings.some((f) => f.level === 'FAIL') ? 1 : 0);
})();
