import { ref, useDefIds } from '@/charts/ids';
import { niceTicks } from '@/charts/scale';
import type { Bar } from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';
import { useMeasure } from '@/lib/useMeasure';

/**
 * The sales chart: one amber column per period, with a read-out on the one
 * under the pointer.
 *
 * The plot is scaled to the data and the gridlines are the nice values under
 * it, so the tallest column reaches the top of the card. Every height comes
 * from the deck, so the span control genuinely redraws the chart — seven bars,
 * five or twelve — rather than swapping a traced picture of one (rule 6).
 */
export function SalesBars({
  bars,
  active,
  onActive,
}: {
  bars: Bar[];
  active: number | null;
  onActive: (index: number | null) => void;
}) {
  const [box, size] = useMeasure<HTMLDivElement>();
  const ids = useDefIds('fade');

  const max = Math.max(...bars.map((b) => b.value));
  const ticks = niceTicks([0, max], 5).filter((t) => t <= max);

  const AXIS = 46;
  const FOOT = 26;
  const plotW = Math.max(0, size.w - AXIS);
  const plotH = Math.max(0, size.h - FOOT);
  const step = bars.length ? plotW / bars.length : 0;
  const barW = Math.min(44, Math.max(10, step * 0.54));
  const centre = (i: number) => AXIS + step * (i + 0.5);
  const heightOf = (v: number) => (max > 0 ? (v / max) * (plotH - 8) : 0);

  const tip = active === null ? null : bars[active];

  return (
    <div ref={box} className="relative h-full min-h-[180px] w-full select-none">
      {size.w > 0 ? (
        <>
          <svg
            width={size.w}
            height={size.h}
            viewBox={'0 0 ' + size.w + ' ' + size.h}
            className="absolute inset-0"
            role="img"
            aria-label={
              'Sales by period. ' + bars.map((b) => b.full + ' ' + usd(b.value)).join(', ')
            }
          >
            <defs>
              <linearGradient id={ids.fade} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent)" />
                <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0.45" />
              </linearGradient>
            </defs>

            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={AXIS}
                  x2={size.w}
                  y1={plotH - heightOf(t)}
                  y2={plotH - heightOf(t)}
                  stroke="var(--color-line)"
                />
                <text
                  x={AXIS - 10}
                  y={plotH - heightOf(t)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-muted text-[10.5px]"
                >
                  {t === 0 ? '0' : short(t)}
                </text>
              </g>
            ))}

            {bars.map((b, i) => {
              const h = heightOf(b.value);
              const on = active === i;
              return (
                <g key={b.full} data-mark={'bar-' + i}>
                  <rect
                    x={centre(i) - barW / 2}
                    y={plotH - h}
                    width={barW}
                    height={Math.max(2, h)}
                    rx={6}
                    fill={ref(ids.fade)}
                    opacity={active === null || on ? 1 : 0.45}
                    className="transition-opacity duration-200"
                  />
                  <text
                    x={centre(i)}
                    y={size.h - 7}
                    textAnchor="middle"
                    className={cx('text-[11px]', on ? 'fill-ink font-semibold' : 'fill-muted')}
                  >
                    {b.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {bars.map((b, i) => (
            <button
              key={'hit' + b.full}
              type="button"
              data-hit={i}
              aria-label={b.full + ', ' + usd(b.value)}
              onMouseEnter={() => onActive(i)}
              onMouseLeave={() => onActive(null)}
              onFocus={() => onActive(i)}
              onBlur={() => onActive(null)}
              style={{ left: centre(i) - step / 2, width: step, top: 0, height: plotH }}
              className="absolute rounded-lg"
            />
          ))}

          {tip ? (
            <div
              data-tooltip
              style={{
                left: Math.min(Math.max(centre(active ?? 0), AXIS + 52), size.w - 52),
                top: Math.max(0, plotH - heightOf(tip.value) - 40),
              }}
              className="bg-fill text-fill-fg pointer-events-none absolute z-10 -translate-x-1/2 rounded-lg px-2.5 py-1.5 text-center"
            >
              <span className="block text-[10.5px] opacity-70">{tip.full}</span>
              <span className="block text-[12.5px] font-bold">{usd(tip.value)}</span>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
