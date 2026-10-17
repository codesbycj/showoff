/**
 * The page furniture: a mark top-left and two controls top-right.
 *
 * Positions and sizes are the reference's, read off the running page — the mark
 * sits in a 72px column at the page margin, the controls are 44px discs 8px
 * apart, 40px in from the top and the right, on `#1e1e1e` at 80% behind a
 * blur. The mark itself is invented, like the copy: this study takes the
 * reference's render, not its identity.
 *
 * The controls are real buttons with labels. They do nothing here, which is why
 * they say so rather than pretending: a decorative `<div>` that looks like a
 * button is worse than a button that admits it is a demo.
 */
export function Chrome() {
  return (
    <>
      <a
        href="#top"
        className="text-faint fixed left-6 top-0 z-30 w-18 pt-8 md:left-12 md:pt-10"
        aria-label="Pennant — home"
      >
        <svg viewBox="0 0 72 44" fill="none" className="w-full" aria-hidden="true">
          {/* A pennant: the flag the render is full of, reduced to one shape. */}
          <path d="M4 4h30l-9 10 9 10H4z" fill="currentColor" />
          <path d="M4 4v36" stroke="currentColor" strokeWidth="2" />
          <text
            x="0"
            y="52"
            fill="currentColor"
            fontSize="9"
            letterSpacing="1.6"
            fontFamily="inherit"
          >
            PENNANT
          </text>
        </svg>
        <span className="sr-only">Pennant</span>
      </a>

      <div className="fixed right-10 top-10 z-30 flex flex-row gap-2">
        <button
          type="button"
          className="bg-chip/80 flex size-11 items-center justify-center rounded-full text-white backdrop-blur transition-opacity duration-300 hover:opacity-80"
          aria-label="Sound (demo only)"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path
              d="M3 12h3l2.5-5 3 10L14 9l2 3h5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          className="bg-chip/80 flex size-11 items-center justify-center rounded-full text-white backdrop-blur transition-opacity duration-300 hover:opacity-80"
          aria-label="Menu (demo only)"
        >
          <svg viewBox="0 0 24 24" fill="none" className="size-5" aria-hidden="true">
            <path
              d="M5 9h14M5 15h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
