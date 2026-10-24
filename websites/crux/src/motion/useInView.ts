import { useEffect, useRef } from 'react';

import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * Add `-in` to every `[data-in]` block once it has come into view, and leave
 * it there.
 *
 * Once, not toggled: the reference's panels resolve and stay resolved — there
 * is nothing on this page that plays backwards, and a panel of twenty words
 * that re-staggered every time you scrolled past it would be unreadable.
 *
 * One observer for the page, and under reduced motion every block is marked
 * before the observer is built, so nothing ever starts.
 */
export function useInView<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-in]'));

    if (reduced) {
      targets.forEach((el) => el.classList.add('-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('-in');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0, rootMargin: '0px 0px -12% 0px' },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  return rootRef;
}
