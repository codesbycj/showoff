import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * Scale one element while the pointer is over another.
 *
 * Kept as a hook because the reference binds it conditionally on width and
 * rebinds on resize — a second listener per resize is a leak that only shows up
 * after someone drags a window around for a while, and the cleanup here is what
 * stops it.
 *
 * `power2.out` over a full second: slow enough that it reads as the panel
 * leaning towards you rather than as a hover state turning on.
 */
export function useHoverScale(
  hostRef: RefObject<HTMLElement | null>,
  targetRef: RefObject<HTMLElement | null>,
  opts: { scale: number; durationS: number; ease: string; minWidth: number },
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    const target = targetRef.current;
    if (!host || !target || reduced) return;

    const mq = window.matchMedia(`(min-width: ${opts.minWidth}px)`);
    const to = (scale: number) =>
      gsap.to(target, { scale, duration: opts.durationS, ease: opts.ease, overwrite: 'auto' });
    const enter = () => to(opts.scale);
    const leave = () => to(1);

    const bind = () => {
      host.removeEventListener('mouseenter', enter);
      host.removeEventListener('mouseleave', leave);
      if (mq.matches) {
        host.addEventListener('mouseenter', enter);
        host.addEventListener('mouseleave', leave);
      } else {
        gsap.set(target, { scale: 1 });
      }
    };

    bind();
    mq.addEventListener('change', bind);
    return () => {
      mq.removeEventListener('change', bind);
      host.removeEventListener('mouseenter', enter);
      host.removeEventListener('mouseleave', leave);
      gsap.killTweensOf(target);
    };
  }, [hostRef, targetRef, opts, reduced]);
}
