import type { ReactNode } from 'react';

import { Icon, type IconName } from '@/components/Icon';
import type { Priority } from '@/data/deck';
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

/** A card's title row: an icon chip, a heading, and controls on the right. */
export function CardHead({
  title,
  icon,
  action,
  className,
}: {
  title: ReactNode;
  icon?: IconName;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cx('flex items-center justify-between gap-3', className)}>
      <div className="flex min-w-0 items-center gap-2">
        {icon ? <Icon name={icon} size={17} className="text-body shrink-0" /> : null}
        <h2 className="text-ink m-0 truncate text-[16px] leading-tight font-bold tracking-[-0.01em]">
          {title}
        </h2>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-1.5">{action}</div> : null}
    </div>
  );
}

export type Tone = 'accent' | 'pink' | 'amber' | 'positive' | 'quiet' | 'fill';

export function Badge({
  children,
  tone = 'quiet',
  icon,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  icon?: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-[3px] text-[11.5px] leading-[17px] font-bold whitespace-nowrap',
        tone === 'accent' && 'bg-accent-soft text-accent-deep',
        tone === 'pink' && 'bg-pink-soft text-pink-deep',
        tone === 'amber' && 'bg-amber-soft text-amber-deep',
        tone === 'positive' && 'bg-positive-soft text-positive',
        tone === 'quiet' && 'bg-sunken text-muted',
        tone === 'fill' && 'bg-fill text-fill-fg',
        className,
      )}
    >
      {icon}
      {children}
    </span>
  );
}

const PRIORITY_TONE: Record<Priority, Tone> = {
  Urgent: 'amber',
  'Low Priority': 'amber',
  Normal: 'accent',
};

/**
 * The priority chip. The reference colours Urgent orange and Low Priority
 * yellow, which are close enough at 11px to be read as the same chip — so the
 * dot in front carries the difference as well as the colour.
 */
export function PriorityBadge({ priority }: { priority: Priority }) {
  const key = priority === 'Urgent' ? 'urgent' : priority === 'Low Priority' ? 'low' : 'normal';
  return (
    <Badge
      tone={PRIORITY_TONE[priority]}
      icon={
        <span
          aria-hidden="true"
          style={{ background: 'var(--color-status-' + key + ')' }}
          className="h-1.5 w-1.5 rounded-full"
        />
      }
    >
      {priority}
    </Badge>
  );
}

export function Avatar({
  src,
  name,
  size = 32,
  ring = false,
  className,
}: {
  src: string;
  name: string;
  size?: number;
  ring?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={cx(
        'bg-sunken shrink-0 rounded-full object-cover',
        ring && 'ring-surface ring-2',
        className,
      )}
    />
  );
}

/** The overlapping stack, with the remainder as a count. */
export function AvatarStack({
  faces,
  extra,
  size = 28,
}: {
  faces: string[];
  extra: number;
  size?: number;
}) {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2">
        {faces.map((face, i) => (
          <Avatar key={i} src={face} name={'Assignee ' + (i + 1)} size={size} ring />
        ))}
      </div>
      {extra > 0 ? <span className="text-muted ml-1.5 text-[12px] font-bold">+{extra}</span> : null}
    </div>
  );
}

/** A small count after a label, as the menu and the board columns use. */
export function Count({ value, tone = 'quiet' }: { value: number; tone?: 'quiet' | 'fill' }) {
  return (
    <span
      className={cx(
        'grid h-[19px] min-w-[19px] shrink-0 place-items-center rounded-full px-1.5 text-[11px] font-bold',
        tone === 'fill' ? 'bg-fill-fg/20 text-fill-fg' : 'bg-sunken text-muted',
      )}
    >
      {value}
    </span>
  );
}
