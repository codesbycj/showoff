import { useEffect, useRef } from 'react';

import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * Framer's scroll entrance, which the reference uses on nearly every block:
 * opacity 0 -> 1 with a 40px rise over 0.6s, fired once when the element is a
 * fifth of the way into the viewport.
 *
 * The hidden state and the curve are in the stylesheet so the first paint is
 * already correct; this adds `is-in` and nothing else.
 */
export function useRise<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('.rise'));
    if (reduced) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const el = entry.target as HTMLElement;
          const siblings = el.parentElement
            ? Array.from(el.parentElement.children).filter(
                (n): n is HTMLElement => n instanceof HTMLElement && n.classList.contains('rise'),
              )
            : [el];
          el.style.transitionDelay = `${Math.max(0, siblings.indexOf(el)) * 0.08}s`;
          el.classList.add('is-in');
          observer.unobserve(el);
        });
      },
      { rootMargin: '0px 0px -20% 0px', threshold: 0 },
    );

    targets.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  return rootRef;
}
