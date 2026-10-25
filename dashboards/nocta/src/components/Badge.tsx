import type { ReactNode } from 'react';

import type { InvoiceState } from '@/data/deck';
import { cx } from '@/lib/cx';

export type Tone = 'positive' | 'warn' | 'danger' | 'accent' | 'quiet';

export function Badge({
  children,
  tone = 'quiet',
  dot = false,
  className,
}: {
  children: ReactNode;
  tone?: Tone;
  /** The reference marks invoice state with a coloured dot before the word. */
  dot?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center gap-1.5 rounded-full px-2.5 py-[3px] text-[12px] leading-[17px] font-medium whitespace-nowrap',
        tone === 'positive' && 'bg-positive-soft text-positive',
        tone === 'warn' && 'bg-warn-soft text-warn',
        tone === 'danger' && 'bg-danger-soft text-danger',
        tone === 'accent' && 'bg-accent-soft text-accent-deep',
        tone === 'quiet' && 'bg-sunken text-muted',
        className,
      )}
    >
      {dot ? <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-current" /> : null}
      {children}
    </span>
  );
}

const STATE_TONE: Record<InvoiceState, Tone> = {
  Paid: 'positive',
  Pending: 'warn',
  Unpaid: 'danger',
};

export function StateBadge({ state }: { state: InvoiceState }) {
  return (
    <Badge tone={STATE_TONE[state]} dot>
      {state}
    </Badge>
  );
}

/**
 * The +8.3% pill beside the revenue figure.
 *
 * It carries the sign in the text as well as the colour, so it still reads
 * without colour vision — the reference leaves the green to do all the work.
 */
export function DeltaPill({ value, className }: { value: number; className?: string }) {
  const up = value >= 0;
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-[3px] text-[12px] font-semibold whitespace-nowrap',
        up ? 'bg-positive-soft text-positive' : 'bg-danger-soft text-danger',
        className,
      )}
    >
      {/* Drawn, not the geometric-shape codepoint: Geist has no U+25B2, so it
          would fall back to whatever symbol font the platform has and the
          triangle would not match the type beside it. */}
      <svg width="8" height="8" viewBox="0 0 8 8" aria-hidden="true" focusable="false">
        <path d={up ? 'M4 1 7.2 6.6H0.8z' : 'M4 7 0.8 1.4h6.4z'} fill="currentColor" />
      </svg>
      {Math.abs(value).toFixed(1)}%
    </span>
  );
}
