import type { ReactNode } from 'react';

import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';

/** The surface every block sits on. */
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

export function CardHead({
  title,
  sub,
  action,
  className,
}: {
  title: ReactNode;
  sub?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('flex items-start justify-between gap-3', className)}>
      <div className="min-w-0">
        <h2 className="text-ink m-0 truncate text-[16px] leading-tight font-bold tracking-[-0.01em]">
          {title}
        </h2>
        {sub ? <p className="text-muted m-0 mt-1 text-[12px]">{sub}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}

export type Tone = 'accent' | 'positive' | 'danger' | 'info' | 'quiet' | 'fill';

export function Badge({
  children,
  tone = 'quiet',
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[12px] leading-[17px] font-semibold whitespace-nowrap',
        tone === 'accent' && 'bg-accent-soft text-accent-deep',
        tone === 'positive' && 'bg-positive-soft text-positive',
        tone === 'danger' && 'bg-danger-soft text-danger',
        tone === 'info' && 'bg-info-soft text-info',
        tone === 'quiet' && 'bg-sunken text-muted',
        tone === 'fill' && 'bg-fill text-fill-fg',
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

/**
 * The up/down figure. The arrow carries the direction as well as the colour, so
 * it still reads without colour vision.
 */
export function Delta({
  value,
  on = 'light',
  className,
}: {
  value: number;
  /** On the filled orange tile the usual green/red pair is unreadable. */
  on?: 'light' | 'fill';
  className?: string;
}) {
  const up = value >= 0;
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 rounded-full px-2 py-[2px] text-[11.5px] font-bold',
        on === 'fill'
          ? 'bg-white/22 text-white'
          : up
            ? 'bg-positive-soft text-positive'
            : 'bg-danger-soft text-danger',
        className,
      )}
    >
      <Icon name={up ? 'trend-up' : 'trend-down'} size={11} strokeWidth={2.2} />
      {Math.abs(value)}%
    </span>
  );
}

/** A checkbox with an 18px box inside a 24px target. */
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
      className="-m-[3px] grid h-6 w-6 shrink-0 place-items-center"
    >
      <span
        className={cx(
          'grid h-[18px] w-[18px] place-items-center rounded-[5px] border transition-colors',
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
