import { BRAND, CTA } from '@/content/site';

/**
 * Two fixed overlays, both measured off the reference.
 *
 *   pill   32,16   300x43  white, radius 10, over everything, never moves
 *          label at 48,28 — Clash 16/19.2 500 uppercase
 *          two 24x1 black bars at 292,32 and 292,42 — the whole menu icon
 *   cta    bottom right, black, lime label, also fixed
 *
 * Neither scrolls and neither has a scrolled state: the nav is a 300px white
 * tablet that sits in the top-left corner of whatever happens to be behind it.
 * On a page whose first screen is a photograph and whose fourth is a dark green
 * collage, that is the only way one chrome colour works everywhere.
 */
export function Nav() {
  return (
    <>
      <nav
        className="fixed left-[32px] top-[16px] z-50 flex h-[43px] w-[300px] items-center justify-between rounded-[10px] bg-white px-[16px]"
        aria-label="Primary"
      >
        <a
          className="t-16 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
          href="#top"
        >
          {BRAND.name}
        </a>
        <button
          className="focus-visible:outline-offset-6 flex h-[11px] w-[24px] shrink-0 flex-col justify-between focus-visible:outline-2 focus-visible:outline-black"
          type="button"
          aria-label="Menu"
        >
          <span className="block h-px w-full bg-black" />
          <span className="block h-px w-full bg-black" />
        </button>
      </nav>

      <a
        className="t-14 fixed bottom-[24px] right-[24px] z-50 inline-flex h-[42px] items-center gap-3 bg-black px-[22px] text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black"
        href="#featured"
      >
        {CTA.label}
        <span aria-hidden="true">+</span>
      </a>
    </>
  );
}
