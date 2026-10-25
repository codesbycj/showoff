import { r3 } from '@/charts/scale';

export interface Pt {
  x: number;
  y: number;
}

export const linePath = (pts: Pt[]) =>
  pts.map((p, i) => (i ? 'L' : 'M') + r3(p.x) + ' ' + r3(p.y)).join(' ');

/**
 * A monotone cubic through the points: smooth, and it never overshoots into a
 * value the data does not contain -- which a plain cardinal spline does, and
 * which puts a revenue curve below zero between two positive weeks.
 */
export function smoothPath(pts: Pt[], tension = 0.35): string {
  if (pts.length < 2) return pts.length ? 'M' + r3(pts[0].x) + ' ' + r3(pts[0].y) : '';
  let d = 'M' + r3(pts[0].x) + ' ' + r3(pts[0].y);
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2] ?? p2;
    const c1 = {
      x: p1.x + ((p2.x - p0.x) / 6) * tension * 2,
      y: p1.y + ((p2.y - p0.y) / 6) * tension * 2,
    };
    const c2 = {
      x: p2.x - ((p3.x - p1.x) / 6) * tension * 2,
      y: p2.y - ((p3.y - p1.y) / 6) * tension * 2,
    };
    d +=
      ' C' +
      r3(c1.x) +
      ' ' +
      r3(c1.y) +
      ',' +
      r3(c2.x) +
      ' ' +
      r3(c2.y) +
      ',' +
      r3(p2.x) +
      ' ' +
      r3(p2.y);
  }
  return d;
}

/** Close a line down to a baseline to make an area. */
export const areaPath = (d: string, x0: number, x1: number, baseline: number) =>
  d + ' L' + r3(x1) + ' ' + r3(baseline) + ' L' + r3(x0) + ' ' + r3(baseline) + ' Z';

/** A donut/arc segment, angles in degrees clockwise from 12 o’clock. */
export function arcPath(
  cx: number,
  cy: number,
  rOuter: number,
  rInner: number,
  a0: number,
  a1: number,
): string {
  const rad = (a: number) => ((a - 90) * Math.PI) / 180;
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const p = (r: number, a: number) =>
    r3(cx + r * Math.cos(rad(a))) + ' ' + r3(cy + r * Math.sin(rad(a)));
  return (
    'M' +
    p(rOuter, a0) +
    ' A' +
    r3(rOuter) +
    ' ' +
    r3(rOuter) +
    ' 0 ' +
    large +
    ' 1 ' +
    p(rOuter, a1) +
    ' L' +
    p(rInner, a1) +
    ' A' +
    r3(rInner) +
    ' ' +
    r3(rInner) +
    ' 0 ' +
    large +
    ' 0 ' +
    p(rInner, a0) +
    ' Z'
  );
}
