import { useEffect, useLayoutEffect, useRef, useState } from 'react';

import { img } from '@/assets/images';
import { STORY_CHAPTERS } from '@/data/home';
import { gsap, ScrollTrigger, SplitText } from '@/motion/gsap';
import { STORY } from '@/motion/motion';
import { useMediaQuery } from '@/motion/useMediaQuery';

/**
 * The history: one tall pinned band through which five chapters pass.
 *
 * The chapters are all mounted all the time and crossfade — they are not
 * swapped in and out. Mounting on demand means the arriving chapter has no
 * layout on the frame it is asked to animate, and the first frame of every
 * transition is a jump. Keeping them stacked costs five hidden blocks and
 * makes the swap exact.
 *
 * Direction matters: scrolling up plays the copy out upwards and brings the
 * previous one up from below, so the movement always agrees with the gesture.
 */
export function Story() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const isDesktop = useMediaQuery('(min-width: 992px)');

  // Pin the band and hand each chapter a slice of the scroll.
  useEffect(() => {
    const el = root.current;
    if (!el || !isDesktop) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top top',
        end: () => `+=${STORY_CHAPTERS.length * window.innerHeight * 0.9}`,
        pin: el.querySelector('[data-story-stage]'),
        pinSpacing: true,
        onUpdate(self) {
          const i = Math.min(
            STORY_CHAPTERS.length - 1,
            Math.floor(self.progress * STORY_CHAPTERS.length),
          );
          setActive((prev) => (prev === i ? prev : i));
        },
      });
    }, root);

    return () => ctx.revert();
  }, [isDesktop]);

  return (
    <section id="history" ref={root} className="bg-ink text-paper relative">
      <div data-story-stage className="relative flex min-h-svh flex-col justify-center">
        <div className="px-gutter grid grid-cols-12 items-center gap-6 py-24">
          <div className="col-span-12 lg:col-span-5">
            <p className="text-body-sm mb-6 tracking-[0.18em] uppercase opacity-50">
              The foundation
            </p>
            <div className="relative min-h-[18rem]">
              {STORY_CHAPTERS.map((chapter, i) => (
                <Chapter key={chapter.year} chapter={chapter} active={i === active} />
              ))}
            </div>
            <StepCounter active={active} total={STORY_CHAPTERS.length} />
          </div>

          <div className="col-span-12 lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-4/3 w-full overflow-hidden">
              {STORY_CHAPTERS.map((chapter, i) => (
                <img
                  key={chapter.image}
                  src={img(chapter.image)}
                  alt=""
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-[opacity,filter] duration-500"
                  style={{
                    opacity: i === active ? STORY.images.activeOpacity : 0,
                    filter: i === active ? STORY.saturation.active : STORY.saturation.inactive,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapter({
  chapter,
  active,
}: {
  chapter: (typeof STORY_CHAPTERS)[number];
  active: boolean;
}) {
  const el = useRef<HTMLDivElement>(null);
  const was = useRef(active);

  // Hide every inactive chapter before the first paint, so nothing flashes.
  useLayoutEffect(() => {
    const node = el.current;
    if (!node || was.current !== active) return;
    gsap.set(node, {
      autoAlpha: active ? 1 : 0,
      pointerEvents: active ? 'auto' : 'none',
      zIndex: active ? 2 : 1,
    });
  }, [active]);

  useEffect(() => {
    const node = el.current;
    if (!node) return;
    if (was.current === active) return;
    was.current = active;

    const ctx = gsap.context(() => {
      const heading = node.querySelector('h3');
      const body = node.querySelector('p[data-body]');
      if (!heading || !body) return;

      const split = SplitText.create(heading, { type: 'words', mask: 'words' });
      const spec = active ? STORY.text.in : STORY.text.out;

      if (active) {
        // Above the chapter on its way out, so the half-second where both are
        // on screen reads as one crossfading over the other rather than as two
        // headings competing — which is what a fast scroll through several
        // chapters at once would otherwise look like.
        gsap.set(node, { autoAlpha: 1, pointerEvents: 'auto', zIndex: 2 });
        gsap.fromTo(
          split.words,
          { yPercent: STORY.text.in.distance },
          {
            yPercent: 0,
            duration: spec.duration,
            ease: spec.ease,
            stagger: STORY.text.heading.stagger,
            onComplete: () => split.revert(),
          },
        );
        gsap.fromTo(
          body,
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: spec.duration, ease: spec.ease, delay: 0.12 },
        );
      } else {
        split.revert();
        gsap.set(node, { zIndex: 1 });
        gsap.to(node, {
          autoAlpha: 0,
          duration: STORY.text.out.duration,
          ease: STORY.text.out.ease,
          overwrite: 'auto',
          onComplete: () => gsap.set(node, { pointerEvents: 'none' }),
        });
      }
    }, el);

    return () => ctx.revert();
  }, [active]);

  // No `style={{ opacity }}` here on purpose. GSAP animates autoAlpha on this
  // node, and a React-controlled opacity would be reasserted on the next
  // render in the middle of the tween — which showed up as two chapters
  // legible at once through every transition. The initial hidden state is set
  // once, below, and from then on the tween owns it.
  return (
    <div ref={el} className="absolute inset-0" data-chapter>
      <p className="text-signal font-display text-h4 mb-3">{chapter.year}</p>
      <h3 className="text-h2 mb-5">{chapter.title}</h3>
      <p data-body className="text-body-sm max-w-[28rem] opacity-80">
        {chapter.body}
      </p>
    </div>
  );
}

/** "2 / 5" — the only thing that tells you how long this band is. */
function StepCounter({ active, total }: { active: number; total: number }) {
  return (
    <div className="mt-10 flex items-center gap-4">
      <div className="bg-chalk-20 relative h-px flex-1">
        <span
          className="bg-signal absolute inset-y-0 left-0 block transition-[width] duration-500"
          style={{ width: `${((active + 1) / total) * 100}%` }}
        />
      </div>
      <p className="font-display text-h4 tabular-nums">
        {active + 1} <span className="opacity-40">/ {total}</span>
      </p>
    </div>
  );
}
