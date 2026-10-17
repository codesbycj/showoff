/**
 * A lead-in, the section, and a lead-out.
 *
 * The two plain sections are not filler. Each card's trigger is offset earlier
 * than the one behind it — the last card's window opens five sixths of a track
 * before the track itself reaches the top of the screen — so without something
 * above the section, the deck would already be half spent on load. The lead-out
 * is there for the opposite reason: the last card's step finishes on the final
 * pixel of the track, and a section that ended there would snap.
 */
import { Stage } from '@/components/Stage';
import { useLenis } from '@/motion/useLenis';
import { useReducedMotion } from '@/motion/useReducedMotion';

export function App() {
  const reduced = useReducedMotion();
  useLenis(!reduced);

  return (
    <main>
      <section className="flex min-h-screen flex-col justify-between px-6 py-10 md:px-12">
        <header className="flex items-baseline justify-between">
          <span className="font-display text-[22px] font-extrabold uppercase tracking-[-0.02em]">
            Onesheet<span className="text-[var(--color-flare)]">.</span>
          </span>
          <span className="text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Campaigns for film &amp; music
          </span>
        </header>

        <h1 className="max-w-[18ch] text-[clamp(40px,7vw,104px)] leading-[0.96] tracking-[-0.03em]">
          We build the campaign, then we{' '}
          <span className="font-script text-[var(--color-flare)]">run it</span>.
        </h1>

        <div className="flex flex-wrap items-end justify-between gap-8">
          <p className="max-w-[40ch] text-[15px] leading-[1.55] text-[var(--color-muted)]">
            A twelve-person shop in Peckham. One team on the strategy, the shoot and the delivery,
            which is why the poster and the thirty-second cut look like the same film.
          </p>
          <p className="shrink-0 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
            Scroll for the services
          </p>
        </div>
      </section>

      <Stage />

      <section className="flex min-h-screen flex-col justify-between px-6 py-10 md:px-12">
        <p className="max-w-[22ch] pt-24 text-[clamp(30px,5vw,68px)] leading-[1.03] tracking-[-0.02em]">
          Got a release date?{' '}
          <span className="font-script text-[var(--color-flare)]">Start here.</span>
        </p>

        <footer className="flex flex-wrap items-end justify-between gap-6 text-[11px] uppercase tracking-[0.18em] text-[var(--color-muted)]">
          <span>Onesheet — a fictional agency</span>
          <span>A motion study, not a client site</span>
        </footer>
      </section>
    </main>
  );
}
