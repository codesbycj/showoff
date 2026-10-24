import { useEffect, useState } from 'react';

import {
  Community,
  Download,
  Faq,
  Features,
  Footer,
  Hero,
  Humans,
  Inside,
  Misinformation,
  Why,
} from '@/after/Panels';
import { TryButton, Wordmark } from '@/after/Parts';
import { nav } from '@/content/site';
import { cx } from '@/cx';
import { useInView } from '@/motion/useInView';
import { useReducedMotion } from '@/motion/useReducedMotion';

/**
 * The after: a rebuild of the reference's home page, panel for panel.
 *
 * Section order, which is the reference's: a full-height sky, the "why" panel,
 * two rows of two feature panels, "made by humans", "what is inside", the
 * download panel, the misinformation panel, the community, the FAQ, and the
 * footer.
 *
 * There is no container and no column grid on this page. Every block is the
 * same object — a 32px-radius coloured panel inside a 16px white gutter — and
 * that repetition is the whole design.
 */
export function AfterPage({ active = true }: { active?: boolean }) {
  const ref = useInView<HTMLDivElement>();

  return (
    <div className={cx('k bg-white', !active && 'motion-paused')} ref={ref}>
      <Header />
      <Hero />
      <Why />
      <Features from={0} to={2} />
      <Features from={2} to={4} />
      <Humans />
      <Inside />
      <Download />
      <Misinformation />
      <Community />
      <Faq />
      <Footer />
    </div>
  );
}

/**
 * The header, which drops in once and then stays.
 *
 * This was built wrong first and the band photographs caught it. The markup
 * ships the header with `-translate-y-full`, so the obvious reading is a
 * header that hides until you have left the hero -- and that is what this was.
 * Every one of the reference's nine band photographs has the bar in it,
 * including the one taken at the top of the page, so the class is the start of
 * a drop-in entrance that plays once on mount, not a scroll state. There is no
 * scroll listener on this page at all.
 *
 * The 300ms is inferred (rule 5): the start state is in the markup, the finish
 * is the resting page, and the clock is matched to the capture.
 */
function Header() {
  const reduced = useReducedMotion();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReady(true), 120);
    return () => clearTimeout(id);
  }, []);

  /*
   * Derived rather than set in the effect: under reduced motion the header is
   * already down on the very first render, so the transform never applies and
   * there is nothing to play. Setting it from inside the effect instead is a
   * cascading render and `react-hooks/set-state-in-effect` rejects it.
   */
  const down = reduced || ready;

  return (
    <header
      className={cx(
        'fixed inset-x-0 top-0 z-[1000] p-8 transition-transform duration-300 max-md:p-6',
        down ? 'translate-y-0' : '-translate-y-full',
      )}
    >
      <div className="relative mx-auto flex max-w-[1200px] items-center justify-between rounded-[16px] bg-white/85 p-2 pl-3 shadow-[0_4px_22px_rgba(116,130,151,0.15)] backdrop-blur-md">
        <a href="#top" className="z-10 flex items-center" aria-label="crux">
          <Wordmark className="block h-8 w-[192px]" />
        </a>
        <nav className="absolute inset-0 flex items-center justify-center max-md:hidden">
          {nav.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="font-archivo text-ink rounded-full px-5 py-2 text-[18px] font-medium leading-[24px] no-underline transition-[background-color] duration-150 hover:bg-[rgba(24,29,31,0.1)]"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <TryButton />
      </div>
    </header>
  );
}
