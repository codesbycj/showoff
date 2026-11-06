import { useState } from 'react';

import { ref, useDefIds } from '@/charts/ids';
import { niceTicks, r3, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import { useMeasure } from '@/lib/useMeasure';

/**
 * Net value over time, drawn as a **step**.
 *
 * This is the one chart decision that matters in private markets: a position
 * is marked at an event — a round, a secondary, an exit — and holds that mark
 * until the next one. A smooth curve between two marks claims a valuation
 * nobody made, on days nobody priced. The reference draws a step too, and it
 * is the best thing in the picture.
 *
 * Geometry is computed from the deck (rule 6): change a position's net value
 * and the last step moves with the headline.
 */
export function StepChart({
  values,
  ticks,
  format,
  pointLabel,
  label,
}: {
  values: number[];
  ticks: string[];
  format: (n: number) => string;
  pointLabel: (i: number) => string;
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const ids = useDefIds('fill');

  const padTop = 14;
  const padBottom = 24;
  const padLeft = 56;
  const padRight = 4;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const plotH = Math.max(1, h - padTop - padBottom);

  const hi = Math.max(...values);
  const y = scale([0, hi], [padTop + plotH, padTop]);
  const x = (i: number) => padLeft + (i / Math.max(1, values.length - 1)) * plotW;
  const gridValues = niceTicks([0, hi], 4).filter((t) => t <= hi);

  /* Horizontal to the next x, then vertical to the next y — the shape of a
     mark that holds until it is re-marked. */
  const line = values
    .map((v, i) => {
      const point = `${r3(x(i))} ${r3(y(v))}`;
      if (i === 0) return 'M' + point;
      return `H${r3(x(i))} V${r3(y(v))}`;
    })
    .join(' ');
  const area = `${line} L${r3(x(values.length - 1))} ${r3(padTop + plotH)} L${r3(x(0))} ${r3(padTop + plotH)} Z`;

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <>
          <svg width={w} height={h} role="img" aria-label={label}>
            <defs>
              <linearGradient id={ids.fill} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.4" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.03" />
              </linearGradient>
            </defs>

            {gridValues.map((t) => (
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

            <path d={area} fill={ref(ids.fill)} />
            <path
              d={line}
              fill="none"
              stroke="var(--color-accent)"
              strokeWidth="2.4"
              strokeLinejoin="round"
            />

            {ticks.map((t, i) => (
              <text
                key={t}
                x={padLeft + (i / Math.max(1, ticks.length - 1)) * plotW}
                y={h - 6}
                textAnchor={i === 0 ? 'start' : i === ticks.length - 1 ? 'end' : 'middle'}
                className="fill-[var(--color-muted)] text-[11px]"
              >
                {t}
              </text>
            ))}

            {hover !== null ? (
              <g pointerEvents="none">
                <line
                  x1={x(hover)}
                  x2={x(hover)}
                  y1={padTop}
                  y2={padTop + plotH}
                  stroke="var(--color-accent)"
                  strokeWidth="1"
                  strokeDasharray="3 3"
                />
                <circle cx={x(hover)} cy={y(values[hover])} r="4.5" fill="var(--color-accent)" />
              </g>
            ) : null}

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
              x={Math.min(Math.max(x(hover), 78), Math.max(78, w - 78))}
              y={y(values[hover]) - 12}
            >
              <span className="text-muted block text-[11px]">{pointLabel(hover)}</span>
              <span className="text-accent mt-0.5 block font-bold">{format(values[hover])}</span>
            </Tip>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
