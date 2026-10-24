import { useEffect, useState } from 'react';

import { CARDS, HERO } from '@/content/site';
import { useReducedMotion } from '@/motion/useReducedMotion';

/** jQuery Cycle's defaults, as everyone shipped them: `fade`, 600, 5000. */
const FADE_MS = 600;
const DWELL_MS = 5000;

const SLIDES = [
  {
    image: HERO.image,
    alt: HERO.alt,
    head: 'Red Light Therapy For The Whole Family!',
    sub: 'Science-backed, non-invasive, and safe for everyday use at home',
    cta: 'Find Out More',
  },
  {
    image: CARDS.items[0].image,
    alt: CARDS.items[0].alt,
    head: 'Recover Faster From Every Session',
    sub: 'Used by athletes, runners and weekend warriors across the North West',
    cta: 'Shop The Range',
  },
  {
    image: CARDS.items[1].image,
    alt: CARDS.items[1].alt,
    head: 'Looking After You, At Every Stage',
    sub: 'Gentle, flexible treatments designed with women in mind',
    cta: 'Read The Guide',
  },
];

/**
 * The rotating banner: 930x300, three slides, crossfade.
 *
 * This is jQuery Cycle rebuilt honestly -- the plugin that was on every
 * small-business homepage between about 2009 and 2014. Everything that made it
 * recognisable is kept: the 600ms linear crossfade (not an ease, the plugin's
 * default was linear), the 5-second dwell, the numbered pager rather than dots,
 * the two square arrows sitting on top of the photograph, the dark veil so that
 * white Arial Bold with a hard black text-shadow is legible over any frame, and
 * the fact that every slide says something different at the same volume.
 *
 * Two departures from the plugin, both deliberate:
 *
 *   * autoplay stops while the cursor is over the banner. Cycle needed
 *     `pause: 1` for that and plenty of sites left it out, but a banner that
 *     slides away mid-sentence under the pointer is a usability bug rather than
 *     a period detail.
 *   * autoplay does not start at all for a visitor who has asked for reduced
 *     motion. The arrows and the pager still work, so nothing becomes
 *     unreachable -- it just stops moving on its own.
 *
 * The photographs are the modern page's own, which is the point of the
 * exercise: the same assets, 320px wide inside a letterbox, under a headline
 * in a face the business did not choose.
 */
export function Rotator() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (held || reduced) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % SLIDES.length), DWELL_MS);
    return () => window.clearInterval(id);
  }, [held, reduced]);

  const go = (next: number) => setIndex((next + SLIDES.length) % SLIDES.length);

  return (
    <div
      className="b-slider"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
    >
      {SLIDES.map((slide, i) => (
        <div
          key={slide.head}
          className="b-slide"
          aria-hidden={i !== index}
          style={{
            opacity: i === index ? 1 : 0,
            zIndex: i === index ? 2 : 1,
            transitionDuration: `${FADE_MS}ms`,
          }}
        >
          <img src={slide.image} alt={slide.alt} width={930} height={300} />
          <div className="b-slide-veil" />
          <div className="b-slide-txt">
            <strong>{slide.head}</strong>
            <span>{slide.sub}</span>
            <div className="b-slide-btn">
              <a href="#panels" className="b-btn" tabIndex={i === index ? 0 : -1}>
                {slide.cta} &raquo;
              </a>
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        className="b-arrow b-arrow-l"
        onClick={() => go(index - 1)}
        aria-label="Previous slide"
        style={{ zIndex: 3 }}
      >
        &laquo;
      </button>
      <button
        type="button"
        className="b-arrow b-arrow-r"
        onClick={() => go(index + 1)}
        aria-label="Next slide"
        style={{ zIndex: 3 }}
      >
        &raquo;
      </button>

      <div className="b-pager" style={{ zIndex: 3 }}>
        {SLIDES.map((slide, i) => (
          <button
            key={slide.head}
            type="button"
            className={i === index ? 'is-on' : undefined}
            onClick={() => go(i)}
            aria-label={`Slide ${i + 1}`}
            aria-current={i === index}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
