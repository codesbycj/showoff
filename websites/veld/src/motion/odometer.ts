/**
 * The rolling counter used by the loader, the hero statistics and the race
 * countdown.
 *
 * Each digit place becomes a column of glyphs that slides up to land on its
 * target, passing 0-9 a couple of extra times on the way — that extra travel
 * is the whole difference between a number that rolls and a number that is
 * simply set. Places land right to left, so the last digit settles first.
 *
 * Two details stop it looking like a slot machine:
 *
 * - **Each place tweens its own width.** Anton's figures are not tabular (a 1
 *   is far narrower than a 0), so a column that keeps one width either clips
 *   its glyphs or leaves a gap. The width is animated alongside the travel,
 *   which is why the number visibly breathes as it settles.
 * - **Widths are measured in em against the real face**, after the font has
 *   loaded. Measuring before `document.fonts.ready` returns the fallback's
 *   metrics, and the number then jumps by a few per cent on the frame the
 *   webfont arrives.
 */
import { gsap } from './gsap';
import { ODOMETER } from './motion';

export type RollOptions = {
  duration?: number;
  ease?: string;
  /** Extra passes through 0-9 before landing. */
  cycles?: number;
  /** Start from nothing rather than from the digits already on screen. */
  fromBlank?: boolean;
  digitStagger?: number;
};

const DIGITS = '0123456789';

/** Advance width of each digit, in em, for one element's computed face. */
const widthCache = new Map<string, number[]>();

function measureDigits(el: HTMLElement): number[] {
  const cs = getComputedStyle(el);
  const size = parseFloat(cs.fontSize) || 16;
  const font = `${cs.fontStyle} ${cs.fontWeight} ${size}px ${cs.fontFamily}`;
  const cached = widthCache.get(font);
  if (cached) return cached;

  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return Array(10).fill(0.5);
  ctx.font = font;
  const widths = [...DIGITS].map((d) => ctx.measureText(d).width / size);
  widthCache.set(font, widths);
  return widths;
}

function makeCell(char: string, widthEm: number | null): HTMLSpanElement {
  const cell = document.createElement('span');
  cell.textContent = char;
  cell.style.display = 'block';
  cell.style.height = '1em';
  cell.style.lineHeight = '1';
  cell.style.textAlign = 'center';
  if (widthEm !== null) cell.style.width = `${widthEm}em`;
  return cell;
}

type Place = {
  /** The clipped window one glyph tall. */
  window: HTMLSpanElement;
  /** The column that slides inside it. */
  column: HTMLSpanElement;
  /** How many cells up it has to travel. */
  steps: number;
  fromWidth: number;
  toWidth: number;
};

/**
 * Rolls `el` to `target`. Any non-digit in the target (`:`, `+`, `%`) is laid
 * out as a static cell so separators keep their place while the digits move.
 */
export function rollOdometer(el: HTMLElement, target: string, opts: RollOptions = {}) {
  const duration = opts.duration ?? ODOMETER.duration;
  const ease = opts.ease ?? ODOMETER.ease;
  const cycles = opts.cycles ?? ODOMETER.cycles;
  const digitStagger = opts.digitStagger ?? ODOMETER.digitStagger;
  const fromBlank = opts.fromBlank ?? false;

  const widths = measureDigits(el);
  const previous = (el.dataset.odometerValue ?? '').padStart(target.length, ' ');

  el.textContent = '';
  el.style.display = 'inline-flex';
  el.style.alignItems = 'flex-start';
  el.style.lineHeight = '1';
  el.dataset.odometerValue = target;

  const places: Place[] = [];
  const statics: HTMLSpanElement[] = [];

  [...target].forEach((char, i) => {
    if (!/\d/.test(char)) {
      const cell = makeCell(char, null);
      cell.dataset.odometerPart = 'static';
      el.appendChild(cell);
      statics.push(cell);
      return;
    }

    const to = Number(char);
    const prevChar = previous[i];
    const from = fromBlank || !/\d/.test(prevChar) ? 0 : Number(prevChar);

    const window_ = document.createElement('span');
    window_.style.display = 'block';
    window_.style.overflow = 'hidden';
    window_.style.height = '1em';
    window_.style.width = `${widths[from]}em`;

    const column = document.createElement('span');
    column.style.display = 'block';
    column.style.willChange = 'transform';

    // Travel from `from` up through `cycles` passes of 0-9 and stop on `to`.
    const steps = cycles * 10 + ((to - from + 10) % 10);
    for (let s = 0; s <= steps; s += 1) {
      column.appendChild(makeCell(DIGITS[(from + s) % 10], widths[(from + s) % 10]));
    }

    window_.appendChild(column);
    el.appendChild(window_);
    places.push({ window: window_, column, steps, fromWidth: widths[from], toWidth: widths[to] });
  });

  const tl = gsap.timeline();

  if (fromBlank) {
    // Both of these are routinely empty — a plain "96" has no separators, and
    // a label with no digits has no places. gsap warns on an empty target
    // rather than no-opping, and five of those per page load is five warnings
    // that train you to ignore the console.
    if (places.length) {
      gsap.set(
        places.map((p) => p.window),
        { width: 0 },
      );
    }
    if (statics.length) gsap.set(statics, { opacity: 0 });
    places.forEach((p) => {
      tl.to(
        p.window,
        {
          width: `${p.fromWidth}em`,
          duration: ODOMETER.reveal.duration,
          ease: ODOMETER.reveal.ease,
        },
        0,
      );
    });
    statics.forEach((s) => tl.to(s, { opacity: 1, duration: 0.2 }, 0));
  }

  places.forEach((place, i) => {
    // Right to left: the last place carries no delay, the first the most.
    const delay = (places.length - 1 - i) * digitStagger;
    tl.to(place.column, { y: `${-place.steps}em`, duration, ease, force3D: true }, delay);
    tl.to(place.window, { width: `${place.toWidth}em`, duration, ease }, delay);
  });

  return tl;
}

/** Renders `target` with no animation — the reduced-motion and SSR path. */
export function setOdometer(el: HTMLElement, target: string) {
  el.textContent = target;
  el.dataset.odometerValue = target;
  el.style.display = '';
}

/** Resolves once the display face is available, so widths measure true. */
export function fontsReady(): Promise<void> {
  if (!document.fonts) return Promise.resolve();
  return document.fonts.ready.then(() => undefined);
}
