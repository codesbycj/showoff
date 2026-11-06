import { useState } from 'react';

import { ref, useDefIds } from '@/charts/ids';
import { areaPath, smoothPath, type Pt } from '@/charts/path';
import { r3, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import { useMeasure } from '@/lib/useMeasure';

export interface TrendPoint {
  at: string;
  value: number;
}

/**
 * The share of the ward in the lowest escalation band, hour by hour.
 *
 * The target is a line across the whole chart rather than a second series: it
 * is the same number every hour, and drawing it four times says otherwise.
 */
export function TrendArea({
  points,
  target,
  label,
}: {
  points: TrendPoint[];
  target: number;
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const ids = useDefIds('fill');

  const padTop = 10;
  const padBottom = 16;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotH = Math.max(1, h - padTop - padBottom);

  const values = points.map((p) => p.value).concat(target);
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const pad = (hi - lo) * 0.14 || 4;
  const y = scale([lo - pad, hi + pad], [padTop + plotH, padTop]);
  const x = (i: number) => (points.length < 2 ? w / 2 : (i / (points.length - 1)) * (w - 2) + 1);

  const pts: Pt[] = points.map((p, i) => ({ x: x(i), y: y(p.value) }));
  const line = smoothPath(pts);

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <svg
          width={w}
          height={h}
          role="img"
          aria-label={label}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={ids.fill} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.45" />
              <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          <path
            d={areaPath(line, pts[0].x, pts[pts.length - 1].x, padTop + plotH)}
            fill={ref(ids.fill)}
          />
          <path
            d={line}
            fill="none"
            stroke="var(--color-accent-deep)"
            strokeWidth="2"
            strokeLinejoin="round"
          />

          {/* The target, once. */}
          <line
            x1="0"
            x2={w}
            y1={y(target)}
            y2={y(target)}
            stroke="var(--color-muted)"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {points.map((p, i) => (
            <circle
              key={p.at}
              cx={r3(x(i))}
              cy={r3(y(p.value))}
              r={hover === i ? 4.5 : 3}
              fill="var(--color-surface)"
              stroke="var(--color-accent-deep)"
              strokeWidth="2"
            />
          ))}

          {points.map((p, i) => (
            <rect
              key={'hit' + p.at}
              data-mark={'hour-' + p.at.replace(':', '')}
              x={r3(x(i) - w / Math.max(1, points.length * 2))}
              y={0}
              width={r3(w / Math.max(1, points.length))}
              height={h}
              fill="transparent"
              onPointerEnter={() => setHover(i)}
            />
          ))}
        </svg>
      ) : null}

      {hover !== null ? (
        <Tip
          x={Math.min(Math.max(x(hover), 62), Math.max(62, w - 62))}
          y={y(points[hover].value) - 8}
        >
          <span className="text-muted block text-[11px]">{points[hover].at}</span>
          <span className="tnum font-bold">{points[hover].value.toFixed(0)}% in band 0–4</span>
        </Tip>
      ) : null}
    </div>
  );
}
