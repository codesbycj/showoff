import { useEffect, useRef, useState } from 'react';

import { Icon, type IconName } from '@/components/Icon';
import { cx } from '@/lib/cx';

/** A round control. 36px by default, well above the 24px floor. */
export function IconButton({
  icon,
  label,
  onClick,
  tone = 'quiet',
  size = 36,
  active = false,
  className,
}: {
  icon: IconName;
  label: string;
  onClick?: () => void;
  tone?: 'quiet' | 'surface' | 'outline' | 'cocoa' | 'accent' | 'on-cocoa';
  size?: number;
  active?: boolean;
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
        /*
         * `!active`, not an additive override.
         *
         * Written as `tone === 'quiet' && ...` plus `active && ...`, the two
         * sets both carry a `hover:bg-*` and a text colour, and which one wins
         * is decided by their order in the generated stylesheet rather than by
         * the class list. With the pointer resting on the button — which is
         * exactly where a beat leaves it — the base hover won and the active
         * state never appeared: `drive.js` reported the un-toggle as zero
         * changed pixels.
         */
        tone === 'quiet' && !active && 'text-body hover:bg-sunken hover:text-ink',
        tone === 'surface' && 'bg-surface text-body hover:bg-sunken hover:text-ink',
        tone === 'cocoa' && 'bg-cocoa text-cocoa-fg hover:bg-cocoa-deep',
        tone === 'accent' && 'bg-accent-deep hover:bg-accent text-white',
        tone === 'on-cocoa' && 'text-cocoa-fg hover:bg-white/14',
        tone === 'outline' && 'border-line text-body hover:bg-sunken hover:text-ink border',
        active && tone === 'quiet' && 'bg-cocoa text-cocoa-fg',
        className,
      )}
    >
      <Icon name={icon} size={Math.round(size * 0.47)} />
    </button>
  );
}

/** The two pill buttons under the balance. */
export function Button({
  children,
  icon,
  onClick,
  variant = 'cocoa',
  name,
  className,
}: {
  children: React.ReactNode;
  icon?: IconName;
  onClick?: () => void;
  variant?: 'cocoa' | 'outline' | 'accent';
  name?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-action={name}
      className={cx(
        'inline-flex h-11 shrink-0 items-center gap-2 rounded-full px-4 text-[13.5px] font-semibold transition-colors duration-150',
        variant === 'cocoa' && 'bg-cocoa text-cocoa-fg hover:bg-cocoa-deep',
        variant === 'outline' && 'text-ink border-line hover:bg-sunken border',
        variant === 'accent' && 'bg-accent-deep hover:bg-accent text-white',
        className,
      )}
    >
      {icon ? <Icon name={icon} size={16} /> : null}
      {children}
    </button>
  );
}

export interface Option<T extends string> {
  id: T;
  label: string;
}

/**
 * A segmented control: the USD / IDR / MYR group, the card picker, the ranges.
 */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  name,
  size = 'md',
  className,
}: {
  value: T;
  options: readonly Option<T>[];
  onChange: (id: T) => void;
  /** Goes into data-group, so a beats file can name this control. */
  name: string;
  size?: 'sm' | 'md';
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={name}
      data-group={name}
      className={cx('bg-sunken-deep flex items-center gap-1 rounded-full p-1', className)}
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          data-segment={o.id}
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={cx(
            'rounded-full font-semibold transition-colors duration-150',
            size === 'md' ? 'h-9 px-4 text-[13px]' : 'h-7 px-3 text-[12px]',
            value === o.id
              ? 'bg-surface text-ink shadow-[0_1px_2px_rgb(22_36_31/0.12)]'
              : 'text-muted hover:text-ink',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

/**
 * The "April v" style control.
 *
 * It closes on an outside **pointerdown**, not click: a click fires after the
 * pointer is released, so a press that starts outside and ends on the trigger
 * reopens what it just closed — and the harness dispatches real pointer
 * events, so a menu wired to click behaves differently under the cursor than
 * it does in a take.
 */
export function SelectPill<T extends string>({
  value,
  options,
  onChange,
  name,
  align = 'right',
  className,
}: {
  value: T;
  options: readonly Option<T>[];
  onChange: (id: T) => void;
  name: string;
  align?: 'left' | 'right';
  className?: string;
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
    <div ref={root} className={cx('relative', className)} data-select={name}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cx(
          'border-line text-ink hover:bg-sunken flex h-9 items-center gap-2 rounded-full border px-3.5 text-[12.5px] font-semibold transition-colors',
          open && 'bg-sunken',
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
            'border-line bg-surface absolute top-[calc(100%+6px)] z-30 m-0 min-w-[160px] list-none overflow-hidden rounded-xl border p-1 shadow-[0_18px_40px_-16px_rgb(22_36_31/0.3)]',
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
                  'hover:bg-sunken flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[12.5px] transition-colors',
                  o.id === value ? 'text-ink font-semibold' : 'text-body',
                )}
              >
                {o.label}
                {o.id === value ? (
                  <Icon name="check" size={14} className="text-accent-deep" />
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

/**
 * The top bar's search. It really filters — transactions on Overview,
 * holdings on Wealth, card spend on Cards — because an interaction that does
 * nothing is what ruins a take (rule 5).
 */
export function SearchBox({
  value,
  onChange,
  placeholder,
  className,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'border-line bg-surface focus-within:border-accent-deep/40 relative flex h-10 items-center rounded-full border pr-2.5 pl-4 transition-colors',
        className,
      )}
    >
      <Icon name="search" size={17} className="text-muted mr-2.5 shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        data-search
        /* h-full, not a bare line box: the pill is 44px and an input only as
           tall as its text is a 20px target sitting inside it. */
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

/** A switch. Used by the card controls on the Cards tab. */
export function Toggle({
  on,
  onChange,
  label,
  name,
}: {
  on: boolean;
  onChange: (next: boolean) => void;
  label: string;
  name: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      data-toggle={name}
      onClick={() => onChange(!on)}
      className={cx(
        'relative h-6 w-11 shrink-0 rounded-full transition-colors duration-200',
        on ? 'bg-accent-deep' : 'bg-sunken-deep',
      )}
    >
      <span
        className={cx(
          'bg-surface absolute top-[3px] h-[18px] w-[18px] rounded-full shadow-sm transition-[left] duration-200',
          on ? 'left-[26px]' : 'left-[3px]',
        )}
      />
    </button>
  );
}
