import { useState } from 'react';

import { cx } from '@/lib/cx';

/**
 * The little bar row behind the growth figure and inside the activity card.
 *
 * Flex rather than a stretched viewBox: these bars are 4px wide with a round
 * cap, and a viewBox scaled to its card would skew both. The heights are
 * computed from the data, which is what rule 6 asks for.
 */
export function MiniBars({
  values,
  label,
  tone = 'accent',
}: {
  values: number[];
  label: string;
  tone?: 'accent' | 'ink';
}) {
  const [hover, setHover] = useState<number | null>(null);
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-full min-h-0 items-end gap-[3px]" role="img" aria-label={label}>
      {values.map((v, i) => (
        <button
          key={i}
          type="button"
          data-mark={'mini-' + i}
          aria-label={`Bar ${i + 1}`}
          onPointerEnter={() => setHover(i)}
          onPointerLeave={() => setHover((cur) => (cur === i ? null : cur))}
          className="flex h-full min-w-0 flex-1 cursor-pointer flex-col justify-end"
        >
          <span
            style={{ height: Math.max(8, (v / max) * 100) + '%' }}
            className={cx(
              'block w-full rounded-full transition-colors duration-150',
              hover === i ? 'bg-ink-fill' : tone === 'accent' ? 'bg-accent' : 'bg-sunken-deep',
            )}
          />
        </button>
      ))}
    </div>
  );
}
