/**
 * Reading a value off a keyframe table, the way the reference's runtime does.
 *
 * Two rules that are easy to get wrong and change the whole feel:
 *
 *  - A track is *clamped*, not extrapolated. A property whose first keyframe is
 *    at 30% holds that keyframe's value for the whole of 0-30%; it does not
 *    start drifting towards it from 0. The cards sit perfectly still below the
 *    fold for the first third of the section because of this, and a track that
 *    extrapolated would have them creeping up from the moment the section was
 *    touched.
 *  - The easing belongs to the keyframe being travelled *to*, not the one being
 *    left. That is where Webflow stores it, and the colour track depends on it:
 *    the white -> blue leg is linear and the blue -> blue leg is eased, and
 *    they share the keyframe in between.
 */
import { EASING, type Ease, type Key } from '@/motion/motion';

/**
 * A cubic-bezier timing function, Newton-Raphson on x then evaluate y.
 *
 * Four iterations is enough for the three curves in use here — none of them has
 * a flat spot, so the derivative never collapses and it converges well inside a
 * pixel. A bisection fallback would be dead code.
 */
function bezier(ease: Ease, x: number): number {
  const [x1, y1, x2, y2] = EASING[ease];
  if (ease === 'linear') return x;

  const cx = 3 * x1;
  const bx = 3 * (x2 - x1) - cx;
  const ax = 1 - cx - bx;
  const cy = 3 * y1;
  const by = 3 * (y2 - y1) - cy;
  const ay = 1 - cy - by;

  let t = x;
  for (let i = 0; i < 4; i++) {
    const err = ((ax * t + bx) * t + cx) * t - x;
    const d = (3 * ax * t + 2 * bx) * t + cx;
    if (Math.abs(d) < 1e-6) break;
    t -= err / d;
  }
  return ((ay * t + by) * t + cy) * t;
}

/** Where `p` sits between two keyframes, eased, as 0-1. */
function leg<T>(from: Key<T>, to: Key<T>, p: number): number {
  const span = to.at - from.at;
  if (span <= 0) return 1;
  return bezier(to.ease, (p - from.at) / span);
}

/**
 * Sample a numeric track at section progress `p` (0-100).
 *
 * `keys` must be in ascending order of `at`; the tables in motion.ts are
 * written that way so they read like the reference's own keyframe list.
 */
export function sample(keys: Key<number>[], p: number): number {
  if (p <= keys[0].at) return keys[0].to;
  const last = keys[keys.length - 1];
  if (p >= last.at) return last.to;

  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i].at) {
      const a = keys[i - 1];
      const b = keys[i];
      return a.to + (b.to - a.to) * leg(a, b, p);
    }
  }
  return last.to;
}

type Rgb = [number, number, number];

function parseHex(hex: string): Rgb {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

/**
 * Sample a colour track, interpolating in plain sRGB.
 *
 * Deliberately not in a perceptual space: the reference animates the raw
 * channel values its action items carry, and the whole track runs between a
 * white and two near-identical light blues, where sRGB and OKLab are visually
 * the same path anyway. Matching the reference wins over being clever.
 */
export function sampleColor(keys: Key<string>[], p: number): string {
  const at = (key: Key<string>) => parseHex(key.to);
  const css = ([r, g, b]: Rgb) => `rgb(${Math.round(r)} ${Math.round(g)} ${Math.round(b)})`;

  if (p <= keys[0].at) return css(at(keys[0]));
  const last = keys[keys.length - 1];
  if (p >= last.at) return css(at(last));

  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i].at) {
      const a = at(keys[i - 1]);
      const b = at(keys[i]);
      const t = leg(keys[i - 1], keys[i], p);
      return css([a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t]);
    }
  }
  return css(at(last));
}

/**
 * Travel from `value` at `from` to zero at `to`, eased — the shape both card
 * tracks have. Written out rather than built as a `Key[]` per card because the
 * only thing that varies between the three cards is where they land, and a
 * table of three near-identical tables reads worse than this does.
 */
export function settle(value: number, from: number, to: number, p: number): number {
  if (p <= from) return value;
  if (p >= to) return 0;
  return value * (1 - bezier('easeInOut', (p - from) / (to - from)));
}
