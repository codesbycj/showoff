/**
 * The four ways something arrives when you scroll to it.
 *
 * `data-reveal="lines"` splits to lines, `"words"` to words, both riding up
 * out of a mask; `"fade"` lifts and fades; `"slide"` comes in from the side.
 * An element says which it wants and nothing else — no component spells out a
 * duration, and nothing here knows what it is revealing.
 *
 * Two things are worth knowing about why it is built this way:
 *
 * - **The mask is `overflow: hidden`, never `clip-path`.** A ScrollTrigger
 *   measures an element's visible box, and a fully clipped element reports
 *   nothing, so it waits forever for a trigger that cannot see it.
 * - **The split is reverted once it has played.** A split heading is a stack
 *   of absolutely-sized lines and can never re-wrap; leaving it split means a
 *   window resize breaks the layout for good.
 */
import { useEffect } from 'react';

import { gsap, ScrollTrigger, SplitText } from './gsap';
import { REVEAL } from './motion';

type Kind = 'lines' | 'words' | 'fade' | 'slide';

const KINDS: Kind[] = ['lines', 'words', 'fade', 'slide'];

function kindOf(el: HTMLElement): Kind {
  const mobile = window.matchMedia(`(max-width: ${REVEAL.mobileMaxWidth}px)`).matches;
  const raw = (mobile && el.getAttribute('data-reveal-mobile')) || el.getAttribute('data-reveal');
  const want = (raw || 'lines').toLowerCase() as Kind;
  return KINDS.includes(want) ? want : 'lines';
}

/**
 * Watches the whole document once. Call it from the page root, not per
 * section: one ScrollTrigger per element is already plenty, and a second
 * observer per section would double every one of them.
 */
export function useScrollReveal(enabled = true) {
  useEffect(() => {
    if (!enabled) return;

    const ctx = gsap.context(() => {
      const targets = gsap.utils.toArray<HTMLElement>('[data-reveal]');

      targets.forEach((el) => {
        const kind = kindOf(el);
        const start = el.getAttribute('data-reveal-start') || REVEAL.start;
        const delay = parseFloat(el.getAttribute('data-reveal-delay') || '0');

        if (kind === 'fade' || kind === 'slide') {
          const from =
            kind === 'fade'
              ? { autoAlpha: 0, y: REVEAL.fade.y }
              : { autoAlpha: 0, x: REVEAL.slide.x };
          const spec = kind === 'fade' ? REVEAL.fade : REVEAL.slide;
          gsap.fromTo(el, from, {
            autoAlpha: 1,
            x: 0,
            y: 0,
            duration: spec.duration,
            ease: spec.ease,
            delay,
            scrollTrigger: { trigger: el, start, once: REVEAL.once },
          });
          return;
        }

        let split: SplitText | null = null;
        const build = () => {
          split = SplitText.create(el, {
            type: kind,
            mask: kind,
            linesClass: 'reveal-line',
            wordsClass: 'reveal-line',
          });
          const parts = kind === 'words' ? split.words : split.lines;
          gsap.set(parts, { yPercent: REVEAL.distance });

          gsap.to(parts, {
            yPercent: 0,
            duration: REVEAL.duration,
            ease: REVEAL.ease,
            delay,
            stagger: kind === 'words' ? REVEAL.words.stagger : REVEAL.lines.stagger,
            scrollTrigger: { trigger: el, start, once: REVEAL.once },
            onComplete() {
              split?.revert();
              split = null;
            },
          });
        };

        // Lines split against whatever face is loaded at the time, so a split
        // taken before the display font lands re-wraps when it arrives.
        if (document.fonts) void document.fonts.ready.then(build);
        else build();
      });
    });

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 300);
    return () => {
      window.clearTimeout(refresh);
      ctx.revert();
    };
  }, [enabled]);
}
