import { useEffect, useRef } from 'react';

import { RISE } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The page-wide entrance: a block's words rise into place when its top passes
 * 80% of the viewport, and fall back out when you scroll up past it again.
 *
 * The reference does this with GSAP SplitText and a masked line, and its
 * `toggleActions: 'play none none reverse'` is the detail worth keeping: the
 * animation is *not* once. Scroll back up over a heading and the words drop
 * out of their mask again. So this observes with a `rootMargin` that fires on
 * the way in and un-fires on the way out, rather than unobserving.
 *
 * One observer for the whole page rather than one a block: there are 14
 * revealing blocks and the callback is cheap.
 */
export function useRise<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-rise]'));

    if (reduced) {
      targets.forEach((el) => el.classList.add('-in'));
      return;
    }

    // `start: 'top 80%'` is "the top has passed 80% down the viewport", which
    // as a rootMargin is a 20% dead band along the bottom edge.
    const make = (startAt: number) =>
      new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('-in');
              return;
            }
            // `toggleActions: 'play none none reverse'` reverses on
            // *onLeaveBack* only: a heading that has scrolled off the top of
            // the window stays risen, and only coming back up past it puts the
            // words away again. Leaving upwards is a negative top.
            if (entry.boundingClientRect.top > 0) entry.target.classList.remove('-in');
          });
        },
        { threshold: 0, rootMargin: `0px 0px -${Math.round((1 - startAt) * 100)}% 0px` },
      );

    const standard = make(RISE.startAt);
    const slogan = make(RISE.startAtSlogan);
    targets.forEach((el) => {
      (el.dataset.rise === 'slogan' ? slogan : standard).observe(el);
    });

    return () => {
      standard.disconnect();
      slogan.disconnect();
    };
  }, [reduced]);

  return rootRef;
}
