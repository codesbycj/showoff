import { smoothPath } from '@/charts/path';
import { scale } from '@/charts/scale';
import { useMeasure } from '@/lib/useMeasure';

/**
 * The trace under each activity tile.
 *
 * Decorative in the reference, and still decorative here — but drawn from the
 * deck's own seeded series rather than a hand-written `d`, so it cannot drift
 * away from the figure it sits under.
 */
export function Spark({
  values,
  stroke,
  label,
}: {
  values: number[];
  stroke: string;
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);

  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const y = scale([lo, hi], [h - 3, 3]);
  const pts = values.map((v, i) => ({ x: (i / (values.length - 1)) * w, y: y(v) }));

  return (
    <div ref={wrap} className="min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <svg width={w} height={h} role="img" aria-label={label}>
          <path
            d={smoothPath(pts)}
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : null}
    </div>
  );
}
