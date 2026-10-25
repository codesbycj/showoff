import { ref, useDefIds } from '@/charts/ids';
import { niceTicks } from '@/charts/scale';
import { DeltaBadge } from '@/components/Badge';
import type { Bar } from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';
import { useMeasure } from '@/lib/useMeasure';

/**
 * The profit chart: one tall rounded column per period, hatched, with the
 * selected one filled; a percentage badge on each; and a dark read-out card
 * over the selected column.
 *
 * Every bar's height comes from the deck, and the axis ticks come from the data
 * through `niceTicks` — so changing a figure moves the bar *and* re-labels the
 * axis, and the period control above genuinely redraws the chart rather than
 * swapping a traced picture of one (rule 6).
 *
 * The hatch is an SVG `<pattern>` whose id comes from `useId`. A pattern id is
 * document-global, so two charts declaring the same one would collapse into the
 * first — which is invisible until a second chart appears.
 */
export function ProfitBars({
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
  const ids = useDefIds('hatch', 'gloss');

  const active = hovered ?? selected;
  const max = Math.max(...bars.map((b) => b.value));
  /*
   * The plot is scaled to the data, and the gridlines are the nice values that
   * fit under it.
   *
   * Scaling to the tick *above* the max is the other way round and leaves the
   * tallest bar at three-quarters height with a band of empty card over it;
   * scaling to the max with the loop stopping at it put the top tick below the
   * tallest bar and the bar ran off the card. Both were shipped once.
   */
  const top = max;
  const ticks = niceTicks([0, max], 5).filter((t) => t <= max);

  const AXIS = 44; // the 0K..120K column
  const FOOT = 28; // the Jan..Jul row
  const plotW = Math.max(0, size.w - AXIS);
  const plotH = Math.max(0, size.h - FOOT);
  const step = bars.length ? plotW / bars.length : 0;
  const barW = Math.min(74, Math.max(34, step * 0.68));
  const centre = (i: number) => AXIS + step * (i + 0.5);
  const heightOf = (v: number) => (top > 0 ? (v / top) * (plotH - 16) : 0);

  const tip = bars[active];

  return (
    <div ref={box} className="relative h-full min-h-[220px] w-full select-none">
      {size.w > 0 ? (
        <>
          <svg
            width={size.w}
            height={size.h}
            viewBox={'0 0 ' + size.w + ' ' + size.h}
            className="absolute inset-0"
            role="img"
            aria-label={
              'Profit by period. ' + bars.map((b) => b.full + ' ' + usd(b.value)).join(', ') + '.'
            }
          >
            <defs>
              <pattern
                id={ids.hatch}
                width="7"
                height="7"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="7" height="7" fill="var(--color-sunken)" />
                <line x1="0" y1="0" x2="0" y2="7" stroke="var(--color-surface)" strokeWidth="3.2" />
              </pattern>
              <linearGradient id={ids.gloss} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.02" />
                <stop offset="42%" stopColor="#ffffff" stopOpacity="0.16" />
                <stop offset="58%" stopColor="#ffffff" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {ticks.map((t) => {
              const y = plotH - heightOf(t);
              return (
                <g key={t}>
                  <text
                    x={AXIS - 12}
                    y={y}
                    textAnchor="end"
                    dominantBaseline="middle"
                    className="fill-muted text-[11px] font-semibold"
                  >
                    {short(t)}
                  </text>
                  <line
                    x1={AXIS}
                    x2={size.w}
                    y1={y}
                    y2={y}
                    stroke="var(--color-line)"
                    strokeDasharray="2 6"
                  />
                </g>
              );
            })}

            {bars.map((b, i) => {
              const h = heightOf(b.value);
              const on = i === active;
              return (
                <g key={b.full} data-mark={'bar-' + i}>
                  <rect
                    x={centre(i) - barW / 2}
                    y={plotH - h}
                    width={barW}
                    height={h}
                    rx={barW / 2}
                    fill={on ? 'var(--color-fill)' : ref(ids.hatch)}
                    stroke={on ? 'none' : 'var(--color-line)'}
                    className="transition-[fill] duration-200"
                  />
                  {on ? (
                    <rect
                      x={centre(i) - barW / 2}
                      y={plotH - h}
                      width={barW}
                      height={h}
                      rx={barW / 2}
                      fill={ref(ids.gloss)}
                    />
                  ) : null}
                  <text
                    x={centre(i)}
                    y={size.h - 8}
                    textAnchor="middle"
                    className={cx('text-[12px] font-semibold', on ? 'fill-ink' : 'fill-muted')}
                  >
                    {b.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* The percentage badges and the hit areas are HTML: a badge is a pill
              with text in it, and a <button> is a better target than a <rect>. */}
          {bars.map((b, i) => (
            <div
              key={'badge-' + b.full}
              aria-hidden="true"
              style={{ left: centre(i), top: plotH - heightOf(b.value) + 26 }}
              className="pointer-events-none absolute -translate-x-1/2"
            >
              <DeltaBadge value={b.delta} />
            </div>
          ))}

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
              className="absolute rounded-2xl"
            />
          ))}

          {/* The read-out sits over the selected column rather than following the
              pointer: it is about the column, and a card that chases the cursor
              inside a 74px bar only ever looks loose. */}
          {tip ? (
            <div
              data-tooltip
              style={{
                left: Math.min(Math.max(centre(active), AXIS + 92), size.w - 92),
                top: Math.max(0, plotH - heightOf(tip.value) - 108),
              }}
              className="bg-fill text-fill-fg pointer-events-none absolute z-10 -translate-x-1/2 rounded-2xl px-4 py-3 shadow-[0_14px_30px_-14px_rgb(0_0_0/0.6)] transition-all duration-200"
            >
              <p className="text-fill-fg/60 m-0 text-[12px] font-semibold">{tip.full}</p>
              <ul className="m-0 mt-1.5 flex list-none flex-col gap-1 p-0 text-[12.5px] font-semibold">
                <Row
                  dot="var(--color-accent)"
                  value={usd(tip.highest.value)}
                  when={tip.highest.when}
                />
                <Row dot="var(--color-warn)" value={usd(tip.lowest.value)} when={tip.lowest.when} />
                <Row dot="#8d93a0" value={usd(tip.average)} when="" />
              </ul>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}

function Row({ dot, value, when }: { dot: string; value: string; when: string }) {
  return (
    <li className="flex items-center gap-2 whitespace-nowrap">
      <span aria-hidden="true" style={{ background: dot }} className="h-1.5 w-1.5 rounded-full" />
      {value}
      {when ? (
        <span className="text-fill-fg/70 ml-auto pl-3 text-[11.5px] font-medium">{when}</span>
      ) : null}
    </li>
  );
}
