import { useCallback, useEffect, useRef, useState } from 'react';

import { img } from '@/assets/images';
import { BandWord } from '@/components/ui/BandWord';
import { GALLERY as GALLERY_COPY } from '@/data/home';
import { gsap } from '@/motion/gsap';
import { GALLERY } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The gallery: cards standing on the rim of a wheel whose centre is far below
 * the band, so stepping through them swings rather than slides.
 *
 * The geometry is derived, not typed in. The radius comes from the band's own
 * height and the angle between neighbours from the card width, so the cards
 * are the same distance apart whatever the viewport does — a hard-coded
 * degree figure only looks right at the width it was measured on, which is
 * exactly the failure mode this layout invites.
 *
 * Each card is counter-rotated by half its own arc angle, so it leans into
 * the curve instead of lying flat along it.
 */
export function Gallery() {
  const wheel = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();
  const images = GALLERY_COPY.images;

  /** Radius and step angle, recomputed whenever the stage resizes. */
  const geometry = useRef({ radius: 1200, step: 12 });

  const layout = useCallback(() => {
    const host = stage.current;
    const rim = wheel.current;
    if (!host || !rim) return;

    const card = rim.querySelector<HTMLElement>('[data-card]');
    const cardWidth = card?.offsetWidth ?? 280;
    /*
     * The hub sits six card-widths below the band. The multiple is what sets
     * the character of the whole thing: the angle between neighbours is the
     * arc they subtend at that radius, so a hub close to the cards swings
     * them through 40 degrees and they arrive on their sides, while one far
     * away flattens the curve out of existence. Six gives roughly 12 degrees
     * a step — a visible lean, still readable.
     */
    const radius = Math.max(cardWidth * 6, host.offsetHeight * 2.4);
    const step = ((cardWidth * 1.22) / radius) * (180 / Math.PI);
    geometry.current = { radius, step };

    rim.style.height = `${radius * 2}px`;
    rim.style.width = `${radius * 2}px`;

    gsap.set(rim.querySelectorAll('[data-card]'), {
      rotation: (i: number) => (i - index) * step,
      transformOrigin: `50% ${radius}px`,
    });
    gsap.set(rim, { rotation: 0 });
  }, [index]);

  useEffect(() => {
    layout();
    const ro = new ResizeObserver(layout);
    if (stage.current) ro.observe(stage.current);
    return () => ro.disconnect();
  }, [layout]);

  // Swing to the selected card.
  useEffect(() => {
    const rim = wheel.current;
    if (!rim) return;
    const { step, radius } = geometry.current;
    const ctx = gsap.context(() => {
      gsap.to(rim.querySelectorAll('[data-card]'), {
        rotation: (i: number) => (i - index) * step,
        transformOrigin: `50% ${radius}px`,
        duration: reduced ? 0 : GALLERY.snapDuration,
        ease: GALLERY.ease,
        overwrite: 'auto',
      });
    }, wheel);
    return () => ctx.revert();
  }, [index, reduced]);

  const go = (delta: number) =>
    setIndex((i) => Math.min(images.length - 1, Math.max(0, i + delta)));

  return (
    <section id="gallery" className="bg-paper text-ink relative overflow-hidden pt-28 pb-20">
      <BandWord solid className="-bottom-[2vw]">
        {GALLERY_COPY.title}
      </BandWord>

      <div className="px-gutter relative z-10">
        <h2 data-reveal="words" className="text-h3 mb-10">
          {GALLERY_COPY.title}
        </h2>
      </div>

      {/* The stage clips the wheel; only the top of the rim is ever on screen. */}
      <div ref={stage} className="relative z-10 h-[26rem] overflow-hidden">
        <div
          ref={wheel}
          className="absolute top-0 left-1/2 -translate-x-1/2"
          style={{ transformOrigin: '50% 50%' }}
        >
          {images.map((name, i) => (
            <button
              key={name}
              data-card
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Gallery image ${i + 1} of ${images.length}`}
              aria-current={i === index}
              className="absolute top-0 left-1/2 block w-[14rem] -translate-x-1/2 overflow-hidden rounded-sm sm:w-[18rem] lg:w-[22rem]"
            >
              <img
                src={img(name)}
                alt=""
                loading="lazy"
                className={`aspect-4/3 w-full object-cover transition-[filter,opacity] duration-500 ${
                  i === index ? '' : 'opacity-60 grayscale'
                }`}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="px-gutter relative z-20 mt-8 flex items-center justify-center gap-4">
        <WheelButton onClick={() => go(-1)} disabled={index === 0} label="Previous image">
          ‹
        </WheelButton>
        <p className="font-display text-h4 tabular-nums">
          {index + 1} <span className="opacity-40">/ {images.length}</span>
        </p>
        <WheelButton
          onClick={() => go(1)}
          disabled={index === images.length - 1}
          label="Next image"
        >
          ›
        </WheelButton>
      </div>
    </section>
  );
}

function WheelButton({
  children,
  onClick,
  disabled,
  label,
}: {
  children: string;
  onClick: () => void;
  disabled: boolean;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className="border-ink/20 hover:bg-signal hover:border-signal grid size-11 place-items-center rounded-full border text-xl transition-colors disabled:opacity-25 disabled:hover:bg-transparent"
    >
      {children}
    </button>
  );
}
