/**
 * Sections that ride up over the one before them.
 *
 * A band marked `data-overlap` is pulled up by `data-overlap-amount` vh and
 * given a z-index above its predecessor, so the previous band's last screen
 * passes underneath it instead of ending at a hard seam. It is the cheapest
 * way to make a stack of full-width bands read as layers rather than as a
 * list, and it costs nothing at scroll time — it is pure layout.
 *
 * Desktop only. On a phone the bands are already a single narrow column and
 * pulling them up just eats the top of each one.
 */
import { useEffect } from 'react';

import { SCROLL } from './motion';

export function useSectionOverlap(enabled = true) {
  useEffect(() => {
    if (!enabled) return;
    const mql = window.matchMedia(SCROLL.overlap.desktopQuery);
    const targets = [...document.querySelectorAll<HTMLElement>('[data-overlap]')];

    const apply = () => {
      targets.forEach((el, i) => {
        if (!mql.matches) {
          el.style.marginTop = '';
          el.style.zIndex = '';
          el.style.position = '';
          return;
        }
        const amount =
          parseFloat(el.getAttribute('data-overlap-amount') || '') ||
          SCROLL.overlap.defaultAmountVh;
        el.style.position = 'relative';
        el.style.zIndex = String(SCROLL.overlap.zIndexBase + i);
        el.style.marginTop = `-${amount}vh`;
      });
    };

    apply();
    mql.addEventListener('change', apply);
    return () => {
      mql.removeEventListener('change', apply);
      targets.forEach((el) => {
        el.style.marginTop = '';
        el.style.zIndex = '';
        el.style.position = '';
      });
    };
  }, [enabled]);
}
