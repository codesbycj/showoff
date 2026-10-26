import type { ReactNode } from 'react';

import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';

/** The surface every block sits on: white, hairline border, 16px radius. */
export function Card({
  children,
  className,
  pane,
  tone = 'plain',
}: {
  children: ReactNode;
  className?: string;
  /** A stable handle for the harness, which drives the build through selectors. */
  pane?: string;
  /** `tint` is the reference's pale profit card. */
  tone?: 'plain' | 'tint';
}) {
  return (
    <section
      data-card={pane}
      className={cx(
        'flex min-h-0 min-w-0 flex-col rounded-[var(--radius-card)]',
        tone === 'plain' && 'border-line bg-surface border shadow-[var(--shadow-card)]',
        tone === 'tint' && 'bg-tint',
        className,
      )}
    >
      {children}
    </section>
  );
}

/** A card's heading row: the title, a subtitle where the design has one, and
    whatever control sits opposite. */
export function CardHead({
  title,
  note,
  action,
  className,
}: {
  title: ReactNode;
  note?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('flex items-start justify-between gap-3', className)}>
      <div className="min-w-0">
        <h2 className="text-ink m-0 truncate text-[17px] leading-tight font-bold tracking-[-0.01em]">
          {title}
        </h2>
        {note ? <p className="text-muted m-0 mt-1 truncate text-[12.5px]">{note}</p> : null}
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}

export type Tone = 'accent' | 'positive' | 'danger' | 'warn' | 'quiet' | 'solid' | 'outline';

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
        tone === 'accent' && 'bg-accent-faint text-accent-deep',
        tone === 'positive' && 'bg-positive-soft text-positive',
        tone === 'danger' && 'bg-danger-soft text-danger',
        tone === 'warn' && 'bg-warn-soft text-warn',
        tone === 'quiet' && 'bg-sunken text-muted',
        tone === 'solid' && 'bg-accent-deep text-accent-fg',
        /* The reference's priority pills are outlined, not filled. */
        tone === 'outline' && 'border-line text-body border bg-transparent',
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

/**
 * The up/down figure beside a stat — the reference's "+20%" chip.
 *
 * It takes `goodWhen` rather than assuming up is green: an overdue balance
 * that rises is not good news, and the same component carries both.
 */
export function Delta({
  value,
  goodWhen = 'up',
  suffix = '%',
  chip = false,
  className,
}: {
  value: number;
  goodWhen?: 'up' | 'down';
  suffix?: string;
  /** The reference draws this one as a pale pill rather than as bare text. */
  chip?: boolean;
  className?: string;
}) {
  const up = value >= 0;
  const good = goodWhen === 'up' ? up : !up;
  return (
    <span
      className={cx(
        'tnum inline-flex items-center gap-1 text-[12.5px] font-semibold',
        good ? 'text-positive' : 'text-danger',
        chip && (good ? 'bg-positive-soft' : 'bg-danger-soft'),
        chip && 'rounded-full px-2 py-[2px]',
        className,
      )}
    >
      {chip ? null : <Icon name={up ? 'trend-up' : 'trend-down'} size={12} strokeWidth={2.2} />}
      {(up ? '+' : '') + value + suffix}
    </span>
  );
}

/** A labelled progress bar: the workload rows, the collected share. */
export function Meter({
  value,
  tone = 'accent',
  height = 8,
  className,
}: {
  value: number;
  tone?: 'accent' | 'bright' | 'danger';
  height?: number;
  className?: string;
}) {
  const w = Math.max(0, Math.min(100, value));
  return (
    <span
      style={{ height }}
      className={cx('bg-sunken-deep relative block rounded-full', className)}
    >
      <span
        style={{ width: w + '%' }}
        className={cx(
          'block h-full rounded-full transition-[width] duration-500',
          tone === 'accent' && 'bg-accent',
          tone === 'bright' && 'bg-accent-bright',
          tone === 'danger' && 'bg-danger',
        )}
      />
    </span>
  );
}

export function Avatar({
  src,
  name,
  size = 36,
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

/**
 * The chart tooltip.
 *
 * It is positioned by the caller in the chart's own coordinate space and
 * clamped there, because a tooltip that runs off the right edge of a card is
 * the first thing a hover beat photographs.
 */
export function Tip({
  x,
  y,
  children,
  align = 'center',
}: {
  /** A number of pixels, or any CSS length — a percentage, a calc(). */
  x: number | string;
  y: number | string;
  children: ReactNode;
  align?: 'center' | 'left' | 'right';
}) {
  return (
    <div
      data-tip
      style={{ left: x, top: y }}
      className={cx(
        'border-line bg-surface text-ink pointer-events-none absolute z-20 -translate-y-full rounded-xl border px-3 py-2 text-[12px] leading-[16px] font-medium whitespace-nowrap shadow-[0_14px_30px_-14px_rgb(16_39_44/0.35)]',
        align === 'center' && '-translate-x-1/2',
        align === 'right' && '-translate-x-full',
      )}
    >
      {children}
    </div>
  );
}

/** An empty state. Every filterable list here has one (rule 5). */
export function Empty({ what, query }: { what: string; query: string }) {
  return (
    <div className="grid h-full place-items-center px-6 py-10 text-center">
      <p className="text-muted m-0 text-[13px]">
        No {what} matches <span className="text-ink font-semibold">{query}</span>.
      </p>
    </div>
  );
}
