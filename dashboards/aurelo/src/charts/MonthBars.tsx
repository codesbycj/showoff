import { useState } from 'react';

import { Tip } from '@/components/Bits';
import type { MonthPoint } from '@/data/deck';
import { cx } from '@/lib/cx';

/**
 * The five rounded columns under the balance.
 *
 * Flex rather than a stretched viewBox: these bars are 22px wide with a 10px
 * radius in the reference, and a viewBox that scales to its card would skew
 * both. The heights are still computed from the data, which is what rule 6 is
 * asking for — change a month in the deck and the columns move.
 */
export function MonthBars({
  months,
  format,
  label,
}: {
  months: MonthPoint[];
  format: (n: number) => string;
  label: string;
}) {
  const [hover, setHover] = useState<string | null>(null);
  const max = Math.max(...months.map((m) => m.earned), 1);

  return (
    <div className="flex min-h-0 flex-1 flex-col" role="img" aria-label={label}>
      <div className="relative flex min-h-0 flex-1 items-end justify-between gap-2">
        {months.map((m) => {
          const on = hover === m.id;
          return (
            <button
              key={m.id}
              type="button"
              data-mark={m.id}
              aria-label={`${m.label}: ${format(m.earned)} in`}
              onPointerEnter={() => setHover(m.id)}
              onPointerLeave={() => setHover((cur) => (cur === m.id ? null : cur))}
              onFocus={() => setHover(m.id)}
              onBlur={() => setHover((cur) => (cur === m.id ? null : cur))}
              className="flex h-full min-w-0 flex-1 cursor-pointer flex-col justify-end"
            >
              <span
                style={{ height: Math.max(8, (m.earned / max) * 100) + '%' }}
                className={cx(
                  'block w-full rounded-[11px] transition-colors duration-150',
                  on ? 'bg-accent' : 'bg-accent-soft',
                )}
              />
            </button>
          );
        })}

        {hover ? (
          <Tip
            x={`${((months.findIndex((m) => m.id === hover) + 0.5) / months.length) * 100}%`}
            y={`calc(${(1 - months.find((m) => m.id === hover)!.earned / max) * 100}% - 6px)`}
          >
            {format(months.find((m) => m.id === hover)!.earned)}
          </Tip>
        ) : null}
      </div>

      <div className="mt-2.5 flex justify-between gap-2">
        {months.map((m) => (
          <span
            key={m.id}
            className={cx(
              'min-w-0 flex-1 text-center text-[11.5px] transition-colors',
              hover === m.id ? 'text-ink font-semibold' : 'text-muted',
            )}
          >
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
