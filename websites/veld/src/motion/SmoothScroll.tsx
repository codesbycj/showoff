import Lenis from 'lenis';
import { useCallback, useEffect, useMemo, useRef, type ReactNode } from 'react';

import { gsap, ScrollTrigger } from './gsap';
import { SCROLL } from './motion';
import { SmoothScrollContext, type SmoothScrollApi } from './smooth-scroll-context';
import { useReducedMotion } from './useReducedMotion';

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

/**
 * Runs Lenis off GSAP's clock and keeps ScrollTrigger in step with it.
 *
 * The lock is reference-counted: the loader holds one and the menu holds
 * another, and scrolling only resumes once both have let go. A plain
 * boolean lets whichever closes second re-enable scrolling under the first.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const holders = useRef(new Set<string>());
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const lenis = new Lenis({
      autoRaf: false,
      lerp: SCROLL.lenis.lerp,
      wheelMultiplier: SCROLL.lenis.wheelMultiplier,
      gestureOrientation: SCROLL.lenis.gestureOrientation,
      syncTouch: false,
    });
    lenisRef.current = lenis;
    // Under a private name: `window.lenis` is already declared by the library
    // as a feature-detection object, and the capture harness needs a handle
    // it can drive the page with.
    window.__lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    if (holders.current.size > 0) lenis.stop();
    ScrollTrigger.refresh();

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = undefined;
    };
  }, [reduced]);

  const lock = useCallback((key = 'default') => {
    holders.current.add(key);
    document.body.dataset.locked = 'true';
    lenisRef.current?.stop();
  }, []);

  const unlock = useCallback((key = 'default') => {
    holders.current.delete(key);
    if (holders.current.size > 0) return;
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
    else if (typeof target === 'string') document.querySelector(target)?.scrollIntoView();
    else target.scrollIntoView();
  }, []);

  const api = useMemo<SmoothScrollApi>(
    () => ({ lock, unlock, scrollTo }),
    [lock, unlock, scrollTo],
  );

  return <SmoothScrollContext.Provider value={api}>{children}</SmoothScrollContext.Provider>;
}
