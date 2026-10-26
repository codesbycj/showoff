import { useState } from 'react';

import { Tip } from '@/components/Bits';
import { cx } from '@/lib/cx';

export interface BillRow {
  id: string;
  label: string;
  /** What the cells measure: billable hours. */
  hours: number;
  /** What those hours are worth, for the tooltip. */
  value: number;
}

const CELLS = 6;

/* Filled cell `i` takes step `i + 1`, not step `i`: step 0 is the colour of an
   *empty* cell, so a row's first filled cell was indistinguishable from the
   track behind it and every bar read one cell short. */

/**
 * Top Clients by billable hours — the reference's row of stepped cells.
 *
 * Six cells per row, filled in proportion to the client's hours against the
 * busiest client's, and the last filled cell carries the figure. The leader's
 * end cell takes the reference's diagonal hatch.
 *
 * **The reference's own version of this card does not work.** It is titled
 * "by Billable Hours" and labelled in dollars — $2K, $1.5K, $900K, $750K —
 * so its bars get shorter as its labels get bigger. Here the cells and the
 * label are the same quantity, read off the matters.
 *
 * Each row is a button, not a decorated div: it is the hit area, it is
 * reachable by keyboard, and `data-mark` is on it so a beats file can name it.
 */
export function BillBars({
  rows,
  active,
  onActive,
  format,
  label,
}: {
  rows: BillRow[];
  active: string | null;
  onActive: (id: string | null) => void;
  format: (value: number) => string;
  label: string;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(...rows.map((r) => r.hours), 1);
  const current = rows.find((r) => r.id === hover);

  return (
    <div className="relative flex min-h-0 flex-1 flex-col" role="img" aria-label={label}>
      <ul className="m-0 flex min-h-0 flex-1 list-none flex-col p-0">
        {rows.map((row, rowIndex) => {
          const filled = Math.max(1, Math.round((row.hours / max) * CELLS));
          return (
            <li key={row.id} className="flex min-h-0 flex-1 items-center">
              <button
                type="button"
                data-mark={row.id}
                aria-pressed={active === row.id}
                aria-label={`${row.label}: ${row.hours} billable hours, ${format(row.value)}`}
                onClick={() => onActive(active === row.id ? null : row.id)}
                onPointerEnter={() => setHover(row.id)}
                onPointerLeave={() => setHover((cur) => (cur === row.id ? null : cur))}
                onFocus={() => setHover(row.id)}
                onBlur={() => setHover((cur) => (cur === row.id ? null : cur))}
                className={cx(
                  'flex w-full items-center gap-3 rounded-xl px-2 py-1.5 transition-opacity',
                  active && active !== row.id ? 'opacity-50' : 'opacity-100',
                )}
              >
                <span
                  className={cx(
                    'w-[108px] shrink-0 text-left text-[12.5px] leading-[16px] font-semibold transition-colors',
                    active === row.id ? 'text-accent-deep' : 'text-body',
                  )}
                >
                  {row.label}
                </span>

                <span className="flex min-w-0 flex-1 gap-1.5">
                  {Array.from({ length: CELLS }, (_, i) => {
                    const on = i < filled;
                    const last = i === filled - 1;
                    const leader = rowIndex === 0 && last;
                    return (
                      <span
                        key={i}
                        style={
                          on && !leader
                            ? { background: `var(--color-bill-${last ? 5 : Math.min(4, i + 1)})` }
                            : undefined
                        }
                        className={cx(
                          'grid h-9 min-w-0 flex-1 place-items-center rounded-[7px] text-[11.5px] font-bold',
                          !on && 'bg-bill-0',
                          leader && 'hatched',
                          last && 'text-accent-fg',
                        )}
                      >
                        {last ? row.hours + ' h' : ''}
                      </span>
                    );
                  })}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {current ? (
        <Tip
          x="50%"
          y={`${((rows.findIndex((r) => r.id === current.id) + 0.1) / rows.length) * 100}%`}
        >
          <span className="font-semibold">{current.label}</span>
          <span className="opacity-75">
            {' '}
            · {current.hours} h · {format(current.value)}
          </span>
        </Tip>
      ) : null}
    </div>
  );
}
