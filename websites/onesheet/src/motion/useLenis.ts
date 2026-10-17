import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Smooth scrolling, driven by GSAP's ticker rather than its own loop.
 *
 * Two rAF loops — Lenis's and GSAP's — produce a deck that lags the page by a
 * frame, and on a scrub that reads as the cards sliding after you have stopped.
 * Hand Lenis's `raf` to `gsap.ticker` and there is one clock.
 *
 * `ScrollTrigger.update` on every Lenis scroll is the other half: Lenis moves
 * the page by transform, so the scroll events ScrollTrigger listens for do not
 * all arrive on their own.
 *
 * **The two options are the reference's, and they are the difference between
 * this feeling like the reference and feeling like treacle.** There are two
 * smoothers in series here — Lenis easing the page, and `scrub: 0.5` easing the
 * deck towards wherever the page has got to — so Lenis's settings are not a
 * taste call, they are half of the deck's lag.
 *
 *   `lerp: 0.165`         a fraction-per-frame chase, not a duration. It covers
 *                         about 63% of the remaining distance in five frames.
 *                         The first pass here used `duration: 1.05` with a
 *                         cubic-out instead, which takes ~1s to arrive: stacked
 *                         on the scrub, the cards visibly trailed the wheel.
 *   `wheelMultiplier: 1.25`  a notch moves 25% further than the browser's own.
 *                         The first pass used 0.9, so every gesture also had to
 *                         cover 39% more distance to get the same result.
 */
export function useLenis(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({ lerp: 0.165, wheelMultiplier: 1.25 });

    lenis.on('scroll', ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
    };
  }, [enabled]);
}
