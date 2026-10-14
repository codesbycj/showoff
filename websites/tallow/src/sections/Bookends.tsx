/**
 * Scroll room either side of the transition.
 *
 * Not decoration: the section needs approach and exit to work at all. The
 * direction toggle arms when the timeline enters the viewport, so there has to
 * be something above it to scroll down *from* and something below to scroll
 * back *up* from — tested against the top or bottom of the document, a page
 * that is only the transition can never reach the states it switches between.
 */

export function Lead() {
  return (
    <section id="top" className="px-gutter flex h-svh flex-col justify-end pb-[12svh]">
      <p className="text-ink-faint font-mono text-xs tracking-[0.18em] uppercase">
        Tallow / Timeline
      </p>
      <h1 className="mt-6 max-w-[16ch] text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[-0.035em]">
        A video editor you can program.
      </h1>
      <p className="text-ink-soft mt-8 max-w-[44ch] text-lg">
        Keep scrolling. The blocks in the sentence below are the same five that end up on the track
        — there is only one of each.
      </p>
    </section>
  );
}

export function Tail() {
  return (
    <section className="px-gutter flex h-svh flex-col justify-center">
      <p className="text-ink-faint font-mono text-xs tracking-[0.18em] uppercase">Scroll back up</p>
      <p className="mt-6 max-w-[28ch] text-[clamp(1.75rem,4vw,3.25rem)] leading-[1.05] tracking-[-0.03em]">
        They go home the same way, half a beat quicker.
      </p>
    </section>
  );
}
