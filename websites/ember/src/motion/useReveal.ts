import { useEffect, useRef } from 'react';

import { REVEAL } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The page-wide entrance: add `.is-act` when a block is 30% visible, once.
 *
 * One observer for the whole tree rather than one per block — the reference
 * does the same, and with 22 revealing blocks on the page it is the difference
 * between one callback and twenty-two.
 *
 * Elements opt in by carrying `.reveal`; the stylesheet holds the hidden state,
 * so the first paint is already correct and nothing flashes before the
 * observer's first callback.
 */
export function useReveal<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = root.querySelectorAll<HTMLElement>('.reveal');

    if (reduced) {
      targets.forEach((el) => el.classList.add('is-act'));
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          // The reference sets will-change for the length of the transition and
          // takes it off again; a page holding 22 permanent layers is worse
          // than one that promotes three at a time.
          el.style.willChange = 'opacity, filter';
          requestAnimationFrame(() => el.classList.add('is-act'));
          window.setTimeout(() => {
            el.style.willChange = 'auto';
          }, REVEAL.durationMs);
          if (REVEAL.once) observer.unobserve(el);
        });
      },
      { threshold: REVEAL.threshold },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  return rootRef;
}
