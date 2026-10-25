import { useState } from 'react';

import { areaPath, linePath, smoothPath, type Pt } from '@/charts/path';
import { extent, scale } from '@/charts/scale';
import { useDefIds, ref } from '@/charts/ids';
import { useMeasure } from '@/lib/useMeasure';

/**
 * A small area chart with a movable read-out.
 *
 * The gradient's id comes from `useId` through `useDefIds`: SVG def ids are
 * document-global, so two sparklines declaring the same one would collapse into
 * the first and every chart after it would paint in that one's colour, with no
 * error anywhere.
 */
export function Sparkline({
  values,
  label,
  unit = 'h',
  height = 92,
}: {
  values: number[];
  label: string;
  unit?: string;
  height?: number;
}) {
  const [box, size] = useMeasure<HTMLDivElement>();
  const ids = useDefIds('fill');
  const [at, setAt] = useState<number | null>(null);

  const [lo, hi] = extent(values);
  const pad = 10;
  const x = scale([0, values.length - 1], [0, Math.max(0, size.w)]);
  const y = scale([Math.min(lo, 0), hi || 1], [height - pad, pad]);
  const pts: Pt[] = values.map((v, i) => ({ x: x(i), y: y(v) }));

  const line = values.length > 2 ? smoothPath(pts) : linePath(pts);
  const active = at === null ? values.length - 1 : at;
  const here = pts[active];

  return (
    <div className="w-full">
      <div className="flex items-baseline justify-between">
        <span className="text-muted text-[11.5px] font-medium tracking-[0.03em] uppercase">
          {label}
        </span>
        <span data-spark-value className="text-ink text-[13px] font-semibold">
          {values[active]}
          {unit}
          <span className="text-muted ml-1.5 text-[11.5px] font-medium">day {active + 1}</span>
        </span>
      </div>

      <div ref={box} style={{ height }} className="relative mt-2 w-full">
        {size.w > 0 ? (
          <>
            <svg
              width={size.w}
              height={height}
              viewBox={'0 0 ' + size.w + ' ' + height}
              role="img"
              aria-label={label + ': ' + values.join(', ') + ' ' + unit}
            >
              <defs>
                <linearGradient id={ids.fill} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-spark)" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="var(--color-spark)" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath(line, 0, size.w, height)} fill={ref(ids.fill)} />
              <path
                d={line}
                fill="none"
                stroke="var(--color-spark)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1={here.x}
                x2={here.x}
                y1={0}
                y2={height}
                stroke="var(--color-line)"
                strokeWidth="1"
              />
              <circle
                cx={here.x}
                cy={here.y}
                r="4"
                fill="var(--color-surface)"
                stroke="var(--color-spark)"
                strokeWidth="2.5"
              />
            </svg>

            {values.map((v, i) => (
              <button
                key={i}
                type="button"
                data-spark={i}
                aria-label={'Day ' + (i + 1) + ', ' + v + unit}
                onMouseEnter={() => setAt(i)}
                onMouseLeave={() => setAt(null)}
                onFocus={() => setAt(i)}
                onBlur={() => setAt(null)}
                style={{ left: (i / values.length) * size.w, width: size.w / values.length }}
                className="absolute inset-y-0"
              />
            ))}
          </>
        ) : null}
      </div>
    </div>
  );
}
