import { useEffect, useRef } from 'react';
import gsap from 'gsap';

import { Figure } from '@/components/Figure';
import { STUDIO } from '@/data/projects';
import { clamp } from '@/lib/damp';
import { DISPLAY, FIGURE, LOAD } from '@/motion/motion';

/**
 * The loading screen: a black wall shoved across a white one.
 *
 * ## One value drives all of it
 *
 * `--wall` is the wall's leading edge, as a percentage of the viewport width.
 * 100% is flush with the right edge (nothing covered); 0% is the wall covering
 * everything; -100% is the wall gone off the left and the page behind it fully
 * revealed. Three things read it and nothing else is animated horizontally:
 *
 *   the wall      translateX(var(--wall))
 *   the figure    left: var(--wall), shifted back by its own width
 *   the counter   100 - wall, rounded
 *
 * That is why the 4px hand-to-wall clearance measured in both reference stills
 * survives every change to the timing: it is a constant in the figure's offset
 * rather than a second animation that has to be kept in step with the first.
 *
 * ## Why a tweened object rather than tweened custom properties
 *
 * GSAP can animate a custom property directly, but then the counter would need
 * its own tween running alongside and the two could drift. Tweening a plain
 * object and writing every dependent value from one `onUpdate` means the
 * counter cannot disagree with the wall it is reporting -- it is computed from
 * it, once a frame.
 */

type Props = {
  /** Fired when the page behind is fully uncovered. */
  onOpened: () => void;
  /** Fired when the wall starts to clear, so the home can begin its cascade. */
  onOpening: () => void;
};

