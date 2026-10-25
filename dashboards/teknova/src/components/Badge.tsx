import type { ReactNode } from 'react';

import type { Status } from '@/data/deck';
import { cx } from '@/lib/cx';

export type Tone = 'accent' | 'warn' | 'info' | 'quiet' | 'ink';

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
        'inline-flex shrink-0 items-center rounded-full px-2.5 py-[3px] text-[12px] leading-[17px] font-semibold whitespace-nowrap',
        tone === 'accent' && 'bg-accent-soft text-accent-deep',
        tone === 'warn' && 'bg-warn-soft text-warn-deep',
        tone === 'info' && 'bg-info-soft text-info-deep',
        tone === 'quiet' && 'bg-sunken text-muted',
        tone === 'ink' && 'bg-fill text-fill-fg',
        className,
      )}
    >
      {children}
    </span>
  );
}

const STATUS_TONE: Record<Status, Tone> = {
  Completed: 'accent',
  Cancelled: 'warn',
  Pending: 'info',
  Refunded: 'quiet',
};

export function StatusBadge({ status }: { status: Status }) {
  return <Badge tone={STATUS_TONE[status]}>{status}</Badge>;
}

/**
 * The +8% / -5% pill that sits on every bar and beside every figure.
 *
 * It carries the sign in the text rather than only in the colour: the whole
 * point of the badge is readable without colour vision, and the reference's
 * green and orange are the only thing telling the two apart.
 */
export function DeltaBadge({
  value,
  className,
  size = 'sm',
}: {
  value: number;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const up = value >= 0;
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center rounded-full font-bold whitespace-nowrap',
        size === 'sm' ? 'px-2 py-[2px] text-[11.5px]' : 'px-2.5 py-[3px] text-[12.5px]',
        up ? 'bg-accent text-ink' : 'bg-warn text-ink',
        className,
      )}
    >
      {(up ? '+' : '') + value}%
    </span>
  );
}
