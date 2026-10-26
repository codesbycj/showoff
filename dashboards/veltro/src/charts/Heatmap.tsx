import { useState } from 'react';

import { Tip } from '@/components/Bits';
import { num } from '@/lib/format';

/**
 * Visits by day and hour.
 *
 * A heatmap is a grid of cells whose *fill* is the value, which is exactly
 * what the reference draws — and the one chart form where the tooltip has to
 * name both axes, because a cell on its own says nothing. Five bands, scaled
 * to the grid's own maximum.
 */
export function Heatmap({
  grid,
  days,
  hours,
  label,
}: {
  grid: number[][];
  days: string[];
  hours: string[];
  label: string;
}) {
  const [hover, setHover] = useState<{ d: number; h: number } | null>(null);

  const max = Math.max(...grid.flat(), 1);
  const band = (v: number) => Math.min(4, Math.floor((v / max) * 5));

  return (
    <div className="relative flex min-h-0 flex-1 flex-col" role="img" aria-label={label}>
      <div className="flex min-h-0 flex-1 flex-col gap-1.5">
        {grid.map((row, d) => (
          <div key={days[d]} className="flex min-h-0 flex-1 items-stretch gap-1.5">
            <span className="text-muted w-[34px] shrink-0 self-center text-[10.5px] font-semibold">
              {days[d]}
            </span>
            {row.map((v, h) => (
              <button
                key={h}
                type="button"
                data-mark={`cell-${d}-${h}`}
                aria-label={`${days[d]} ${hours[h]}: ${num(v)} visits`}
                onPointerEnter={() => setHover({ d, h })}
                onPointerLeave={() =>
                  setHover((cur) => (cur && cur.d === d && cur.h === h ? null : cur))
                }
                onFocus={() => setHover({ d, h })}
                onBlur={() => setHover((cur) => (cur && cur.d === d && cur.h === h ? null : cur))}
                style={{ background: `var(--color-heat-${band(v)})` }}
                className="min-w-0 flex-1 cursor-pointer rounded-[5px] outline-2 outline-offset-1 outline-transparent transition-[outline] hover:outline-[var(--color-ink-fill)]"
              />
            ))}
          </div>
        ))}

        <div className="mt-0.5 flex shrink-0 items-center gap-1.5">
          <span className="w-[34px] shrink-0" />
          {hours.map((hr, i) => (
            <span key={hr} className="text-muted min-w-0 flex-1 text-center text-[9.5px]">
              {i % 2 === 0 ? hr : ''}
            </span>
          ))}
        </div>
      </div>

      {hover ? (
        <Tip
          x={`calc(34px + ${((hover.h + 0.5) / hours.length) * 100}%)`}
          y={`${(hover.d / grid.length) * 100}%`}
        >
          <span className="font-semibold">
            {days[hover.d]} {hours[hover.h]}
          </span>{' '}
          {num(grid[hover.d][hover.h])}
        </Tip>
      ) : null}
    </div>
  );
}
