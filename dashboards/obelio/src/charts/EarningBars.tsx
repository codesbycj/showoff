import { useState } from 'react';

import { niceTicks, scale } from '@/charts/scale';
import type { MonthEarning } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';
import { short, usd } from '@/lib/format';

/**
 * The Overview bars: pale at rest, solid where the pointer is, with a card
 * naming the month and its figure.
 *
 * The reference's tooltip reads $84,849.93 against an axis that tops out at
 * $40k — the bar it points at is less than half the height that figure would
 * need. Here the plot is scaled to the data's own maximum and the gridlines
 * are the nice values that fit under it, so the card and the bar agree by
 * construction.
 */
export function EarningBars({
  months,
  peakId,
  label,
}: {
  months: MonthEarning[];
  /** Highlighted at rest, which is what the reference's tooltip marks. */
  peakId: string;
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);

  /* Room for the floating card, which is pinned above the tallest bar. */
  const padTop = 58;
  const padBottom = 24;
  const padLeft = 46;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - 6);
  const plotH = Math.max(1, h - padTop - padBottom);

  const max = Math.max(...months.map((m) => m.value), 1);
  const y = scale([0, max], [padTop + plotH, padTop]);
  const ticks = niceTicks([0, max], 5).filter((t) => t <= max);

  const slot = plotW / months.length;
  const barW = Math.min(26, slot * 0.46);
  const shownId = hover ?? peakId;
  const shown = months.find((m) => m.id === shownId) ?? months[0];
  const shownIndex = months.indexOf(shown);

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <>
          <svg width={w} height={h} role="img" aria-label={label}>
            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={padLeft}
                  x2={w - 6}
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
                  {'$' + short(t)}
                </text>
              </g>
            ))}

            {months.map((m, i) => {
              const cx0 = padLeft + slot * (i + 0.5);
              const on = shownId === m.id;
              return (
                <g key={m.id}>
                  <rect
                    data-mark={m.id}
                    x={cx0 - barW / 2}
                    y={y(m.value)}
                    width={barW}
                    height={Math.max(3, padTop + plotH - y(m.value))}
                    rx={Math.min(7, barW / 3)}
                    fill={on ? 'var(--color-accent)' : 'var(--color-accent-soft)'}
                    className="cursor-pointer transition-[fill] duration-150"
                    onPointerEnter={() => setHover(m.id)}
                    onPointerLeave={() => setHover((cur) => (cur === m.id ? null : cur))}
                  />
                  <text
                    x={cx0}
                    y={h - 6}
                    textAnchor="middle"
                    className="fill-[var(--color-muted)] text-[10.5px]"
                  >
                    {m.label}
                  </text>
                </g>
              );
            })}
          </svg>

          <div
            data-tip
            style={{
              left: Math.min(Math.max(padLeft + slot * (shownIndex + 0.5), 72), w - 72),
              top: Math.max(52, y(shown.value) - 12),
            }}
            className="border-line bg-surface pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-[10px] border px-3 py-2 shadow-[0_12px_26px_-14px_rgb(22_24_28/0.35)]"
          >
            <p className="text-muted m-0 flex items-center gap-1.5 text-[10.5px] font-semibold">
              <span className="bg-accent h-2 w-2 rounded-full" />
              Earnings
            </p>
            <p className="tnum text-ink m-0 mt-0.5 text-[13px] font-bold">
              {usd(shown.value, true)}
            </p>
          </div>
        </>
      ) : null}
    </div>
  );
}
