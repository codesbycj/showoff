import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';

import { CASCADE, CASCADE_GROUPS, STAGE_GROUP, nextGroupSec } from '@/motion/motion';

/**
 * The home's entrance.
 *
 * This is the one timeline in the reference that is fully legible in the
 * shipped bundle, so it is reproduced rather than approximated. Items are
 * grouped; each group staggers its own items by `K`; and each group starts
 * `Tr` *before* the previous one has finished:
 *
 *   fr(n) = G + max(0, n - 1) * K      a group of n items takes this long
 *   pr(n) = max(0, fr(n) - Tr)         ...and the next one starts after this
 *
 * The overlap is the whole character of it. With five groups, running them
 * end to end would take about 5 seconds; overlapping each by 0.6 brings it in
 * at about 1.6 and turns five separate reveals into one continuous wash.
 *
 * Each item travels `opacity 0 -> 1`, `blur(12px) -> 0`, `y 18 -> 0`. The blur
 * is the part that would be missed by watching rather than reading: without it
 * this is an ordinary fade-up, and with it the page resolves.
 *
 * `fromTo` rather than `from`, deliberately. `from` records its start values
 * from wherever the element happens to be, so under StrictMode -- which mounts,
 * unmounts and remounts -- the second build reads the displaced position as the
 * destination and the items animate to the wrong place and stay there.
 */
export function useCascade(root: RefObject<HTMLElement | null>, start: boolean, skip: boolean) {
  useEffect(() => {
    const el = root.current;
    if (!el) return;

    /*
     * Dropping `is-cascading` is what actually finishes the entrance.
     *
     * While it is on the root, `.cascade-item` is hidden by the stylesheet, so
     * the first painted frame is already blank rather than flashing the whole
     * page and then hiding it. Once it is off, an item is visible by default —
     * which is the only way a recycling list can work, because its entries
     * mount long after this effect has run and would otherwise inherit the
     * hidden state for ever.
     */
    const settle = () => el.classList.remove('is-cascading');

    // Reduced motion, or a session that skipped the loader: the page is simply
    // there. Clearing the properties rather than tweening them to their end
    // values means no `will-change` is left behind on every item.
    if (skip) {
      gsap.set(el.querySelectorAll('.cascade-item'), {
        opacity: 1,
        filter: 'none',
        y: 0,
        willChange: 'auto',
      });
      settle();
      return;
    }

    if (!start) return;

    // When the last group finishes, in seconds.
    let last = 0;

    const ctx = gsap.context(() => {
      let delay = 0;

      for (const group of CASCADE_GROUPS) {
        const items = gsap.utils.toArray<HTMLElement>(
          el.querySelectorAll(
            `[data-cascade="${group}"] .cascade-item, .cascade-item[data-cascade="${group}"]`,
          ),
        );
        if (!items.length) continue;

        // The imagery group runs longer and on a different curve -- `Dr = 1.6`
        // and `power4.out` in the bundle, against `G = 0.7` and `power2.out`
        // for every other group.
        const isStage = group === 'stage';

        gsap.fromTo(
          items,
          { opacity: 0, filter: `blur(${CASCADE.fromBlurPx}px)`, y: CASCADE.fromY },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            duration: isStage ? STAGE_GROUP.sec : CASCADE.itemSec,
            stagger: CASCADE.staggerSec,
            ease: isStage ? STAGE_GROUP.ease : CASCADE.ease,
            delay,
            /*
             * Set explicitly at the end, NOT with `clearProps`.
             *
             * `clearProps: 'willChange,filter'` is what the reference does,
             * and it is wrong here for a reason worth writing down: the
             * reference's items start from an inline `gsap.set`, so clearing
             * the inline value leaves nothing behind. This build holds the
             * opening frame in a stylesheet rule instead -- `.cascade-item`
             * carries `filter: blur(12px)` so the very first painted frame is
             * already hidden -- and clearing the inline `blur(0px)` drops the
             * element straight back onto that rule.
             *
             * The result was a page that sharpened group by group and then
             * snapped back to blur as each group finished: the whole home
             * permanently out of focus, with no error anywhere.
             *
             * Writing `none` and `auto` inline beats the class and still
             * leaves no filter to force a compositing layer for the session,
             * which is the thing `clearProps` was there for.
             */
            onComplete: () => {
              gsap.set(items, { filter: 'none', willChange: 'auto' });
            },
          },
        );

        delay += nextGroupSec(items.length);
        last = delay + (isStage ? STAGE_GROUP.sec : CASCADE.itemSec);
      }
    }, root);

    // Dropped once the slowest group has landed, so anything mounting after
    // the entrance — every index entry that scrolls into view — is visible by
    // default rather than inheriting the hidden state.
    const done = window.setTimeout(settle, last * 1000 + 80);

    return () => {
      window.clearTimeout(done);
      ctx.revert();
    };
  }, [root, start, skip]);
}
