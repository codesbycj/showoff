import { useState } from 'react';

import { ref, useDefIds } from '@/charts/ids';
import { niceTicks, scale } from '@/charts/scale';
import type { Bar } from '@/data/deck';
import { useMeasure } from '@/lib/useMeasure';
import { short } from '@/lib/format';

/**
 * The engagement bars: hatched at rest, solid where the pointer is, with the
 * change bubble riding the bar it describes.
 *
 * The reference draws its bars above an axis that tops out at 5k and pins a
 * "+17.8%" bubble to a month that is not the tallest. Here the plot is scaled
 * to the data's own maximum, the gridlines are the nice values that fit under
 * it, and the bubble carries the hovered bar's own computed change — so it
 * cannot disagree with the bar beneath it.
 *
 * The hatch is a `<pattern>`, and its id comes from `useDefIds`: pattern ids
 * are document-global, so two charts that both declare `id="hatch"` collapse
 * into one and the second paints in the first one's colour.
 */
export function EngagementBars({
  bars,
  peakId,
  label,
}: {
  bars: Bar[];
  /** Highlighted at rest, which is what the reference's bubble marks. */
  peakId: string;
  label: string;
}) {
  const [wrap, size] = useMeasure<HTMLDivElement>();
  const [hover, setHover] = useState<string | null>(null);
  const ids = useDefIds('hatch');

  const padTop = 34;
  const padBottom = 26;
  const padLeft = 42;
  const w = Math.max(0, size.w);
  const h = Math.max(0, size.h);
  const plotW = Math.max(1, w - padLeft - 6);
  const plotH = Math.max(1, h - padTop - padBottom);

  const max = Math.max(...bars.map((b) => b.value), 1);
  const y = scale([0, max], [padTop + plotH, padTop]);
  const ticks = niceTicks([0, max], 5).filter((t) => t <= max);

  const slot = plotW / bars.length;
  const barW = Math.min(46, slot * 0.56);
  const shownId = hover ?? peakId;
  const shown = bars.find((b) => b.id === shownId) ?? bars[0];
  const shownIndex = bars.indexOf(shown);

  return (
    <div ref={wrap} className="relative min-h-0 w-full flex-1">
      {w > 0 && h > 0 ? (
        <>
          <svg width={w} height={h} role="img" aria-label={label}>
            <defs>
              <pattern
                id={ids.hatch}
                width="7"
                height="7"
                patternTransform="rotate(45)"
                patternUnits="userSpaceOnUse"
              >
                <rect width="7" height="7" fill="var(--color-bar)" />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="7"
                  stroke="var(--color-bar-hatch)"
                  strokeWidth="3.5"
                />
              </pattern>
            </defs>

            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={padLeft}
                  x2={w - 6}
                  y1={y(t)}
                  y2={y(t)}
                  stroke="var(--color-line)"
                  strokeWidth="1"
                  strokeDasharray="3 4"
                />
                <text
                  x={padLeft - 8}
                  y={y(t) + 4}
                  textAnchor="end"
                  className="fill-[var(--color-muted)] text-[10.5px]"
                >
                  {short(t)}
                </text>
              </g>
            ))}

            {bars.map((b, i) => {
              const cx0 = padLeft + slot * (i + 0.5);
              const on = shownId === b.id;
              return (
                <g key={b.id}>
                  <rect
                    data-mark={b.id}
                    x={cx0 - barW / 2}
                    y={y(b.value)}
                    width={barW}
                    height={Math.max(3, padTop + plotH - y(b.value))}
                    rx={Math.min(10, barW / 3)}
                    fill={on ? 'var(--color-bar-on)' : ref(ids.hatch)}
                    className="cursor-pointer transition-[fill] duration-150"
                    onPointerEnter={() => setHover(b.id)}
                    onPointerLeave={() => setHover((cur) => (cur === b.id ? null : cur))}
                  />
                  <text
                    x={cx0}
                    y={h - 7}
                    textAnchor="middle"
                    className="fill-[var(--color-muted)] text-[10.5px] tracking-[0.06em]"
                  >
                    {b.label}
                  </text>
                </g>
              );
            })}

            {/* The stem and dot the reference draws under its bubble. */}
            <circle
              cx={padLeft + slot * (shownIndex + 0.5)}
              cy={y(shown.value)}
              r="5"
              fill="var(--color-accent)"
              stroke="var(--color-surface)"
              strokeWidth="2.5"
            />
          </svg>

          <div
            data-tip
            style={{ left: padLeft + slot * (shownIndex + 0.5), top: y(shown.value) - 14 }}
            className="bg-accent-deep pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-full rounded-full px-2.5 py-1 text-[11.5px] font-bold whitespace-nowrap text-white"
          >
            {(shown.delta >= 0 ? '+' : '') + shown.delta}%
          </div>
        </>
      ) : null}
    </div>
  );
}
