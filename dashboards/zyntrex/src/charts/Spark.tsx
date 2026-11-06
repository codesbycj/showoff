import { linePath, type Pt } from '@/charts/path';
import { scale } from '@/charts/scale';

/**
 * The market table's trend column: seven closes, nothing else.
 *
 * No axis and no tooltip — a sparkline's whole job is the shape beside the
 * number, and the number is in the next column. Its colour is the week's
 * direction, which is the only thing it can be read for at this size.
 */
export function Spark({
  values,
  label,
  w = 86,
  h = 28,
}: {
  values: number[];
  label: string;
  w?: number;
  h?: number;
}) {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo) * 0.2 || hi * 0.005;
  const y = scale([lo - pad, hi + pad], [h - 2, 2]);
  const pts: Pt[] = values.map((v, i) => ({ x: (i / (values.length - 1)) * (w - 2) + 1, y: y(v) }));
  const rising = values[values.length - 1] >= values[0];

  return (
    <svg width={w} height={h} role="img" aria-label={label} className="shrink-0">
      <path
        d={linePath(pts)}
        fill="none"
        stroke={rising ? 'var(--color-positive)' : 'var(--color-danger)'}
        strokeWidth="1.5"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
