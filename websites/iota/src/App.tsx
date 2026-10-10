import { useEffect, useState } from 'react';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { HERO_IMAGES } from '@/data/home';
import { ScrollTrigger } from '@/motion/gsap';
import { useReducedMotion } from '@/motion/useReducedMotion';
import { useSmoothScroll } from '@/motion/useSmoothScroll';
import { FocusCta } from '@/sections/FocusCta';
import { LatestUpdates } from '@/sections/LatestUpdates';
import { Preloader } from '@/sections/Preloader';
import { ProcessStatement } from '@/sections/ProcessStatement';
import { SelectedWork } from '@/sections/SelectedWork';
import { ShowcaseStage } from '@/sections/ShowcaseStage';

/** The home page. Add `?skip` to the URL to jump past the loading sequence. */
export function App() {
  const reduced = useReducedMotion();
  const { lock, unlock } = useSmoothScroll();

  const [skip] = useState(() => new URLSearchParams(window.location.search).has('skip'));
  const [selected] = useState(() => Math.floor(Math.random() * HERO_IMAGES.length));

  const showPreloader = !reduced && !skip;
  const [loading, setLoading] = useState(showPreloader);

  useEffect(() => {
    if (loading) lock();
    else unlock();
  }, [loading, lock, unlock]);

  useEffect(() => {
    if (loading) return;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 120);
    return () => window.clearTimeout(id);
  }, [loading]);

  return (
    <>
      {showPreloader && loading && (
        <Preloader selected={selected} onComplete={() => setLoading(false)} />
      )}

      <Header hidden={loading} />

      <main id="top">
        <ShowcaseStage selected={selected} ready={!loading} />
        <ProcessStatement />
        <SelectedWork />
        <LatestUpdates />
        <FocusCta />
      </main>

      <Footer />
    </>
  );
}
