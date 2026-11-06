/**
 * A seeded generator, because the data has to be the same every reload.
 *
 * Math.random() reshuffles between the probe, the rehearsal and the take, so
 * the chart that was measured is not the chart that gets filmed and every
 * numeric diff against an earlier shot is meaningless. mulberry32: tiny, fast,
 * and good enough for plausible-looking figures.
 */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return function next() {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** An integer in [min, max], from a seeded stream. */
export const between = (next: () => number, min: number, max: number) =>
  Math.round(min + next() * (max - min));
