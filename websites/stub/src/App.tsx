/**
 * The page is a lead-in, the section, and a lead-out.
 *
 * The two plain sections are not filler. The beat starts when the track's top
 * reaches the bottom of the viewport, so without something above it the first
 * third of the timeline would already be spent by the time the page had
 * finished loading, and the blue would be on screen before anyone had scrolled.
 */
import { Stage } from '@/components/Stage';

export function App() {
  return (
    <main>
      <section className="flex min-h-screen flex-col justify-between px-8 py-10 md:px-16">
        <header className="flex items-baseline justify-between">
          <span className="font-serif text-[26px] italic">Stub</span>
          <span className="font-mono text-[11px] uppercase tracking-[0.12em]">
            Est. 2019 — Issue 04
          </span>
        </header>

        <h1 className="max-w-[16ch] text-[clamp(44px,8vw,112px)] leading-[0.95] tracking-[-0.02em]">
          We issue the <span className="font-serif italic">work</span>, not the hours.
        </h1>

        <div className="flex items-end justify-between gap-8">
          <p className="max-w-[38ch] text-[15px] leading-[1.45]">
            A studio of four. Every engagement goes out as a ticket: one tier, one price, one date
            it is in your hands. Tear it off and we start.
          </p>
          <p className="shrink-0 font-mono text-[11px] uppercase tracking-[0.12em]">
            Scroll to see the rates
          </p>
        </div>
      </section>

      <Stage />

      {/* Where a torn stub sends you. A real destination rather than a dead
          `href`, so the call-to-action behaves like one when it is clicked. */}
      <section
        id="enquire"
        className="flex min-h-screen flex-col justify-between px-8 py-10 md:px-16"
      >
        <p className="max-w-[20ch] pt-24 text-[clamp(32px,5vw,64px)] leading-[1.05] tracking-[-0.02em]">
          Nothing to brief. <span className="font-serif italic">Pick a ticket.</span>
        </p>

        <footer className="flex flex-wrap items-end justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.12em]">
          <span>Stub — a fictional studio</span>
          <span>Prices in USD, excluding tax</span>
        </footer>
      </section>
    </main>
  );
}
