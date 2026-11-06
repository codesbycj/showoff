import { useState } from 'react';

import { Tip } from '@/components/Bits';
import { cx } from '@/lib/cx';

/**
 * Buy cohorts: what each month's purchases are worth, month by month.
 *
 * Rows are the month bought, columns the months since, and each cell is a
 * percent of what that cohort cost. The diagonal is 100% — the month of
 * purchase — so the grid fills in to the right of it and the empty half is
 * genuinely empty rather than zero.
 *
 * **Six bands, and the text colour flips at the last one.** `--color-heat-4`
 * is 3.47:1 under white and 4.5:1 under ink, so only `heat-5` takes white
 * type. The flip is measured — set one band too early, it fails on seven
 * cells and looks fine.
 */
export function Cohorts({
  grid,
  months,
  label,
}: {
  grid: (number | null)[][];
  months: string[];
  label: string;
}) {
  const [hover, setHover] = useState<{ r: number; c: number } | null>(null);

  const values = grid.flat().filter((v): v is number => v !== null);
  const max = Math.max(...values, 1);
  const min = Math.min(...values, 0);
  const band = (v: number) =>
    Math.min(5, Math.max(0, Math.floor(((v - min) / (max - min || 1)) * 6)));

  return (
    <div className="relative flex min-h-0 flex-1 flex-col" role="img" aria-label={label}>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        {grid.map((row, r) => (
          <div key={months[r]} className="flex min-h-0 flex-1 items-stretch gap-1.5">
            <span className="text-muted w-[34px] shrink-0 self-center text-[11px] font-bold">
              {months[r]}
            </span>
            {row.map((v, c) => {
              const b = v === null ? -1 : band(v);
              return (
                <button
                  key={c}
                  type="button"
                  data-mark={`cell-${r}-${c}`}
                  disabled={v === null}
                  aria-label={
                    v === null
                      ? `${months[r]}, ${months[c]}: nothing bought yet`
                      : `Bought ${months[r]}, worth ${v}% of cost by ${months[c]}`
                  }
                  onPointerEnter={() => v !== null && setHover({ r, c })}
                  onPointerLeave={() =>
                    setHover((cur) => (cur && cur.r === r && cur.c === c ? null : cur))
                  }
                  onFocus={() => v !== null && setHover({ r, c })}
                  onBlur={() => setHover((cur) => (cur && cur.r === r && cur.c === c ? null : cur))}
                  style={v === null ? undefined : { background: `var(--color-heat-${b})` }}
                  className={cx(
                    'tnum grid min-w-0 flex-1 place-items-center rounded-[8px] text-[11.5px] font-bold outline-2 outline-offset-1 outline-transparent transition-[outline]',
                    v === null && 'bg-sunken cursor-default',
                    v !== null && 'cursor-pointer hover:outline-[var(--color-accent)]',
                    b >= 5 ? 'text-white' : 'text-ink',
                  )}
                >
                  {v === null ? '' : v + '%'}
                </button>
              );
            })}
          </div>
        ))}

        <div className="mt-0.5 flex shrink-0 items-center gap-1.5">
          <span className="w-[34px] shrink-0" />
          {months.map((m) => (
            <span key={m} className="text-muted min-w-0 flex-1 text-center text-[10.5px]">
              {m}
            </span>
          ))}
        </div>
      </div>

      {hover ? (
        <Tip
          x={`calc(34px + ${((hover.c + 0.5) / months.length) * 100}%)`}
          y={`${(hover.r / grid.length) * 100}%`}
        >
          <span className="font-semibold">Bought {months[hover.r]}</span>{' '}
          <span className="opacity-75">
            · {grid[hover.r][hover.c]}% of cost by {months[hover.c]}
          </span>
        </Tip>
      ) : null}
    </div>
  );
}
