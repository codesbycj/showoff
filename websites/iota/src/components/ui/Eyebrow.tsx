import type { ComponentPropsWithoutRef } from 'react';

/** The small caps label that sits above almost everything on the page. */
export function Eyebrow({ className = '', ...rest }: ComponentPropsWithoutRef<'span'>) {
  return (
    <span
      className={`text-[0.6875rem] font-medium tracking-[0.14em] uppercase ${className}`}
      {...rest}
    />
  );
}
