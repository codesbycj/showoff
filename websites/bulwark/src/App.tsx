import { useCallback, useRef, useState } from 'react';

import { Chrome } from '@/components/Chrome';
import { IndexColumn } from '@/components/IndexColumn';
import { Loader } from '@/components/Loader';
import { Meta } from '@/components/Meta';
import { Scene } from '@/components/Scene';
import { PROJECTS } from '@/data/projects';
import { useCascade } from '@/motion/useCascade';
import { useReducedMotion } from '@/motion/useReducedMotion';
import { useWheelIndex, wrap } from '@/motion/useWheelIndex';

/**
 * One page, two pieces of motion, and the handover between them.
 *
 * The handover is the part worth reading. The loading screen does not unmount
 * and hand over to a home that then animates in from nothing: the home is
 * mounted and laid out underneath the wall the whole time, and the wall
 * sliding off is what uncovers it. The cascade starts on `onOpening` — the
 * moment the wall begins to clear, not the moment it has finished — so the
 * page is already resolving as it comes into view rather than sitting blank
 * for a beat and then starting.
 *
 * `?skip` jumps straight to the finished home, which is what every capture of
 * the collage wants and what makes the loader bearable to work next to.
 */

function wantsSkip(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).has('skip');
}

export function App() {
  const reduced = useReducedMotion();
  const skip = reduced || wantsSkip();

  const rootRef = useRef<HTMLDivElement>(null);
  const [opening, setOpening] = useState(skip);
  const [loaderDone, setLoaderDone] = useState(skip);

  // Input is live as soon as the wall starts to clear. Waiting for it to
  // finish means a wheel flick during the last second of the reveal is
  // swallowed, which feels like the page has hung.
  //
  // `slot` is unwrapped — it runs negative and past nineteen, because the
  // collage needs to know which way round the loop a plate is. `active` is the
  // project that slot lands on.
  const slot = useWheelIndex(rootRef, PROJECTS.length, opening);
  const active = wrap(slot, PROJECTS.length);
  useCascade(rootRef, opening, skip);

  const onOpening = useCallback(() => setOpening(true), []);
  const onOpened = useCallback(() => setLoaderDone(true), []);

  const project = PROJECTS[active];

  return (
    // `is-cascading` is on from the first painted frame and removed by
    // `useCascade` once the entrance is over. While it is there the stylesheet
    // holds every `.cascade-item` hidden; once it is gone, anything that
    // mounts later is visible by default.
    <div
      ref={rootRef}
      className="bg-paper text-ink is-cascading relative h-dvh w-screen overflow-hidden"
    >
      <main
        className="absolute inset-0"
        aria-label={`HUYML — ${PROJECTS.length} selected projects`}
      >
        <Scene slot={slot} />

        {/*
          The chrome has to carry an explicit stacking context, not just come
          later in the DOM.

          The scene is `preserve-3d`, so its plates are sorted by their own z
          rather than by paint order, and the plate sweeping in at the lower
          left has positive z — it is nearer the camera than the screen is. It
          therefore drew straight over the counter and the index, which is the
          one thing the reference never does: its number sits *on* the image.
        */}
        {/*
          `absolute inset-0`, not `relative`: everything inside positions
          itself against the viewport, and a bare relative wrapper becomes
          their containing block at zero height — which collapses the whole
          layout into the top-left corner.
        */}
        <div className="absolute inset-0 z-10">
          <Chrome active={active} />
          <Meta project={project} />
          <IndexColumn slot={slot} />
        </div>
      </main>

      {/*
        Unmounted once it is off the screen rather than left behind at
        `opacity: 0`: it is a full-viewport fixed layer, and leaving it there
        would sit over the whole page swallowing every pointer event. It is
        `pointer-events-none` as well, but belt and braces costs nothing and a
        stray hit area is invisible until someone cannot click anything.
      */}
      {!loaderDone && !skip && <Loader onOpening={onOpening} onOpened={onOpened} />}
    </div>
  );
}
