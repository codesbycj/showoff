import { useId } from 'react';

import { CALENDAR } from '@/data/deck';
import { cx } from '@/lib/cx';

const WEEKDAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

/**
 * The month grid.
 *
 * The cells before the first and after the last are hatched rather than blank,
 * which is the reference's own treatment and is better than an empty box: it
 * says "this is part of the grid but not part of the month" instead of looking
 * like a rendering gap.
 *
 * The hatch id comes from `useId` — a pattern id is document-global, so a
 * second calendar would otherwise collapse into the first one's fill.
 */
export function MiniCalendar({
  selected,
  onSelect,
}: {
  selected: number;
  onSelect: (day: number) => void;
}) {
  const hatch = 'hatch-' + useId().replace(/:/g, '');
  const cells: (number | null)[] = [
    ...Array.from({ length: CALENDAR.startOffset }, () => null),
    ...Array.from({ length: CALENDAR.days }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      <svg width="0" height="0" aria-hidden="true" className="absolute">
        <defs>
          <pattern
            id={hatch}
            width="6"
            height="6"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect width="6" height="6" fill="transparent" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="var(--color-sunken-deep)" strokeWidth="2.5" />
          </pattern>
        </defs>
      </svg>

      <div className="text-muted grid grid-cols-7 gap-1 text-center text-[11.5px] font-medium">
        {WEEKDAYS.map((d, i) => (
          <span key={i} className="py-1">
            {d}
          </span>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-7 gap-1">
        {cells.map((day, i) =>
          day === null ? (
            <span key={'blank-' + i} className="grid h-9 place-items-center" aria-hidden="true">
              <svg width="28" height="28" viewBox="0 0 28 28" className="opacity-70">
                <rect width="28" height="28" rx="9" fill={'url(#' + hatch + ')'} />
              </svg>
            </span>
          ) : (
            <button
              key={day}
              type="button"
              data-day={day}
              aria-pressed={selected === day}
              aria-label={day + ' ' + CALENDAR.month + ' ' + CALENDAR.year}
              onClick={() => onSelect(day)}
              className={cx(
                'relative grid h-9 place-items-center rounded-[11px] text-[12.5px] transition-colors',
                selected === day
                  ? 'bg-accent font-semibold text-[#0b1626]'
                  : 'text-body hover:bg-raised',
              )}
            >
              {day}
              {CALENDAR.active.includes(day) && selected !== day ? (
                <span
                  aria-hidden="true"
                  className="bg-accent absolute bottom-1 h-1 w-1 rounded-full"
                />
              ) : null}
            </button>
          ),
        )}
      </div>
    </div>
  );
}
