import { useState } from 'react';

import { Tip } from '@/components/Bits';
import { cx } from '@/lib/cx';

/**
 * Seven days of spend, as bars.
 *
 * Flex rather than an SVG viewBox, because the bars have to keep their 6px
 * radius and their gap at any card width — a stretched viewBox would skew
 * both. The heights are still computed from the data, which is what rule 6
 * is actually asking for.
 */
export function WeekBars({
  values,
  labels,
  format,
  label,
}: {
  values: number[];
  labels: string[];
  format: (n: number) => string;
  label: string;
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...values, 1);

  return (
    <div className="flex min-h-0 flex-1 flex-col" role="img" aria-label={label}>
      <div className="relative flex min-h-0 flex-1 items-end gap-1.5">
        {values.map((v, i) => (
          <button
            key={i}
            type="button"
            data-mark={'day-' + i}
            aria-label={`${labels[i]}: ${format(v)}`}
            onPointerEnter={() => setHover(i)}
            onPointerLeave={() => setHover((cur) => (cur === i ? null : cur))}
            onFocus={() => setHover(i)}
            onBlur={() => setHover((cur) => (cur === i ? null : cur))}
            className="flex h-full min-w-0 flex-1 cursor-pointer flex-col justify-end"
          >
            <span
              style={{ height: Math.max(4, (v / max) * 100) + '%' }}
              className={cx(
                'block w-full rounded-[7px] transition-colors duration-150',
                hover === i ? 'bg-accent' : 'bg-accent-soft',
              )}
            />
          </button>
        ))}

        {hover !== null ? (
          <Tip
            x={`${((hover + 0.5) / values.length) * 100}%`}
            y={`calc(${(1 - values[hover] / max) * 100}% - 6px)`}
          >
            {format(values[hover])}
          </Tip>
        ) : null}
      </div>

      <div className="text-muted mt-2 flex gap-1.5 text-[11px]">
        {labels.map((l, i) => (
          <span
            key={l}
            className={cx('min-w-0 flex-1 text-center', hover === i && 'text-ink font-semibold')}
          >
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
