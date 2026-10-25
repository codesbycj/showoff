import { CALENDAR } from '@/data/deck';
import { cx } from '@/lib/cx';

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const MARK: Record<string, string> = {
  pink: 'bg-pink text-ink',
  accent: 'bg-accent text-white',
  amber: 'bg-amber-soft text-amber-deep',
  outline: 'border-accent text-accent-deep border-2',
};

/**
 * The month grid.
 *
 * The reference tints three runs of days in three different pastels and never
 * says what any of them mean. Here each tint is a real state — due today, due
 * this week, a sprint window — and the key under the grid names them, because a
 * colour nobody can decode is decoration pretending to be data.
 */
export function MonthGrid({
  selected,
  onSelect,
  compact = false,
  fill = false,
}: {
  selected: number;
  onSelect: (day: number) => void;
  compact?: boolean;
  /** Share the whole region between the week rows instead of sitting at the
   *  top of it — a month grid with 300px of nothing under it reads as a
   *  rendering fault rather than a calendar. */
  fill?: boolean;
}) {
  const cells: (number | null)[] = [
    ...Array.from({ length: CALENDAR.startOffset }, () => null),
    ...Array.from({ length: CALENDAR.days }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div className={cx(fill && 'flex h-full flex-col')}>
      <div className="text-muted grid shrink-0 grid-cols-7 gap-1 text-center text-[11px] font-bold">
        {WEEKDAYS.map((d) => (
          <span key={d} className="py-1">
            {d}
          </span>
        ))}
      </div>

      <div className={cx('mt-1 grid grid-cols-7 gap-1', fill && 'min-h-0 flex-1 auto-rows-fr')}>
        {cells.map((day, i) =>
          day === null ? (
            <span
              key={'blank-' + i}
              aria-hidden="true"
              className={fill ? '' : compact ? 'h-8' : 'h-9'}
            />
          ) : (
            <button
              key={day}
              type="button"
              data-day={day}
              aria-pressed={selected === day}
              aria-label={day + ' ' + CALENDAR.month + ' ' + CALENDAR.year}
              onClick={() => onSelect(day)}
              className={cx(
                'grid place-items-center text-[12.5px] font-semibold transition-colors',
                fill ? 'rounded-2xl' : 'rounded-full',
                fill ? 'h-full' : compact ? 'h-8' : 'h-9',
                selected === day
                  ? 'bg-fill text-fill-fg'
                  : CALENDAR.marks[day]
                    ? MARK[CALENDAR.marks[day]]
                    : 'text-body hover:bg-sunken',
              )}
            >
              {day}
            </button>
          ),
        )}
      </div>
    </div>
  );
}

/** What the three tints mean. The reference leaves them undecodable. */
export function MonthKey() {
  const keys: [string, string][] = [
    ['pink', 'Due today'],
    ['accent', 'Due this week'],
    ['amber', 'Sprint window'],
  ];
  return (
    <ul className="text-muted m-0 flex list-none flex-wrap gap-x-4 gap-y-1 p-0 text-[11.5px]">
      {keys.map(([tone, label]) => (
        <li key={tone} className="flex items-center gap-1.5">
          <span
            aria-hidden="true"
            className={cx(
              'h-2.5 w-2.5 rounded-full',
              tone === 'pink' && 'bg-pink',
              tone === 'accent' && 'bg-accent',
              tone === 'amber' && 'bg-amber',
            )}
          />
          {label}
        </li>
      ))}
    </ul>
  );
}
