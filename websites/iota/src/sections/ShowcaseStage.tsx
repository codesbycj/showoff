import { useLayoutEffect, useRef } from 'react';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { CATEGORIES, HERO, HERO_IMAGES } from '@/data/home';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { PRELOADER, rel, SCROLL } from '@/motion/motion';
import { useMediaQuery } from '@/motion/useMediaQuery';
import { useReducedMotion } from '@/motion/useReducedMotion';

import { MarketRail } from './MarketRail';

type ShowcaseStageProps = {
  selected: number;
  ready: boolean;
};

const PIN_QUERY = '(min-width: 768px)';

/**
 * The hero and the market rail as one pinned section: the screen holds still
 * while five panels travel across it.
 */
export function ShowcaseStage({ selected, ready }: ShowcaseStageProps) {
  const root = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const heroContent = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const canPin = useMediaQuery(PIN_QUERY) && !reduced;

  useLayoutEffect(() => {
    if (!ready || reduced) return;

    const ctx = gsap.context(() => {
      const { hero } = PRELOADER;

      gsap
        .timeline()
        .from('[data-hero-detail]', {
          y: hero.detail.y,
          opacity: 0,
          duration: hero.detail.duration,
          stagger: hero.detail.stagger,
          ease: hero.detail.ease,
        })
        .fromTo(
          '[data-hero-title]',
          { y: hero.title.y, opacity: 0, filter: `blur(${hero.title.blur}px)` },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: hero.title.duration,
            ease: hero.title.ease,
          },
          rel(hero.title.overlap),
        );

      gsap.matchMedia().add(PIN_QUERY, () => {
        gsap.from('[data-rail]', {
          x: hero.rail.x,
          duration: hero.rail.duration,
          ease: hero.rail.ease,
          delay: 0.2,
        });
      });
    }, root);

    return () => ctx.revert();
  }, [ready, reduced]);

  useLayoutEffect(() => {
    const el = track.current;
    if (!canPin || !el) return;

    const ctx = gsap.context(() => {
      const travel = () => el.scrollWidth;
      const length = () => SCROLL.rail.scrubDistancePerPanel * CATEGORIES.length;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root.current,
          start: 'top top',
          end: () => `+=${length()}`,
          pin: true,
          scrub: SCROLL.rail.scrub,
          invalidateOnRefresh: true,
        },
      });

      tl.to(heroContent.current, { opacity: 0, y: -40, ease: SCROLL.rail.ease, duration: 0.14 }, 0);
      tl.fromTo(
        el,
        { x: () => window.innerWidth },
        { x: () => -travel(), ease: SCROLL.rail.ease, duration: 1 },
        0,
      );
    }, root);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [canPin]);

  const hero = HERO_IMAGES[selected] ?? HERO_IMAGES[0]!;

  return (
    <>
      <section ref={root} className="relative h-svh overflow-hidden">
        <img
          src={hero.src}
          alt={hero.alt}
          fetchPriority="high"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-black/40" />

        <div
          ref={heroContent}
          className="text-paper relative z-10 flex h-full flex-col justify-between px-5 pt-20 pb-8 md:px-10 md:pb-10"
        >
          <div className="flex items-start justify-between gap-6">
            <Eyebrow data-hero-detail className="opacity-80">
              {HERO.eyebrow}
            </Eyebrow>
            <Eyebrow data-hero-detail className="hidden opacity-80 md:block">
              {HERO.approach}
            </Eyebrow>
            <Eyebrow data-hero-detail className="inline-flex items-center gap-2 opacity-80">
              {HERO.scrollHint}
              <span
                aria-hidden
                className="grid size-5 place-items-center rounded-full border border-current/50"
              >
                <svg
                  viewBox="0 0 10 10"
                  className="size-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                >
                  <path d="M5 1v8M2 6l3 3 3-3" />
                </svg>
              </span>
            </Eyebrow>
          </div>

          <h1
            data-hero-title
            className="max-w-[18ch] text-[clamp(2rem,5vw,4.25rem)] leading-[1.04] font-light tracking-[-0.03em]"
          >
            {HERO.title}
          </h1>
        </div>

        {canPin && <MarketRail trackRef={track} mode="pinned" />}
      </section>

      {!canPin && (
        <section aria-label="Markets" className="border-hairline border-y">
          <MarketRail mode="free" />
        </section>
      )}
    </>
  );
}
