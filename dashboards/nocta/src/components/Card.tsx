import type { ReactNode } from 'react';

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

/** A card's title row: heading left, controls right. */
export function CardHead({
  title,
  action,
  className,
  icon,
}: {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  icon?: ReactNode;
}) {
  return (
    <div className={cx('flex items-center justify-between gap-3', className)}>
      <div className="flex min-w-0 items-center gap-2">
        {icon}
        <h2 className="text-ink m-0 truncate text-[17px] leading-tight font-semibold tracking-[-0.01em]">
          {title}
        </h2>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}
