import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';

import { Tile } from '@/components/Tile';
import { TimelinePanel } from '@/components/TimelinePanel';
import { STATEMENT, TILES } from '@/data/statement';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { TRANSITION } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The transition this whole project exists for.
 *
 * Two full-height panels stacked: a sentence with gaps punched in it, and an
 * editing timeline with empty slots on its track. There is exactly one set of
 * tiles, and they live in the *timeline* slots — that is their home, the place
 * a transform of `none` puts them. Sitting up in the sentence is the transformed
 * state, not the other way round.
 *
 * Doing it in that direction is what makes the whole thing hold together:
 *
 *  - the tile's untransformed layout size is the big one, so scaling is always
 *    a scale *down*. A browser rasterises a promoted layer once at its layout
 *    size, so scaling up past it gives stair-stepped edges — which is why the
 *    `will-change: transform` that makes this smooth would wreck it if home
 *    were the sentence;
 *  - nothing is hard-coded. Both ends are real laid-out boxes, so the numbers
 *    come from `getBoundingClientRect` at whatever size the window happens to
 *    be, and a resize is a re-measure rather than a new breakpoint;
 *  - the sentence reflows as text. The slot is a 1.15em square sitting in the
 *    line, so the tiles stay with their words at every width, including when a
 *    line wraps differently.
 *
 * The trigger is a direction, not a position: a scroll downwards while the
 * timeline is on screen sends the tiles down, a scroll upwards sends them back.
 * Each flip commits to a fixed 1.5s flight. Scrubbing the move against scroll
 * offset is the obvious guess and the reference deliberately does not do it —
 * scrubbed, the tiles judder and reverse with every twitch of the wheel.
 */
