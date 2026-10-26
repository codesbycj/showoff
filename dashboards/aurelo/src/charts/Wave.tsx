import { smoothPath } from '@/charts/path';
import { scale } from '@/charts/scale';

/**
 * The little wave beside the balance. Decorative in the reference, and still
 * decorative here — but drawn from the deck's own seeded series rather than a
 * hand-written `d`, so it cannot drift away from the figure it sits next to.
 */
export function Wave({
  values,
  w = 64,
  h = 26,
  label,
}: {
  values: number[];
  w?: number;
  h?: number;
  label: string;
}) {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const y = scale([lo, hi], [h - 3, 3]);
  const pts = values.map((v, i) => ({ x: (i / (values.length - 1)) * w, y: y(v) }));

  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} role="img" aria-label={label}>
      <path
        d={smoothPath(pts)}
        fill="none"
        stroke="var(--color-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
