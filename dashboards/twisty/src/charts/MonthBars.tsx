import { useState } from 'react';

import type { Point } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * Six months of income as bars.
 *
 * Heights come from the deck, and the read-out above follows the bar under the
 * pointer -- so the chart answers the question it raises ("how much was
 * December?") rather than leaving it to a tooltip that is not there.
 *
 * The bars are divs rather than SVG rects on purpose: there is no axis, no
 * path and no gradient here, and a flex row of six rounded divs is responsive
 * without measuring anything.
 */
export function MonthBars({ points }: { points: Point[] }) {
  const [at, setAt] = useState<number | null>(null);
  const max = Math.max(...points.map((p) => p.value));
  const min = Math.min(...points.map((p) => p.value));
  const active = at ?? points.length - 1;

  /*
   * The baseline is below the smallest month, not at zero.
   *
   * Six months of a working freelancer's income all sit in the same band, so
   * against a zero baseline every bar is within 20% of the tallest and the
   * chart says nothing. Starting the axis under the minimum is the honest way
   * to show variation at this size -- there are no gridlines and no axis
   * labels implying otherwise, and the figure for the bar under the pointer is
   * printed above it.
   */
  const floor = min - (max - min) * 0.55;
  const height = (v: number) => 18 + ((v - floor) / (max - floor)) * 68;

  return (
    <div data-chart="months">
      <div className="flex items-baseline justify-between">
        <span className="text-muted text-[11.5px] font-medium tracking-[0.03em] uppercase">
          Last six months
        </span>
        <span data-month-value className="text-ink text-[13px] font-semibold">
          {usd(points[active].value)}
          <span className="text-muted ml-1.5 text-[11.5px] font-medium">{points[active].full}</span>
        </span>
      </div>

      <div className="mt-3 flex h-[86px] items-end gap-2">
        {points.map((p, i) => (
          <button
            key={p.full}
            type="button"
            data-mark={'month-' + i}
            aria-label={p.full + ', ' + usd(p.value)}
            onMouseEnter={() => setAt(i)}
            onMouseLeave={() => setAt(null)}
            onFocus={() => setAt(i)}
            onBlur={() => setAt(null)}
            className="group flex h-full flex-1 flex-col items-center justify-end"
          >
            <span
              style={{ height: height(p.value) }}
              className={cx(
                'block w-[26px] rounded-t-[6px] rounded-b-[2px] transition-colors duration-200',
                i === active ? 'bg-ink' : 'bg-muted/30 group-hover:bg-muted/55',
              )}
            />
            <span
              className={cx(
                'mt-2 block text-[11px] transition-colors',
                i === active ? 'text-ink font-semibold' : 'text-muted',
              )}
            >
              {p.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
