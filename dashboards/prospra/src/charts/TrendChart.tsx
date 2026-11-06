import { useState } from 'react';

import { ref, useDefIds } from '@/charts/ids';
import { areaPath, smoothPath } from '@/charts/path';
import { niceTicks, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import { useMeasure } from '@/lib/useMeasure';

export interface TrendPoint {
  label: string;
  /** Null once the month has not happened yet — the actual line stops there. */
  actual: number | null;
  forecast: number;
  plan: number;
}

/**
 * Revenue: actual against forecast against plan.
 *
 * The reference's strongest block, and the one convention most dashboards in
 * this category miss — three series and a visible boundary between what
 * happened and what is projected. The actual line is solid and stops at the
 * last closed month; the forecast continues dashed from there; the plan runs
 * flat behind both.
 *
 * Every mark is computed from the deck (rule 6): change a month and the
 * boundary, the ticks and the three paths all move.
 */
export function TrendChart({
  points,
  partialLabel,
  format,
  label,
}: {
  points: TrendPoint[];
  /** The month that is still in progress, drawn with its own marker. */
  partialLabel: string;
  format: (n: number) => string;
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const ids = useDefIds('fill');

  const padTop = 14;
  const padBottom = 24;
  const padLeft = 54;
  const padRight = 6;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const plotH = Math.max(1, h - padTop - padBottom);

  const all = points.flatMap((p) => [p.actual ?? 0, p.forecast, p.plan]);
  const hi = Math.max(...all);
  const y = scale([0, hi], [padTop + plotH, padTop]);
  const x = (i: number) => padLeft + (i / Math.max(1, points.length - 1)) * plotW;
  const ticks = niceTicks([0, hi], 4).filter((t) => t <= hi);

  const actualPts = points
    .map((p, i) => ({ p, i }))
    .filter(({ p }) => p.actual !== null)
    .map(({ p, i }) => ({ x: x(i), y: y(p.actual as number) }));
  const forecastPts = points.map((p, i) => ({ x: x(i), y: y(p.forecast) }));
  const planPts = points.map((p, i) => ({ x: x(i), y: y(p.plan) }));

  const boundary = points.findIndex((p) => p.label === partialLabel);
  const current = hover !== null ? points[hover] : null;

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <>
          <svg width={w} height={h} role="img" aria-label={label}>
            <defs>
              <linearGradient id={ids.fill} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={padLeft}
                  x2={w - padRight}
                  y1={y(t)}
                  y2={y(t)}
                  stroke="var(--color-line)"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 10}
                  y={y(t) + 4}
                  textAnchor="end"
                  className="fill-[var(--color-muted)] text-[11px]"
                >
                  {format(t)}
                </text>
              </g>
            ))}

            {/* The plan: flattest, furthest back. */}
            <path
              d={smoothPath(planPts)}
              fill="none"
              stroke="var(--color-sunken-deep)"
              strokeWidth="2"
            />

            {/* The forecast, dashed across its whole length — it is a
                projection before the boundary too, just one we can check. */}
            <path
              d={smoothPath(forecastPts)}
              fill="none"
              stroke="var(--color-accent-deep)"
              strokeWidth="1.8"
              strokeDasharray="5 4"
            />

            {actualPts.length > 1 ? (
              <>
                <path
                  d={areaPath(
                    smoothPath(actualPts),
                    actualPts[0].x,
                    actualPts[actualPts.length - 1].x,
                    padTop + plotH,
                  )}
                  fill={ref(ids.fill)}
                />
                <path
                  d={smoothPath(actualPts)}
                  fill="none"
                  stroke="var(--color-accent)"
                  strokeWidth="2.6"
                  strokeLinejoin="round"
                />
              </>
            ) : null}

            {/* Where the record stops and the projection starts. */}
            {boundary >= 0 ? (
              <g>
                <line
                  x1={x(boundary)}
                  x2={x(boundary)}
                  y1={padTop}
                  y2={padTop + plotH}
                  stroke="var(--color-accent-deep)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  opacity="0.6"
                />
                <circle
                  cx={x(boundary)}
                  cy={y(points[boundary].actual ?? 0)}
                  r="4.5"
                  fill="var(--color-accent-deep)"
                />
              </g>
            ) : null}

            {points.map((p, i) => (
              <text
                key={p.label}
                x={x(i)}
                y={h - 6}
                textAnchor={i === 0 ? 'start' : i === points.length - 1 ? 'end' : 'middle'}
                className="fill-[var(--color-muted)] text-[11px]"
              >
                {p.label}
              </text>
            ))}

            {hover !== null ? (
              <line
                x1={x(hover)}
                x2={x(hover)}
                y1={padTop}
                y2={padTop + plotH}
                stroke="var(--color-accent-deep)"
                strokeWidth="1"
                pointerEvents="none"
              />
            ) : null}

            {points.map((p, i) => (
              <rect
                key={p.label}
                data-mark={'m-' + p.label.toLowerCase()}
                x={x(i) - plotW / points.length / 2}
                y={padTop}
                width={plotW / points.length}
                height={plotH}
                fill="transparent"
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover((cur) => (cur === i ? null : cur))}
              />
            ))}
          </svg>

          {current ? (
            <Tip
              x={Math.min(Math.max(x(hover as number), 92), Math.max(92, w - 92))}
              y={y(current.actual ?? current.forecast) - 12}
            >
              <span className="text-muted block text-[11px]">
                {current.label}
                {current.label === partialLabel ? ' · in progress' : ''}
              </span>
              <span className="mt-1 block">
                <span className="text-accent-deep font-bold">
                  {current.actual === null ? '—' : format(current.actual)}
                </span>
                <span className="text-muted"> actual</span>
              </span>
              <span className="text-muted block text-[11px]">
                {format(current.forecast)} forecast · {format(current.plan)} plan
              </span>
            </Tip>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
