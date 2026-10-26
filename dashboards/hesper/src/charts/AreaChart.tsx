import { useState } from 'react';

import { ref, useDefIds } from '@/charts/ids';
import { areaPath, smoothPath } from '@/charts/path';
import { niceTicks, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import { num } from '@/lib/format';
import { useMeasure } from '@/lib/useMeasure';

/**
 * Profit over a range — the card the reference tints.
 *
 * Drawn, not imported, and computed from the deck: the headline is the sum of
 * these points, so changing one moves both (rule 6). The plot is scaled to
 * the data's own maximum and the gridlines are the nice values that fit
 * *under* it — scaling onto the tick above the maximum instead leaves the
 * peak at three-quarters height with a band of empty card over it, and a tick
 * loop that stops at the maximum can put the peak outside the plot entirely.
 *
 * `gridColor` exists because this chart sits on the tinted card: the page's
 * hairline grey is invisible on `#daebf2`, and a gridline nobody can see is
 * an axis nobody can read.
 */
export function AreaChart({
  values,
  ticks,
  format,
  label,
  pointLabel,
  unit = '',
  gridColor = 'var(--color-line)',
}: {
  values: number[];
  ticks: string[];
  format: (n: number) => string;
  label: string;
  /** The tooltip's first line — the reference puts the date there. */
  pointLabel?: (i: number) => string;
  /** What the tooltip's figure counts: "in fees". */
  unit?: string;
  gridColor?: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const ids = useDefIds('fill');

  const padTop = 14;
  const padBottom = 26;
  const padRight = 2;
  const padLeft = 54;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const plotH = Math.max(1, h - padTop - padBottom);

  const hi = Math.max(...values);
  /* Zero, not the series' own floor: a money axis that starts at its minimum
     puts the quietest day on the bottom edge, where it reads as having billed
     nothing at all. */
  const base = 0;
  const y = scale([base, hi], [padTop + plotH, padTop]);
  const x = (i: number) => padLeft + (i / Math.max(1, values.length - 1)) * plotW;

  const gridValues = niceTicks([base, hi], 4).filter((t) => t >= base && t <= hi);
  const pts = values.map((v, i) => ({ x: x(i), y: y(v) }));
  const line = smoothPath(pts);

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <>
          <svg width={w} height={h} role="img" aria-label={label}>
            <defs>
              <linearGradient id={ids.fill} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.55" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.04" />
              </linearGradient>
            </defs>

            {gridValues.map((v) => (
              <g key={v}>
                <line
                  x1={padLeft}
                  x2={w - padRight}
                  y1={y(v)}
                  y2={y(v)}
                  stroke={gridColor}
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={padLeft - 10}
                  y={y(v) + 4}
                  textAnchor="end"
                  className="fill-[var(--color-muted)] text-[11px]"
                >
                  {format(v)}
                </text>
              </g>
            ))}

            <path
              d={areaPath(line, pts[0].x, pts[pts.length - 1].x, padTop + plotH)}
              fill={ref(ids.fill)}
            />
            <path
              d={line}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.2"
              strokeLinejoin="round"
            />

            {ticks.map((t, i) => (
              <text
                key={t}
                x={padLeft + (i / Math.max(1, ticks.length - 1)) * plotW}
                y={h - 7}
                textAnchor={i === 0 ? 'start' : i === ticks.length - 1 ? 'end' : 'middle'}
                className="fill-[var(--color-muted)] text-[11px]"
              >
                {t}
              </text>
            ))}

            {hover !== null ? (
              <g pointerEvents="none">
                {/* The reference marks a point with a dot and a dropped
                    rule. The column under it is lit as well, because a
                    hairline alone is hard to see against the tint. */}
                <rect
                  x={x(hover) - plotW / values.length / 2}
                  y={padTop}
                  width={plotW / values.length}
                  height={plotH}
                  fill="var(--color-accent)"
                  opacity="0.12"
                />
                <line
                  x1={x(hover)}
                  x2={x(hover)}
                  y1={padTop}
                  y2={padTop + plotH}
                  stroke="var(--color-accent)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <circle cx={x(hover)} cy={y(values[hover])} r="5" fill="var(--color-accent)" />
                <circle cx={x(hover)} cy={y(values[hover])} r="2" fill="var(--color-surface)" />
              </g>
            ) : null}

            {/*
              One hit column per point. A single overlay would give the harness
              exactly one hoverable selector, and the beats file needs to put
              the pointer on a *named* point.
            */}
            {values.map((_, i) => (
              <rect
                key={i}
                data-mark={'pt-' + i}
                x={x(i) - plotW / values.length / 2}
                y={padTop}
                width={plotW / values.length}
                height={plotH}
                fill="transparent"
                onPointerEnter={() => setHover(i)}
                onPointerLeave={() => setHover((cur) => (cur === i ? null : cur))}
              />
            ))}
          </svg>

          {hover !== null ? (
            <Tip
              x={Math.min(Math.max(x(hover), 76), Math.max(76, w - 76))}
              y={y(values[hover]) - 12}
            >
              {pointLabel ? (
                <>
                  <span className="text-muted block text-[11px]">{pointLabel(hover)}</span>
                  <span className="tnum mt-0.5 block">
                    <span className="text-accent font-bold">{num(values[hover])}</span>
                    {unit ? <span className="text-muted"> {unit}</span> : null}
                  </span>
                </>
              ) : (
                format(values[hover])
              )}
            </Tip>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
