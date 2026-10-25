import { useId } from 'react';

import type { Point } from '@/data/deck';
import { usd } from '@/lib/format';
import { cx } from '@/lib/cx';
import { useMeasure } from '@/lib/useMeasure';

/**
 * The income chart: one stem per period, a dot at its head, and a rounded
 * column behind whichever one is hovered or selected.
 *
 * Every mark's geometry is computed from the deck -- the stem's length is the
 * value's share of the range's maximum -- so changing a number in `deck.ts`
 * moves the chart, and the range control in the card above genuinely redraws it
 * rather than swapping a traced path (rule 6).
 *
 * The plot is SVG at measured pixel sizes; the period chips under it are real
 * buttons, because they are the tap targets and a 40px button is worth more
 * here than a 40px <rect>. They are siblings rather than nested, which also
 * avoids putting a button inside a button -- the static web build tears that
 * apart.
 */
export function IncomeChart({
  points,
  selected,
  hovered,
  onSelect,
  onHover,
}: {
  points: Point[];
  selected: number;
  hovered: number | null;
  onSelect: (index: number) => void;
  onHover: (index: number | null) => void;
}) {
  const [ref, size] = useMeasure<HTMLDivElement>();
  const titleId = useId();

  const max = Math.max(...points.map((p) => p.value));
  const active = hovered ?? selected;

  // The plot is everything above the chip row; the chips sit in their own band.
  const CHIPS = 54;
  const TOOLTIP = 34;
  const plotH = Math.max(0, size.h - CHIPS - TOOLTIP);
  const step = points.length ? size.w / points.length : 0;
  const centre = (i: number) => step * (i + 0.5);
  // A stem never reaches the very top: the dot needs its own room above it.
  const headY = (v: number) => TOOLTIP + (plotH - 8) * (1 - v / max) + 4;

  const columnW = Math.min(64, Math.max(44, step * 0.66));
  const tip = points[active];

  return (
    <div ref={ref} className="relative h-full min-h-[200px] w-full select-none">
      {/* The highlight column, behind both the plot and the chips, so it reads
          as one shape running the height of the card the way the reference's
          does. */}
      {size.w > 0 ? (
        <div
          aria-hidden="true"
          data-highlight
          style={{
            left: centre(active) - columnW / 2,
            width: columnW,
            top: TOOLTIP - 4,
            bottom: 2,
          }}
          className="from-sunken/0 via-sunken to-sunken-deep absolute rounded-full bg-gradient-to-b transition-[left,width] duration-300 ease-out"
        />
      ) : null}

      {/* The tooltip tracks the active mark rather than the pointer: the mark is
          what it is about, and a pill that follows the cursor inside a 56px
          column only ever looks loose. */}
      {size.w > 0 && tip ? (
        <div
          data-tooltip
          style={{ left: centre(active), top: Math.max(0, headY(tip.value) - TOOLTIP - 6) }}
          className="bg-ink pointer-events-none absolute z-10 -translate-x-1/2 rounded-full px-3.5 py-1.5 text-[13px] font-semibold text-white shadow-[0_6px_16px_-6px_rgb(18_22_29/0.5)] transition-all duration-200 ease-out"
        >
          {usd(tip.value)}
        </div>
      ) : null}

      {size.w > 0 ? (
        <svg
          width={size.w}
          height={Math.max(0, size.h - CHIPS)}
          viewBox={'0 0 ' + size.w + ' ' + Math.max(0, size.h - CHIPS)}
          className="absolute top-0 left-0"
          role="img"
          aria-labelledby={titleId}
        >
          <title id={titleId}>
            {'Income by period. ' +
              points.map((p) => p.full + ' ' + usd(p.value)).join(', ') +
              '. Showing ' +
              (tip ? tip.full : '') +
              '.'}
          </title>
          {points.map((p, i) => {
            const x = centre(i);
            const y = headY(p.value);
            const on = i === active;
            return (
              <g key={p.full} data-mark={'stem-' + i}>
                <line
                  x1={x}
                  x2={x}
                  y1={y + 6}
                  y2={Math.max(0, size.h - CHIPS) - 2}
                  stroke={on ? 'var(--color-spark-soft)' : 'var(--color-line)'}
                  strokeWidth={on ? 2 : 1.5}
                  strokeLinecap="round"
                  className="transition-[stroke] duration-200"
                />
                <circle
                  cx={x}
                  cy={y}
                  r={on ? 5.5 : 4.5}
                  fill="var(--color-spark)"
                  className="transition-[r] duration-200"
                />
              </g>
            );
          })}
        </svg>
      ) : null}

      {/* One transparent hit column per period, over the plot only -- the chips
          below have their own buttons. */}
      {size.w > 0
        ? points.map((p, i) => (
            <button
              key={'hit-' + p.full + i}
              type="button"
              data-hit={i}
              aria-label={p.full + ', ' + usd(p.value)}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(i)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(i)}
              style={{ left: centre(i) - step / 2, width: step, top: 0, height: size.h - CHIPS }}
              className="absolute rounded-xl"
            />
          ))
        : null}

      {/* The period chips. */}
      <div className="absolute inset-x-0 bottom-0 flex h-[54px] items-center">
        {points.map((p, i) => {
          const on = i === active;
          return (
            <div
              key={'chip-' + p.full + i}
              style={{ width: step }}
              className="grid place-items-center"
            >
              <button
                type="button"
                data-chip={i}
                aria-pressed={i === selected}
                aria-label={p.full + ', ' + usd(p.value)}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(null)}
                onClick={() => onSelect(i)}
                className={cx(
                  'grid h-10 w-10 place-items-center rounded-full text-[13px] font-semibold transition-colors duration-200',
                  on
                    ? 'bg-ink text-white'
                    : 'bg-sunken text-muted hover:bg-sunken-deep hover:text-ink',
                )}
              >
                {p.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
