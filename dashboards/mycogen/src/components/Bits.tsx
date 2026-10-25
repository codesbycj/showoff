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
  action,
  className,
}: {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('flex items-center justify-between gap-3', className)}>
      <h2 className="text-ink m-0 truncate text-[15.5px] leading-tight font-bold tracking-[-0.01em]">
        {title}
      </h2>
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
 * The up/down figure beside a stat.
 *
 * The arrow carries the direction as well as the colour. **A falling cart
 * abandonment is good news**, which is why this takes `goodWhen` rather than
 * assuming up is green — the reference paints that one red and it is the only
 * figure on the screen where down is what you want.
 */
export function Delta({
  value,
  goodWhen = 'up',
  className,
}: {
  value: number;
  goodWhen?: 'up' | 'down';
  className?: string;
}) {
  const up = value >= 0;
  const good = goodWhen === 'up' ? up : !up;
  return (
    <span
      className={cx(
        'inline-flex items-center gap-1 text-[12px] font-semibold',
        good ? 'text-positive' : 'text-danger',
        className,
      )}
    >
      <Icon name={up ? 'trend-up' : 'trend-down'} size={12} strokeWidth={2.2} />
      {(up ? '+' : '') + value}%
    </span>
  );
}

export function Avatar({
  src,
  name,
  size = 32,
  className,
}: {
  src: string;
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={cx('bg-sunken shrink-0 rounded-full object-cover', className)}
    />
  );
}

/** A labelled progress bar, used by retention and by the product meters. */
export function Meter({
  value,
  tone = 'accent',
  className,
}: {
  value: number;
  tone?: 'accent' | 'positive' | 'danger';
  className?: string;
}) {
  return (
    <span className={cx('bg-sunken-deep block h-2 overflow-hidden rounded-full', className)}>
      <span
        style={{ width: Math.max(0, Math.min(100, value)) + '%' }}
        className={cx(
          'block h-full rounded-full transition-[width] duration-500',
          tone === 'accent' && 'bg-accent',
          tone === 'positive' && 'bg-positive',
          tone === 'danger' && 'bg-danger',
        )}
      />
    </span>
  );
}
