import { useState } from 'react';

import { Tip } from '@/components/Bits';
import { STATE_LABEL, STATE_ON_INK, STATE_TOKEN, asHours, type Slice } from '@/data/deck';
import { cx } from '@/lib/cx';

/**
 * How a driver's day splits: one stacked bar, four states.
 *
 * **The percentages are computed from the minutes beside them**, and the
 * total is printed. The reference shows 39.7 / 28.3 / 17.4 / 14.6 with no
 * total anywhere — four shares of an unstated day, which cannot be checked
 * against the hours listed underneath.
 *
 * Each segment is a button, so the harness can hover a named state and a
 * keyboard can reach it; the label sits inside when the segment is wide
 * enough to hold it, and the amber segment carries ink type because it is
 * 2.36:1 under white.
 */
export function DayBar({
  slices,
  total,
  active,
  onActive,
}: {
  slices: Slice[];
  total: number;
  active: string | null;
  onActive: (state: string | null) => void;
}) {
  const [hover, setHover] = useState<number | null>(null);

  return (
    <div className="relative">
      <div className="flex h-12 gap-1 overflow-hidden">
        {slices.map((s, i) => {
          const pct = (s.minutes / total) * 100;
          return (
            <button
              key={s.state}
              type="button"
              data-slice={s.state}
              aria-pressed={active === s.state}
              aria-label={`${STATE_LABEL[s.state]}: ${asHours(s.minutes)}, ${pct.toFixed(1)} per cent of the day`}
              onClick={() => onActive(active === s.state ? null : s.state)}
              onPointerEnter={() => setHover(i)}
              onPointerLeave={() => setHover((cur) => (cur === i ? null : cur))}
              style={{ width: pct + '%', background: `var(${STATE_TOKEN[s.state]})` }}
              className={cx(
                'tnum grid shrink-0 place-items-center rounded-[8px] text-[12px] font-bold transition-opacity',
                STATE_ON_INK.includes(s.state) ? 'text-ink' : 'text-white',
                active && active !== s.state ? 'opacity-45' : 'opacity-100',
              )}
            >
              {pct >= 12 ? pct.toFixed(1) + '%' : ''}
            </button>
          );
        })}
      </div>

      {hover !== null ? (
        <Tip
          x={`${slices.slice(0, hover).reduce((t, s) => t + (s.minutes / total) * 100, 0) + (slices[hover].minutes / total) * 50}%`}
          y={-6}
        >
          <span className="font-semibold">{STATE_LABEL[slices[hover].state]}</span>
          <span className="opacity-75"> · {asHours(slices[hover].minutes)}</span>
        </Tip>
      ) : null}
    </div>
  );
}
