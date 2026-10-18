/**
 * A smooth path through a set of points.
 *
 * The reference's chart is two hand-drawn waves, not a polyline — joining the
 * points with straight segments reads as a different chart entirely, all
 * corners where the design has none.
 *
 * This is a Catmull-Rom spline converted to cubic Béziers, which is the
 * standard way to get a curve that actually passes *through* its points rather
 * than being pulled towards them. `tension` of 6 is the usual choice: lower
 * overshoots into loops on a steep step, higher flattens the curve back
 * towards the polyline it came from.
 *
 * Points arrive normalised — x and y both 0..1, with y measured from the
 * bottom, which is how a chart is actually described — and are mapped into the
 * SVG's own coordinates here, where y grows downward.
 */
export type Point = { x: number; y: number };

export function toPixels(points: readonly Point[], width: number, height: number): Point[] {
  return points.map((p) => ({ x: p.x * width, y: (1 - p.y) * height }));
}

export function smoothPath(points: readonly Point[]): string {
  if (points.length < 2) return '';

  const d: string[] = [`M ${points[0].x} ${points[0].y}`];

  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] ?? points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] ?? p2;

    const c1 = { x: p1.x + (p2.x - p0.x) / 6, y: p1.y + (p2.y - p0.y) / 6 };
    const c2 = { x: p2.x - (p3.x - p1.x) / 6, y: p2.y - (p3.y - p1.y) / 6 };

    d.push(`C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${p2.x} ${p2.y}`);
  }

  return d.join(' ');
}
