import { useEffect, useRef, useState } from 'react';

import { COLLAGE } from '@/content/site';

/**
 * The collage, measured off the reference.
 *
 *   section  y4365  h1917, forest green
 *   lead     32,4565  400x90   Clash 32/44.8 500, sage
 *   word     32,4662  Clash 40/56 500, lime, with a superscript index
 *   grid     944x1677 from x464,y4485 — absolute boxes on a 236px column
 *
 * Two things the dump gives you that a screenshot does not.
 *
 * **The empty cells are real.** Every gap in the collage is a 236x191 div with
 * a white background and `opacity: 0` — structure that paints nothing. Without
 * reading the computed style you would build them as white blocks, which is
 * what the first pass did, and the section comes out looking like a sheet of
 * postage stamps instead of photographs floating on green.
 *
 * **The heading swaps.** There is only one heading in the DOM, and the page
 * shows two: the left column is sticky and its word changes from the first to
 * the second as the grid scrolls past it. That is why the dump taken at rest
 * has "Elegance" and the full-page strip has "Elegance" at the top of the
 * section and "Clarity" further down.
 */
export function Collages() {
  const sectionRef = useRef<HTMLElement>(null);
  const [second, setSecond] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const onScroll = () => {
      const r = el.getBoundingClientRect();
      const travelled = -r.top + window.innerHeight / 2;
      setSecond(travelled > r.height / 2);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const active = COLLAGE.words[second ? 1 : 0];

  return (
    <section className="bg-forest relative w-full py-[120px]" ref={sectionRef}>
      <div className="mx-auto flex max-w-[1440px] gap-[32px] px-[32px]">
        <div className="hidden w-[400px] shrink-0 lg:block">
          <div className="sticky top-[120px]">
            <h2 className="t-32 text-sage m-0 max-w-[400px] uppercase">{COLLAGE.lead}</h2>
            <p className="t-40 text-lime m-0 mt-[7px]" key={active.word}>
              {active.word}
              <sup className="t-14n ml-[6px] align-super">{active.mark}</sup>
            </p>
          </div>
        </div>

        <div
          className="relative w-full lg:w-[944px]"
          style={{ height: COLLAGE.height }}
          aria-hidden="true"
        >
          {COLLAGE.cells.map((cell) => (
            <span
              className="frame absolute block"
              key={cell.img}
              style={{ left: cell.x, top: cell.y, width: cell.w, height: cell.h }}
            >
              <img className="size-full object-cover" src={cell.img} alt="" loading="lazy" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
