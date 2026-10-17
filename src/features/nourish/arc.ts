/**
 * Arc geometry, shared by the calorie gauge and the macro rings.
 *
 * Angles are degrees **clockwise from twelve o'clock**, which is how a
 * progress ring is actually described — "it starts at the top and fills
 * clockwise" — rather than SVG's own east-is-zero convention. Getting that
 * wrong is a quarter turn, and a quarter turn on a ring looks like a data bug
 * rather than a drawing one.
 */

/** A point on the circle, in the SVG's own coordinates (y grows downward). */
export function polar(cx: number, cy: number, r: number, deg: number) {
  const a = ((deg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
}

/**
 * The `d` for an arc from `from` to `to`, clockwise.
 *
 * A full 360 is drawn as two halves: a single `A` command whose start and end
 * coincide draws nothing at all, which is how a ring at 100% disappears.
 */
export function arcPath(cx: number, cy: number, r: number, from: number, to: number) {
  const sweep = to - from;
  if (sweep >= 359.999) {
    const half = polar(cx, cy, r, from + 180);
    const start = polar(cx, cy, r, from);
    return [
      `M ${start.x} ${start.y}`,
      `A ${r} ${r} 0 0 1 ${half.x} ${half.y}`,
      `A ${r} ${r} 0 0 1 ${start.x} ${start.y}`,
    ].join(' ');
  }
  const a = polar(cx, cy, r, from);
  const b = polar(cx, cy, r, to);
  return `M ${a.x} ${a.y} A ${r} ${r} 0 ${sweep > 180 ? 1 : 0} 1 ${b.x} ${b.y}`;
}
