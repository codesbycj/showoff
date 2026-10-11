import { useEffect, useRef } from 'react';

import { img } from '@/assets/images';
import { CarNumber } from '@/components/ui/CarNumber';
import { gsap, ScrollTrigger } from '@/motion/gsap';
import { VIDEO_BAND } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The film, which grows out of its own frame as you reach it: 70vw/70vh at
 * the band's top edge, full bleed by the time it reaches the top of the
 * screen, scrubbed so it rewinds exactly on the way back up.
 *
 * Width and height are animated rather than `scale`, because a scaled frame
 * takes its border radius and its contents with it — the corners would round
 * off as it grew and the picture inside would stretch. Animating the box lets
 * the radius go to zero on its own schedule and the image re-cover at every
 * size.
 */
export function VideoBand() {
  const section = useRef<HTMLElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const trigger = section.current;
    const target = frame.current;
    if (!trigger || !target || reduced) return;

    const ctx = gsap.context(() => {
      gsap.set(target, VIDEO_BAND.from);
      gsap.to(target, {
        ...VIDEO_BAND.to,
        ease: 'none',
        scrollTrigger: {
          trigger,
          start: VIDEO_BAND.start,
          end: VIDEO_BAND.end,
          scrub: VIDEO_BAND.scrub,
        },
      });
    }, section);

    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
  }, [reduced]);

  return (
    <section
      ref={section}
      data-overlap
      data-overlap-amount="40"
      className="bg-ink relative grid min-h-svh place-items-center overflow-hidden"
    >
      <div
        ref={frame}
        className="relative grid place-items-center overflow-hidden"
        style={reduced ? { width: '100vw', height: '70vh' } : undefined}
      >
        <img
          src={img('video-still.webp')}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/45" />
        <CarNumber
          className="relative w-[22vw] max-w-[16rem] min-w-[7rem] opacity-90"
          fill="#ffffff"
          title="Car number 96"
        />
      </div>
    </section>
  );
}
