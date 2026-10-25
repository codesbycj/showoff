import type { ReactNode } from 'react';

import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';

/** The surface every block sits on. Flat, hairline, 14px radius. */
export function Card({
  children,
  className,
  pane,
}: {
  children: ReactNode;
  className?: string;
  /** A stable handle for the harness, which drives the build through selectors. */
  pane?: string;
}) {
  return (
    <section
      data-card={pane}
      className={cx(
        'border-line bg-surface flex min-h-0 min-w-0 flex-col rounded-[var(--radius-card)] border shadow-[var(--shadow-card)]',
        className,
      )}
    >
      {children}
    </section>
  );
}

/** A card's title row: a heading and the overflow control the reference uses. */
export function CardHead({
  title,
  action,
  className,
}: {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('flex items-center justify-between gap-3', className)}>
      <h2 className="text-ink m-0 truncate text-[15px] leading-tight font-semibold tracking-[-0.005em]">
        {title}
      </h2>
      <div className="flex shrink-0 items-center gap-1.5">
        {action}
        <button
          type="button"
          aria-label="Card actions"
          className="text-muted hover:bg-sunken hover:text-ink grid h-7 w-7 place-items-center rounded transition-colors"
        >
          <Icon name="dots-v" size={15} />
        </button>
      </div>
    </div>
  );
}

/** A small-caps column label, as this design uses above every figure. */
export function Label({ children }: { children: ReactNode }) {
  return (
    <span className="text-muted block text-[10.5px] font-semibold tracking-[0.07em] uppercase">
      {children}
    </span>
  );
}

export type Tone = 'accent' | 'warn' | 'danger' | 'quiet' | 'ink';

export function Badge({
  children,
  tone = 'quiet',
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center gap-1 rounded px-2 py-[2px] text-[11.5px] leading-[16px] font-medium whitespace-nowrap',
        tone === 'accent' && 'bg-accent-soft text-accent-deep',
        tone === 'warn' && 'bg-warn-soft text-[#7a5600]',
        tone === 'danger' && 'bg-danger-soft text-[#9c1f2e]',
        tone === 'quiet' && 'bg-sunken text-muted',
        tone === 'ink' && 'bg-ink text-white',
        className,
      )}
    >
      {children}
    </span>
  );
}

/**
 * The up/down figure beside a total.
 *
 * The arrow carries the direction as well as the colour, so it still reads
 * without colour vision — the reference leaves the green to do all the work.
 */
export function Delta({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span
      className={cx(
        'inline-flex items-center gap-0.5 text-[11.5px] font-semibold',
        up ? 'text-accent-deep' : 'text-danger',
        className,
      )}
    >
      <Icon name={up ? 'arrow-up' : 'arrow-down'} size={11} strokeWidth={2.2} />
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}

/** A checkbox that is a real control, as the invoice rows need. */
export function Check({
  checked,
  onChange,
  label,
  name,
}: {
  checked: boolean;
  onChange: () => void;
  label: string;
  name?: string;
}) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      aria-label={label}
      data-check={name}
      onClick={onChange}
      // The visible box stays 18px, as a dense table wants; the button
      // around it is 24, which is the floor a pointer needs.
      className="-m-[3px] grid h-6 w-6 shrink-0 place-items-center"
    >
      <span
        className={cx(
          'grid h-[18px] w-[18px] place-items-center rounded-[4px] border transition-colors',
          checked
            ? 'border-ink bg-ink text-white'
            : 'border-sunken-deep hover:border-muted text-transparent',
        )}
      >
        <Icon name="check" size={11} strokeWidth={3} />
      </span>
    </button>
  );
}
