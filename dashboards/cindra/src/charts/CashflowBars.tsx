import { useState } from 'react';

import { niceTicks, scale } from '@/charts/scale';
import type { MonthFlow } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';
import { usd } from '@/lib/format';

/**
 * Cashflow: twelve months, income up from the zero line and expense down from
 * it.
 *
 * The reference prints an axis running 8K / 4K / 0 / -4K / -8K and then draws
 * every bar above the line, so half of its own axis is unused. Reading it as a
 * diverging chart is what makes that axis mean something — and it is the right
 * shape for the fact, because money out is not a smaller kind of money in.
 *
 * Both halves are scaled by the same unit, so a $6,000 month in and a $4,000
 * month out are two thirds and four ninths of their sides rather than both
 * filling theirs.
 */
export function CashflowBars({ months, label }: { months: MonthFlow[]; label: string }) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);

  const padTop = 12;
  const padBottom = 26;
  const padLeft = 44;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - 6);
  const plotH = Math.max(1, h - padTop - padBottom);

  const peak = Math.max(...months.flatMap((m) => [m.income, m.expense]), 1);
  /* One unit for both halves, so the two sides are comparable. */
  const y = scale([-peak, peak], [padTop + plotH, padTop]);
  const zero = y(0);
  const ticks = niceTicks([-peak, peak], 5).filter((t) => Math.abs(t) <= peak);

  const slot = plotW / months.length;
  const barW = Math.min(11, slot * 0.3);
  const current = months.find((m) => m.id === hover);

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
                  stroke={t === 0 ? 'var(--color-sunken-deep)' : 'var(--color-line)'}
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y(t) + 4}
                  textAnchor="end"
                  className="fill-[var(--color-muted)] text-[10.5px]"
                >
                  {t === 0 ? '0' : (t < 0 ? '-' : '') + Math.abs(t) / 1000 + 'K'}
                </text>
              </g>
            ))}

            {months.map((m, i) => {
              const cx0 = padLeft + slot * (i + 0.5);
              const on = hover === m.id;
              const dim = hover !== null && !on;
              return (
                <g key={m.id} opacity={dim ? 0.42 : 1} className="transition-opacity duration-150">
                  <rect
                    x={cx0 - barW - 2}
                    y={y(m.income)}
                    width={barW}
                    height={Math.max(2, zero - y(m.income))}
                    rx="3"
                    fill="var(--color-forest)"
                  />
                  <rect
                    x={cx0 + 2}
                    y={zero}
                    width={barW}
                    height={Math.max(2, y(-m.expense) - zero)}
                    rx="3"
                    fill="var(--color-accent)"
                  />
                  <text
                    x={cx0}
                    y={h - 7}
                    textAnchor="middle"
                    className="fill-[var(--color-muted)] text-[10.5px]"
                  >
                    {m.label}
                  </text>

                  {/* The hit column: the pair is hovered as one month. */}
                  <rect
                    data-mark={m.id}
                    x={cx0 - slot / 2}
                    y={padTop}
                    width={slot}
                    height={plotH}
                    fill="transparent"
                    className="cursor-pointer"
                    onPointerEnter={() => setHover(m.id)}
                    onPointerLeave={() => setHover((cur) => (cur === m.id ? null : cur))}
                  />
                </g>
              );
            })}
          </svg>

          {current ? (
            <div
              data-tip
              style={{
                left: Math.min(
                  Math.max(padLeft + slot * (months.indexOf(current) + 0.5), 78),
                  w - 78,
                ),
                top: Math.max(padTop, y(current.income) - 14),
              }}
              className="border-line bg-surface pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-xl border px-3 py-2 shadow-[0_12px_28px_-14px_rgb(22_36_31/0.35)]"
            >
              <p className="text-muted m-0 text-[10.5px] font-semibold">{current.label} 2029</p>
              <p className="text-ink tnum m-0 mt-1 flex items-center gap-2 text-[11.5px] font-semibold">
                <span className="bg-forest h-2 w-2 rounded-full" />
                Income <span className="ml-auto">{usd(current.income)}</span>
              </p>
              <p className="text-ink tnum m-0 mt-0.5 flex items-center gap-2 text-[11.5px] font-semibold">
                <span className="bg-accent h-2 w-2 rounded-full" />
                Expense <span className="ml-auto">{usd(current.expense)}</span>
              </p>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
