/** The one control this build shares: the lens and sort pills on each tab. */
import { cx } from '@/lib/cx';

export interface Option<T extends string> {
  id: T;
  label: string;
}

/**
 * A segmented control: the USD / IDR / MYR group, the card picker, the ranges.
 */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  name,
  size = 'md',
  className,
}: {
  value: T;
  options: readonly Option<T>[];
  onChange: (id: T) => void;
  /** Goes into data-group, so a beats file can name this control. */
  name: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={name}
      data-group={name}
      className={cx('bg-sunken-deep flex items-center gap-1 rounded-full p-1', className)}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          data-segment={o.id}
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={cx(
            'rounded-full font-semibold transition-colors duration-150',
            size === 'md' ? 'h-9 px-4 text-[13px]' : 'h-7 px-3 text-[12px]',
            value === o.id
              ? 'bg-surface text-ink shadow-[0_1px_2px_rgb(22_36_31/0.12)]'
              : 'text-muted hover:text-ink',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/**
 * The "April v" style control.
 *
 * It closes on an outside **pointerdown**, not click: a click fires after the
 * pointer is released, so a press that starts outside and ends on the trigger
 * reopens what it just closed — and the harness dispatches real pointer
 * events, so a menu wired to click behaves differently under the cursor than
 * it does in a take.
 */
/**
 * The top bar's search. It really filters — transactions on Overview,
 * holdings on Wealth, card spend on Cards — because an interaction that does
 * nothing is what ruins a take (rule 5).
 */
/** A switch. Used by the card controls on the Cards tab. */
