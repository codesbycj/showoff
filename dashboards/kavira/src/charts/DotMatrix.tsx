import { useState } from 'react';

import { Tip } from '@/components/Bits';

/**
 * A grid of dots, a share of them filled.
 *
 * It is the reference's own chart form, and the one piece of its design that
 * is genuinely unusual — but in the picture the two grids have no stated
 * relationship to the figures above them. Here the filled share *is* the
 * figure's share of the pair, so the two grids read against each other: a
 * denser grid is more money.
 *
 * Each dot is a mark with its own hit area, so the harness can hover one and
 * the tooltip names what that dot is worth.
 */
export function DotMatrix({
  share,
  total,
  cols = 18,
  rows = 6,
  format,
  label,
  tone = 'on',
}: {
  /** 0..1 — how much of the grid is filled. */
  share: number;
  /** What the whole grid is worth, so one dot can be priced. */
  total: number;
  cols?: number;
  rows?: number;
  format: (n: number) => string;
  label: string;
  tone?: 'on' | 'dim';
}) {
  const [hover, setHover] = useState<number | null>(null);

  const count = cols * rows;
  const filled = Math.max(1, Math.round(share * count));
  const per = total / Math.max(1, filled);

  return (
    <div className="relative">
      <div
        role="img"
        aria-label={label}
        className="grid gap-[5px]"
        style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: count }, (_, i) => {
          const on = i < filled;
          return (
            <button
              key={i}
              type="button"
              data-mark={'dot-' + i}
              aria-label={on ? `${format(per * (i + 1))} to here` : 'Not reached'}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover((cur) => (cur === i ? null : cur))}
              onFocus={() => setHover(i)}
              onBlur={() => setHover((cur) => (cur === i ? null : cur))}
              className="aspect-square w-full cursor-pointer rounded-full transition-[background-color,transform] duration-150"
              style={{
                background: on
                  ? tone === 'dim'
                    ? 'var(--color-dot-dim)'
                    : 'var(--color-dot-on)'
                  : 'var(--color-dot-off)',
                transform: hover === i ? 'scale(1.6)' : undefined,
              }}
            />
          );
        })}
      </div>

      {hover !== null ? (
        <Tip
          x={`${((hover % cols) + 0.5) * (100 / cols)}%`}
          y={`${Math.floor(hover / cols) * (100 / rows)}%`}
        >
          {hover < filled ? format(per * (hover + 1)) : 'Not reached'}
        </Tip>
      ) : null}
    </div>
  );
}
