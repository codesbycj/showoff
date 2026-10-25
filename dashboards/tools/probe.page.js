/*
 * The page half of `probe.js`. This file is a function *body*, injected by
 * `cdp.js`'s `evaluateFile` and handed one argument, `input`:
 *
 *   { scope: string|null, maxRows: number }
 *
 * It is a file on disk rather than a template literal in the script, which is
 * why backticks and regex backslashes are safe to write in here. Return a
 * plain, JSON-serialisable object.
 */

const scope = input.scope ? document.querySelector(input.scope) : document.body;
if (!scope) return { error: 'scope not found: ' + input.scope };
const MAX = input.maxRows || 40;

/* ---------- helpers ---------------------------------------------------- */

const box = (el) => {
  const r = el.getBoundingClientRect();
  return {
    x: Math.round(r.left),
    y: Math.round(r.top),
    w: Math.round(r.width),
    h: Math.round(r.height),
  };
};

const pathOf = (el) => {
  const parts = [];
  let node = el;
  while (node && node.nodeType === 1 && parts.length < 4) {
    let s = node.tagName.toLowerCase();
    if (node.id) {
      parts.unshift(s + '#' + node.id);
      break;
    }
    const data = [...node.attributes].find((a) => a.name.startsWith('data-'));
    if (data) s += '[' + data.name + '=' + data.value + ']';
    else {
      const cls = (node.className || '').toString().trim().split(/\s+/).filter(Boolean);
      if (cls.length) s += '.' + cls[0];
    }
    parts.unshift(s);
    node = node.parentElement;
  }
  return parts.join('>');
};

const text = (el) => (el.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 48);

/*
 * Parse a computed colour.
 *
 * Tailwind 4 writes every opacity-modified colour as
 * `color-mix(in oklab, ...)`, and Chrome reports the result as `oklab(L a b /
 * alpha)` rather than rgb(). Reading those three numbers as if they were r, g
 * and b gives L=0.99 -> r=1, a=0.00005 -> g=0, b=0.00002 -> b=0, i.e. pure red
 * read as near-black: `text-white/70` on an ink tooltip was reported at 1.12:1
 * and flagged as the worst failure on the screen. It is white.
 *
 * So oklab and oklch are converted properly. Everything else is still the
 * comma-or-space separated numbers of rgb()/rgba().
 */
const srgbFromLinear = (c) => {
  const v = c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
  return Math.max(0, Math.min(255, Math.round(v * 255)));
};

