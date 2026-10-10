import Lenis from 'lenis';
import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react';

import { gsap, ScrollTrigger } from './gsap';
import { SmoothScrollContext, type SmoothScrollApi } from './smooth-scroll-context';
import { SCROLL } from './motion';
import { useReducedMotion } from './useReducedMotion';

/** Runs Lenis off GSAP's clock and keeps ScrollTrigger in step with it. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
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
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reduced]);

  const lock = useCallback(() => {
    document.body.dataset.locked = 'true';
    lenisRef.current?.stop();
  }, []);

  const unlock = useCallback(() => {
    delete document.body.dataset.locked;
    lenisRef.current?.start();
  }, []);

  const scrollTo = useCallback((target: string | number | HTMLElement) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { duration: 1.4 });
      return;
    }
    if (typeof target === 'number') window.scrollTo({ top: target });
    else document.querySelector(typeof target === 'string' ? target : '')?.scrollIntoView();
  }, []);

  const api = useMemo<SmoothScrollApi>(
    () => ({ lock, unlock, scrollTo }),
    [lock, unlock, scrollTo],
  );

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
