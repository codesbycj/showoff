import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { ServiceCard } from '@/components/ServiceCard';
import { SERVICES } from '@/data/services';
import {
  CARD_COUNT,
  EASE_FLY,
  EASE_STEP,
  FLY,
  GAP,
  SCRUB,
  START_OFFSET,
  reducedIndex,
  stagger,
} from '@/motion/motion';

gsap.registerPlugin(ScrollTrigger);

/**
 * A handle for the measuring harness, in development only.
 *
 * The timings in `motion.ts` are checked by driving this page in headless
 * Chrome and reading the deck back; a bundler keeps GSAP inside the module
 * graph, so without this there is nothing on `window` to ask. It is behind
 * `import.meta.env.DEV`, so the production bundle has no such global.
 */
if (import.meta.env.DEV) {
  (window as unknown as { ScrollTrigger?: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger;
}

/**
 * The deck, and the only moving part of the section.
 *
 * Each card gets its own scrubbed timeline over the whole track, and the
 * timelines are staggered *earlier* by a sixth of the scroll per card. That one
 * detail is the whole illusion: the card nearest the camera is furthest through
 * its timeline, so it is the one that peels off next, and the deck empties from
 * the front while every card does exactly the same thing.
 *
 * Inside a timeline there are five steps and a throw. A step moves a card up by
 * `GAP` and towards the camera by the same amount on `back.inOut(3)`, which
 * overshoots at both ends and is what makes it read as a shove rather than a
 * slide. The throw is only given to cards 1..5; card 0 has nothing in front of
 * it to get out of the way of, and is left standing when the section ends.
 *
 * See `motion.ts` for where each number came from.
 */
export function Deck({ track, reduced }: { track: HTMLDivElement | null; reduced: boolean }) {
  const deckRef = useRef<HTMLDivElement>(null);

  /**
   * The throw's rotation, per card.
   *
   * The reference picks this with `Math.random()` at init, so its deck tilts
   * differently on every load. A study wants the same frame twice — otherwise
   * no measurement of it can be compared with the next one — so the spread is
   * the same ±25deg, dealt from the card's index instead of from a clock.
   */
  const rotations = useMemo(
    () => SERVICES.map((_, i) => ((Math.sin(i * 12.9898) * 43758.5453) % 1) * FLY.rotationRange),
    [],
  );

  useLayoutEffect(() => {
    const deck = deckRef.current;
    if (!track || !deck) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>('[data-card]');

      if (reduced) {
        // No stack and no transforms: one card at a time, swapped on the same
        // sixths the animated version uses.
        gsap.set(cards, { clearProps: 'transform', autoAlpha: 0 });
        gsap.set(cards[cards.length - 1], { autoAlpha: 1 });
        let shown = cards.length - 1;
        ScrollTrigger.create({
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            // Front of the deck first, so the order matches the moving build.
            const next = cards.length - 1 - reducedIndex(self.progress);
            if (next === shown) return;
            gsap.set(cards[shown], { autoAlpha: 0 });
            gsap.set(cards[next], { autoAlpha: 1 });
            shown = next;
          },
        });
        return;
      }

      gsap.set(cards, { y: START_OFFSET, z: -START_OFFSET, autoAlpha: 1 });

      cards.forEach((card, i) => {
        const offset = () => stagger(track.clientHeight, window.innerHeight, i);
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: track,
            start: () => `top top+=${offset()}`,
            end: () => `bottom bottom+=${offset()}`,
            scrub: SCRUB,
            invalidateOnRefresh: true,
          },
        });

        for (let step = 0; step < CARD_COUNT - 1; step += 1) {
          tl.to(card, { y: `-=${GAP}`, z: `+=${GAP}`, ease: EASE_STEP });
        }

        if (i > 0) {
          tl.to(card, {
            yPercent: FLY.yPercent,
            y: FLY.y,
            scale: FLY.scale,
            rotation: rotations[i],
            ease: EASE_FLY,
          });
        }
      });
    }, deck);

    return () => ctx.revert();
  }, [reduced, rotations, track]);

  return (
    <div
      ref={deckRef}
      className="deck relative aspect-[4/5] w-full"
      /* The deck is one control, and the cards inside it are its items. */
      role="list"
    >
      {SERVICES.map((service, i) => (
        <div role="listitem" className="contents" key={service.id}>
          <ServiceCard service={service} index={i} />
        </div>
      ))}
    </div>
  );
}
