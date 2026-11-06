import { useState } from 'react';

import { scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import type { ShipmentState } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';
import { num } from '@/lib/format';

export interface UtilBar {
  id: string;
  label: string;
  value: number;
  weight: number;
  capacity: number;
  state: ShipmentState;
}

const FILL: Record<ShipmentState, string> = {
  draft: 'var(--color-draft)',
  booked: 'var(--color-warn)',
  'in transit': 'var(--color-accent)',
  delivered: 'var(--color-positive)',
};

/**
 * How full each truck is.
 *
 * The axis runs to 100 whatever the data does, because capacity is a physical
 * ceiling rather than the largest number that happened to turn up — a bar at
 * 72% has to read as most of a truck, not as the top of the chart. Anything
 * over 100 pushes the axis out instead of being drawn past the frame.
 */
export function UtilBars({ bars, label }: { bars: UtilBar[]; label: string }) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);

  const padTop = 10;
  const padBottom = 20;
  const padLeft = 38;
  const padRight = 4;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - padRight);
  const plotH = Math.max(1, h - padTop - padBottom);

  const hi = Math.max(100, ...bars.map((b) => b.value));
  const y = scale([0, hi], [padTop + plotH, padTop]);
  const ticks = [0, 25, 50, 75, 100].filter((t) => t <= hi);
  const slot = plotW / Math.max(1, bars.length);
  const barW = Math.min(56, slot * 0.52);
  const shown = hover ? bars.find((b) => b.id === hover) : null;

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
                stroke={t === 100 ? 'var(--color-sunken-deep)' : 'var(--color-line)'}
                strokeWidth="1"
                strokeDasharray={t === 100 ? '5 4' : undefined}
              />
              <text
                x={padLeft - 8}
                y={y(t) + 4}
                textAnchor="end"
                className="fill-[var(--color-muted)] text-[10.5px]"
              >
                {t}%
              </text>
            </g>
          ))}

          {bars.map((b, i) => {
            const mid = padLeft + slot * i + slot / 2;
            const top = y(b.value);
            return (
              <g key={b.id}>
                <rect
                  data-mark={'util-' + b.id}
                  x={mid - barW / 2}
                  y={top}
                  width={barW}
                  height={Math.max(2, padTop + plotH - top)}
                  rx="5"
                  fill={FILL[b.state]}
                  opacity={hover && hover !== b.id ? 0.4 : 1}
                  className="cursor-pointer transition-opacity duration-150"
                  onPointerEnter={() => setHover(b.id)}
                  onPointerLeave={() => setHover((cur) => (cur === b.id ? null : cur))}
                />
                <text
                  x={mid}
                  y={top - 6}
                  textAnchor="middle"
                  className="fill-[var(--color-ink)] text-[10.5px] font-bold"
                >
                  {b.value.toFixed(0)}%
                </text>
                <text
                  x={mid}
                  y={h - 6}
                  textAnchor="middle"
                  className="fill-[var(--color-muted)] text-[10.5px]"
                >
                  {b.label}
                </text>
              </g>
            );
          })}
        </svg>
      ) : null}

      {shown ? (
        <Tip
          x={Math.min(
            Math.max(padLeft + slot * bars.indexOf(shown) + slot / 2, 86),
            Math.max(86, w - 86),
          )}
          y={y(shown.value) - 22}
        >
          <span className="font-semibold">{shown.label}</span>
          <span className="text-muted block text-[11px]">
            {num(shown.weight)} of {num(shown.capacity)} lbs
          </span>
        </Tip>
      ) : null}
    </div>
  );
}
