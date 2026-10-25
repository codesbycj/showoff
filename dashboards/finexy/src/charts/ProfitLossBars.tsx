import { ref, useDefIds } from '@/charts/ids';
import { niceTicks } from '@/charts/scale';
import type { Month } from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';
import { useMeasure } from '@/lib/useMeasure';

/**
 * Profit and loss as a pair of bars per period.
 *
 * The loss bar is hatched as well as coloured, so the pair reads without colour
 * vision — the reference distinguishes them by orange against black alone,
 * which is fine until it is printed or seen by about one man in twelve.
 *
 * The plot is scaled to the data and the gridlines are the nice values under
 * it, so the tallest bar reaches the top of the card.
 */
export function ProfitLossBars({
  months,
  active,
  onActive,
}: {
  months: Month[];
  active: number | null;
  onActive: (index: number | null) => void;
}) {
  const [box, size] = useMeasure<HTMLDivElement>();
  const ids = useDefIds('hatch');

  const max = Math.max(...months.flatMap((m) => [m.profit, m.loss]));
  const ticks = niceTicks([0, max], 5).filter((t) => t <= max);

  const AXIS = 40;
  const FOOT = 24;
  const plotW = Math.max(0, size.w - AXIS);
  const plotH = Math.max(0, size.h - FOOT);
  const step = months.length ? plotW / months.length : 0;
  const barW = Math.min(16, Math.max(6, step * 0.26));
  const gap = Math.max(3, barW * 0.35);
  const centre = (i: number) => AXIS + step * (i + 0.5);
  const heightOf = (v: number) => (max > 0 ? (v / max) * (plotH - 10) : 0);

  const tip = active === null ? null : months[active];

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
              'Profit and loss by period. ' +
              months
                .map((m) => m.label + ': profit ' + usd(m.profit) + ', loss ' + usd(m.loss))
                .join('. ')
            }
          >
            <defs>
              <pattern
                id={ids.hatch}
                width="5"
                height="5"
                patternUnits="userSpaceOnUse"
                patternTransform="rotate(45)"
              >
                <rect width="5" height="5" fill="var(--color-accent)" />
                <line
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="5"
                  stroke="var(--color-surface)"
                  strokeWidth="1.6"
                  opacity="0.5"
                />
              </pattern>
            </defs>

            {ticks.map((t) => (
              <g key={t}>
                <line
                  x1={AXIS}
                  x2={size.w}
                  y1={plotH - heightOf(t)}
                  y2={plotH - heightOf(t)}
                  stroke="var(--color-line)"
                  strokeDasharray="2 5"
                />
                <text
                  x={AXIS - 10}
                  y={plotH - heightOf(t)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-muted text-[10.5px]"
                >
                  {short(t)}
                </text>
              </g>
            ))}

            {months.map((m, i) => {
              const on = active === i;
              const hp = heightOf(m.profit);
              const hl = heightOf(m.loss);
              return (
                <g key={m.label} data-mark={'pl-' + i} opacity={active === null || on ? 1 : 0.45}>
                  <rect
                    x={centre(i) - barW - gap / 2}
                    y={plotH - hl}
                    width={barW}
                    height={hl}
                    rx={barW / 2}
                    fill={ref(ids.hatch)}
                  />
                  <rect
                    x={centre(i) + gap / 2}
                    y={plotH - hp}
                    width={barW}
                    height={hp}
                    rx={barW / 2}
                    fill="var(--color-ink)"
                  />
                  <text
                    x={centre(i)}
                    y={size.h - 6}
                    textAnchor="middle"
                    className={cx('text-[11px]', on ? 'fill-ink font-semibold' : 'fill-muted')}
                  >
                    {m.label}
                  </text>
                </g>
              );
            })}
          </svg>

          {months.map((m, i) => (
            <button
              key={'hit' + m.label}
              type="button"
              data-hit={i}
              aria-label={m.label + ': profit ' + usd(m.profit) + ', loss ' + usd(m.loss)}
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
                left: Math.min(Math.max(centre(active ?? 0), AXIS + 68), size.w - 68),
                top: 2,
              }}
              className="bg-fill text-fill-fg pointer-events-none absolute z-10 -translate-x-1/2 rounded-xl px-3 py-2 text-[11.5px] font-semibold"
            >
              <p className="m-0 opacity-60">{tip.label}</p>
              <p className="m-0 mt-1 flex items-center gap-1.5">
                <span aria-hidden="true" className="bg-accent h-1.5 w-1.5 rounded-full" />
                Loss {usd(tip.loss)}
              </p>
              <p className="m-0 mt-0.5 flex items-center gap-1.5">
                <span aria-hidden="true" className="bg-fill-fg h-1.5 w-1.5 rounded-full" />
                Profit {usd(tip.profit)}
              </p>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
