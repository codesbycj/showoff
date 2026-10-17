import { useEffect, useState, type RefObject } from 'react';
import gsap from 'gsap';

import { clamp, damp } from '@/lib/damp';
import { SCROLL } from '@/motion/motion';

/**
 * The home's only input.
 *
 * The reference's home does not scroll — its `scrollHeight` is exactly one
 * viewport and the hero is a full-bleed canvas — so position comes from wheel
 * events, accumulated and smoothed by its own inline snippet:
 *
 *   target  += clamp(deltaY, -240, 240) * 1.15     per event   (read)
 *   current += (target - current) * 0.075          per frame   (read)
 *
 * all of which is in a plain `<script>` at the foot of the page rather than in
 * the compiled bundle. See `motion.ts` for why that matters.
 *
 * Three departures, all deliberate:
 *
 * - **The easing is time-corrected.** `0.075` per frame is a 60Hz constant;
 *   `lib/damp.ts` converts it to the 148ms half-life it encodes.
 *
 * - **`UNITS_PER_ENTRY` is invented.** The reference's gain feeds a WebGL scene
 *   in its own units and nothing says how many of those make one project.
 *   Isolated to one constant so it can be tuned without touching anything read.
 *
 * - **The list wraps.** The reference's index is circular — with FROMANOTHER
 *   centred it shows CMS indices 1, 0, 18, 17, 16 down the column, which runs
 *   past zero and keeps going. So position is unbounded and the project at any
 *   point is `index mod count`.
 *
 * Position is published as CSS custom properties rather than React state:
 * `--pos` is written to the root once a frame and every moving part is a
 * `calc()` off it. Only `active` is state, and it changes a handful of times a
 * session. Returning position as state would re-render nineteen plates sixty
 * times a second to move one transform.
 */

/**
 * Wheel units per project — the one number here that is invented, because the
 * reference's gain feeds a WebGL scene in its own units and nothing says how
 * many of those make one project.
 *
 * It is not a free choice, though: it is pinned by the one timing that *was*
 * read. An entry's focus fades over `450ms`, so if a project goes by faster
 * than that, no entry ever finishes arriving — every one is caught mid-fade at
 * a fraction of its opacity and the index column reads as empty while you
 * scroll. At 300 a single clamped notch moved 0.77 of a project and that is
 * exactly what happened.
 *
 * At 900, one clamped notch (240 * 1.15 = 276 units) moves 0.31 of a project,
 * so three notches advance one and each gets comfortably longer than the fade
 * it has to complete.
 */
const UNITS_PER_ENTRY = 900;

/** How long the wheel has to be quiet before the snap starts. **read** */
const IDLE_MS = 140;

/** The snap itself. **read** */
const SNAP = { sec: 1, ease: 'power3.out' };

/**
 * Touch drag is in pixels; this brings it into the same units as a wheel.
 * Three units per pixel, so a drag the height of the screen advances about
 * three projects — the same rate a wheel moves them at.
 */
const TOUCH_GAIN = 3;

/** Positive modulo — JS `%` keeps the sign of the dividend, which wrapping cannot use. */
export const wrap = (n: number, m: number): number => ((n % m) + m) % m;

/**
 * Returns the **unwrapped** slot nearest the centre — an integer that runs
 * negative and past `count`. Callers take `wrap(slot, count)` to get a project.
 */
export function useWheelIndex(
  root: RefObject<HTMLElement | null>,
  count: number,
  enabled: boolean,
): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = root.current;
    if (!el) return;

    el.style.setProperty('--pos', '0');
    if (!enabled) return;

    const m = { target: 0, current: 0, lastT: 0 };
    let snap: gsap.core.Tween | null = null;
    let idle: number | undefined;
    let raf = 0;
    let shownActive = 0;

    const snapTo = (entry: number) => {
      snap?.kill();
      snap = gsap.to(m, {
        target: entry * UNITS_PER_ENTRY,
        duration: SNAP.sec,
        ease: SNAP.ease,
        overwrite: true,
      });
    };

    const scheduleSnap = () => {
      window.clearTimeout(idle);
      idle = window.setTimeout(() => snapTo(Math.round(m.target / UNITS_PER_ENTRY)), IDLE_MS);
    };

    const push = (delta: number) => {
      snap?.kill();
      // Clamped per event, not per frame. One notch of a real mouse wheel can
      // report several hundred pixels, and without this a single flick throws
      // the scene across three projects.
      m.target += clamp(delta, -SCROLL.maxDelta, SCROLL.maxDelta) * SCROLL.wheelMultiplier;
      scheduleSnap();
    };

    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      push(e.deltaY);
    };

    let touchY: number | null = null;
    const onTouchStart = (e: TouchEvent) => {
      touchY = e.touches[0]?.clientY ?? null;
      snap?.kill();
    };
    const onTouchMove = (e: TouchEvent) => {
      const y = e.touches[0]?.clientY;
      if (y == null || touchY == null) return;
      push((touchY - y) * TOUCH_GAIN);
      touchY = y;
    };
    const onTouchEnd = () => {
      touchY = null;
      scheduleSnap();
    };

    // A collage reachable only by wheel is one some people cannot reach at all.
    const onKey = (e: KeyboardEvent) => {
      const here = Math.round(m.target / UNITS_PER_ENTRY);
      const go = (to: number) => {
        e.preventDefault();
        window.clearTimeout(idle);
        snapTo(to);
      };
      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === 'ArrowRight') go(here + 1);
      else if (e.key === 'ArrowUp' || e.key === 'PageUp' || e.key === 'ArrowLeft') go(here - 1);
      else if (e.key === 'Home') go(0);
    };

    const tick = (t: number) => {
      raf = requestAnimationFrame(tick);
      const dt = (t - (m.lastT || t)) / 1000;
      m.lastT = t;

      m.current = damp(m.current, m.target, SCROLL.easingAt60, dt);
      if (Math.abs(m.target - m.current) < SCROLL.stopThreshold) m.current = m.target;

      const position = m.current / UNITS_PER_ENTRY;
      el.style.setProperty('--pos', position.toFixed(4));

      // The *unwrapped* slot. The scene needs it unwrapped so a plate's
      // `--i` can stay on the same side of `--pos` as it travels; wrapping
      // here would make the plate at index 0 jump the full length of the
      // diagonal every time the list passed the end.
      const next = Math.round(position);
      if (next !== shownActive) {
        shownActive = next;
        setActive(next);
      }
    };

    raf = requestAnimationFrame(tick);
    window.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    window.addEventListener('keydown', onKey);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(idle);
      snap?.kill();
      window.removeEventListener('wheel', onWheel);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('keydown', onKey);
    };
  }, [root, count, enabled]);

  return active;
}
