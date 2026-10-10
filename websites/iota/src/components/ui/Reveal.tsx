import type { CSSProperties, ElementType, ReactNode } from 'react';

import { useReveal } from '@/motion/useReveal';

export type RevealVariant = 'fade-up' | 'image' | 'image-soft' | 'text-wipe';

type RevealProps = {
  children: ReactNode;
  variant?: RevealVariant;
  as?: ElementType;
  className?: string;
  delay?: number;
};

/** Wraps anything that should animate in when it scrolls into view. */
export function Reveal({
  children,
  variant = 'fade-up',
  as: Tag = 'div',
  className,
  delay,
}: RevealProps) {
  const ref = useReveal<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-reveal={variant}
      className={className}
      style={delay ? ({ '--reveal-delay': `${delay}s` } as CSSProperties) : undefined}
    >
      {variant === 'text-wipe' ? <span>{children}</span> : children}
    </Tag>
  );
}
