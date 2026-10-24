import { useEffect, useRef } from 'react';

import { REVEAL } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The page's entrance: blocks uncover from the bottom edge rather than fading.
 *
 * Elements opt in with `.wipe`; the hidden state and the 1.2s curve are in the
 * stylesheet, so the first paint is already correct and nothing flashes before
 * the observer's first callback. This hook does one thing — add `.is-in` when
 * a group arrives — and staggers siblings so a row of three cards comes in as
 * one gesture, 80ms apart, instead of three separate events.
 *
 * A wipe rather than a fade is a deliberate reading: fading says "this was
 * always here"; uncovering says "this is arriving", which is what is actually
 * happening to something you are scrolling into. It is no more expensive —
 * `clip-path` animates on the compositor exactly as `opacity` does.
 *
 * **Observe the container, never the clipped element.** Chromium folds an
 * element's own `clip-path` into the rect it hands IntersectionObserver, so a
 * block hidden with `inset(0 0 100% 0)` reports `intersectionRatio: 0` even
 * when it is dead centre of the viewport. Observing the element that is being
 * clipped is therefore a catch-22 — the ratio can never rise, `.is-in` is
 * never added, the clip is never lifted — and it is one the page cannot
 * recover from: every `.wipe` on the page stays invisible for the whole
 * session. Measured on this page: the same block reported `0` clipped and
 * `0.997` with the clip lifted. The other episodes hide with `opacity`, which
 * IntersectionObserver ignores, which is why only this one broke.
 *
 * **A margin, not a ratio.** `threshold: 0.2` cannot be met by a block taller
 * than five viewports, and several sections here are. `rootMargin` pulls the
 * trigger line 20% up from the bottom of the viewport instead, which means the
 * same thing — "a fifth of the way in" — at any block height.
 */
export function useWipe<T extends HTMLElement>() {
  const rootRef = useRef<T>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const targets = Array.from(root.querySelectorAll<HTMLElement>('.wipe'));
    if (reduced) {
      targets.forEach((el) => el.classList.add('is-in'));
      return;
    }

    /**
     * What to watch for a given block: its parent, which is unclipped and is
     * also the thing its siblings share. A `.wipe` sitting directly under the
     * page root would make the whole page one group, so that case watches the
     * enclosing section instead.
     */
    const triggerFor = (el: HTMLElement): HTMLElement => {
      const parent = el.parentElement;
      if (!parent || parent === root) return el.closest('section') ?? parent ?? el;
      return parent;
    };

    /** Every group, keyed by the element whose arrival reveals it. */
    const groups = new Map<HTMLElement, HTMLElement[]>();
    targets.forEach((el) => {
      const trigger = triggerFor(el);
      const group = groups.get(trigger);
      if (group) group.push(el);
      else groups.set(trigger, [el]);
    });

    const io = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const trigger = entry.target as HTMLElement;
          const group = groups.get(trigger);
          if (!group) return;
          group.forEach((el, index) => {
            el.style.transitionDelay = `${index * REVEAL.stagger}s`;
            el.classList.add('is-in');
          });
          if (REVEAL.once) observer.unobserve(trigger);
        });
      },
      { threshold: 0, rootMargin: `0px 0px -${Math.round(REVEAL.threshold * 100)}% 0px` },
    );

    groups.forEach((_group, trigger) => io.observe(trigger));
    return () => io.disconnect();
  }, [reduced]);

  return rootRef;
}