const oklabToRgb = (L, A, B) => {
  const l = Math.pow(L + 0.3963377774 * A + 0.2158037573 * B, 3);
  const m = Math.pow(L - 0.1055613458 * A - 0.0638541728 * B, 3);
  const s = Math.pow(L - 0.0894841775 * A - 1.291485548 * B, 3);
  return {
    r: srgbFromLinear(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    g: srgbFromLinear(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    b: srgbFromLinear(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  };
};

const parseRgb = (v) => {
  const text = v || '';
  const nums = text.match(/-?[\d.]+(?:%)?/g);
  if (!nums) return null;
  const n = (i) => {
    const raw = nums[i] || '0';
    return raw.endsWith('%') ? parseFloat(raw) / 100 : parseFloat(raw);
  };
  const alpha = nums.length > 3 ? n(3) : 1;

  if (/^oklab/i.test(text)) {
    return { ...oklabToRgb(n(0), n(1), n(2)), a: alpha };
  }
  if (/^oklch/i.test(text)) {
    const h = (n(2) * Math.PI) / 180;
    return { ...oklabToRgb(n(0), n(1) * Math.cos(h), n(1) * Math.sin(h)), a: alpha };
  }
  return { r: n(0), g: n(1), b: n(2), a: alpha };
};

const lum = (c) => {
  const f = (v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4);
  };
  return 0.2126 * f(c.r) + 0.7152 * f(c.g) + 0.0722 * f(c.b);
};

const over = (fg, bg) => {
  // Flatten a translucent foreground onto its ground before measuring.
  const a = fg.a;
  return { r: fg.r * a + bg.r * (1 - a), g: fg.g * a + bg.g * (1 - a), b: fg.b * a + bg.b * (1 - a), a: 1 };
};

const ratio = (a, b) => {
  const l1 = lum(a);
  const l2 = lum(b);
  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
};

/**
 * The effective ground behind an element, walking up until something opaque is
 * found. A gradient or a photograph is reported as *no* ground rather than a
 * failed one: the number is different at every pixel, and calling it a failure
 * is how an audit cries wolf about a hero.
 */
const groundOf = (el) => {
  let node = el;
  while (node && node.nodeType === 1) {
    const cs = getComputedStyle(node);
    if (cs.backgroundImage && cs.backgroundImage !== 'none') return { painted: true, color: null };
    const bg = parseRgb(cs.backgroundColor);
    if (bg && bg.a >= 0.999) return { painted: false, color: bg };
    node = node.parentElement;
  }
  return { painted: false, color: { r: 255, g: 255, b: 255, a: 1 } };
};

const all = [...scope.querySelectorAll('*')];
const visible = all.filter((el) => {
  const cs = getComputedStyle(el);
  if (cs.display === 'none' || cs.visibility === 'hidden' || +cs.opacity === 0) return false;
  const r = el.getBoundingClientRect();
  return r.width > 0 && r.height > 0;
});

/* ---------- the shell -------------------------------------------------- */

const docEl = document.documentElement;
const shell = {
  viewport: { w: innerWidth, h: innerHeight, dpr: devicePixelRatio },
  documentHeight: docEl.scrollHeight,
  /*
   * A dashboard is a fixed shell with inner scroll regions, so the document
   * itself should not scroll. If it does, either the shell is not height-capped
   * or something inside it is overflowing — and every screenshot after the
   * first band will be of a page the design never had.
   */
  documentScrolls: docEl.scrollHeight > innerHeight + 1,
  horizontalScroll: docEl.scrollWidth > innerWidth + 1,
  children: [...(document.getElementById('root') || document.body).children].map((el) => ({
    path: pathOf(el),
    box: box(el),
  })),
};

const scrollers = visible
  .filter((el) => {
    const cs = getComputedStyle(el);
    const scrollable = /(auto|scroll)/.test(cs.overflowY + ' ' + cs.overflowX);
    return scrollable && (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1);
  })
  .map((el) => ({
    path: pathOf(el),
    box: box(el),
    scrollHeight: el.scrollHeight,
    clientHeight: el.clientHeight,
    scrollWidth: el.scrollWidth,
    clientWidth: el.clientWidth,
    overflowY: getComputedStyle(el).overflowY,
  }));

/*
 * Dead space at the foot. A dashboard that stops at 78% of the viewport and
 * leaves a band of empty canvas under the last card reads as unfinished,
 * whatever the cards look like. For every region that is meant to be full —
 * anything marked data-region, plus each scroller — compare the bottom of its
 * last painted child with its own bottom.
 */
const regions = [...new Set([...scope.querySelectorAll('[data-region]'), ...scrollers.map((s) => document.querySelector(s.path))].filter(Boolean))];
const deadSpace = regions
  .map((el) => {
    const kids = [...el.children].filter((k) => k.getBoundingClientRect().height > 0);
    if (!kids.length) return null;
    const bottom = Math.max(...kids.map((k) => k.getBoundingClientRect().bottom));
    // The content box, not the border box: a region's own bottom padding is
    // the design, and counting it as a gap makes every padded card a defect.
    const pad = parseFloat(getComputedStyle(el).paddingBottom) || 0;
    const mine = el.getBoundingClientRect().bottom - pad;
    return { path: pathOf(el), regionBottom: Math.round(mine), contentBottom: Math.round(bottom), gap: Math.round(mine - bottom) };
  })
  .filter(Boolean)
  .filter((d) => d.gap > 24);

/* ---------- the grid --------------------------------------------------- */

// Vertical edges that at least three visible boxes share: the column grid,
// read off the build rather than asserted.
const edgeCount = {};
visible.forEach((el) => {
  const r = el.getBoundingClientRect();
  if (r.width < 24 || r.height < 12) return;
  [Math.round(r.left), Math.round(r.right)].forEach((x) => {
    edgeCount[x] = (edgeCount[x] || 0) + 1;
  });
});
const gridX = Object.entries(edgeCount)
  .map(([x, n]) => ({ x: +x, n }))
  .filter((e) => e.n >= 3)
  .sort((a, b) => a.x - b.x);

/* ---------- type ------------------------------------------------------- */

const textEls = visible.filter((el) => {
  if (!el.childNodes.length) return false;
  return [...el.childNodes].some((n) => n.nodeType === 3 && n.nodeValue.trim().length);
});

const scaleMap = {};
textEls.forEach((el) => {
  const cs = getComputedStyle(el);
  const key = Math.round(parseFloat(cs.fontSize)) + '/' + cs.fontWeight + '/' + cs.fontFamily.split(',')[0].replace(/["']/g, '');
  if (!scaleMap[key]) scaleMap[key] = { key, count: 0, sample: text(el) };
  scaleMap[key].count++;
});
const typeScale = Object.values(scaleMap).sort((a, b) => b.count - a.count);

const smallText = textEls
  .filter((el) => parseFloat(getComputedStyle(el).fontSize) < 12)
  .map((el) => ({ path: pathOf(el), size: parseFloat(getComputedStyle(el).fontSize), sample: text(el) }))
  .slice(0, MAX);

const contrast = [];
let measured = 0;
textEls.forEach((el) => {
  const cs = getComputedStyle(el);
  const fg = parseRgb(cs.color);
  const ground = groundOf(el);
  if (!fg || ground.painted || !ground.color) return;
  const size = parseFloat(cs.fontSize);
  const weight = +cs.fontWeight || 400;
  const large = size >= 24 || (size >= 18.66 && weight >= 700);
  const r = ratio(over(fg, ground.color), ground.color);
  measured++;
  const need = large ? 3 : 4.5;
  if (r < need) {
    contrast.push({
      path: pathOf(el),
      ratio: Math.round(r * 100) / 100,
      need,
      size,
      weight,
      fg: cs.color,
      bg: 'rgb(' + [ground.color.r, ground.color.g, ground.color.b].map(Math.round).join(',') + ')',
      sample: text(el),
    });
  }
});
contrast.sort((a, b) => a.ratio - b.ratio);

/* ---------- targets ---------------------------------------------------- */

const INTERACTIVE = 'a,button,input,select,textarea,[role=button],[role=tab],[role=switch],[role=checkbox],[tabindex]:not([tabindex="-1"])';
const targets = visible
  .filter((el) => el.matches(INTERACTIVE))
  .map((el) => {
    const b = box(el);
    return { path: pathOf(el), w: b.w, h: b.h, label: text(el) || el.getAttribute('aria-label') || '' };
  })
  .filter((t) => t.w < 44 || t.h < 44)
  .sort((a, b) => Math.min(a.w, a.h) - Math.min(b.w, b.h))
  .slice(0, MAX);

const unlabelled = visible
  .filter((el) => el.matches('a,button,[role=button],[role=tab]'))
  .filter((el) => !text(el) && !el.getAttribute('aria-label') && !el.getAttribute('title'))
  .map((el) => ({ path: pathOf(el), box: box(el) }))
  .slice(0, MAX);

/* ---------- motion at rest --------------------------------------------- */

const running = [];
let infinite = 0;
visible.forEach((el) => {
  const cs = getComputedStyle(el);
  if (cs.animationName && cs.animationName !== 'none') {
    const inf = /infinite/.test(cs.animationIterationCount);
    if (inf) infinite++;
    running.push({ path: pathOf(el), name: cs.animationName, duration: cs.animationDuration, iterations: cs.animationIterationCount });
  }
});

/* ---------- charts ----------------------------------------------------- */

const svgs = [...scope.querySelectorAll('svg')]
  .filter((el) => {
    // aria-hidden says "this is decoration, not data" -- a halftone pattern or
    // a background flourish is not a chart and reporting it as an unlabelled
    // one trains you to ignore the line that matters.
    if (el.getAttribute('aria-hidden') === 'true') return false;
    const r = el.getBoundingClientRect();
    return r.width > 48 && r.height > 32; // an icon is not a chart
  })
  .map((el) => ({
    path: pathOf(el),
    box: box(el),
    viewBox: el.getAttribute('viewBox'),
    marks: el.querySelectorAll('path,rect,circle,line,polyline,polygon').length,
    texts: el.querySelectorAll('text').length,
    role: el.getAttribute('role'),
    ariaLabel: el.getAttribute('aria-label'),
    hasTitle: !!el.querySelector('title'),
  }));

/*
 * Duplicate ids inside <defs>. An SVG gradient, mask, filter or clipPath id is
 * *document*-global, not scoped to the svg that declares it — so two chart
 * instances that both define `id="fade"` collapse into one, and every chart
 * after the first paints in the first one's colour. The fix is `useId()`; this
 * is the check that catches having forgotten it.
 */
const idCount = {};
scope.querySelectorAll('defs [id], linearGradient[id], radialGradient[id], clipPath[id], mask[id], filter[id], pattern[id], symbol[id]').forEach((el) => {
  idCount[el.id] = (idCount[el.id] || 0) + 1;
});
const duplicateDefIds = Object.entries(idCount)
  .filter(([, n]) => n > 1)
  .map(([id, n]) => ({ id, count: n }));

/* ---------- hovers: find them, do not guess them ----------------------- */

/*
 * Every hover rule in every stylesheet, matched back to an element that is
 * actually on the page. A targeted grep for the selectors you *expect* to have
 * hovers returns nothing and tells you the page has none; this is the loose
 * pass. A `transition` on an interactive element is listed too, because a
 * transition is evidence of a state change even when the trigger is not in the
 * CSS.
 */
const hoverSelectors = new Set();
for (const sheet of document.styleSheets) {
  let rules;
  try {
    rules = sheet.cssRules;
  } catch {
    continue; // cross-origin
  }
  const walk = (list) => {
    for (const rule of list) {
      if (rule.cssRules) walk(rule.cssRules);
      if (!rule.selectorText) continue;
      rule.selectorText.split(',').forEach((sel) => {
        const s = sel.trim();
        if (!/:hover/.test(s)) return;
        const base = s.replace(/:hover/g, '').trim();
        if (!base || /^[*]$/.test(base)) return;
        try {
          if (scope.querySelector(base)) hoverSelectors.add(base);
        } catch {}
      });
    }
  };
  walk(rules);
}

const transitions = visible
  .filter((el) => el.matches(INTERACTIVE) || el.matches('[data-mark],tr,[role=row]'))
  .map((el) => ({ path: pathOf(el), transition: getComputedStyle(el).transitionProperty, duration: getComputedStyle(el).transitionDuration }))
  .filter((t) => t.transition && t.transition !== 'all' && t.transition !== 'none' && parseFloat(t.duration) > 0)
  .slice(0, MAX);

/* ---------- outline, images, fonts ------------------------------------- */

const outline = [...scope.querySelectorAll('h1,h2,h3')].map((el) => ({
  level: +el.tagName[1],
  text: text(el),
}));

const images = [...scope.querySelectorAll('img')].map((el) => ({
  src: (el.currentSrc || el.src || '').split('/').pop(),
  natural: el.naturalWidth + 'x' + el.naturalHeight,
  displayed: Math.round(el.getBoundingClientRect().width) + 'x' + Math.round(el.getBoundingClientRect().height),
  complete: el.complete && el.naturalWidth > 0,
  alt: el.getAttribute('alt'),
}));

const families = [...new Set(visible.map((el) => getComputedStyle(el).fontFamily.split(',')[0].replace(/["']/g, '')))];

const selectable = (scope.innerText || '').replace(/\s+/g, ' ').trim().length;

return {
  shell,
  scrollers,
  deadSpace,
  gridX,
  typeScale,
  smallText,
  contrast: { measured, failures: contrast.slice(0, MAX), failureCount: contrast.length },
  targets,
  unlabelled,
  motionAtRest: { running: running.length, infinite, items: running.slice(0, MAX) },
  charts: svgs,
  duplicateDefIds,
  hovers: [...hoverSelectors].sort(),
  transitions,
  outline,
  images,
  families,
  selectable,
  counts: { elements: all.length, visible: visible.length, text: textEls.length },
};
