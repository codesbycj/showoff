/**
 * Scroll-linked drift, and the hairlines that lag behind it.
 *
 * `data-parallax` with `data-parallax-start` / `data-parallax-end` in percent
 * of the element's own height; `data-bg-line` for the hairlines, which each
 * get their own lag so the set shears instead of moving as a block.
 *
 * Both are scrubbed rather than tweened, so scrolling back up rewinds them
 * exactly. Lenis drives ScrollTrigger, so the smoothing is already in the
 * scroll position and must not be added again here.
 */
import { useEffect } from 'react';

import { gsap } from './gsap';
import { SCROLL } from './motion';

export function useParallax(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        const start = parseFloat(el.getAttribute('data-parallax-start') || '0');
        const end = parseFloat(el.getAttribute('data-parallax-end') || '0');
        if (!start && !end) return;
        const trigger = el.closest('section, [data-parallax-trigger]') || el;

        gsap.fromTo(
          el,
          { yPercent: start },
          {
            yPercent: end,
            ease: SCROLL.parallax.ease,
            scrollTrigger: {
              trigger,
              start: el.getAttribute('data-parallax-scroll-start') || 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          },
        );
      });

      // The hairlines: each lags by its own amount across the band it is in,
      // which is what stops six identical lines reading as one flat panel.
      gsap.utils.toArray<HTMLElement>('[data-line-scroll]').forEach((wrapper) => {
        const lines = gsap.utils.toArray<HTMLElement>('[data-bg-line]', wrapper);
        if (!lines.length) return;
        const { min, max } = SCROLL.lineScroll.lag;

        lines.forEach((line, i) => {
          const lag = min + ((max - min) * i) / Math.max(1, lines.length - 1);
          gsap.fromTo(
            line,
            { yPercent: 0 },
            {
              yPercent: -lag,
              ease: 'none',
              scrollTrigger: {
                trigger: wrapper,
                start: SCROLL.lineScroll.start,
                end: SCROLL.lineScroll.end,
                scrub: true,
              },
            },
          );
        });
      });
    });

    return () => ctx.revert();
  }, [enabled]);
}
