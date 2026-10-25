import { niceTicks } from '@/charts/scale';
import type { Bar } from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';
import { useMeasure } from '@/lib/useMeasure';

/**
 * The revenue chart: a rounded column per period, each with a short rule near
 * its head, and the selected one filled in the accent with its figure inside
 * the foot and its change floating above.
 *
 * Every height comes from the deck and the axis ticks come from the data
 * through `niceTicks`, so changing a figure moves the bar *and* re-labels the
 * axis — and the span control genuinely redraws the chart (4, 7 or 12 bars)
 * rather than swapping a traced picture of one (rule 6).
 */
export function RevenueBars({
  bars,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  bars: Bar[];
  selected: number;
  hovered: number | null;
  onSelect: (index: number) => void;
  onHover: (index: number | null) => void;
}) {
  const [box, size] = useMeasure<HTMLDivElement>();

  const active = hovered ?? selected;
  const max = Math.max(...bars.map((b) => b.value));
  // Scaled to the data, with the gridlines the nice values that fit under it.
  // See the note in teknova's ProfitBars: the other two orderings each ship a
  // visible defect.
  const top = max;
  const ticks = niceTicks([0, max], 5).filter((t) => t <= max);

  const AXIS = 46;
  const FOOT = 26;
  const HEAD = 34; // room for the floating change pill
  const plotW = Math.max(0, size.w - AXIS);
  const plotH = Math.max(0, size.h - FOOT);
  const step = bars.length ? plotW / bars.length : 0;
  const barW = Math.min(52, Math.max(18, step * 0.56));
  const centre = (i: number) => AXIS + step * (i + 0.5);
  const heightOf = (v: number) => (top > 0 ? (v / top) * (plotH - HEAD) : 0);

  const tip = bars[active];

  return (
    <div ref={box} className="relative h-full min-h-[200px] w-full select-none">
      {size.w > 0 ? (
        <>
          <svg
            width={size.w}
            height={size.h}
            viewBox={'0 0 ' + size.w + ' ' + size.h}
            className="absolute inset-0"
            role="img"
            aria-label={
              'Revenue by period. ' + bars.map((b) => b.full + ' ' + usd(b.value)).join(', ') + '.'
            }
          >
            {ticks.map((t) => (
              <text
                key={t}
                x={AXIS - 14}
                y={plotH - heightOf(t)}
                textAnchor="end"
                dominantBaseline="middle"
                className="fill-muted text-[11px]"
              >
                {t === 0 ? '0' : short(t)}
              </text>
            ))}

            {bars.map((b, i) => {
              const h = Math.max(barW, heightOf(b.value));
              const y = plotH - h;
              const on = i === active;
              return (
                <g key={b.full} data-mark={'bar-' + i}>
                  <rect
                    x={centre(i) - barW / 2}
                    y={y}
                    width={barW}
                    height={h}
                    rx={Math.min(14, barW / 2)}
                    className={cx(
                      'transition-[fill] duration-200',
                      on ? 'fill-accent' : 'fill-sunken',
                    )}
                  />
                  {/* The rule near the head of every column, as in the
                      reference. It marks the value line inside a bar whose
                      rounded cap would otherwise hide exactly where it ends. */}
                  <line
                    x1={centre(i) - barW * 0.26}
                    x2={centre(i) + barW * 0.26}
                    y1={y + 14}
                    y2={y + 14}
                    stroke={on ? '#0b1626' : 'var(--color-muted)'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    opacity={on ? 0.85 : 0.75}
                  />
                  {on && h > 54 ? (
                    <text
                      x={centre(i)}
                      y={plotH - 14}
                      textAnchor="middle"
                      className="fill-[#0b1626] text-[11.5px] font-semibold"
                    >
                      {usd(b.value)}
                    </text>
                  ) : null}
                  <text
                    x={centre(i)}
                    y={size.h - 7}
                    textAnchor="middle"
                    className={cx('text-[11.5px]', on ? 'fill-ink font-semibold' : 'fill-muted')}
                  >
                    {b.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* The change pill floats over the selected column's head. */}
          {tip ? (
            <div
              data-tooltip
              style={{
                left: centre(active),
                top: Math.max(0, plotH - heightOf(tip.value) - 30),
              }}
              className={cx(
                'pointer-events-none absolute z-10 -translate-x-1/2 rounded-full px-2.5 py-1 text-[11.5px] font-semibold transition-all duration-200',
                tip.delta >= 0 ? 'bg-accent text-[#0b1626]' : 'bg-danger text-white',
              )}
            >
              {(tip.delta >= 0 ? '+' : '') + tip.delta}%
            </div>
          ) : null}

          {bars.map((b, i) => (
            <button
              key={'hit-' + b.full}
              type="button"
              data-hit={i}
              aria-label={
                b.full +
                ', ' +
                usd(b.value) +
                ', ' +
                (b.delta >= 0 ? 'up ' : 'down ') +
                Math.abs(b.delta) +
                '%'
              }
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(i)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(i)}
              style={{ left: centre(i) - step / 2, width: step, top: 0, height: plotH }}
              className="absolute rounded-xl"
            />
          ))}
        </>
      ) : null}
    </div>
  );
}
