import { useEffect, useRef } from 'react';
import Swiper from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';

import { VOICES } from '@/content/site';
import { RAIL } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The testimonial rail: one slide at a time, 120px apart, looping, advancing
 * every three seconds with an 800ms slide.
 *
 * Those two numbers are the whole character of it. 800ms against a 3s dwell is
 * a rail that moves about a quarter of the time it is on screen, which reads as
 * unhurried; the usual 300ms snap in a 5s dwell reads as a slideshow.
 *
 * The quote's first eleven words are set in full black and the rest at 50%.
 * That is literally what the reference does -- `words.slice(0, 11)` in an
 * inline script -- and it is worth keeping rather than tidying into two fields
 * in the deck, because the effect is a *measure* rather than a meaning: it
 * darkens roughly the first line and a half of any quote, whatever the quote
 * says, so a rail of ten testimonials has one consistent emphasis instead of
 * ten editorial decisions.
 *
 * Measured: the window is 817 wide inside the 1120 column, so the next slide is
 * always part-visible at the right edge -- that overhang is what tells you it is
 * a rail rather than a stack. One slide is a 507px text column and a 280x241
 * portrait 30px apart; the two 50px sand buttons sit under the rail's left edge,
 * 40px below it, and the section closes with 100px of air.
 */
export function Voices() {
  const railRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  /**
   * With motion reduced there is no Swiper, so the rail would be ten slides in
   * a flex row with nine of them clipped and no way to reach them. It becomes
   * a scroller instead: same slides, same buttons, native horizontal scrolling,
   * nothing moving on its own.
   */
  const nudge = (dir: 1 | -1) => {
    const el = railRef.current;
    if (!el || !reduced) return;
    el.scrollBy({ left: dir * (el.clientWidth + RAIL.spaceBetween), behavior: 'smooth' });
  };

  useEffect(() => {
    const el = railRef.current;
    if (!el || reduced) return;

    const swiper = new Swiper(el, {
      modules: [Autoplay, Navigation],
      slidesPerView: RAIL.slidesPerView,
      spaceBetween: RAIL.spaceBetween,
      speed: RAIL.speed,
      loop: RAIL.loop,
      watchOverflow: false,
      autoplay: { delay: RAIL.autoplayDelay, disableOnInteraction: false },
      navigation: { nextEl: '[data-rail-next]', prevEl: '[data-rail-prev]' },
      breakpoints: {
        480: { spaceBetween: RAIL.spaceBetween, autoHeight: false },
        0: { spaceBetween: RAIL.spaceBetweenNarrow, autoHeight: true },
      },
    });

    return () => swiper.destroy(true, true);
  }, [reduced]);

  return (
    <section id="voices" className="overflow-hidden px-5 lg:px-[160px]">
      <div className="mx-auto w-full max-w-[1120px]">
        <div className="flex flex-col items-center gap-2 pt-[100px]">
          <p className="t-eyebrow reveal text-center font-normal">{VOICES.eyebrow}</p>
          <h2 className="t-h3 reveal text-center">{VOICES.title}</h2>
        </div>

        <div className="pb-[100px] pt-10">
          <div
            ref={railRef}
            className={`swiper max-w-[817px] ${reduced ? 'snap-x snap-mandatory overflow-x-auto' : 'overflow-hidden'}`}
            style={{ marginLeft: 0, marginRight: 0 }}
          >
            <div className="swiper-wrapper">
              {VOICES.items.map((voice) => (
                <div
                  key={voice.handle}
                  className={`swiper-slide ${reduced ? 'w-full shrink-0 snap-start' : ''}`}
                  style={reduced ? { marginRight: RAIL.spaceBetween } : undefined}
                >
                  <div className="flex flex-col gap-[30px] sm:flex-row">
                    <div className="flex flex-col justify-between gap-4 py-5 sm:w-[507px]">
                      <Quote text={voice.quote} />
                      <div className="flex flex-col gap-[3.2px]">
                        <div className="flex items-center gap-3">
                          <span className="text-[16px] font-medium leading-[140%]">
                            {voice.name}
                          </span>
                          <span className="flex h-6 items-center gap-[5px] rounded-[4px] border border-black/30 px-2 text-[11px] font-medium leading-5">
                            <InstagramMark />
                            {voice.handle}
                          </span>
                        </div>
                        <p className="text-[13.5px] leading-[130%] text-black/30">{voice.note}</p>
                      </div>
                    </div>
                    <img
                      src={voice.photo}
                      alt={voice.name}
                      loading="lazy"
                      className="h-[241px] w-[280px] shrink-0 rounded-[32px] object-cover"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10 flex gap-2">
            <RailButton dir="prev" onClick={() => nudge(-1)} />
            <RailButton dir="next" onClick={() => nudge(1)} />
          </div>
        </div>
      </div>
    </section>
  );
}

/** The reference's eleven-word rule, applied to whatever the quote is. */
function Quote({ text }: { text: string }) {
  const words = text.split(' ');
  return (
    <p className="text-[16px] leading-[140%] text-black/50">
      <span className="text-ink">{words.slice(0, 11).join(' ')}</span> {words.slice(11).join(' ')}
    </p>
  );
}

function InstagramMark() {
  return (
    <svg viewBox="0 0 20 20" className="size-3" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="4.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="10" cy="10" r="3.2" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="14.1" cy="5.9" r="1.1" fill="currentColor" />
    </svg>
  );
}

function RailButton({ dir, onClick }: { dir: 'prev' | 'next'; onClick: () => void }) {
  const props = dir === 'next' ? { 'data-rail-next': true } : { 'data-rail-prev': true };
  return (
    <button
      type="button"
      onClick={onClick}
      {...props}
      aria-label={dir === 'next' ? 'Next testimonial' : 'Previous testimonial'}
      className="bg-sand flex size-[50px] items-center justify-center rounded-full transition-colors duration-300 hover:bg-[#e7dcca]"
    >
      <svg
        viewBox="0 0 24 12"
        className={`w-4 ${dir === 'prev' ? 'rotate-180' : ''}`}
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M0 6h21M16 1l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