export function Loader({ onOpened, onOpening }: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);

  // Both callbacks are `useCallback`s with no dependencies, so they are stable
  // for the life of the page and listing them here does not rebuild the
  // timeline. Reaching for a ref to dodge the dependency would be the usual
  // move and is wrong twice over: writing one during render is a lint error,
  // and it would hide a genuinely unstable callback rather than surface it.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const ctx = gsap.context(() => {
      const state = { wall: 100, squash: 1, figure: 0, sheet: 0 };

      const apply = () => {
        root.style.setProperty('--wall', `${state.wall}%`);
        root.style.setProperty('--sheet', `${state.sheet}%`);
        root.style.setProperty('--figure-squash', `${state.squash}`);
        root.style.setProperty('--figure-opacity', `${state.figure}`);
        const node = countRef.current;
        if (node) {
          const pct = Math.round(clamp(100 - state.wall, 0, 100));
          node.textContent = String(pct).padStart(3, '0');
        }
      };
      apply();

      const tl = gsap.timeline({ onUpdate: apply });
      const sec = (ms: number) => ms / 1000;

      // The figure walks in from beyond the right edge. The wall is already
      // behind it, flush right, so the screen is still entirely white.
      tl.to(
        state,
        { figure: 1, duration: sec(LOAD.enterMs), ease: LOAD.enterEase },
        sec(LOAD.holdMs),
      );

      // The shoves. Each one is a brace, a drive, and a recovery: the body
      // compresses towards the wall just before it gives, then springs back as
      // the wall runs away from it.
      for (const shove of LOAD.shoves) {
        const at = sec(shove.at);
        const dur = sec(shove.ms);

        tl.to(
          state,
          { squash: 1 - LOAD.braceSquash, duration: dur * 0.3, ease: 'power2.in' },
          at - dur * 0.3,
        );
        tl.to(state, { wall: shove.to * 100, duration: dur, ease: LOAD.shoveEase }, at);
        tl.to(state, { squash: 1, duration: dur * 0.55, ease: 'power3.out' }, at + dur * 0.12);
      }

      // Screen is black. The figure keeps going and fades out with it.
      tl.to(state, { figure: 0, duration: sec(LOAD.exitMs), ease: 'power2.in' }, sec(LOAD.exitAt));

      // The whole sheet carries on left and off the screen, so the wall's
      // *right* edge sweeps the home into view. One gesture start to finish --
      // the wall never stops, never lifts, and is never swapped for a
      // different transition.
      //
      // It has to be the whole sheet rather than the wall alone. Moving just
      // the wall uncovers what is behind it, and what is behind it is this
      // screen's own white ground and red word -- so the sequence ends by
      // revealing the thing it spent five seconds covering up. Taking the
      // ground with it means the only thing underneath is the page.
      tl.to(
        state,
        {
          sheet: -100,
          duration: sec(LOAD.openMs),
          ease: 'power4.out',
          onStart: onOpening,
          onComplete: onOpened,
        },
        sec(LOAD.openAt),
      );
    }, rootRef);

    return () => ctx.revert();
  }, [onOpening, onOpened]);

  const figureH = FIGURE.heightRatio * 100;

  return (
    <div
      ref={rootRef}
      className="loader pointer-events-none fixed inset-0 z-50 overflow-hidden"
      aria-hidden="true"
    >
      {/* The ground the word is printed on. Deliberately white rather than the
          page's #ededed: the loader is a different surface, and the home
          arriving a shade darker is part of the handover. */}
      <div className="absolute inset-0 bg-white" />

      {/* The word. Sized from the reference's own box -- 0.403 of the width and
          0.469 of the height across two lines -- with `min()` so it is driven
          by whichever axis is tighter and cannot overflow a narrow screen. */}
      <div className="absolute inset-0 grid place-items-center" style={{ width: '100%' }}>
        <p
          className="text-red font-display text-center font-bold uppercase"
          style={{
            // A four-letter word of Bodoni at this weight measures ~2.8em
            // across, so dividing the reference's 0.403 width ratio by that
            // gives a block the measured width. The vh term is the same size
            // expressed against the reference's 1.6 aspect, so the two agree
            // there and the smaller one wins on any other shape of screen.
            fontSize: `min(${(DISPLAY.widthRatio / 2.8) * 100}vw, ${(DISPLAY.heightRatio / 2 / 0.88) * 100}vh)`,
            lineHeight: 0.88,
            letterSpacing: '-0.01em',
          }}
        >
          {STUDIO.loadingWord.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </p>
      </div>

      {/* The wall. A full-bleed panel translated by `--wall`, so its leading
          edge is always exactly at that percentage and is always vertical --
          which is what the stills show, sampled top, middle and bottom. */}
      <div className="loader-wall bg-ink absolute inset-0" />

      {/* The figure, welded to the leading edge. */}
      <div
        className="loader-figure absolute"
        style={{
          top: `${FIGURE.centreYRatio * 100}%`,
          height: `${figureH}vh`,
          width: `${figureH * FIGURE.aspect}vh`,
          // -100% puts its right edge on the wall; the measured clearance then
          // backs it off by a hair so the palms read as touching rather than
          // buried.
          transform: `translate(calc(-100% - ${FIGURE.handGapPx}px), -50%)`,
        }}
      >
        <div className="loader-figure-inner h-full w-full">
          <Figure className="h-full w-full" />
        </div>
      </div>

      {/* The counter, at the right edge and vertically centred -- where the
          reference puts its own (a zero-width box at x = width - 16, y = half
          the height). Set vertically, which is what a zero-width box at the
          screen's edge is for. */}
      <span
        ref={countRef}
        className="absolute right-4 top-1/2 font-mono text-[11px] tabular-nums tracking-[0.18em]"
        style={{
          writingMode: 'vertical-rl',
          transform: 'translateY(-50%)',
          /*
           * White through a difference blend, so the counter inverts itself
           * against whatever is behind it: black on the white ground at the
           * start, white once the wall has passed over it.
           *
           * It needs to do that because of where it sits. The wall starts
           * flush with the right edge and travels left, so the counter is on
           * white for a fraction of a second and on black for the rest of the
           * sequence -- a fixed ink colour is invisible for almost the whole
           * time it is counting.
           */
          color: '#ffffff',
          mixBlendMode: 'difference',
        }}
      >
        000
      </span>
    </div>
  );
}
