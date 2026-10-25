import { useState } from 'react';

import { Donut } from '@/charts/Donut';
import { Card, CardHead } from '@/components/Card';
import { SelectPill } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { WINDOWS, spendingFor, spendingNote, type WindowId } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * Where the money went.
 *
 * The window control swaps the whole set of figures, and the sentence
 * underneath is written from whichever set is showing rather than fixed — the
 * reference states a conclusion in prose that its own chart cannot be checked
 * against, which is the kind of thing that goes stale the moment the data
 * moves.
 */
export function SpendingCard() {
  const [windowId, setWindowId] = useState<WindowId>('30');
  const [active, setActive] = useState<number | null>(null);

  const slices = spendingFor(windowId);
  const total = slices.reduce((t, s) => t + s.value, 0);

  return (
    <Card pane="spending" className="min-h-0 p-5">
      <CardHead
        title="Spending"
        action={
          <SelectPill name="window" value={windowId} options={WINDOWS} onChange={setWindowId} />
        }
      />

      <div className="mt-2 flex min-h-0 flex-1 items-center gap-4">
        <div className="shrink-0">
          <Donut slices={slices} active={active} onHover={setActive} size={168} thickness={26} />
        </div>

        <ul
          data-scroller="categories"
          className="scroll-region m-0 flex min-h-0 flex-1 list-none flex-col gap-0.5 p-0 pr-1"
        >
          {slices.map((slice, i) => (
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
                  'flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left transition-colors',
                  active === i ? 'bg-raised' : 'hover:bg-raised/60',
                )}
              >
                <span
                  aria-hidden="true"
                  style={{ background: slice.colour }}
                  className="h-2 w-2 shrink-0 rounded-full"
                />
                <span className="text-body min-w-0 flex-1 truncate text-[12px]">{slice.label}</span>
                <span
                  className={cx(
                    'shrink-0 text-[11.5px] tabular-nums transition-colors',
                    active === i ? 'text-ink font-semibold' : 'text-muted',
                  )}
                >
                  {Math.round((slice.value / total) * 100)}%
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <p
        data-note
        className="bg-raised text-muted m-0 mt-3 flex items-start gap-2 rounded-2xl px-3 py-2.5 text-[11.5px] leading-[1.5]"
      >
        <Icon name="sparkle" size={13} className="text-accent mt-[1px] shrink-0" />
        {active === null
          ? spendingNote(slices)
          : slices[active].label +
            ' is ' +
            usd(slices[active].value) +
            ' of ' +
            usd(total) +
            ' over this window.'}
      </p>
    </Card>
  );
}
