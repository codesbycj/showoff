import { useState } from 'react';

import { Donut } from '@/charts/Donut';
import { MonthBars } from '@/charts/MonthBars';
import { Card, CardHead } from '@/components/Card';
import { INCOME_MIX, MONTHLY } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * What the money came from.
 *
 * The ring and the legend share one hover: pointing at either highlights both
 * and writes the figure into the middle of the ring, so the legend is a
 * control rather than a key.
 */
export function IncomeMix() {
  const [active, setActive] = useState<number | null>(null);
  const total = INCOME_MIX.reduce((t, s) => t + s.value, 0);

  return (
    <Card pane="mix" className="row-span-2 min-h-0 p-6">
      <CardHead title="Income Mix" />

      <div className="grid min-h-0 flex-1 place-items-center">
        <Donut slices={INCOME_MIX} active={active} onHover={setActive} size={250} />
      </div>

      <ul className="m-0 mt-4 flex list-none flex-col gap-1 p-0">
        {INCOME_MIX.map((slice, i) => (
          <li key={slice.id}>
            <button
              type="button"
              data-legend={slice.id}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(null)}
              onClick={() => setActive((cur) => (cur === i ? null : i))}
              aria-pressed={active === i}
              className={cx(
                'flex w-full items-center gap-3 rounded-xl px-2 py-2 text-left transition-colors',
                active === i ? 'bg-sunken' : 'hover:bg-sunken/60',
              )}
            >
              <span
                aria-hidden="true"
                style={{ background: slice.colour }}
                className="h-2.5 w-2.5 shrink-0 rounded-full"
              />
              <span className="text-body min-w-0 flex-1 truncate text-[13px] font-medium">
                {slice.label}
              </span>
              <span className="text-ink text-[13px] font-semibold">{usd(slice.value)}</span>
              <span className="text-muted w-10 shrink-0 text-right text-[12px] tabular-nums">
                {Math.round((slice.value / total) * 100)}%
              </span>
            </button>
          </li>
        ))}
      </ul>

      <div className="border-line mt-5 border-t pt-5">
        <MonthBars points={MONTHLY} />
      </div>
    </Card>
  );
}
