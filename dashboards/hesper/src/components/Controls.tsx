import { useEffect, useRef, useState } from 'react';

import { Icon, type IconName } from '@/components/Icon';
import { cx } from '@/lib/cx';

/** A round control: the header's search, bell and mail, a card's menu. */
export function IconButton({
  icon,
  label,
  onClick,
  tone = 'outline',
  size = 40,
  active = false,
  name,
  className,
}: {
  icon: IconName;
  label: string;
  onClick?: () => void;
  tone?: 'quiet' | 'outline' | 'solid';
  size?: number;
  active?: boolean;
  /** Goes into data-action, so a beats file can name this control — never a
      Tailwind class string, and never a label the click itself rewrites. */
  name?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-action={name}
      aria-label={label}
      aria-pressed={active || undefined}
      title={label}
      style={{ width: size, height: size }}
      className={cx(
        'grid shrink-0 place-items-center rounded-full transition-colors duration-150',
        /*
         * `!active`, not an additive override. Two utilities that set the same
         * property have equal specificity, so which wins is decided by their
         * order in the generated stylesheet rather than by the class list —
         * and with the pointer resting on the button, which is exactly where a
         * beat leaves it, the base hover won and the active state never
         * appeared.
         */
        tone === 'quiet' && !active && 'text-body hover:bg-sunken hover:text-ink',
        tone === 'outline' &&
          !active &&
          'border-line text-body hover:bg-sunken hover:text-ink border',
        tone === 'solid' && !active && 'bg-accent-deep text-accent-fg hover:bg-accent',
        active && 'bg-accent-deep text-accent-fg border-transparent',
        className,
      )}
    >
      <Icon name={icon} size={Math.round(size * 0.45)} />
    </button>
  );
}

/** The reference's Export and View All buttons. */
export function Button({
  children,
  icon,
  onClick,
  variant = 'solid',
  size = 'md',
  name,
  className,
}: {
  children: React.ReactNode;
  icon?: IconName;
  onClick?: () => void;
  variant?: 'solid' | 'outline' | 'quiet';
  size?: 'sm' | 'md';
  name?: string;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-action={name}
      className={cx(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-150',
        size === 'md' ? 'h-11 px-5 text-[14px]' : 'h-9 px-3.5 text-[13px]',
        /* The deep teal, not the brand one: this is a filled surface with
           text on it, and #258196 carries white at 4.51:1. */
        variant === 'solid' && 'bg-accent-deep text-accent-fg hover:bg-accent',
        variant === 'outline' && 'border-line text-ink hover:bg-sunken border',
        variant === 'quiet' && 'text-accent-deep hover:bg-accent-faint',
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

/** A segmented control: the status filters on Task, the chart's series. */
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
      className={cx('bg-sunken flex items-center gap-1 rounded-full p-1', className)}
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
              ? 'bg-surface text-ink shadow-[0_1px_2px_rgb(16_39_44/0.14)]'
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
 * The reference's date-range pill and its "This Week" picker.
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
  icon,
  align = 'right',
  className,
}: {
  value: T;
  options: readonly Option<T>[];
  onChange: (id: T) => void;
  name: string;
  icon?: IconName;
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
          'border-line bg-surface text-ink hover:bg-sunken flex h-10 items-center gap-2 rounded-full border px-4 text-[13px] font-semibold transition-colors',
          open && 'bg-sunken',
        )}
      >
        {icon ? <Icon name={icon} size={15} className="text-muted" /> : null}
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
            'border-line bg-surface absolute top-[calc(100%+6px)] z-30 m-0 min-w-[200px] list-none overflow-hidden rounded-xl border p-1 shadow-[0_18px_40px_-16px_rgb(16_39_44/0.3)]',
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
                  'hover:bg-sunken flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-left text-[13px] transition-colors',
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
 * A search box. It really filters — matters on Task, invoices on Payment —
 * because an interaction that does nothing is what ruins a take (rule 5).
 */
export function SearchBox({
  value,
  onChange,
  placeholder,
  name,
  className,
}: {
  value: string;
  onChange: (next: string) => void;
  placeholder: string;
  name?: string;
  className?: string;
}) {
  return (
    <div
      className={cx(
        'border-line bg-surface focus-within:border-accent/50 relative flex h-10 items-center rounded-full border pr-2.5 pl-4 transition-colors',
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
        data-search={name ?? true}
        /* h-full, not a bare line box: the pill is 40px and an input only as
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

/**
 * A sortable column header — the reference draws one on all four columns of
 * "Client in progress".
 *
 * The arrow is the state: both ways, and which way, is visible without
 * hovering anything.
 */
export function SortHeader({
  label,
  column,
  active,
  descending,
  onSort,
  className,
}: {
  label: string;
  column: string;
  active: boolean;
  descending: boolean;
  onSort: (column: string) => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      data-sort={column}
      aria-label={`Sort by ${label}${active ? (descending ? ', high to low' : ', low to high') : ''}`}
      onClick={() => onSort(column)}
      className={cx(
        /* h-8, not the height of an 11px line: as a bare label this was a
           17px target, which probe.js reports under its 24px floor — and a
           column header you have to aim at is a sort nobody uses. */
        'flex h-8 items-center gap-1.5 text-[11px] font-bold tracking-[0.08em] uppercase transition-colors',
        active ? 'text-ink' : 'text-muted hover:text-ink',
        className,
      )}
    >
      {label}
      <Icon
        name={active ? (descending ? 'arrow-down' : 'arrow-up') : 'sort'}
        size={13}
        strokeWidth={2}
        className={active ? 'text-accent' : 'opacity-70'}
      />
    </button>
  );
}
