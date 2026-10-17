/**
 * Frame-rate independent exponential smoothing.
 *
 * The reference smooths its wheel by hand, once per frame:
 *
 *   current += (target - current) * 0.12
 *
 * which is correct on the 60Hz display it was written for and wrong everywhere
 * else. The expression has no notion of elapsed time, so on a 144Hz screen it
 * runs 2.4x as often and the page converges 2.4x faster: the same site feels
 * noticeably tighter on better hardware, for no reason anybody chose.
 *
 * What the constant actually encodes is a *retention* per frame -- 88% of the
 * remaining distance survives each 1/60s. Expressed as a half-life that is
 *
 *   ln(0.5) / ln(0.88) = 5.42 frames = 90ms
 *
 * and a half-life is a property of the motion rather than of the monitor. So
 * the number is kept exactly as the reference wrote it and converted here,
 * once, instead of being re-tuned by eye.
 */

/** The reference's own 60fps frame time. */
const REF_FRAME_SEC = 1 / 60;

/**
 * Move `current` towards `target` by a per-frame-at-60fps factor, corrected for
 * however long this frame actually took.
 *
 * `dtSec` is clamped before use: a tab returning from the background hands the
 * first frame a delta of several seconds, and without the clamp that single
 * frame would snap straight to the target and throw away the smoothing the
 * visitor is about to see.
 */
export function damp(current: number, target: number, lerpAt60: number, dtSec: number): number {
  const dt = Math.min(Math.max(dtSec, 0), 0.1);
  const retention = Math.pow(1 - lerpAt60, dt / REF_FRAME_SEC);
  return target + (current - target) * retention;
}

/** The half-life, in ms, that a per-frame-at-60fps factor works out to. */
export function halfLifeMs(lerpAt60: number): number {
  return (Math.log(0.5) / Math.log(1 - lerpAt60)) * REF_FRAME_SEC * 1000;
}

/** Clamp, because every file below wants one. */
export const clamp = (v: number, lo: number, hi: number): number => (v < lo ? lo : v > hi ? hi : v);
