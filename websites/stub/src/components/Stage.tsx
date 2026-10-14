/**
 * The pinned section: a tall track with one sticky screen inside it.
 *
 * Every layer lives here for the whole run and none of them is mounted or
 * unmounted as it goes — the beat is a set of continuities between states of
 * one surface, and anything that swapped the surface out would break all of
 * them at once.
 */
import { useRef } from 'react';

import { Backdrop } from '@/components/Backdrop';
import { Headline } from '@/components/Headline';
import { TicketCard } from '@/components/TicketCard';
import { TICKETS } from '@/data/packages';
import { SECTION_VH, STAGE } from '@/motion/motion';
import { useReducedMotion } from '@/motion/useReducedMotion';
import { useStageMetrics } from '@/motion/useStageMetrics';
import { useTimeline } from '@/motion/useTimeline';

export function Stage() {
  const reduced = useReducedMotion();
  const { scale, stacked } = useStageMetrics();
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useTimeline(trackRef, stageRef, !reduced);

  /** Steps in the fanned stack — one fewer than there are tickets. */
  const fan = TICKETS.length - 1;

  return (
    <section
      ref={trackRef}
      aria-label="Packages"
      style={{ height: reduced ? 'auto' : `${SECTION_VH}vh` }}
      className="relative"
    >
      <div
        ref={stageRef}
        className={[
          'stage',
          'overflow-hidden',
          reduced ? 'is-static py-24' : 'sticky top-0 h-screen',
        ]
          .filter(Boolean)
          .join(' ')}
        style={{ backgroundColor: 'var(--stage-bg)' }}
      >
        <Backdrop />
        <Headline />

        <div className="relative z-20 flex h-full flex-col items-center justify-center">
          <p
            className="border-paper text-paper mb-10 rounded-full border px-[22px] py-[12px] font-mono text-[12px] uppercase tracking-[0.1em]"
            style={{ opacity: 'var(--caption-opacity)' }}
          >
            Three ways in
          </p>

          <div
            className={stacked ? 'relative' : 'flex items-start'}
            style={{
              // Perspective and scale on the same element on purpose: scaling an
              // element scales the projection it sets up for its children too,
              // so the flip is the same shape at every size. Splitting them
              // leaves a 2000px eye distance over a shrunken card, and the turn
              // goes flat.
              perspective: STAGE.perspective,
              transform: `scale(${scale})`,
              gap: stacked ? undefined : STAGE.gap,
              width: stacked ? STAGE.cardW + fan * STAGE.stackOffsetX : undefined,
              height: stacked ? STAGE.cardH + fan * STAGE.stackOffsetY : undefined,
            }}
          >
            {TICKETS.map((ticket, i) => (
              <TicketCard key={ticket.code} ticket={ticket} index={i} stacked={stacked} />
            ))}
          </div>

          <p
            className="text-paper mt-10 max-w-[500px] px-6 text-center text-[15px] font-medium leading-[1.4]"
            style={{ opacity: 'var(--caption-opacity)' }}
          >
            <span className="font-serif text-[1.1em] italic">Quality is not a tier.</span>
            <br />
            Whichever ticket you tear, the build is responsive, accessible, fast on a bad
            connection, and yours to keep.
          </p>
        </div>
      </div>
    </section>
  );
}
