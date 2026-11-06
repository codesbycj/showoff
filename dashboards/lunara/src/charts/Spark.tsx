import { linePath } from '@/charts/path';
import { scale } from '@/charts/scale';

/**
 * The seven-day sparkline in the markets table.
 *
 * It is drawn from the same series the row's 7d percentage is computed from,
 * so the line and the number cannot disagree — the defect in most market
 * tables, where the sparkline is decoration generated separately.
 *
 * `aria-hidden`, because the row already states the figure in text. A chart
 * that repeats its own row's number is decoration for a screen reader.
 */
export function Spark({
  values,
  up,
  width = 96,
  height = 30,
}: {
  values: number[];
  up: boolean;
  width?: number;
  height?: number;
}) {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const y = scale([lo, hi], [height - 3, 3]);
  const pts = values.map((v, i) => ({ x: (i / (values.length - 1)) * width, y: y(v) }));

  return (
    <svg width={width} height={height} aria-hidden="true" focusable="false" className="shrink-0">
      <path
        d={linePath(pts)}
        fill="none"
        stroke={up ? 'var(--color-positive)' : 'var(--color-danger)'}
        strokeWidth="1.6"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
