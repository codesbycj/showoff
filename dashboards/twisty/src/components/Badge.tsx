import type { ReactNode } from 'react';

import { cx } from '@/lib/cx';

export type BadgeTone = 'ink' | 'quiet' | 'accent' | 'spark' | 'positive';

/** A small status pill: Paid, Not Paid, Senior, Middle, Pending. */
export function Badge({
  children,
  tone = 'quiet',
  className,
}: {
  children: ReactNode;
  tone?: BadgeTone;
  className?: string;
}) {
  return (
    <span
      className={cx(
        'inline-flex shrink-0 items-center rounded-full px-2.5 py-[3px] text-[12px] leading-[17px] font-semibold tracking-[0.01em] whitespace-nowrap',
        tone === 'ink' && 'bg-ink text-white',
        tone === 'quiet' && 'bg-sunken text-muted',
        tone === 'accent' && 'bg-accent-deep text-white',
        tone === 'spark' && 'bg-spark-soft text-[#2f4c86]',
        tone === 'positive' && 'text-positive bg-[#e4f3ec]',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** A tag: Remote, Part-time, Contract. Outlined rather than filled. */
export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="bg-sunken text-body inline-flex items-center rounded-full px-3 py-[5px] text-[12px] font-medium">
      {children}
    </span>
  );
}
