import { linePath, smoothPath, type Pt } from '@/charts/path';
import { niceTicks, scale } from '@/charts/scale';
import type { Point } from '@/data/deck';
import { cx } from '@/lib/cx';
import { short, usd } from '@/lib/format';
import { useMeasure } from '@/lib/useMeasure';
import { SERIES_META, type SeriesId } from '@/charts/series';

/**
 * Revenue, costs and net profit on two axes, with a crosshair read-out.
 *
 * Two axes because the three series are not the same size — costs run a fifth
 * of revenue, and on one axis they would be a flat line along the floor. The
 * reference does the same and labels both, which is the only honest way to draw
 * it: the left axis is money in, the right is money out, and the read-out gives
 * all three figures at the hovered date so the comparison never depends on
 * reading two scales at once.
 *
 * Every point comes from the deck, and the axis ticks come from the data
 * through `niceTicks` — so changing a figure moves the line *and* re-labels the
 * axis (rule 6).
 */
export function RevenueChart({
  points,
  visible,
  at,
  onAt,
  mode,
}: {
  points: Point[];
  visible: Record<SeriesId, boolean>;
  at: number | null;
  onAt: (index: number | null) => void;
  mode: 'line' | 'bar';
}) {
  const [box, size] = useMeasure<HTMLDivElement>();

  const PAD = { top: 14, right: 46, bottom: 24, left: 46 };
  const plotW = Math.max(0, size.w - PAD.left - PAD.right);
  const plotH = Math.max(0, size.h - PAD.top - PAD.bottom);

  const leftValues = points.flatMap((p) => [p.revenue, p.profit]);
  const rightValues = points.map((p) => p.costs);
  const leftTicks = niceTicks([Math.min(...leftValues) * 0.92, Math.max(...leftValues)], 5);
  const rightTicks = niceTicks([0, Math.max(...rightValues)], 5);

  const x = scale([0, points.length - 1], [PAD.left, PAD.left + plotW]);
  const yLeft = scale([leftTicks[0], leftTicks[leftTicks.length - 1]], [PAD.top + plotH, PAD.top]);
  const yRight = scale(
    [rightTicks[0], rightTicks[rightTicks.length - 1]],
    [PAD.top + plotH, PAD.top],
  );

  const pathFor = (id: SeriesId): Pt[] =>
    points.map((p, i) => ({
      x: x(i),
      y: id === 'costs' ? yRight(p.costs) : yLeft(id === 'revenue' ? p.revenue : p.profit),
    }));

  const step = points.length > 1 ? plotW / (points.length - 1) : plotW;
  const tip = at === null ? null : points[at];

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
              'Revenue, costs and net profit over ' +
              points.length +
              ' periods. Latest revenue ' +
              usd(points[points.length - 1].revenue) +
              '.'
            }
          >
            {leftTicks.map((t) => (
              <g key={'l' + t}>
                <line
                  x1={PAD.left}
                  x2={PAD.left + plotW}
                  y1={yLeft(t)}
                  y2={yLeft(t)}
                  stroke="var(--color-line)"
                />
                <text
                  x={PAD.left - 8}
                  y={yLeft(t)}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-muted text-[10px]"
                >
                  {short(t)}
                </text>
              </g>
            ))}

            {rightTicks.map((t) => (
              <text
                key={'r' + t}
                x={PAD.left + plotW + 8}
                y={yRight(t)}
                dominantBaseline="middle"
                className="fill-muted text-[10px]"
              >
                {short(t)}
              </text>
            ))}

            {points.map((p, i) =>
              p.label ? (
                <text
                  key={'x' + i}
                  x={x(i)}
                  y={size.h - 7}
                  textAnchor="middle"
                  className="fill-muted text-[10px]"
                >
                  {p.label}
                </text>
              ) : null,
            )}

            {mode === 'bar'
              ? SERIES_META.filter((s) => visible[s.id]).map((s, si, arr) => {
                  const w = Math.max(2, (step * 0.62) / arr.length);
                  return points.map((p, i) => {
                    const value =
                      s.id === 'costs' ? p.costs : s.id === 'revenue' ? p.revenue : p.profit;
                    const yv = s.id === 'costs' ? yRight(value) : yLeft(value);
                    const bx = x(i) - (w * arr.length) / 2 + si * w;
                    return (
                      <rect
                        key={s.id + i}
                        x={bx}
                        y={yv}
                        width={w}
                        height={Math.max(1, PAD.top + plotH - yv)}
                        fill={s.colour}
                        opacity={at === null || at === i ? 0.9 : 0.4}
                      />
                    );
                  });
                })
              : SERIES_META.filter((s) => visible[s.id]).map((s) => (
                  <path
                    key={s.id}
                    d={points.length > 2 ? smoothPath(pathFor(s.id), 0.3) : linePath(pathFor(s.id))}
                    fill="none"
                    stroke={s.colour}
                    strokeWidth={s.id === 'profit' ? 1.6 : 2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                ))}

            {at !== null ? (
              <>
                <line
                  x1={x(at)}
                  x2={x(at)}
                  y1={PAD.top}
                  y2={PAD.top + plotH}
                  stroke="var(--color-ink)"
                  strokeDasharray="3 3"
                  opacity="0.5"
                />
                {SERIES_META.filter((s) => visible[s.id]).map((s) => {
                  const value =
                    s.id === 'costs'
                      ? points[at].costs
                      : s.id === 'revenue'
                        ? points[at].revenue
                        : points[at].profit;
                  const yv = s.id === 'costs' ? yRight(value) : yLeft(value);
                  return (
                    <circle
                      key={s.id}
                      cx={x(at)}
                      cy={yv}
                      r="3.5"
                      fill="var(--color-surface)"
                      stroke={s.colour}
                      strokeWidth="2"
                    />
                  );
                })}
              </>
            ) : null}
          </svg>

          {points.map((p, i) => (
            <button
              key={'hit' + i}
              type="button"
              data-hit={i}
              aria-label={
                p.label +
                ': revenue ' +
                usd(p.revenue) +
                ', net profit ' +
                usd(p.profit) +
                ', costs ' +
                usd(p.costs)
              }
              onMouseEnter={() => onAt(i)}
              onMouseLeave={() => onAt(null)}
              onFocus={() => onAt(i)}
              onBlur={() => onAt(null)}
              style={{ left: x(i) - step / 2, width: step, top: 0, height: PAD.top + plotH }}
              className="absolute"
            />
          ))}

          {tip ? (
            <div
              data-tooltip
              style={{
                left: Math.min(Math.max(x(at ?? 0) + 12, PAD.left), size.w - 160),
                top: PAD.top + 6,
              }}
              className="border-line bg-surface pointer-events-none absolute z-10 w-[148px] rounded-lg border p-2.5 shadow-[0_8px_20px_-10px_rgb(20_23_26/0.35)]"
            >
              <p className="text-muted m-0 text-[10px] font-semibold tracking-[0.05em] uppercase">
                {tip.label || 'Period ' + ((at ?? 0) + 1)}
              </p>
              <ul className="m-0 mt-1.5 flex list-none flex-col gap-1 p-0">
                {SERIES_META.filter((s) => visible[s.id]).map((s) => (
                  <li key={s.id} className="flex items-center gap-1.5 text-[11.5px]">
                    <span
                      aria-hidden="true"
                      style={{ background: s.colour }}
                      className={cx(
                        'h-1.5 w-1.5 shrink-0',
                        s.id === 'profit' ? 'rounded-sm' : 'rounded-full',
                      )}
                    />
                    <span className="text-muted min-w-0 flex-1 truncate">{s.label}</span>
                    <span className="text-ink font-semibold">
                      {usd(
                        s.id === 'costs'
                          ? tip.costs
                          : s.id === 'revenue'
                            ? tip.revenue
                            : tip.profit,
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
