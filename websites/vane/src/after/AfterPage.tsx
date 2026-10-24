import { useState } from 'react';

import { AnnouncementBar, ClosingBand, Footer, Header } from '@/after/Chrome';
import {
  Agents,
  Clients,
  Hero,
  Merger,
  Partners,
  Platform,
  Reasons,
  Recognition,
  Resources,
  Standards,
  Stats,
  Testimonials,
} from '@/after/Sections';

/**
 * The after: a rebuild of the reference's home page, block for block.
 *
 * Section order, which is the reference's: announcement strip, header, hero,
 * client wall and awards marquee, the four-card platform on dark, the
 * statistics row, the reasons grid, the partner bar, the standards wall, the
 * AI agents on dark, the recognition cards, the resources, the partner
 * programme, the testimonials, and the footer with its closing call.
 *
 * `active` is the only thing passed in: the hidden pane may not run the
 * marquee, so it is handed down to be switched off (rule 7).
 */
export function AfterPage({ active = true }: { active?: boolean }) {
  const [barUp, setBarUp] = useState(true);

  return (
    <div className="v bg-white" data-active={active ? 'true' : 'false'}>
      {barUp ? <AnnouncementBar onClose={() => setBarUp(false)} /> : null}
      <Header />

      <main className="relative">
        <Hero />
        <Clients />
        <Platform />
        <Stats />
        <Reasons />
        <Merger />
        <Standards />
        <Agents />
        <Recognition />
        <Resources />
        <Partners />
        <Testimonials />
      </main>

      <Footer />
      <ClosingBand />
    </div>
  );
}
