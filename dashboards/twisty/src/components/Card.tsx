import type { ReactNode } from 'react';

import { cx } from '@/lib/cx';

/** The one surface every block on every pane sits on. */
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

/** A card's title row: a heading on the left, a control on the right. */
export function CardHead({
  title,
  action,
  className,
  level = 2,
}: {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  level?: 2 | 3;
}) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <div className={cx('flex items-center justify-between gap-3', className)}>
      <Heading className="text-ink m-0 text-[17px] leading-tight font-semibold tracking-[-0.01em]">
        {title}
      </Heading>
      {action}
    </div>
  );
}

/**
 * The "See all" style text control beside a heading.
 *
 * It is a button with an underline rather than a bare anchor: the reference
 * underlines it, and an underline that lives on the text keeps the tap target
 * the full height of the control rather than the height of the line.
 */
export function SeeAll({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group text-body hover:text-ink -my-2 py-2 text-[13px] font-medium transition-colors"
    >
      <span className="border-body/40 group-hover:border-ink border-b pb-px transition-colors">
        {children}
      </span>
    </button>
  );
}
