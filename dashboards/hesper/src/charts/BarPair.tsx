import { useState } from 'react';

import { niceTicks, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import { useMeasure } from '@/lib/useMeasure';

export interface Pair {
  label: string;
  a: number;
  b: number;
}

/**
 * Billed against collected, by month.
 *
 * Two bars per month, both computed from the invoices' own dates — an invoice
 * is billed in the month it was issued and collected in the month it was paid
 * — so the gap between the pair *is* the money still out (rule 6).
 *
 * The plot is scaled to the data's own maximum and the gridlines are the nice
 * values that fit under it: scaling onto the tick above the maximum leaves
 * the tallest bar at three-quarters height with a band of empty card over it,
 * and a tick loop that stops at the maximum can put that bar outside the plot
 * entirely.
 */
export function BarPair({
  pairs,
  format,
  names,
  label,
}: {
  pairs: Pair[];
  format: (n: number) => string;
  names: [string, string];
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<{ i: number; which: 0 | 1 } | null>(null);

  const padTop = 12;
  const padBottom = 26;
  const padLeft = 54;
  const padRight = 4;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const plotH = Math.max(1, h - padTop - padBottom);

  const hi = Math.max(...pairs.flatMap((p) => [p.a, p.b]), 1);
  const y = scale([0, hi], [padTop + plotH, padTop]);
  const ticks = niceTicks([0, hi], 4).filter((t) => t >= 0 && t <= hi);

  const slot = plotW / Math.max(1, pairs.length);
  const barW = Math.min(16, slot / 2.8);
  const gap = 4;

  const current = hover ? pairs[hover.i] : null;

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
                strokeDasharray="4 4"
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

          {pairs.map((p, i) => {
            const mid = padLeft + slot * i + slot / 2;
            const cols: { v: number; x: number; fill: string; which: 0 | 1 }[] = [
              { v: p.a, x: mid - barW - gap / 2, fill: 'var(--color-accent)', which: 0 },
              { v: p.b, x: mid + gap / 2, fill: 'var(--color-accent-pale)', which: 1 },
            ];
            return (
              <g key={p.label}>
                {cols.map((c) => (
                  <rect
                    key={c.which}
                    data-mark={`${p.label.toLowerCase()}-${c.which === 0 ? 'billed' : 'collected'}`}
                    x={c.x}
                    y={Math.min(y(c.v), padTop + plotH - 2)}
                    width={barW}
                    height={Math.max(2, padTop + plotH - y(c.v))}
                    rx="4"
                    fill={c.fill}
                    opacity={hover && (hover.i !== i || hover.which !== c.which) ? 0.45 : 1}
                    className="cursor-pointer transition-opacity duration-150"
                    onPointerEnter={() => setHover({ i, which: c.which })}
                    onPointerLeave={() =>
                      setHover((cur) => (cur && cur.i === i && cur.which === c.which ? null : cur))
                    }
                  />
                ))}
                <text
                  x={mid}
                  y={h - 7}
                  textAnchor="middle"
                  className="fill-[var(--color-muted)] text-[11px]"
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      ) : null}

      {current && hover ? (
        <Tip
          x={Math.min(Math.max(padLeft + slot * hover.i + slot / 2, 80), Math.max(80, w - 80))}
          y={y(hover.which === 0 ? current.a : current.b) - 10}
        >
          <span className="font-semibold">{current.label}</span>
          <span className="opacity-75">
            {' '}
            · {names[hover.which]} {format(hover.which === 0 ? current.a : current.b)}
          </span>
        </Tip>
      ) : null}
    </div>
  );
}
