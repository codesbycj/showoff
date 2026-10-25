import { useEffect, useRef, useState } from 'react';

import { Icon, type IconName } from '@/components/Icon';
import { cx } from '@/lib/cx';

/** A round control. 36px, above the 24px AA floor. */
export function IconButton({
  icon,
  label,
  onClick,
  size = 36,
  active = false,
  tone = 'quiet',
  className,
}: {
  icon: IconName;
  label: string;
  onClick?: () => void;
  size?: number;
  active?: boolean;
  tone?: 'quiet' | 'raised' | 'accent';
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-pressed={active || undefined}
      title={label}
      style={{ width: size, height: size }}
      className={cx(
        'grid shrink-0 place-items-center rounded-full transition-colors duration-150',
        tone === 'quiet' && 'border-line text-muted hover:bg-raised hover:text-ink border',
        tone === 'raised' && 'bg-raised text-muted hover:bg-sunken hover:text-ink',
        tone === 'accent' && 'bg-accent text-[#0b1626]',
        active && tone !== 'accent' && 'bg-ink border-ink text-[#111113]',
        className,
      )}
    >
      <Icon name={icon} size={Math.round(size * 0.46)} />
    </button>
  );
}

export interface Option<T extends string> {
  id: T;
  label: string;
}

/**
 * The Weekly / Monthly / Yearly / Range control, and the invoice state filter.
 * The selected segment is a filled pill, as in the reference.
 */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  name,
  className,
}: {
  value: T;
  options: Option<T>[];
  onChange: (id: T) => void;
  name: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={name}
      className={cx('bg-raised flex items-center gap-1 rounded-full p-1', className)}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          data-segment={o.id}
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={cx(
            'h-8 rounded-full px-3.5 text-[12.5px] font-medium transition-colors',
            value === o.id ? 'bg-ink font-semibold text-[#111113]' : 'text-muted hover:text-ink',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/**
 * The "Last 30 Days" pill.
 *
 * Closes on an outside **pointerdown**, not click: a click fires after release,
 * so a press that starts outside and ends on the trigger reopens what it just
 * closed — and the harness dispatches real pointer events.
 */
export function SelectPill<T extends string>({
  value,
  options,
  onChange,
  name,
  align = 'right',
}: {
  value: T;
  options: readonly Option<T>[];
  onChange: (id: T) => void;
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
          'bg-raised text-body hover:text-ink flex h-9 items-center gap-2 rounded-full px-3.5 text-[12.5px] font-medium transition-colors',
          open && 'text-ink',
        )}
      >
        {current.label}
        <Icon
          name="chevron-down"
          size={14}
          className={cx('text-muted transition-transform duration-200', open && 'rotate-180')}
        />
      </button>

      {open ? (
        <ul
          role="listbox"
          data-menu={name}
          className={cx(
            'border-line bg-raised absolute top-[calc(100%+6px)] z-30 min-w-[150px] overflow-hidden rounded-2xl border py-1 shadow-[0_18px_40px_-16px_rgb(0_0_0/0.9)]',
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
                  'hover:bg-sunken flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[12.5px] transition-colors',
                  o.id === value ? 'text-ink font-semibold' : 'text-body',
                )}
              >
                {o.label}
                {o.id === value ? <Icon name="check" size={14} className="text-accent" /> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/** The header search. It really filters the pane's list (rule 5). */
export function SearchBox({
  value,
  onChange,
  placeholder = 'Search',
  className,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'bg-raised border-line focus-within:border-accent/60 relative flex h-11 items-center rounded-full border pr-3 pl-4 transition-colors',
        className,
      )}
    >
      <Icon name="search" size={16} className="text-muted mr-2.5 shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search transactions and invoices"
        data-search
        // h-full, not a bare line box: the pill is 44px tall and an input only
        // as tall as its text is a 20px tap target inside it.
        className="placeholder:text-muted h-full min-w-0 flex-1 border-0 bg-transparent text-[13px] outline-none [&::-webkit-search-cancel-button]:appearance-none"
      />
      {value ? (
        <button
          type="button"
          onClick={() => onChange('')}
          aria-label="Clear search"
          data-search-clear
          className="text-muted hover:bg-sunken hover:text-ink grid h-7 w-7 shrink-0 place-items-center rounded-full transition-colors"
        >
          <Icon name="close" size={14} />
        </button>
      ) : null}
    </div>
  );
}
