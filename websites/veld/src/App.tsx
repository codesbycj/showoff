import { useState } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Nav } from '@/components/layout/Nav';
import { useParallax } from '@/motion/useParallax';
import { useScrollReveal } from '@/motion/useScrollReveal';
import { useSectionOverlap } from '@/motion/useSectionOverlap';
import { Calendar } from '@/sections/Calendar';
import { Contact } from '@/sections/Contact';
import { Gallery } from '@/sections/Gallery';
import { Hero } from '@/sections/Hero';
import { Loader } from '@/sections/Loader';
import { Media } from '@/sections/Media';
import { Partners } from '@/sections/Partners';
import { SponsorGuide } from '@/sections/SponsorGuide';
import { Statement } from '@/sections/Statement';
import { Story } from '@/sections/Story';
import { VideoBand } from '@/sections/VideoBand';

/**
 * The home page. Add `?skip` to the URL to jump past the loading sequence.
 *
 * The loader is a child of the hero rather than an overlay on the page,
 * because the two are one movement: the white screen collapsing *is* the car
 * number landing in the hero, and the hero's copy starts arriving 0.4s before
 * that finishes. A full-page overlay could not overlap either of those.
 *
 * Reveals and parallax are set up once here, for the whole document, and only
 * after the loader has handed over — wiring them while the hero is still
 * hidden measures every trigger against a layout that is about to change.
 */
export function App() {
  const [skip] = useState(() => new URLSearchParams(window.location.search).has('skip'));
  const [loaded, setLoaded] = useState(() => skip);

  useSectionOverlap(loaded);
  useScrollReveal(loaded);
  useParallax(loaded);

  return (
    <>
      <Nav hidden={!loaded} />

      <main>
        <Hero loaded={loaded}>{!skip && <Loader onDone={() => setLoaded(true)} />}</Hero>
        <Statement />
        <Partners />
        <Story />
        <Media />
        <Calendar loaded={loaded} />
        <SponsorGuide />
        <VideoBand />
        <Gallery />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
