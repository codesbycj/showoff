import Lenis from 'lenis';
import { useEffect, type ReactNode } from 'react';

import { gsap, ScrollTrigger } from './gsap';
import { SCROLL } from './motion';
import { useReducedMotion } from './useReducedMotion';

/**
 * Runs Lenis off GSAP's clock and keeps ScrollTrigger in step with it.
 *
 * Sharing one ticker matters more here than it usually does: the section reads
 * `window.scrollY` on every scroll event to decide which way the page is going,
 * and Lenis and GSAP on separate clocks can report that a frame apart.
 *
 * Switched off entirely under reduced motion. Hijacking the wheel is exactly
 * the kind of movement that setting is asking not to have.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      autoRaf: false,
      duration: SCROLL.lenis.duration,
      easing: SCROLL.lenis.easing,
      wheelMultiplier: SCROLL.lenis.wheelMultiplier,
      touchMultiplier: SCROLL.lenis.touchMultiplier,
    });

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [reduced]);

  return children;
}
