import { CARDS } from '@/content/site';

/**
 * Three application cards, and the button that follows them.
 *
 * Measured off the reference at 1440: the section is 1120 wide inside 160px
 * gutters with 70px above and 160px below, the heading block is 56px clear of
 * the grid, the grid is three 367px columns 10px apart, and each card is
 * 367x459 -- a 263px photograph with a 196px foot under it.
 *
 * Three details that are easy to miss and carry the whole look:
 *
 *   * the heading is **24px**, not 36. Every section heading on this page is
 *     24px/28.8; only the benefit row titles and the product line are 36. A
 *     rebuild that sets section headings at 36 looks shouty in a way that is
 *     hard to diagnose afterwards.
 *   * the shadow is `10px 4px 44px rgba(197,16,16,0.03)` -- a red shadow, offset
 *     right and down, at three percent. It is barely visible and it is the
 *     reason the cards sit on the cream instead of in it.
 *   * over the photograph is a second layer carrying nothing but an inset cream
 *     glow (`0 4px 64px 10px rgba(252,248,241,0.7) inset`) at a 32px radius
 *     inside the 40px corner. That is what fades the picture into the card at
 *     its edges rather than cutting it.
 *
 * The category pill declares `transition: border-color .6s, padding .6s` in the
 * reference's stylesheet, but the hover that drives it is in Webflow's
 * interaction data rather than in CSS, so only the border move is rebuilt here
 * -- guessing at the padding half would be inventing a different design.
 */
export function Cards() {
  return (
    <section id="applications" className="px-5 lg:px-[160px]">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col items-center pb-[160px] pt-[70px]">
        <div className="flex flex-col items-center gap-1">
          <p className="t-eyebrow reveal text-center">{CARDS.eyebrow}</p>
          <h2 className="t-h3 reveal text-center">{CARDS.title}</h2>
        </div>

        <ul className="reveal mt-14 grid w-full grid-cols-1 gap-[10px] md:grid-cols-3">
          {CARDS.items.map((item) => (
            <li
              key={item.caption}
              className="bg-paper group relative flex flex-col overflow-hidden rounded-[40px] md:h-[459px]"
              style={{ boxShadow: '10px 4px 44px rgba(197, 16, 16, 0.03)' }}
            >
              <div className="relative overflow-hidden rounded-[40px] md:h-[263px]">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-[367/263] w-full object-cover"
                />
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[32px]"
                  style={{ boxShadow: '0 4px 64px 10px rgba(252, 248, 241, 0.7) inset' }}
                />
              </div>

              <div className="flex flex-1 flex-col justify-between gap-8 p-[30px]">
                <p className="max-w-[224px] text-[16px] leading-[140%] text-black/50">
                  {item.caption}
                </p>

                <span
                  className="bg-paper relative flex h-[59px] items-center overflow-hidden rounded-[30px] border pl-[50px] transition-[padding-left,border-color] duration-[600ms] group-hover:border-transparent group-hover:pl-[30px]"
                  style={{ borderColor: 'rgba(194, 189, 181, 0.5)' }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute left-[17px] top-1/2 size-5 -translate-y-1/2 rounded-full transition-all duration-[600ms] group-hover:left-0 group-hover:top-0 group-hover:size-full group-hover:translate-y-0 group-hover:rounded-[30px]"
                    style={{
                      backgroundImage: `radial-gradient(circle at 32% 28%, #ffffff 0%, ${item.tint[0]} 42%, ${item.tint[1]} 100%)`,
                    }}
                  />
                  <span className="relative text-[16.5px] font-medium leading-[130%]">
                    {item.category}
                  </span>
                </span>
              </div>
            </li>
          ))}
        </ul>

        <a
          href="#panels"
          className="bg-ink text-paper reveal mt-[60px] flex h-[60px] items-center gap-2.5 rounded-full px-10 text-[15.2px] font-medium leading-[16.72px] transition-opacity duration-[400ms] hover:opacity-85"
        >
          {CARDS.cta}
          <svg viewBox="0 0 24 12" className="w-4" fill="none" aria-hidden="true">
            <path
              d="M0 6h21M16 1l5 5-5 5"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
