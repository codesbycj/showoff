import Lenis from 'lenis';
import { useEffect, type ReactNode } from 'react';

import { SCROLL } from './motion';
import { useReducedMotion } from './useReducedMotion';

/**
 * Lenis on its own raf loop. Nothing here is scroll-driven — this exists so the
 * headline is reached at the reference's pace, which is what decides whether the
 * sweep reads as a wipe or as a flash.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: SCROLL.duration,
      easing: SCROLL.easing,
      wheelMultiplier: SCROLL.wheelMultiplier,
      smoothWheel: true,
    });

    let frame = requestAnimationFrame(function tick(time: number) {
      lenis.raf(time);
      frame = requestAnimationFrame(tick);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [reduced]);

  return <>{children}</>;
}
