import { useState } from 'react';

import { ref, useDefIds } from '@/charts/ids';
import { linePath, type Pt } from '@/charts/path';
import { niceTicks, r3, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import { SERIES, totalOf, type Day, type SeriesId } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';

/**
 * Minutes a day, three series deep.
 *
 * Stacked rather than overlaid: the three are parts of one day, and three
 * independent curves make the total — the number the learner cares about —
 * impossible to read. The top edge of the stack *is* the day's total.
 *
 * The axis is in minutes and its ticks come from the data. The reference's
 * reads 0% / 40% / 80% / 100%: three steps, two of them 40 and one of them 20.
 */
export function StackedArea({
  data,
  hidden,
  label,
}: {
  data: Day[];
  /** Series the legend has switched off. */
  hidden: SeriesId[];
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const ids = useDefIds('theory', 'practice', 'lexicon');

  const padTop = 14;
  const padBottom = 26;
  const padLeft = 44;
  const padRight = 10;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const plotH = Math.max(1, h - padTop - padBottom);

  const shown = SERIES.filter((s) => !hidden.includes(s.id));
  const stackOf = (d: Day) => shown.reduce((t, s) => t + d[s.id], 0);
  const hi = Math.max(1, ...data.map(stackOf));
  const y = scale([0, hi], [padTop + plotH, padTop]);
  const x = (i: number) =>
    padLeft + (data.length < 2 ? plotW / 2 : (i / (data.length - 1)) * plotW);
  const ticks = niceTicks([0, hi], 4).filter((t) => t <= hi);

  /* Each band's upper edge is the running total under it. */
  const bands = shown.map((s, si) => {
    const upper: Pt[] = data.map((d, i) => ({
      x: x(i),
      y: y(shown.slice(0, si + 1).reduce((t, k) => t + d[k.id], 0)),
    }));
    const lower: Pt[] = data.map((d, i) => ({
      x: x(i),
      y: y(shown.slice(0, si).reduce((t, k) => t + d[k.id], 0)),
    }));
    return { series: s, upper, lower };
  });

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
            {SERIES.map((s) => (
              <linearGradient key={s.id} id={ids[s.id]} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={`var(${s.token})`} stopOpacity="0.5" />
                <stop offset="100%" stopColor={`var(${s.token})`} stopOpacity="0.12" />
              </linearGradient>
            ))}
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
                className="tnum fill-[var(--color-muted)] text-[10.5px]"
              >
                {t}m
              </text>
            </g>
          ))}

          {bands.map((b) => {
            /* Straight segments on both edges, so a band's floor is exactly
               the ceiling of the one under it. A smoothed upper edge over a
               straight lower one leaves slivers of background between the
               bands -- and it would invent minutes between two days. */
            const top = linePath(b.upper);
            const d =
              top +
              ' L' +
              b.lower
                .slice()
                .reverse()
                .map((p) => `${r3(p.x)} ${r3(p.y)}`)
                .join(' L') +
              ' Z';
            return (
              <g key={b.series.id}>
                <path d={d} fill={ref(ids[b.series.id])} />
                <path
                  d={top}
                  fill="none"
                  stroke={`var(${b.series.token})`}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}

          {hover !== null ? (
            <line
              x1={x(hover)}
              x2={x(hover)}
              y1={padTop}
              y2={padTop + plotH}
              stroke="var(--color-sunken-deep)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ) : null}

          {data.map((d, i) => (
            <text
              key={d.day}
              x={x(i)}
              y={h - 8}
              textAnchor={i === 0 ? 'start' : i === data.length - 1 ? 'end' : 'middle'}
              className="fill-[var(--color-muted)] text-[10.5px]"
            >
              {d.day}
            </text>
          ))}

          {data.map((d, i) => (
            <rect
              key={'hit' + d.day}
              data-mark={'day-' + d.day.toLowerCase().replace(' ', '')}
              x={r3(x(i) - plotW / Math.max(1, (data.length - 1) * 2))}
              y={padTop}
              width={r3(plotW / Math.max(1, data.length - 1))}
              height={plotH}
              fill="transparent"
              onPointerEnter={() => setHover(i)}
            />
          ))}
        </svg>
      ) : null}

      {hover !== null ? (
        <Tip
          x={Math.min(Math.max(x(hover), 92), Math.max(92, w - 92))}
          y={Math.max(54, y(stackOf(data[hover])) - 10)}
        >
          <span className="text-ink block font-bold">{data[hover].day}</span>
          {shown.map((s) => (
            <span key={s.id} className="tnum text-muted block text-[11px]">
              <span
                aria-hidden="true"
                style={{ background: `var(${s.token})` }}
                className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
              />
              {s.label} {data[hover][s.id]}m
            </span>
          ))}
          <span className="tnum text-ink mt-0.5 block text-[11px] font-semibold">
            {totalOf(data[hover])} minutes in all
          </span>
        </Tip>
      ) : null}
    </div>
  );
}
