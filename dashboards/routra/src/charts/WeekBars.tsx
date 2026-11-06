import { useState } from 'react';

import { niceTicks, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import { useMeasure } from '@/lib/useMeasure';
import { asHours } from '@/data/deck';

export interface WeekDay {
  day: string;
  worked: number;
  average: number;
}

/**
 * Working time per day, against the rolling average.
 *
 * The reference draws two bars per day and a tooltip reading "6 hr 32 min /
 * average 8 hr 30 min" — the comparison is the point, so the average is a
 * **line across the whole chart** rather than a second bar: it is the same
 * number every day, and drawing it seven times says otherwise.
 */
export function WeekBars({ week, label }: { week: WeekDay[]; label: string }) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const padTop = 12;
  const padBottom = 22;
  const padLeft = 44;
  const padRight = 4;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const plotH = Math.max(1, h - padTop - padBottom);

  const hi = Math.max(...week.flatMap((d) => [d.worked, d.average]));
  const y = scale([0, hi], [padTop + plotH, padTop]);
  const ticks = niceTicks([0, hi], 3).filter((t) => t <= hi);
  const slot = plotW / Math.max(1, week.length);
  const barW = Math.min(18, slot * 0.4);
  const average = week[0]?.average ?? 0;

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <svg width={w} height={h} role="img" aria-label={label}>
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
                x={padLeft - 8}
                y={y(t) + 4}
                textAnchor="end"
                className="fill-[var(--color-muted)] text-[10.5px]"
              >
                {Math.round(t / 60)}h
              </text>
            </g>
          ))}

          {week.map((d, i) => {
            const mid = padLeft + slot * i + slot / 2;
            return (
              <g key={d.day}>
                <rect
                  data-mark={'day-' + d.day.toLowerCase()}
                  x={mid - barW / 2}
                  y={y(d.worked)}
                  width={barW}
                  height={Math.max(2, padTop + plotH - y(d.worked))}
                  rx="4"
                  fill={d.worked >= average ? 'var(--color-accent)' : 'var(--color-state-waiting)'}
                  opacity={hover !== null && hover !== i ? 0.4 : 1}
                  className="cursor-pointer transition-opacity duration-150"
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover((cur) => (cur === i ? null : cur))}
                />
                <text
                  x={mid}
                  y={h - 6}
                  textAnchor="middle"
                  className="fill-[var(--color-muted)] text-[10.5px]"
                >
                  {d.day}
                </text>
              </g>
            );
          })}

          {/* The average, once. */}
          <line
            x1={padLeft}
            x2={w - padRight}
            y1={y(average)}
            y2={y(average)}
            stroke="var(--color-accent-deep)"
            strokeWidth="1.5"
            strokeDasharray="5 4"
          />
        </svg>
      ) : null}

      {hover !== null ? (
        <Tip
          x={Math.min(Math.max(padLeft + slot * hover + slot / 2, 74), Math.max(74, w - 74))}
          y={y(week[hover].worked) - 8}
        >
          <span className="font-semibold">{week[hover].day}</span>
          <span className="opacity-75"> · {asHours(week[hover].worked)}</span>
          <span className="text-muted block text-[11px]">
            average {asHours(week[hover].average)}
          </span>
        </Tip>
      ) : null}
    </div>
  );
}
