import { useEffect, useRef } from 'react';

import { Swoosh } from '@/after/Swoosh';
import { HERO } from '@/content/site';
import { EASE, HERO as HERO_MOTION, PARALLAX } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The hero: a photograph, an ink wedge over it, and three lines of display
 * type that uncover as the wedge draws itself in.
 *
 * The wedge is this design's one piece of shape language, and it is a wedge
 * rather than a blob for a reason: the mark is a chevron, the company is
 * called verge, and the whole page is built on angles that run bottom-left to
 * top-right. It is a `clip-path` polygon rather than an image, so it costs
 * nothing, scales to any viewport and can animate — it draws itself open over
 * 1.4s on load, which is the page's first and largest movement.
 *
 * The photograph sits behind it on a slow parallax: 12% of scroll distance,
 * desktop only. That is small enough that nobody consciously sees it move and
 * large enough that the hero does not feel stuck to the page.
 *
 * The text is light-on-dark inside the wedge, which is the only reason the
 * header can be transparent over it.
 */
export function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const img = imgRef.current;
    if (!img || reduced) return;
    if (!window.matchMedia(`(min-width: ${PARALLAX.minWidth}px)`).matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        img.style.transform = `translate3d(0, ${window.scrollY * PARALLAX.depth}px, 0)`;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  return (
    <section id="top" className="relative min-h-[92svh] overflow-hidden">
      <img
        ref={imgRef}
        src={HERO.image}
        alt={HERO.alt}
        width={1700}
        height={760}
        fetchPriority="high"
        className="absolute inset-0 h-[115%] w-full object-cover object-[50%_35%]"
      />

      {/* The wedge. A polygon rather than a shape file, so it can draw itself. */}
      <div
        className="bg-ink absolute inset-0"
        style={{
          clipPath: 'polygon(0 100%, 0 56%, 100% 26%, 100% 100%)',
          animation: reduced
            ? undefined
            : `verge-wedge ${HERO_MOTION.durationS}s ${EASE.sweep} ${HERO_MOTION.delayS}s both`,
        }}
      />

      <div className="cc relative flex min-h-[92svh] flex-col justify-end pb-14 pt-32 lg:pb-20">
        <h1 className="t-display text-bone max-w-[16ch]">
          {HERO.lines.map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <span
                className="block"
                style={{
                  animation: reduced
                    ? undefined
                    : `verge-line ${HERO_MOTION.durationS * 0.7}s ${EASE.sweep} ${
                        HERO_MOTION.delayS + 0.35 + i * 0.08
                      }s both`,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        <p className="t-lead text-bone/75 mt-7 max-w-[52ch]">{HERO.sub}</p>

        <div className="mt-9 flex flex-wrap items-center gap-5">
          <Swoosh variant="ghost">{HERO.cta}</Swoosh>
          <a href="#pricing" className="u-link text-bone text-[15px] font-medium">
            {HERO.secondary}
          </a>
        </div>
      </div>
    </section>
  );
}
