import type { ReactNode } from 'react';

/**
 * The page's one layout primitive: a 12-column grid, 1.5rem gaps, inside a
 * 5rem gutter. Everything on the page lines up to it, which is why the
 * hairlines behind the bands read as part of the design rather than decoration.
 */
export function Gutter({
  children,
  className = '',
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section' | 'header' | 'footer';
}) {
  return <Tag className={`px-gutter relative w-full ${className}`}>{children}</Tag>;
}

export function Grid({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`grid w-full grid-cols-12 gap-6 ${className}`}>{children}</div>;
}
