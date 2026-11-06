import { useState } from 'react';

import { niceTicks, r3, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import { SPLIT, asHours, dayTotal, type WeekDay } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';

/**
 * The week, stacked by what the hours went on.
 *
 * Stacked rather than grouped: calls, focus and async are parts of one day,
 * and the height of the bar is the day — which is the number a lead reads
 * first. The reference's own three bars are shares of a total it never names.
 */
export function DayBars({ week, label }: { week: WeekDay[]; label: string }) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const padTop = 12;
  const padBottom = 22;
  const padLeft = 36;
  const padRight = 4;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const plotH = Math.max(1, h - padTop - padBottom);

  const hi = Math.max(1, ...week.map(dayTotal));
  const y = scale([0, hi], [padTop + plotH, padTop]);
  const ticks = niceTicks([0, hi], 4).filter((t) => t <= hi);
  const slot = plotW / Math.max(1, week.length);
  const barW = Math.min(30, slot * 0.54);

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
                className="tnum fill-[var(--color-muted)] text-[10.5px]"
              >
                {t}h
              </text>
            </g>
          ))}

          {week.map((d, i) => {
            const mid = padLeft + slot * i + slot / 2;
            let base = 0;
            return (
              <g
                key={d.day}
                opacity={hover !== null && hover !== i ? 0.5 : 1}
                className="transition-opacity duration-150"
              >
                {SPLIT.map((s) => {
                  const value = d[s.id];
                  const top = y(base + value);
                  const bottom = y(base);
                  base += value;
                  return (
                    <rect
                      key={s.id}
                      data-mark={`${d.day.toLowerCase()}-${s.id}`}
                      x={r3(mid - barW / 2)}
                      y={r3(top)}
                      width={r3(barW)}
                      height={Math.max(0, bottom - top)}
                      fill={`var(${s.token})`}
                    />
                  );
                })}
                <rect
                  x={r3(padLeft + slot * i)}
                  y={padTop}
                  width={r3(slot)}
                  height={plotH}
                  fill="transparent"
                  className="cursor-pointer"
                  onPointerEnter={() => setHover(i)}
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
        </svg>
      ) : null}

      {hover !== null ? (
        <Tip
          x={Math.min(Math.max(padLeft + slot * hover + slot / 2, 80), Math.max(80, w - 80))}
          y={y(dayTotal(week[hover])) - 8}
        >
          <span className="text-ink block font-bold">
            {week[hover].day} {week[hover].date}
          </span>
          {SPLIT.map((s) => (
            <span key={s.id} className="tnum text-muted block text-[11px]">
              <span
                aria-hidden="true"
                style={{ background: `var(${s.token})` }}
                className="mr-1.5 inline-block h-2 w-2 rounded-full align-middle"
              />
              {s.label} {asHours(week[hover][s.id])}
            </span>
          ))}
          <span className="tnum text-ink mt-0.5 block text-[11px] font-semibold">
            {asHours(dayTotal(week[hover]))} in all
          </span>
        </Tip>
      ) : null}
    </div>
  );
}
