import type { ReactNode } from 'react';

import { Icon } from '@/after/Marks';
import { cx } from '@/cx';

/**
 * The button, which is most of the reference's motion.
 *
 * Three fills and one behaviour: the small arrow on the right rotates −35° on
 * an easing with a 3.2 overshoot, so it kicks past the angle and settles. The
 * header's two buttons also roll their label — two copies of the text in one
 * grid cell, the first sliding out of the top as the second arrives.
 */
export function Button({
  children,
  href = '#',
  variant = 'primary',
  size = 'md',
  roll = false,
  arrow = true,
  className,
}: {
  children: string;
  href?: string;
  variant?: 'primary' | 'dark' | 'ghost' | 'ghost-dark';
  size?: 'md' | 'sm';
  roll?: boolean;
  arrow?: boolean;
  className?: string;
}) {
  const fill = {
    primary: 'bg-primary-1 text-primary-2 hover:bg-primary-5',
    dark: 'bg-primary-6 text-primary-3 hover:bg-primary-7',
    ghost: 'border border-primary-8 bg-transparent text-primary-2 hover:bg-[rgba(16,16,16,0.1)]',
    'ghost-dark':
      'border border-primary-7 bg-transparent text-primary-3 hover:bg-[rgba(255,255,255,0.1)]',
  }[variant];

  return (
    <a
      href={href}
      className={cx(
        'group/btn font-inter-medium inline-flex cursor-pointer items-center justify-center gap-2',
        'rounded-[4px] text-[14px] font-normal no-underline transition-all duration-200 ease-in-out',
        size === 'md' ? 'min-h-11 px-4 py-3' : 'min-h-10 px-4',
        fill,
        className,
      )}
    >
      <span className="font-inter-semibold relative inline-flex items-center">
        {roll ? (
          <span className="inline-grid overflow-hidden whitespace-nowrap *:col-start-1 *:row-start-1 *:transition-transform *:duration-300 *:last:translate-y-full group-hover/btn:*:first:-translate-y-full group-hover/btn:*:last:translate-y-0">
            <span>{children}</span>
            <span aria-hidden="true">{children}</span>
          </span>
        ) : (
          children
        )}
      </span>
      {arrow ? (
        <Icon
          name="arrow"
          size={18}
          stroke
          className="btn_arrow group-hover/btn:-rotate-35 transition-transform duration-200 group-hover/btn:[transition-timing-function:cubic-bezier(0.33,3.2,0.515,1)]"
        />
      ) : null}
    </a>
  );
}

/**
 * The text link: the label lifts 4px and an underline scales in from nothing
 * over half a second on a 1.325 overshoot.
 */
export function TextLink({
  children,
  href = '#',
  dark = false,
  className,
}: {
  children: ReactNode;
  href?: string;
  dark?: boolean;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cx(
        'group/link font-inter-semibold inline-flex items-center gap-2 text-[14px] no-underline',
        dark ? 'text-primary-3' : 'text-primary-2',
        className,
      )}
    >
      <span className="relative inline-block overflow-hidden pb-1">
        <span className="inline-block transition-transform duration-500 [transition-timing-function:cubic-bezier(0.355,1.325,0.295,1)] group-hover/link:-translate-y-1">
          {children}
        </span>
        <span
          aria-hidden="true"
          className={cx(
            'absolute bottom-0 left-0 right-0 h-px origin-left scale-x-0 transition-transform duration-500',
            '[transition-timing-function:cubic-bezier(0.355,1.325,0.295,1)] group-hover/link:scale-x-100',
            dark ? 'bg-primary-3' : 'bg-primary-2',
          )}
        />
      </span>
      <Icon
        name="arrow"
        size={16}
        stroke
        className="group-hover/link:-rotate-35 transition-transform duration-200 group-hover/link:[transition-timing-function:cubic-bezier(0.33,3.2,0.515,1)]"
      />
    </a>
  );
}

/** The product chips under each platform card, with their card's own fill. */
export function Chip({ children, hover }: { children: string; hover: string }) {
  return (
    <li>
      <a
        href="#platform"
        className="group/chip font-inter-medium bg-primary-3 inline-flex h-8 items-center gap-3 whitespace-nowrap rounded px-3 text-[14px] leading-none text-[#101b29] no-underline transition-colors duration-200 motion-reduce:transition-none"
        style={{ ['--chip-hover' as string]: hover }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = hover;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '';
        }}
      >
        {children}
        <Icon
          name="arrow"
          size={18}
          stroke
          className="shrink-0 transition-transform duration-200 group-hover/chip:-rotate-45 motion-reduce:transition-none"
        />
      </a>
    </li>
  );
}

/** The thin uppercase rule the page uses as a section eyebrow. */
export function RuleLabel({ children, className }: { children: string; className?: string }) {
  return (
    <h2
      className={cx(
        'font-inter border-greyscale-9 border-x border-t py-4 text-center',
        'text-greyscale-8 text-[12px] uppercase leading-[136%] tracking-[0.36px]',
        className,
      )}
    >
      {children}
    </h2>
  );
}
