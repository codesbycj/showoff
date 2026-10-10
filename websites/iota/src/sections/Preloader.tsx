import { useEffect, useLayoutEffect, useRef, type Ref } from 'react';

import { ACRONYM, HERO_IMAGES } from '@/data/home';
import { gsap } from '@/motion/gsap';
import { PRELOADER, rel } from '@/motion/motion';

type PreloaderProps = {
  selected: number;
  onComplete: () => void;
};

/**
 * The loading sequence: I-O-T-A grows into four words, parts down the middle,
 * and lets a photograph through.
 */
export function Preloader({ selected, onComplete }: PreloaderProps) {
  const root = useRef<HTMLDivElement>(null);
  const columnOne = useRef<HTMLDivElement>(null);
  const columnTwo = useRef<HTMLDivElement>(null);
  const imageWrap = useRef<HTMLDivElement>(null);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useLayoutEffect(() => {
    const el = root.current;
    const wrap = imageWrap.current;
    const columns = [columnOne.current, columnTwo.current];
    if (!el || !wrap || !columns[0] || !columns[1]) return;

    const q = <T extends HTMLElement>(sel: string) => Array.from(el.querySelectorAll<T>(sel));

    const ctx = gsap.context(() => {
      const leads = q('[data-lead]');
      const tails = q('[data-tail]');
      const words = q('[data-word]');
      const { letters, expand, split, image, handoff } = PRELOADER;

      const blockWidth = Math.max(...words.map((w) => w.offsetWidth));
      const leadWidth = Math.max(...leads.map((l) => l.offsetWidth));
      const startX = (blockWidth - leadWidth) / 2;

      const stackHeight = columns[0]!.offsetHeight + columns[1]!.offsetHeight;
      const wrapWidth = Math.round(stackHeight * 0.62);
      const partBy = wrapWidth / 2 + blockWidth / 2 + 24;
      const narrow = window.innerWidth < split.verticalBelow;

      gsap.set(wrap, {
        xPercent: -50,
        yPercent: -50,
        width: wrapWidth,
        height: stackHeight,
        scale: 0,
      });

      const tl = gsap.timeline({
        delay: PRELOADER.startDelay,
        onComplete: () => onCompleteRef.current(),
      });

      tl.set(columns, { x: startX })
        .set(words, { opacity: 1 })
        .fromTo(
          leads[0]!,
          {
            y: letters.from.y,
            opacity: letters.from.opacity,
            filter: `blur(${letters.from.blur}px)`,
          },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: letters.duration, ease: letters.ease },
        )
        .fromTo(
          leads.slice(1),
          {
            y: letters.from.y,
            opacity: letters.from.opacity,
            filter: `blur(${letters.from.blur}px)`,
          },
          {
            y: 0,
            opacity: 1,
            filter: 'blur(0px)',
            duration: letters.duration,
            stagger: letters.stagger,
            ease: letters.ease,
          },
          rel(letters.overlap),
        )
        .to(
          columns,
          { x: 0, duration: expand.duration, ease: expand.ease },
          rel(expand.columnsOverlap),
        )
        .to(tails, { x: 0, duration: expand.duration, ease: expand.ease }, rel(expand.tailsOverlap))
        .to(columns[0]!, {
          x: narrow ? -blockWidth * split.verticalOffset : -partBy,
          y: narrow ? -stackHeight * split.verticalOffset : 0,
          duration: split.duration,
          ease: split.ease,
        })
        .to(
          columns[1]!,
          {
            x: narrow ? blockWidth * split.verticalOffset : partBy,
            y: narrow ? stackHeight * split.verticalOffset : 0,
            duration: split.duration,
            ease: split.ease,
          },
          '<',
        )
        .to(
          wrap,
          { scale: 1, duration: image.appear.duration, ease: image.appear.ease },
          rel(image.overlap),
        )
        .to(
          q('[data-layer="under"]'),
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: image.under.duration,
            ease: image.under.ease,
          },
          rel(image.under.overlap),
        )
        .to(
          q('[data-layer="selected"]'),
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            duration: image.selected.duration,
            ease: image.selected.ease,
          },
          rel(image.selected.overlap),
        )
        .to(
          wrap,
          {
            width: `calc(100vw + ${image.expand.overscan}px)`,
            height: '100vh',
            duration: image.expand.duration,
            ease: image.expand.ease,
          },
          rel(image.expand.overlap),
        )
        .to(
          columns,
          {
            scale: image.wordsOut.scale,
            opacity: image.wordsOut.opacity,
            duration: image.wordsOut.duration,
            ease: image.wordsOut.ease,
          },
          '<',
        )
        .to(el, { autoAlpha: 0, duration: handoff.fade });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={root}
      aria-hidden
      className="bg-backdrop text-paper fixed inset-0 z-50 overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <AcronymColumn ref={columnOne} words={ACRONYM.slice(0, 2)} />
        <AcronymColumn ref={columnTwo} words={ACRONYM.slice(2)} />

        <div ref={imageWrap} className="absolute top-1/2 left-1/2 overflow-hidden">
          {HERO_IMAGES.map((img, i) => {
            const layer =
              i === selected
                ? 'selected'
                : i === (selected + 1) % HERO_IMAGES.length
                  ? 'under'
                  : 'base';
            return (
              <img
                key={img.src}
                src={img.src}
                alt=""
                data-layer={layer}
                fetchPriority={layer === 'selected' ? 'high' : 'auto'}
                className="absolute inset-0 size-full object-cover"
                style={{
                  zIndex: layer === 'selected' ? 3 : layer === 'under' ? 2 : 1,
                  clipPath: layer === 'base' ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)',
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

/** Two words, each laid out at full width with its tail parked out of sight. */
function AcronymColumn({
  ref,
  words,
}: {
  ref: Ref<HTMLDivElement>;
  words: readonly { lead: string; rest: string }[];
}) {
  return (
    <div ref={ref}>
      {words.map((word) => (
        <div
          key={word.lead}
          data-word
          className="flex w-fit overflow-hidden text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.18] font-light tracking-[-0.02em] opacity-0"
        >
          <span data-lead>{word.lead}</span>
          <span data-tail className="-translate-x-[150%]">
            {word.rest}
          </span>
        </div>
      ))}
    </div>
  );
}
