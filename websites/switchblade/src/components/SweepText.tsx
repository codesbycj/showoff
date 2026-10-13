import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

import { PALETTE, SWEEP } from '@/motion/motion';

type SweepTextProps = {
  /** When to start: on scrolling into view, or as soon as it mounts. */
  trigger?: 'scroll' | 'load';
  /** Milliseconds to hold before the wipe begins. */
  delay?: number;
  /** The settled ink colour, once the wipe has passed. */
  color?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

/**
 * Drives `--sweep` from rAF. The property is unregistered, so a CSS transition
 * on it would jump rather than interpolate; stepping it by hand is what makes
 * the gradient in index.css travel.
 */
function runSweep(el: HTMLElement, delay: number) {
  let frame = 0;
  let cancelled = false;

  const timer = window.setTimeout(() => {
    if (cancelled) return;
    const start = performance.now();

    const step = (now: number) => {
      if (cancelled) return;
      const t = Math.min((now - start) / SWEEP.duration, 1);
      const position = SWEEP.from + SWEEP.ease(t) * (SWEEP.to - SWEEP.from);
      el.style.setProperty('--sweep', `${position}%`);
      if (t < 1) frame = requestAnimationFrame(step);
    };

    frame = requestAnimationFrame(step);
  }, delay);

  return () => {
    cancelled = true;
    window.clearTimeout(timer);
    cancelAnimationFrame(frame);
  };
}

/** A line of text written on from the left with an accent-coloured nib. */
export function SweepText({
  trigger = 'scroll',
  delay = 0,
  color = PALETTE.ink,
  className = '',
  style,
  children,
}: SweepTextProps) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    if (trigger === 'load') return runSweep(el, delay);

    let stop: (() => void) | undefined;
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          stop = runSweep(el, delay);
          io.unobserve(entry.target);
        }
      },
      { threshold: SWEEP.threshold },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      stop?.();
    };
  }, [trigger, delay]);

  return (
    <span
      ref={ref}
      className={`sweep-text ${className}`}
      style={
        {
          '--sweep-fg': color,
          '--sweep-a1': PALETTE.accent,
          '--sweep-a2': PALETTE.accentSoft,
          ...style,
        } as CSSProperties
      }
    >
      {children}
    </span>
  );
}
