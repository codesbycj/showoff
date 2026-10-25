import type { ReactNode } from 'react';

import { Icon, type IconName } from '@/components/Icon';
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

/**
 * A card's title row. The reference puts a small outlined glyph chip in front
 * of every card title and the controls on the right of the same line.
 */
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
      <div className="flex min-w-0 items-center gap-2.5">
        {icon ? (
          <span className="border-line text-body grid h-8 w-8 shrink-0 place-items-center rounded-[10px] border">
            <Icon name={icon} size={16} />
          </span>
        ) : null}
        <h2 className="text-ink m-0 truncate text-[16px] leading-tight font-bold tracking-[-0.01em]">
          {title}
        </h2>
      </div>
      {action ? <div className="flex shrink-0 items-center gap-2">{action}</div> : null}
    </div>
  );
}
