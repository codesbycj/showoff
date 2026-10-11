import { img } from '@/assets/images';
import { STATEMENT } from '@/data/home';

/**
 * The quote band: a statement in display type with two photographs drifting
 * past it at different rates.
 *
 * The whole paragraph is one element with a single `data-reveal="lines"`, not
 * one per sentence, so the splitter sees the real line breaks and the stagger
 * runs down the block rather than restarting inside it. The highlighted
 * phrases are spans *inside* that element, which survive the split because
 * SplitText rebuilds nested markup rather than flattening it.
 */
export function Statement() {
  return (
    <section id="about" className="bg-paper text-ink relative overflow-hidden">
      <div className="px-gutter relative z-10 grid grid-cols-12 gap-6 py-32">
        <div className="col-span-12 lg:col-span-7 lg:col-start-4">
          <p
            data-reveal="lines"
            data-reveal-start="top 75%"
            className="font-display text-h2 uppercase"
          >
            {STATEMENT.map((part, i) =>
              part.signal ? (
                <span key={i} className="text-signal">
                  {part.text}
                </span>
              ) : (
                <span key={i}>{part.text}</span>
              ),
            )}
          </p>
        </div>
      </div>

      {/* Flanking stills. They sit outside the grid because they are allowed
          to run past the gutter, which is what makes the band feel wider. */}
      <div
        data-parallax
        data-parallax-start="-10"
        data-parallax-end="10"
        className="absolute top-1/2 left-8 hidden w-[9rem] -translate-y-1/2 lg:block xl:w-[11rem]"
      >
        <img src={img('statement-1.webp')} alt="" className="w-full grayscale" loading="lazy" />
      </div>
      <div
        data-parallax
        data-parallax-start="10"
        data-parallax-end="-10"
        className="absolute right-8 bottom-16 hidden w-[9rem] lg:block xl:w-[11rem]"
      >
        <img src={img('statement-2.webp')} alt="" className="w-full grayscale" loading="lazy" />
      </div>
    </section>
  );
}
