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
        'bg-surface flex min-h-0 min-w-0 flex-col rounded-[var(--radius-card)] shadow-[var(--shadow-card)]',
        className,
      )}
    >
      {children}
    </section>
  );
}

/**
 * A card's heading row: a tinted glyph tile, the title, and whatever control
 * sits opposite it. The reference puts that tile on all three lower cards, so
 * it is part of the heading rather than something each card re-draws.
 */
export function CardHead({
  title,
  icon,
  action,
  className,
}: {
  title: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('flex items-center justify-between gap-3', className)}>
      <div className="flex min-w-0 items-center gap-2.5">
        {icon ? (
          <span className="bg-sunken text-accent grid h-9 w-9 shrink-0 place-items-center rounded-[12px]">
            {icon}
          </span>
        ) : null}
        <h2 className="text-ink m-0 truncate text-[16px] leading-tight font-semibold tracking-[-0.01em]">
          {title}
        </h2>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}

export type Tone = 'accent' | 'positive' | 'danger' | 'quiet' | 'fill' | 'solid';

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
        tone === 'quiet' && 'bg-sunken text-muted',
        tone === 'fill' && 'bg-rail text-rail-fg',
        tone === 'solid' && 'bg-accent text-white',
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
 * It takes `goodWhen` rather than assuming up is green: spending that falls is
 * good news and a holding that falls is not, and the same component carries
 * both.
 */
export function Delta({
  value,
  goodWhen = 'up',
  suffix = '%',
  className,
}: {
  value: number;
  goodWhen?: 'up' | 'down';
  suffix?: string;
  className?: string;
}) {
  const up = value >= 0;
  const good = goodWhen === 'up' ? up : !up;
  return (
    <span
      className={cx(
        'tnum inline-flex items-center gap-1 text-[12.5px] font-semibold',
        good ? 'text-positive' : 'text-danger',
        className,
      )}
    >
      <Icon name={up ? 'trend-up' : 'trend-down'} size={12} strokeWidth={2.2} />
      {(up ? '+' : '') + value + suffix}
    </span>
  );
}

/** A labelled progress bar: the earning sources, the goals, the card limit. */
export function Meter({
  value,
  tone = 'accent',
  height = 8,
  className,
  children,
}: {
  value: number;
  tone?: 'accent' | 'fill' | 'goal';
  height?: number;
  className?: string;
  /** Anything that rides on the filled end — the "51%" pill, for instance. */
  children?: ReactNode;
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
          tone === 'fill' && 'bg-rail',
          tone === 'goal' && 'bg-accent-soft',
        )}
      />
      {children}
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
        'bg-rail text-rail-fg pointer-events-none absolute z-20 -translate-y-full rounded-xl px-3 py-2 text-[12px] leading-[16px] font-medium whitespace-nowrap shadow-[0_10px_24px_-14px_rgb(29_29_32/0.6)]',
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
