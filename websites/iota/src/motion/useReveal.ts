import { useEffect, useRef } from 'react';

import { REVEAL } from './motion';

let observer: IntersectionObserver | null = null;

function getObserver(): IntersectionObserver {
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      let index = 0;
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        el.style.setProperty('--reveal-delay', `${index * REVEAL.stagger}s`);
        el.dataset.revealed = 'true';
        index += 1;
        observer?.unobserve(el);
      }
    },
    { threshold: REVEAL.threshold, rootMargin: '0px 0px -8% 0px' },
  );
  return observer;
}

/**
 * Plays an element's reveal once it scrolls into view; everything on the page
 * shares a single observer, so items arriving together are staggered.
 */
export function useReveal<T extends HTMLElement = HTMLElement>() {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = getObserver();
    io.observe(el);
    return () => io.unobserve(el);
  }, []);

  return ref;
}
