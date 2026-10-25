/**
 * Chart maths. Shared across episodes because it is not a design decision;
 * everything about how a chart *looks* lives in the episode’s own component.
 */
export type Extent = [number, number];

export const extent = (values: number[]): Extent => [Math.min(...values), Math.max(...values)];

/** Map a value from a domain onto a range. */
export function scale(domain: Extent, range: Extent) {
  const [d0, d1] = domain;
  const [r0, r1] = range;
  const span = d1 - d0 || 1;
  return (v: number) => r0 + ((v - d0) / span) * (r1 - r0);
}

/**
 * Ticks on round numbers, from the data rather than from a guess.
 * Four or five of them is right for a dashboard card.
 */
export function niceTicks([min, max]: Extent, count = 5): number[] {
  const span = max - min || 1;
  const rough = span / Math.max(1, count - 1);
  const mag = Math.pow(10, Math.floor(Math.log10(rough)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= rough) ?? 10 * mag;
  const start = Math.floor(min / step) * step;
  const out: number[] = [];
  /*
   * The loop runs past `max`, not up to it.
   *
   * Stopping at `max` can leave the top tick *below* the largest value — with
   * max 110,450 and a step of 50,000 the ticks end at 100,000 — and every chart
   * here maps its plot height onto the last tick. The tallest bar then came out
   * at 110% of the plot and ran off the top of the card, and a line chart
   * clipped its own peak. Caught in episode 5, present since episode 1.
   */
  for (let v = start; v < max + step; v += step) out.push(Math.round(v * 1e6) / 1e6);
  return out;
}

/** Round for SVG: three decimals keeps paths short without visible drift. */
export const r3 = (n: number) => Math.round(n * 1000) / 1000;
