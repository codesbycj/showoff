import { useEffect, useRef, useState } from 'react';

import { Apply } from '@/after/Apply';
import { AnnouncementBar, Footer, Header, SubNav } from '@/after/Chrome';
import { Hero } from '@/after/Hero';
import { Rooms } from '@/after/Rooms';
import {
  Extras,
  Infopoint,
  Location,
  MapModal,
  Services,
  SharedSpaces,
  Slogan,
  Tiles,
} from '@/after/Sections';
import { useRise } from '@/motion/useRise';
import { cx } from '@/cx';

/**
 * The after: a rebuild of the reference's home page, block for block.
 *
 * Section order, which is the reference's: announcement, header, hero,
 * subnav, slogan, welcome tiles, rooms & prices, shared spaces, services,
 * location, extras, infopoint, apply, footer.
 *
 * Two pieces of page-level state live here because more than one block reads
 * them: whether the announcement bar is still up (the header and the floating
 * CTA both sit off its height) and whether the apply block is on screen (the
 * floating CTA hides itself over it, since there is a form there already and
 * a second "Apply now" floating over it is the same ask twice).
 */
export function AfterPage({ active = true }: { active?: boolean }) {
  const riseRef = useRise<HTMLDivElement>();
  const [barUp, setBarUp] = useState(true);
  const [ctaHidden, setCtaHidden] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const applyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = document.getElementById('apply');
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => setCtaHidden(e.isIntersecting)),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useSmoothScroll(active);

  return (
    <div className={cx('q', !barUp && '-bar-closed')} ref={riseRef}>
      {barUp ? <AnnouncementBar onClose={() => setBarUp(false)} /> : null}

      <Header ctaHidden={ctaHidden} />

      <main>
        <Hero active={active} />
        <SubNav />
        <Slogan />
        <Tiles />
        <Rooms onApply={() => document.getElementById('apply')?.scrollIntoView()} />
        <SharedSpaces />
        <Services />
        <Location onOpenMap={() => setMapOpen(true)} />
        <Extras />
        <Infopoint />
        <div ref={applyRef}>
          <Apply />
        </div>
      </main>

      <Footer />

      <MapModal open={mapOpen} onClose={() => setMapOpen(false)} />
    </div>
  );
}

/**
 * The reference's smooth scroll.
 *
 * It mounts Lenis with no options, and only where the pointer is fine and
 * reduced motion is off. Both of those conditions are copied; a third is
 * added, and it is forced by rule 7 -- two full pages are mounted at once and
 * the hidden one may not run an unconditional rAF loop, so Lenis is created
 * when the after is shown and destroyed when the toggle moves away from it.
 *
 * Lenis is loaded on demand rather than imported at the top so that the before
 * page, which is the one that opens, does not pay for it.
 */
function useSmoothScroll(active: boolean) {
  useEffect(() => {
    if (!active) return;
    if (typeof matchMedia !== 'function') return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!matchMedia('(pointer: fine)').matches) return;

    let stop: (() => void) | undefined;
    let cancelled = false;

    void import('lenis').then(({ default: Lenis }) => {
      if (cancelled) return;
      const lenis = new Lenis();
      let frame = requestAnimationFrame(function raf(time) {
        lenis.raf(time);
        frame = requestAnimationFrame(raf);
      });
      stop = () => {
        cancelAnimationFrame(frame);
        lenis.destroy();
      };
    });

    return () => {
      cancelled = true;
      stop?.();
    };
  }, [active]);
}
