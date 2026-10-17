import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SplitText } from 'gsap/SplitText';

import { COPY } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

gsap.registerPlugin(SplitText);

/**
 * The label and the paragraph, resolving out of blur.
 *
 * One timeline, everything at position 0, and two different staggers running
 * over each other:
 *
 *   lines  slide 1rem to 0, 0.1 apart — so the block settles top-down;
 *   words  come up from `blur(10px)` and opacity 0, 0.02 apart — fast enough
 *          to read as one sweep rather than as words arriving.
 *
 * The plus sign and the "(Atelier)" label are dealt into the *word* run rather
 * than animated separately, which is why they lead the first line by a hair
 * instead of landing with it.
 *
 * `SplitText` is given `autoSplit` and re-splits on resize; `onSplit` rebuilds
 * the timeline each time, because the lines it animates stop existing when the
 * text re-wraps. The original innerHTML is put back on cleanup so a re-render
 * never splits an already-split block.
 */
export function TitleAndDesc({
  label,
  children,
  className = '',
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const text = root.querySelector<HTMLElement>('.tad-text');
    const title = root.querySelector<HTMLElement>('.tad-title');
    const mark = root.querySelector<HTMLElement>('.tad-mark');
    if (!text) return;

    const original = text.innerHTML;

    if (reduced) {
      gsap.set([root, text], { opacity: 1 });
      gsap.set([mark, title].filter(Boolean), { filter: 'none', opacity: 1, x: 0 });
      return () => {
        text.innerHTML = original;
      };
    }

    gsap.set([mark, title].filter(Boolean), {
      opacity: 0,
      x: COPY.lineOffset,
      filter: `blur(${COPY.labelBlur}px)`,
    });

    let tl: gsap.core.Timeline | undefined;
    const split = SplitText.create(text, {
      type: 'words, lines',
      linesClass: 'tad-line',
      wordsClass: 'tad-word',
      autoSplit: true,
      aria: 'none',
      onSplit: (self) => {
        gsap.set(self.lines, { x: COPY.lineOffset });
        gsap.set(self.words, { opacity: 0, filter: `blur(${COPY.wordBlur}px)` });

        tl = gsap.timeline({
          delay: COPY.delay,
          defaults: { duration: COPY.duration, ease: COPY.ease },
        });
        tl.set(root, { opacity: 1 });
        tl.set(text, { opacity: 1 });
        tl.to(self.lines, { x: 0, stagger: COPY.lineStagger }, 0);
        tl.to(
          [mark, title, ...self.words].filter(Boolean),
          { x: 0, opacity: 1, filter: 'blur(0px)', stagger: COPY.wordStagger },
          0,
        );
      },
    });

    return () => {
      split.revert();
      tl?.kill();
      text.innerHTML = original;
    };
  }, [reduced]);

  return (
    <div
      ref={rootRef}
      className={`flex flex-col gap-2 text-[#434343] opacity-0 md:gap-4 ${className}`}
    >
      <div className="flex flex-row items-center gap-2">
        <svg
          width="100%"
          viewBox="0 0 10 10"
          fill="none"
          aria-hidden="true"
          className="tad-mark size-2.5 shrink-0"
        >
          <path d="M5 10L5 0" stroke="currentColor" />
          <line y1="5" x2="10" y2="5" stroke="currentColor" />
        </svg>
        <span className="tad-title text-sm">({label})</span>
      </div>
      <p className="tad-text text-2xl leading-none tracking-[-0.025em] opacity-0 md:text-4xl">
        {children}
      </p>
    </div>
  );
}
