/** The button, chip and switch vocabulary the whole page is assembled from. */
import type { ButtonHTMLAttributes, ReactNode } from 'react';

import { Caret, Check } from '@/icons';
import { cx } from '@/lib/cx';

type Variant = 'primary' | 'go' | 'outline' | 'plain';

interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  caret?: boolean;
  children?: ReactNode;
}

/*
 * The colour is picked by a conditional, never added to a base string: two
 * Tailwind utilities that set the same property have equal specificity, so
 * which one wins is decided by their order in the generated stylesheet and
 * not by the order they are written in the class attribute.
 */
const VARIANT: Record<Variant, string> = {
  primary: 'bg-accent text-white hover:bg-[#0052bb] border border-transparent',
  go: 'bg-go text-white hover:bg-[#004e34] border border-transparent',
  outline: 'bg-surface text-ink border border-line-strong hover:bg-hover',
  plain: 'bg-transparent text-ink border border-transparent hover:bg-hover',
};

export function Button({
  variant = 'outline',
  icon,
  caret,
  children,
  className,
  ...rest
}: BtnProps) {
  return (
    <button
      type="button"
      className={cx(
        'inline-flex h-9 shrink-0 items-center gap-1.5 rounded-md px-3 text-[13px] font-semibold whitespace-nowrap transition-colors',
        'disabled:border-line disabled:bg-surface disabled:text-dot disabled:cursor-not-allowed',
        VARIANT[variant],
        className,
      )}
      {...rest}
    >
      {icon}
      {children}
      {caret && <Caret className="ml-0.5 shrink-0 opacity-80" />}
    </button>
  );
}

/** A square button holding nothing but a glyph, optionally with a caret. */
export function IconButton({
  variant = 'outline',
  icon,
  caret,
  className,
  ...rest
}: Omit<BtnProps, 'children'>) {
  return (
    <button
      type="button"
      className={cx(
        'inline-flex h-9 shrink-0 items-center justify-center gap-1 rounded-md transition-colors',
        caret ? 'px-2.5' : 'w-9',
        'disabled:text-dot disabled:cursor-not-allowed',
        VARIANT[variant],
        className,
      )}
      {...rest}
    >
      {icon}
      {caret && <Caret className="shrink-0 opacity-80" />}
    </button>
  );
}

/* ----------------------------------------------------------- the switch -- */

interface ToggleProps {
  on: boolean;
  label: string;
  onChange: () => void;
}

/**
 * Off/On. The reference draws on as a pale track with a solid blue knob and
 * off as a white track with a dark knob, which is why this is a drawn control
 * rather than a styled checkbox.
 */
export function Toggle({ on, label, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      onClick={onChange}
      data-toggle={on ? 'on' : 'off'}
      className={cx(
        'hit relative inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full border transition-colors',
        on ? 'bg-accent/18 border-transparent' : 'border-line-strong bg-surface',
      )}
    >
      <span
        className={cx(
          'absolute h-[18px] w-[18px] rounded-full transition-[left] duration-150',
          on ? 'bg-accent left-[18px]' : 'bg-ink left-[1px]',
        )}
      />
    </button>
  );
}

/* ---------------------------------------------------------- the tickbox -- */

interface TickProps {
  checked: boolean;
  indeterminate?: boolean;
  label: string;
  onChange: () => void;
}

export function Tick({ checked, indeterminate = false, label, onChange }: TickProps) {
  const marked = checked || indeterminate;
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={indeterminate ? 'mixed' : checked}
      aria-label={label}
      onClick={onChange}
      className={cx(
        'hit inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[3px] border-2 transition-colors',
        marked
          ? 'border-accent bg-accent text-white'
          : 'border-line-strong bg-surface hover:border-muted',
      )}
    >
      {checked && <Check size={11} />}
      {indeterminate && !checked && <span className="h-0.5 w-2.5 rounded-full bg-white" />}
    </button>
  );
}
