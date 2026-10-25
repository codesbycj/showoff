import { useEffect, useRef, useState } from 'react';

import { Icon, type IconName } from '@/components/Icon';
import { cx } from '@/lib/cx';

/** A round or rounded-square control. 36px, above the 24px AA floor. */
export function IconButton({
  icon,
  label,
  onClick,
  tone = 'quiet',
  size = 36,
  active = false,
  square = false,
  className,
}: {
  icon: IconName;
  label: string;
  onClick?: () => void;
  tone?: 'quiet' | 'surface' | 'ink';
  size?: number;
  active?: boolean;
  square?: boolean;
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
        'grid shrink-0 place-items-center transition-colors duration-150',
        square ? 'rounded-[10px]' : 'rounded-full',
        tone === 'quiet' && 'border-line text-body hover:bg-sunken hover:text-ink border',
        tone === 'surface' && 'bg-surface text-body hover:bg-sunken hover:text-ink',
        tone === 'ink' && 'bg-fill hover:bg-fill/88 text-fill-fg',
        active &&
          tone !== 'ink' &&
          'bg-fill hover:bg-fill border-ink text-fill-fg hover:text-fill-fg',
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
 * The "Month v" and "All Category v" controls.
 *
 * It closes on an outside **pointerdown**, not click: a click fires after the
 * pointer is released, so a press that starts outside and ends on the trigger
 * reopens what it just closed — and the harness dispatches real pointer events,
 * so a menu wired to click behaves differently under the cursor than in a take.
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
  options: Option<T>[];
  onChange: (id: T) => void;
  /** Goes into data-select, so a beats file can name this control. */
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
          'border-line text-ink hover:bg-sunken flex h-9 items-center gap-2 rounded-full border px-3.5 text-[13px] font-semibold transition-colors',
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
            'border-line bg-surface absolute top-[calc(100%+6px)] z-30 min-w-[150px] overflow-hidden rounded-2xl border py-1 shadow-[0_14px_34px_-14px_rgb(21_23_28/0.3)]',
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
                  'hover:bg-sunken flex w-full items-center justify-between gap-3 px-3.5 py-2.5 text-left text-[13px] transition-colors',
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

/**
 * The top bar's search. It really filters — the board on Dashboard, the table
 * on Task Overview, the month's list on Calendar — because an interaction that
 * does nothing is what ruins a take (rule 5).
 */
export function SearchBox({
  value,
  onChange,
  placeholder = 'Search here...',
  hint = '⌘S',
  className,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
  hint?: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'border-line bg-surface focus-within:border-ink/30 relative flex h-11 items-center rounded-full border pr-3 pl-4 transition-colors',
        className,
      )}
    >
      <Icon name="search" size={17} className="text-muted mr-2.5 shrink-0" />
      <input
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label="Search tasks, projects and people"
        data-search
        // h-full, not a bare line box: the pill is 44px tall and an input that
        // is only as tall as its text is a 20px tap target inside it.
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
      ) : (
        <kbd className="border-line text-muted rounded-md border px-1.5 py-0.5 font-sans text-[11px] font-semibold">
          {hint}
        </kbd>
      )}
    </div>
  );
}

/** A segmented control: All / Completed / Pending, and the like. */
export function Segmented<T extends string>({
  value,
  options,
  onChange,
  name,
}: {
  value: T;
  options: Option<T>[];
  onChange: (id: T) => void;
  name: string;
}) {
  return (
    <div
      role="group"
      aria-label={name}
      className="bg-sunken flex items-center gap-1 rounded-full p-1"
    >
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          data-segment={o.id}
          aria-pressed={value === o.id}
          onClick={() => onChange(o.id)}
          className={cx(
            'h-8 rounded-full px-3.5 text-[12.5px] font-semibold transition-colors',
            value === o.id
              ? 'bg-surface text-ink shadow-[0_1px_2px_rgb(21_23_28/0.1)]'
              : 'text-muted hover:text-ink',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
