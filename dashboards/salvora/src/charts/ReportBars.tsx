import { useState } from 'react';

import { niceTicks } from '@/charts/scale';
import type { ReportBar } from '@/data/deck';
import { cx } from '@/lib/cx';
import { num } from '@/lib/format';

/**
 * The Sales Report: three horizontal bars with a count on each and a shared
 * axis beneath them.
 *
 * Flex rather than a stretched viewBox, because the bars keep a 7px radius at
 * any card width and a scaled viewBox would skew it. The widths are computed
 * from the data, which is what rule 6 asks for.
 */
export function ReportBars({ bars, label }: { bars: ReportBar[]; label: string }) {
  const [hover, setHover] = useState<string | null>(null);

  const max = Math.max(...bars.map((b) => b.value), 1);
  const ticks = niceTicks([0, max], 5).filter((t) => t <= max);
  const top = ticks[ticks.length - 1] === max ? max : max;

  return (
    <div className="flex min-h-0 flex-1 flex-col" role="img" aria-label={label}>
      <ul className="m-0 flex min-h-0 flex-1 list-none flex-col justify-evenly gap-2 p-0">
        {bars.map((b) => {
          const on = hover === b.id;
          return (
            <li key={b.id}>
              <button
                type="button"
                data-mark={b.id}
                aria-label={`${b.label}: ${num(b.value)}`}
                onPointerEnter={() => setHover(b.id)}
                onPointerLeave={() => setHover((cur) => (cur === b.id ? null : cur))}
                onFocus={() => setHover(b.id)}
                onBlur={() => setHover((cur) => (cur === b.id ? null : cur))}
                className="block w-full cursor-pointer text-left"
              >
                <span
                  className={cx(
                    'mb-1.5 block text-[11.5px] transition-colors',
                    on ? 'text-ink font-bold' : 'text-body',
                  )}
                >
                  {b.label}
                </span>
                <span className="bg-sunken flex h-7 items-center rounded-[7px]">
                  <span
                    style={{ width: Math.max(14, (b.value / top) * 100) + '%' }}
                    className={cx(
                      'flex h-full items-center justify-end rounded-[7px] pr-2 transition-colors duration-150',
                      on ? 'bg-forest' : 'bg-accent',
                    )}
                  >
                    <span
                      className={cx(
                        'tnum text-[11px] font-bold',
                        on ? 'text-forest-fg' : 'text-forest',
                      )}
                    >
                      {num(b.value)}
                    </span>
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="text-muted mt-2 flex justify-between text-[10.5px]">
        {ticks.map((t) => (
          <span key={t}>{num(t)}</span>
        ))}
      </div>
    </div>
  );
}
