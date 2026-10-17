import { Chrome } from '@/components/Chrome';
import { FlagsCanvas } from '@/components/FlagsCanvas';
import { TitleAndDesc } from '@/components/TitleAndDesc';

/**
 * One screen: a render of ribbons bleeding off the top and the right, and a
 * line of copy in the bottom-left.
 *
 * The section is `flex items-end` with the page margin as padding, so the copy
 * sits on the baseline of the viewport and the render is placed against that
 * rather than against a grid. The render's own box is `h-full aspect-video`,
 * pinned right and lifted 10% off the top — which is why it reads as a
 * photograph the page is standing in front of, not as a hero image.
 *
 * Below `xl` it is pushed 75% of its own width off the right edge, which keeps
 * the same part of the render in frame on a narrow screen instead of shrinking
 * all of it into the corner. That is the reference's own breakpoint behaviour.
 */
export function App() {
  return (
    <main id="top">
      <Chrome />
      <section className="relative flex h-svh w-screen items-end overflow-hidden px-6 pb-6 md:h-screen md:px-12 md:pb-12">
        <TitleAndDesc label="Atelier" className="relative z-20">
          A small studio in Rotterdam, working wherever
          <br />
          the brief lands. We make things that are felt
          <br />
          first and explained second.
        </TitleAndDesc>

        <FlagsCanvas className="-right-[75%] -top-[20%] xl:-top-[10%] xl:right-0" />
      </section>
    </main>
  );
}
