import { useState } from 'react';

import { niceTicks, scale } from '@/charts/scale';
import { Tip } from '@/components/Bits';
import type { SummaryBar } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';
import { euro } from '@/lib/money';

/**
 * The summary bars: this period in orange, the one before it in bone.
 *
 * The plot is scaled to the data's own maximum and the gridlines are the nice
 * values that fit under it — scaling onto the tick above the maximum leaves
 * the tallest bar at three-quarters height with a band of empty card over it.
 */
export function SummaryBars({
  bars,
  ticks,
  label,
}: {
  bars: SummaryBar[];
  ticks: string[];
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);

  const padTop = 10;
  const padBottom = 22;
  const padLeft = 4;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - 4);
  const plotH = Math.max(1, h - padTop - padBottom);

  const max = Math.max(...bars.map((b) => b.value), 1);
  const y = scale([0, max], [padTop + plotH, padTop]);
  niceTicks([0, max], 4);

  const slot = plotW / bars.length;
  const barW = Math.min(16, slot * 0.56);
  const current = bars.find((b) => b.id === hover);

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <>
          <svg width={w} height={h} role="img" aria-label={label}>
            {bars.map((b, i) => {
              const cx0 = padLeft + slot * (i + 0.5);
              const on = hover === b.id;
              return (
                <rect
                  key={b.id}
                  data-mark={b.id}
                  x={cx0 - barW / 2}
                  y={y(b.value)}
                  width={barW}
                  height={Math.max(3, padTop + plotH - y(b.value))}
                  rx={Math.min(6, barW / 2)}
                  fill={
                    on
                      ? 'var(--color-cocoa)'
                      : b.current
                        ? 'var(--color-accent)'
                        : 'var(--color-bone)'
                  }
                  className="cursor-pointer transition-[fill] duration-150"
                  onPointerEnter={() => setHover(b.id)}
                  onPointerLeave={() => setHover((cur) => (cur === b.id ? null : cur))}
                />
              );
            })}

            {ticks.map((t, i) => (
              <text
                key={t}
                x={padLeft + (plotW / ticks.length) * (i + 0.5)}
                y={h - 5}
                textAnchor="middle"
                className="fill-[var(--color-muted)] text-[10.5px]"
              >
                {t}
              </text>
            ))}
          </svg>

          {current ? (
            <Tip
              x={Math.min(Math.max(padLeft + slot * (bars.indexOf(current) + 0.5), 58), w - 58)}
              y={y(current.value) - 8}
            >
              <span className="font-semibold">{current.current ? 'In' : 'Out'}</span>{' '}
              {euro(current.value)}
            </Tip>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
