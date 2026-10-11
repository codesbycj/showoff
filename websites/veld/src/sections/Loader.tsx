import { useEffect, useRef } from 'react';

import { gsap } from '@/motion/gsap';
import { LOADER } from '@/motion/motion';
import { rollOdometer } from '@/motion/odometer';
import { prepareHeroReveal, revealHeroGroups } from '@/motion/heroReveal';
import { useReducedMotion } from '@/motion/useReducedMotion';
import { useSmoothScroll } from '@/motion/useSmoothScroll';

/**
 * The loading sequence.
 *
 * It deliberately reaches out of itself and animates hero elements by
 * attribute — `[data-hero-image]`, `[data-bg-line]`, `[data-loader-reveal]`.
 * That is not laziness: the takeover and the hero's arrival are one continuous
 * movement that overlaps by 0.4s, and the only way to overlap two things is to
 * have one timeline own both. The hero stays declarative — it marks what can
 * move and never decides when.
 *
 * Every number lives in LOADER; see `motion.ts` for where each came from.
 */
export function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { lock, unlock } = useSmoothScroll();

  // `onDone` through a ref so a new closure from the parent cannot restart the
  // sequence. Everything else the effect touches is created inside a
  // gsap.context and reverted on cleanup, which is what makes StrictMode's
  // mount/unmount/mount survivable: the first pass is undone completely and
  // the second builds it again from the same starting state. Guarding the
  // effect with a ran-once flag instead leaves the page on the reverted state
  // forever — a white screen and five dead lights.
  const onDoneRef = useRef(onDone);
  // Synced in its own effect, declared before the one that uses it, rather
  // than assigned during render: a ref written while rendering is a value
  // React is free to throw away, and the hooks lint rule is right to say so.
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const el = root.current;
    const count = countRef.current;
    if (!el || !count) return;

    // Hide and split the hero copy now. This runs after every hero effect has
    // (the loader is the last child of the section), so the countdown already
    // holds a real value for the odometer to read.
    prepareHeroReveal();

    const finish = () => {
      unlock('loader');
      onDoneRef.current();
    };

    const target = String(LOADER.count.end);

    if (reduced) {
      // A five-second loader is exactly what this setting is for. Land every
      // element on its finished value and get out of the way.
      count.textContent = '';
      gsap.set(document.querySelectorAll('[data-loader-numeral]'), { scale: 1, x: 0 });
      gsap.set('[data-hero-image]', { scale: 1, filter: 'none' });
      gsap.set('[data-bg-line]', { height: '100%' });
      revealHeroGroups({ instant: true, odometer: false });
      finish();
      return;
    }

    lock('loader');

    const ctx = gsap.context(() => {
      // The mark lives in the hero, not in here; this only drives it.
      const white = document.querySelector('[data-loader-numeral="white"]');
      const yellow = document.querySelector('[data-loader-numeral="yellow"]');
      const lights = gsap.utils.toArray<HTMLElement>('[data-loader-light]', el);
      const heroImages = gsap.utils.toArray<HTMLElement>('[data-hero-image]');
      const bgLines = gsap.utils.toArray<HTMLElement>('[data-bg-line]');

      // The blown-up state is already on them from CSS (see `[data-loading]`),
      // so the first painted frame is a full white screen rather than a small
      // numeral over a visible hero. Reasserting it here keeps GSAP's idea of
      // the start matching what is on screen.
      gsap.set([white, yellow], { scale: LOADER.takeover.from.scale, x: LOADER.takeover.from.x });
      gsap.set(count, { autoAlpha: 0 });
      if (heroImages.length) gsap.set(heroImages, { scale: LOADER.hero.image.from });
      if (bgLines.length) gsap.set(bgLines, { height: '0%' });

      const tl = gsap.timeline({ onComplete: finish });

      // --- 0s: the counter rolls and the lights come up one at a time -------
      tl.call(
        () => {
          gsap.set(count, { autoAlpha: 1 });
          rollOdometer(count, target, {
            duration: LOADER.count.duration,
            ease: LOADER.count.ease,
            fromBlank: LOADER.count.fromBlank,
          });
        },
        undefined,
        0,
      );

      // The last light lands `endOffset` before the counter does, and the gap
      // between lights falls out of that — a sixth light tightens the rhythm
      // rather than lengthening the sequence.
      const lightsSpan = Math.max(
        LOADER.lights.toColor.duration,
        LOADER.count.duration - LOADER.lights.endOffset,
      );
      const lightStagger =
        lights.length > 1 ? (lightsSpan - LOADER.lights.toColor.duration) / (lights.length - 1) : 0;

      tl.to(
        lights,
        {
          backgroundColor: 'var(--color-signal)',
          duration: LOADER.lights.toColor.duration,
          stagger: lightStagger,
          ease: LOADER.lights.toColor.ease,
        },
        0,
      );

      // --- 2.05s: the screen, which is the numeral, collapses ---------------
      const takeoverAt = LOADER.count.duration + LOADER.hold;

      tl.to(
        white,
        { scale: 1, x: 0, duration: LOADER.takeover.duration, ease: LOADER.takeover.ease },
        takeoverAt,
      );
      // The yellow copy is 25ms late and ends on the same transform, so it is
      // invisible at rest and shows only as a trailing edge on the way down.
      tl.to(
        yellow,
        { scale: 1, x: 0, duration: LOADER.takeover.duration, ease: LOADER.takeover.ease },
        takeoverAt + LOADER.takeover.yellowDelay,
      );
      tl.to(
        count,
        {
          scale: 0,
          duration: LOADER.takeover.count.duration,
          ease: LOADER.takeover.count.ease,
        },
        takeoverAt,
      );

      // The lights go out across half the takeover, whatever their own
      // durations add up to — scaling the sub-timeline keeps the two in step.
      const out = gsap.timeline();
      out.to(lights, {
        opacity: 0,
        duration: LOADER.lights.out.duration,
        stagger: LOADER.lights.out.stagger,
        ease: LOADER.lights.out.ease,
      });
      out.duration(LOADER.takeover.duration * 0.5);
      tl.add(out, takeoverAt);

      if (heroImages.length) {
        tl.to(
          heroImages,
          { scale: 1, duration: LOADER.hero.image.duration, ease: LOADER.hero.image.ease },
          takeoverAt,
        );
      }

      if (bgLines.length) {
        tl.to(
          bgLines,
          {
            height: '100%',
            duration: LOADER.hero.bgLines.duration,
            stagger: LOADER.hero.bgLines.stagger,
            ease: LOADER.hero.bgLines.ease,
          },
          takeoverAt + LOADER.hero.bgLines.delay,
        );
      }

      // --- 2.85s: hero copy, starting before the takeover has finished ------
      tl.call(
        () => revealHeroGroups({ instant: false, odometer: true }),
        undefined,
        takeoverAt + LOADER.takeover.duration - LOADER.hero.lead,
      );

      // Scrolling is released when the takeover lands, not when the last stat
      // has finished counting — waiting for that feels like a stuck page.
      tl.call(() => unlock('loader'), undefined, takeoverAt + LOADER.takeover.duration);
    }, root);

    return () => ctx.revert();
  }, [reduced, lock, unlock]);

  return (
    <div
      ref={root}
      className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="absolute">
        <div ref={countRef} className="font-display text-ink text-[12.5rem] leading-none" />
      </div>
      <div className="absolute bottom-[3.75rem] flex gap-12">
        {Array.from({ length: LOADER.lights.total }, (_, i) => (
          <span key={i} data-loader-light className="bg-ink size-3.5 rounded-xs" />
        ))}
      </div>
    </div>
  );
}
