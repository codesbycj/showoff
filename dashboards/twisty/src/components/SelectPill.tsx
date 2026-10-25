import { useEffect, useRef, useState } from 'react';

import { Icon } from '@/components/Icon';
import { cx } from '@/lib/cx';

export interface Option<T extends string> {
  id: T;
  label: string;
}

/**
 * The "Week v" control, and the date pill on Proposal Progress.
 *
 * It closes on an outside **pointerdown** rather than on click. A click fires
 * after the pointer is released, so a press that starts outside and finishes on
 * the trigger reopens what it just closed; and the harness dispatches real
 * pointer events, so a menu wired to `click` behaves differently under the
 * cursor than it does in a take.
 */
export function SelectPill<T extends string>({
  value,
  options,
  onChange,
  icon,
  name,
  align = 'right',
}: {
  value: T;
  options: Option<T>[];
  onChange: (id: T) => void;
  icon?: 'calendar';
  /** Goes into data-select, so a beats file can name this control. */
  name: string;
  align?: 'left' | 'right';
}) {
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const current = options.find((o) => o.id === value) ?? options[0];

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!root.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <div ref={root} className="relative" data-select={name}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cx(
          'border-line bg-surface text-ink hover:bg-sunken flex h-10 items-center gap-2 rounded-full border px-4 text-[13px] font-medium transition-colors',
          open && 'bg-sunken',
        )}
      >
        {icon ? <Icon name={icon} size={15} className="text-muted" /> : null}
        {current.label}
        <Icon
          name="chevron-down"
          size={15}
          className={cx('text-muted transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          data-menu={name}
          className={cx(
            'border-line bg-surface absolute top-[calc(100%+6px)] z-20 min-w-[148px] overflow-hidden rounded-2xl border py-1 shadow-[0_12px_32px_-12px_rgb(18_22_29/0.26)]',
            align === 'right' ? 'right-0' : 'left-0',
          )}
        >
          {options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                role="option"
                aria-selected={o.id === value}
                data-option={o.id}
                onClick={() => {
                  onChange(o.id);
                  setOpen(false);
                }}
                className={cx(
                  'hover:bg-sunken flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-[13px] transition-colors',
                  o.id === value ? 'text-ink font-semibold' : 'text-body',
                )}
              >
                {o.label}
                {o.id === value ? <Icon name="check" size={15} className="text-accent" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
