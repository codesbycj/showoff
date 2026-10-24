import { useState } from 'react';

import { Benefits } from '@/after/Benefits';
import { Cards } from '@/after/Cards';
import { Explore } from '@/after/Explore';
import { Faq } from '@/after/Faq';
import { Footer } from '@/after/Footer';
import { Hero } from '@/after/Hero';
import { Product } from '@/after/Product';
import { Banner } from '@/after/Shell';
import { Statement } from '@/after/Statement';
import { Voices } from '@/after/Voices';
import { useReveal } from '@/motion/useReveal';

/**
 * The after: the page as it is now, rebuilt.
 *
 * Section order and every measurement are the reference's, read off its own
 * DOM rather than off a screenshot. The only deliberate departures are the
 * brand, the copy, and Geist standing in for a typeface that ships as a trial.
 *
 * The announcement strip is state here rather than inside itself, because
 * dismissing it has to give the hero its height back -- the hero is
 * `100svh - banner`, which is why that number travels down instead of the
 * strip hiding itself and leaving a gap. It only matters above 992, where the
 * hero is a full-height card; below that the hero is a 67vw strip and the
 * number is ignored, which is exactly what the reference's own
 * `updateHeroHeight` does with its `isDesktop()` guard.
 */
export function AfterPage() {
  const [bannerOpen, setBannerOpen] = useState(true);
  const rootRef = useReveal<HTMLDivElement>();

  return (
    <div ref={rootRef} className="bg-paper">
      {bannerOpen ? <Banner onDismiss={() => setBannerOpen(false)} /> : null}
      <Hero bannerHeight={bannerOpen ? 72 : 0} />
      <Statement />
      <Cards />
      <Product />
      <Benefits />
      <Voices />
      <Explore />
      <Faq />
      <Footer />
    </div>
  );
}
