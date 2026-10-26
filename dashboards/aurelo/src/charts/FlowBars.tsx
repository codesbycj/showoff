import { useState } from 'react';

import { niceTicks, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import type { MonthPoint } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';

/**
 * Money in and money out, a pair of columns per month.
 *
 * SVG here rather than flex, because the pair needs a shared baseline and a
 * value axis beside it. The plot is scaled to the data's own maximum and the
 * gridlines are the nice values that fit *under* it — scaling onto the tick
 * above the maximum leaves the tallest column at three-quarters height with a
 * band of empty card over it.
 */
export function FlowBars({
  months,
  format,
  label,
}: {
  months: MonthPoint[];
  format: (n: number) => string;
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<{ id: string; side: 'earned' | 'spent' } | null>(null);

  const padTop = 10;
  const padBottom = 24;
  const padLeft = 46;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - 4);
  const plotH = Math.max(1, h - padTop - padBottom);

  const max = Math.max(...months.flatMap((m) => [m.earned, m.spent]), 1);
  const y = scale([0, max], [padTop + plotH, padTop]);
  const ticks = niceTicks([0, max], 4).filter((t) => t <= max);

  const slot = plotW / months.length;
  const barW = Math.min(20, slot * 0.28);

  const hovered = hover ? months.find((m) => m.id === hover.id) : null;

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <>
          <svg width={w} height={h} role="img" aria-label={label}>
            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={padLeft}
                  x2={w - 4}
                  y1={y(t)}
                  y2={y(t)}
                  stroke="var(--color-line)"
                  strokeWidth="1"
                />
                <text
                  x={padLeft - 8}
                  y={y(t) + 4}
                  textAnchor="end"
                  className="fill-[var(--color-muted)] text-[11px]"
                >
                  {format(t)}
                </text>
              </g>
            ))}

            {months.map((m, i) => {
              const cx0 = padLeft + slot * (i + 0.5);
              return (
                <g key={m.id}>
                  {(['earned', 'spent'] as const).map((side, k) => {
                    const v = m[side];
                    const x = cx0 + (k === 0 ? -barW - 3 : 3);
                    const on = hover?.id === m.id && hover.side === side;
                    return (
                      <rect
                        key={side}
                        data-mark={`${m.id}-${side}`}
                        x={x}
                        y={y(v)}
                        width={barW}
                        height={Math.max(2, padTop + plotH - y(v))}
                        rx={Math.min(7, barW / 2)}
                        fill={
                          side === 'earned' ? 'var(--color-accent)' : 'var(--color-accent-soft)'
                        }
                        opacity={hover && !on ? 0.45 : 1}
                        className="cursor-pointer transition-opacity duration-150"
                        onPointerEnter={() => setHover({ id: m.id, side })}
                        onPointerLeave={() =>
                          setHover((cur) =>
                            cur && cur.id === m.id && cur.side === side ? null : cur,
                          )
                        }
                      />
                    );
                  })}
                  <text
                    x={cx0}
                    y={h - 6}
                    textAnchor="middle"
                    className="fill-[var(--color-muted)] text-[11px]"
                  >
                    {m.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {hovered && hover ? (
            <Tip
              x={Math.min(Math.max(padLeft + slot * (months.indexOf(hovered) + 0.5), 60), w - 60)}
              y={y(hovered[hover.side]) - 8}
            >
              <span className="font-semibold">{hover.side === 'earned' ? 'In' : 'Out'}</span>{' '}
              {format(hovered[hover.side])}
            </Tip>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
