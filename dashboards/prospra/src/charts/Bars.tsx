import { useState } from 'react';

import { niceTicks, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import { useMeasure } from '@/lib/useMeasure';

export interface Bar {
  label: string;
  value: number;
}

/**
 * The reference's tabbed card: three months of whichever measure is selected.
 *
 * Scaled to the data's own maximum with the gridlines fitted under it, so the
 * tallest bar reaches the top of the plot — the arrangement that avoids both
 * a bar taller than its axis and a plot three-quarters empty.
 */
export function Bars({
  bars,
  format,
  label,
}: {
  bars: Bar[];
  format: (n: number) => string;
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);

  const padTop = 12;
  const padBottom = 24;
  const padLeft = 52;
  const padRight = 4;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const plotH = Math.max(1, h - padTop - padBottom);

  const hi = Math.max(...bars.map((b) => b.value), 1);
  const y = scale([0, hi], [padTop + plotH, padTop]);
  const ticks = niceTicks([0, hi], 3).filter((t) => t <= hi);
  const slot = plotW / Math.max(1, bars.length);
  const width = Math.min(46, slot * 0.46);

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

          {bars.map((b, i) => {
            const mid = padLeft + slot * i + slot / 2;
            return (
              <g key={b.label}>
                <rect
                  data-mark={'bar-' + b.label.toLowerCase()}
                  x={mid - width / 2}
                  y={y(b.value)}
                  width={width}
                  height={Math.max(2, padTop + plotH - y(b.value))}
                  rx="7"
                  fill="var(--color-accent)"
                  opacity={hover !== null && hover !== i ? 0.45 : 1}
                  className="cursor-pointer transition-opacity duration-150"
                  onPointerEnter={() => setHover(i)}
                  onPointerLeave={() => setHover((cur) => (cur === i ? null : cur))}
                />
                <text
                  x={mid}
                  y={h - 6}
                  textAnchor="middle"
                  className="fill-[var(--color-muted)] text-[11px]"
                >
                  {b.label}
                </text>
              </g>
            );
          })}
        </svg>
      ) : null}

      {hover !== null ? (
        <Tip
          x={Math.min(Math.max(padLeft + slot * hover + slot / 2, 60), Math.max(60, w - 60))}
          y={y(bars[hover].value) - 10}
        >
          <span className="font-semibold">{bars[hover].label}</span>
          <span className="opacity-75"> · {format(bars[hover].value)}</span>
        </Tip>
      ) : null}
    </div>
  );
}
