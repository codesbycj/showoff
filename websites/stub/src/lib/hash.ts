/**
 * A tiny deterministic generator, used to draw the barcode and the block mark.
 *
 * Deterministic on purpose. Both of those are decoration rather than data, and
 * `Math.random` would redraw them on every re-render — the mark on the back of
 * a card would reshuffle itself mid-flip. Seeding from the ticket's own serial
 * means each card gets a stable pattern that is also visibly its own.
 */

/** FNV-1a, 32-bit. */
export function seedFrom(text: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < text.length; i++) {
    h ^= text.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

/** Mulberry32. Returns a function giving successive values in [0, 1). */
export function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
