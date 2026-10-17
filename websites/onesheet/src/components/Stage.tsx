import { useState } from 'react';

import { Copy } from '@/components/Copy';
import { Deck } from '@/components/Deck';
import { Squiggle } from '@/components/Squiggle';
import { TRACK_VH } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The section: a tall track, and one viewport of content stuck to the top of it.
 *
 * Nothing is pinned by script. The track is 600vh of ordinary page and the
 * stage inside it is `position: sticky`, which means the browser owns the
 * pinning and the deck's triggers only have to read a scroll position. It also
 * means the section degrades correctly: with JavaScript off, or with reduced
 * motion on, what is left is a sticky panel showing one card — not a 600vh hole.
 *
 * The 600vh is the reference's own `height: 600vh`, and it is load-bearing: six
 * cards each need a sixth of the track to cross the stage, and the stagger
 * spends one more sixth getting the deck into position before the first card
 * leaves.
 */
export function Stage() {
  /*
   * A callback ref into state, not `useRef`.
   *
   * The track is an *ancestor* of the deck, and React attaches a host ref in
   * the same bottom-up pass that runs layout effects — so the deck's effect
   * fires while `trackRef.current` is still null, returns early, and the
   * section renders a stack that never moves. Nothing warns about it: the
   * cards sit in the opening frame the stylesheet gives them and look
   * deliberate. Setting state from the ref callback re-renders the deck with
   * the element in hand, which is the one order that cannot be wrong.
   */
  const [track, setTrack] = useState<HTMLDivElement | null>(null);
  const reduced = useReducedMotion();

  return (
    <section
      id="services"
      aria-label="Services"
      className="relative"
      /* Reduced motion gets the content's height, not six screens of scroll. */
      style={{ height: reduced ? 'auto' : `${TRACK_VH}vh` }}
    >
      <div ref={setTrack} className="h-full">
        <div
          className={reduced ? 'relative overflow-x-clip' : 'sticky top-0 h-screen overflow-x-clip'}
        >
          {/*
            The halves are 50/50 with nothing between them, and the deck is 60%
            of its half capped at 30rem. That is the reference's own chain, and
            it is what puts the deck at 411x514 on a 1440 viewport — which the
            fly-off depends on, being -80% of the card's own height plus -50vh.
            A narrower deck would throw the cards a shorter distance and the
            beat would end early.
          */}
          <div className="relative mx-auto flex h-full w-full flex-col items-center justify-center gap-12 px-[clamp(20px,2.36vw,40px)] py-20 md:flex-row md:gap-0">
            <Squiggle />

            {/* The deck comes first on a narrow screen, where the copy under a
                stack reads as a caption for it. */}
            <div className="order-first flex w-full justify-center md:order-last md:w-1/2">
              {/* The reference widens the deck rather than stacking the layout
                  between 768 and 991, which is the one breakpoint where a
                  60% deck beside 50% of copy is too small to read. */}
              <div className="w-[70%] max-w-[30rem] sm:w-[58%] md:w-[75%] lg:w-[60%]">
                <Deck track={track} reduced={reduced} />
              </div>
            </div>

            <div className="flex w-full justify-center md:w-1/2">
              <Copy />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
