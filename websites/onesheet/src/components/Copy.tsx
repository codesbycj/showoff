/**
 * The half of the stage that does not move.
 *
 * It is pinned with the deck rather than scrolling past it, which is what makes
 * the section read as one idea with six illustrations instead of six sections.
 * The script word sits over the display word's shoulder, overlapping it
 * slightly — the overlap is the point, so it is a negative margin on the
 * display line rather than a gap anyone has to tune.
 */
export function Copy() {
  return (
    <div className="flex w-full flex-col items-center text-center">
      <h2 className="flex flex-col items-center">
        <span className="font-script text-[clamp(44px,5.2vw,82px)] leading-[0.8] text-[var(--color-flare)]">
          Our
        </span>
        <span className="font-display text-cream -mt-[0.18em] text-[clamp(44px,6.6vw,104px)] font-extrabold uppercase leading-[0.92] tracking-[-0.02em]">
          Services
        </span>
      </h2>

      <p className="mt-6 max-w-[34ch] text-[clamp(14px,1.1vw,17px)] leading-[1.55] text-[var(--color-muted)]">
        From the first pitch deck to the last delivery, we make and run campaigns that hold their
        shape across a poster, a feed and a foyer.
      </p>

      <a
        href="#services"
        className="focus-visible:outline-cream group mt-8 inline-flex items-center gap-3 rounded-full bg-[var(--color-flare)] px-6 py-3 text-[15px] font-semibold text-white outline-offset-4 transition-[background-color,transform] duration-300 hover:bg-[#f05b35] focus-visible:outline-2"
      >
        All services
        <svg className="card-arrow w-5" viewBox="0 0 40 12" fill="none" aria-hidden="true">
          <path
            d="M0 6h36M30 1l6 5-6 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </div>
  );
}