export function StatementTimeline() {
  const reduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const sentenceRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  const tiles = useRef<(HTMLDivElement | null)[]>([]);
  const inlineSlots = useRef<(HTMLSpanElement | null)[]>([]);
  const trackSlots = useRef<(HTMLDivElement | null)[]>([]);

  const [onTimeline, setOnTimeline] = useState(false);
  /** What the tiles are actually showing, so a no-op flip does not re-fire. */
  const settled = useRef(false);
  /** Last measured width, so a mobile browser's toolbar hiding is not a resize. */
  const lastWidth = useRef(0);

  /**
   * Where the tile has to go to sit in its slot in the sentence.
   *
   * The two rects are the untransformed slots, and the tile fills the timeline
   * one, so this is a plain FLIP: scale is the width ratio, and the translation
   * is the difference between the two *centres* — the half-size term is what
   * converts corner-to-corner into centre-to-centre, because a CSS scale grows
   * an element about its middle.
   */
  const toSentence = useCallback((i: number) => {
    const inline = inlineSlots.current[i];
    const track = trackSlots.current[i];
    if (!inline || !track) return null;

    const a = inline.getBoundingClientRect();
    const b = track.getBoundingClientRect();
    return {
      scale: a.width / b.width,
      x: a.left - b.left + (a.width - b.width) / 2,
      y: a.top - b.top + (a.height - b.height) / 2,
    };
  }, []);

  /** Snap every tile to where the current state says it belongs, no animation. */
  const place = useCallback(
    (force = false) => {
      const width = sectionRef.current?.clientWidth ?? 0;
      if (!force && width === lastWidth.current) return;
      lastWidth.current = width;

      tiles.current.forEach((tile, i) => {
        if (!tile) return;
        const to = settled.current ? { scale: 1, x: 0, y: 0 } : toSentence(i);
        if (!to) return;
        gsap.killTweensOf(tile);
        gsap.set(tile, { ...to, rotation: 0, opacity: 1 });
      });
    },
    [toSentence],
  );

  // Place the tiles in the sentence before the first paint, so they are never
  // briefly visible sitting on the timeline.
  useLayoutEffect(() => {
    place(true);
  }, [place]);

  // Re-measure on resize, and once the webfont lands — the sentence slots are
  // sized in em and positioned by line breaks, so both move when it swaps in.
  useEffect(() => {
    const onResize = () => place();
    window.addEventListener('resize', onResize);
    document.fonts.ready.then(() => place(true));
    return () => window.removeEventListener('resize', onResize);
  }, [place]);

  // The direction toggle. `armed` is true only while the timeline panel is on
  // screen, so scrolling past the rest of the page does not move anything.
  useEffect(() => {
    let armed = false;
    let lastY = window.scrollY;

    const onScroll = () => {
      const y = window.scrollY;
      const down = y > lastY;
      lastY = y;
      if (armed) setOnTimeline(down);
    };

    const arm = ScrollTrigger.create({
      trigger: timelineRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        armed = self.isActive;
      },
    });

    const listen = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top bottom',
      end: 'bottom top',
      onToggle: (self) => {
        if (self.isActive) window.addEventListener('scroll', onScroll, { passive: true });
        else window.removeEventListener('scroll', onScroll);
      },
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      arm.kill();
      listen.kill();
    };
  }, []);

  // The flight. One GSAP timeline per flip, with each tile offset into it.
  useLayoutEffect(() => {
    if (onTimeline === settled.current) return;
    settled.current = onTimeline;

    const { flight, tilt, stagger, reduced: calm } = TRANSITION;

    if (reduced) {
      // No travel and no tilt: the tiles cross-fade between the two positions.
      tiles.current.forEach((tile, i) => {
        if (!tile) return;
        const to = onTimeline ? { scale: 1, x: 0, y: 0 } : toSentence(i);
        if (!to) return;
        gsap.killTweensOf(tile);
        gsap
          .timeline()
          .to(tile, { opacity: 0, duration: calm.fadeDuration })
          .set(tile, { ...to, rotation: 0 })
          .to(tile, { opacity: 1, duration: calm.fadeDuration });
      });
      return;
    }

    const tl = gsap.timeline();
    const step = onTimeline ? stagger.toTimeline : stagger.toSentence;

    tiles.current.forEach((tile, i) => {
      if (!tile) return;
      const to = onTimeline ? { scale: 1, x: 0, y: 0 } : toSentence(i);
      if (!to) return;

      const at = i * step;
      // A fresh tilt every flip, so the tiles never fall the same way twice.
      const tipped = tilt.maxDegrees * (2 * Math.random() - 1);

      tl.to(tile, { ...to, duration: flight.duration, ease: flight.ease }, at);
      tl.to(tile, { rotation: tipped, duration: tilt.outDuration, ease: tilt.outEase }, at);
      tl.to(
        tile,
        { rotation: 0, duration: tilt.backDuration, ease: tilt.backEase },
        at + tilt.outDuration,
      );
    });

    return () => {
      tl.kill();
    };
  }, [onTimeline, reduced, toSentence]);

  // The one-off: the first tile drops in from above the first time the sentence
  // comes near the viewport. It animates the tile's *child*, so it cannot fight
  // the FLIP transform that the parent is carrying.
  useEffect(() => {
    if (reduced) return;
    const { entrance } = TRANSITION;
    let drop: gsap.core.Tween | null = null;

    const trigger = ScrollTrigger.create({
      trigger: sentenceRef.current,
      start: entrance.start,
      end: entrance.end,
      once: true,
      onEnter: () => {
        const first = tiles.current[0]?.firstElementChild;
        if (!first) return;
        // `fromTo`, not `from`. A `from` tween reads its destination off the
        // element as it is when the tween is built — so running this twice (as
        // StrictMode's double mount does) has the second one record the
        // already-displaced -300px as where the tile is supposed to end up, and
        // the tile stays hanging above the line for good. Naming both ends is
        // the only version of this that is safe to build more than once.
        drop = gsap.fromTo(
          first,
          { y: entrance.fromY, rotation: entrance.fromRotation },
          { y: 0, rotation: 0, duration: entrance.duration, ease: entrance.ease },
        );
      },
    });

    return () => {
      drop?.kill();
      trigger.kill();
    };
  }, [reduced]);

  let slot = 0;

  return (
    <section ref={sectionRef} className="relative overflow-hidden">
      {/* Panel one: the sentence, with a gap punched in it per tile. */}
      <div className="px-gutter flex items-center justify-center py-[18.5rem] md:h-svh md:py-16">
        <div ref={sentenceRef}>
          {/*
            The measure is set so the sentence falls to three lines at desktop
            and the last one is not a single word. It is wider than the
            reference's 30ch because the substitute typeface is narrower per
            character — see the README on the type.
          */}
          <h2 className="text-statement max-w-[32ch] text-center leading-[0.9] tracking-[0.006em] md:leading-[0.97]">
            {STATEMENT.map((fragment, i) => (
              <span key={i}>
                {fragment.tile && (
                  <span
                    className="inline-slot"
                    aria-hidden="true"
                    ref={(el) => {
                      inlineSlots.current[slot++] = el;
                    }}
                  />
                )}
                {fragment.text}{' '}
              </span>
            ))}
          </h2>
        </div>
      </div>

      {/* Panel two: the timeline the tiles land on. */}
      <div
        ref={timelineRef}
        className="px-gutter relative z-1 flex items-center justify-center py-[18.5rem] md:h-svh md:py-16"
      >
        <TimelinePanel>
          <div className="relative flex h-[72%] w-full justify-between p-[1.5%]">
            {TILES.map((tile, i) => (
              <div
                key={tile.name}
                className="relative aspect-square max-h-full"
                ref={(el) => {
                  trackSlots.current[i] = el;
                }}
              >
                <div
                  className="absolute inset-0 z-1 will-change-transform"
                  ref={(el) => {
                    tiles.current[i] = el;
                  }}
                >
                  <div className="h-full w-full">
                    <Tile tile={tile} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TimelinePanel>
      </div>
    </section>
  );
}
