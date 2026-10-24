import { Nav } from '@/after/Shell';
import { HERO } from '@/content/site';

/**
 * The hero: one photograph in a 40px-cornered card, inset 30px on all four
 * sides, with the navigation over the top of it and the headline against the
 * bottom.
 *
 * Measured off the reference at 1440x900: the wrap is the whole remaining
 * viewport (`0,72,1440,828`) with 30px of padding, so the card is 1380x768 and
 * there is cream showing *under* it as well as around it. Getting the bottom
 * inset wrong is the one error here that looks like nothing and reads as the
 * card being too tall.
 *
 * **No negative z-index on those two images.** They are `absolute inset-0`
 * first in the card and the content comes after them, so document order alone
 * puts the photograph underneath. `-z-20` looks equivalent and is not: the
 * before/after stack gives each page a stacking context, and inside one, a
 * negative-z child paints *below the in-flow backgrounds* of everything in it
 * -- so the hero photograph went behind the page's cream and the hero rendered
 * as an empty card with white type on it. It cost an hour because the card
 * still measured 1380x768 and the image still reported `complete`.
 *
 * Three more details that carry the look:
 *
 *   * the second image over the photograph is a gradient at
 *     `mix-blend-mode: overlay`, at 0.46 opacity -- not an overlay colour. That
 *     is what makes the red bloom follow the light already in the picture
 *     instead of flattening it.
 *   * the headline is 72px/110% at -0.01em, centred on the card, 64px off the
 *     bottom, in a 778px box with **no padding**. Geist is wider than the
 *     reference's Saans at matched cap height, so 24px of side padding is the
 *     difference between one line and two here -- and one line is the
 *     composition. Where a substitute face forces that choice, the line count
 *     wins over the measure.
 *   * there is **no gap** between the headline and the line under it. The text
 *     block is exactly the two line boxes stacked, 103px for 79 + 24, and the
 *     margin everyone adds by reflex is what makes a rebuild of this read loose.
 *
 * **Below 992 it is a different hero, and that is the reference's design, not a
 * fallback.** `.h-hero-img-wrap` drops to `height: 67vw` with 12px side margins
 * and a 24px radius, and `.h-hero-txt` carries `tab-hide` -- the headline comes
 * *out* of the photograph and sits under it in the cream. Which is the right
 * call: 72px of centred white type over a photograph works at 1380 wide and
 * turns into four unreadable lines at 390.
 */
export function Hero({ bannerHeight }: { bannerHeight: number }) {
  return (
    <section
      id="top"
      className="px-3 pb-6 pt-1 lg:h-[calc(100svh-var(--bnr))] lg:p-[30px]"
      style={{ '--bnr': `${bannerHeight}px` } as React.CSSProperties}
    >
      <div className="relative flex h-[67vw] w-full flex-col items-center justify-end overflow-clip rounded-[24px] lg:h-full lg:rounded-[40px] lg:pb-16">
        <img
          src={HERO.image}
          alt={HERO.alt}
          width={2840}
          height={1520}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <img
          src={HERO.gradient}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full rounded-[24px] object-cover opacity-[0.46] mix-blend-overlay lg:rounded-[40px]"
        />

        <Nav />

        <div className="relative hidden max-w-[778px] flex-col items-center text-center lg:flex">
          <Headline />
        </div>
      </div>

      <div className="mt-7 flex flex-col items-center px-3 text-center lg:hidden">
        <Headline />
      </div>
    </section>
  );
}

function Headline() {
  return (
    <>
      <h1 className="text-ink lg:text-paper text-[clamp(32px,5vw,72px)] font-medium leading-[110%] tracking-[-0.01em]">
        {HERO.title}
      </h1>
      <p className="text-ink/50 lg:text-sand/60 text-[clamp(14px,1.25vw,18px)] leading-[134%] tracking-[-0.01em]">
        {HERO.sub}
      </p>
    </>
  );
}
