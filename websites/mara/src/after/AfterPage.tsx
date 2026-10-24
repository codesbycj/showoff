import { Band } from '@/after/Band';
import { Brands } from '@/after/Brands';
import { Collages } from '@/after/Collages';
import { Featured } from '@/after/Featured';
import { Footer } from '@/after/Footer';
import { Hero } from '@/after/Hero';
import { Marquee } from '@/after/Marquee';
import { Nav } from '@/after/Nav';
import { Splits } from '@/after/Splits';
import { Statement } from '@/after/Statement';
import { useRise } from '@/motion/useRise';

/**
 * The after: a rebuild of the reference's home page, section for section, at
 * its measurements (rule 0). Only the words are mine.
 *
 *   hero       y0     h900    + a fixed nav pill and a fixed CTA
 *   marquee    y900   h109
 *   statement  y1009  h865
 *   splits     y1874  3 x h830
 *   collages   y4365  h1917
 *   band       y6281  h762
 *   featured   y7043  h744
 *   brands     y7787  h518
 *   footer     y8305  h860
 */
export function AfterPage() {
  const root = useRise<HTMLDivElement>();

  return (
    <div className="font-display bg-white" ref={root} id="top">
      <Nav />
      <Hero />
      <Marquee />
      <Statement />
      <Splits />
      <Collages />
      <Band />
      <Featured />
      <Brands />
      <Footer />
    </div>
  );
}
