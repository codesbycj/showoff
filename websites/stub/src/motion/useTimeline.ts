/**
 * The one place in the build that writes to the DOM every frame.
 *
 * Progress goes in as a number and comes out as a dozen CSS custom properties
 * set on the stage element. Nothing else subscribes to scroll, and no component
 * re-renders while the section runs — React lays the stage out once and then
 * the properties do the moving. That is also why the components downstream can
 * stay ordinary markup: they name the variable they care about in a `style`
 * prop and never learn that a timeline exists.
 */
import { useEffect, type RefObject } from 'react';
import Lenis from 'lenis';

import {
  BLOB_H,
  BLOB_SCALE,
  BLOB_Y,
  CAPTION_OPACITY,
  DEAL,
  FLIP,
  HEADLINE_BLUR,
  RISE,
  SMOOTHING_EPSILON,
  SMOOTHING_HALFLIFE_MS,
  STAGE_BG,
  TIMELINE_END,
} from '@/motion/motion';
import { sample, sampleColor, settle } from '@/motion/track';

/**
 * Raw progress, 0..1, over the reference's range: from the track's top reaching
 * the bottom of the viewport to the track's bottom leaving the top of it.
 */
function rawProgress(track: HTMLElement): number {
  const vh = window.innerHeight;
  const box = track.getBoundingClientRect();
  const range = box.height + vh;
  if (range <= 0) return 0;
  const travelled = vh - box.top;
  return Math.min(1, Math.max(0, travelled / range));
}

/** Apply the whole timeline at keyframe position `p` (0..TIMELINE_END). */
function paint(stage: HTMLElement, p: number) {
  const s = stage.style;

  s.setProperty('--stage-bg', sampleColor(STAGE_BG, p));
  s.setProperty('--blob-h', `${sample(BLOB_H, p)}vh`);
  s.setProperty('--blob-y', `${sample(BLOB_Y, p)}px`);
  s.setProperty('--blob-scale', `${sample(BLOB_SCALE, p)}`);
  s.setProperty('--headline-blur', `${sample(HEADLINE_BLUR, p)}px`);
  s.setProperty('--caption-opacity', `${sample(CAPTION_OPACITY, p)}`);

  DEAL.lands.forEach((land, i) => {
    s.setProperty('--card-y-' + i, `${settle(RISE, DEAL.liftOff, land, p)}px`);
    s.setProperty('--card-rot-' + i, `${settle(FLIP, DEAL.turnStart, land, p)}deg`);
  });
}

/**
 * Drive the stage from the scroll position of the track.
 *
 * `enabled` is false for a visitor who has asked for reduced motion. The hook
 * then paints the finished frame once and never starts Lenis or the loop at
 * all — the point of that setting is to switch the pinned section off, not to
 * play it faster.
 */
export function useTimeline(
  trackRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  enabled: boolean,
) {
  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    if (!enabled) {
      paint(stage, TIMELINE_END);
      return;
    }

    const lenis = new Lenis({ autoRaf: false });

    // Start wherever the page already is rather than at zero, so a reload
    // partway down the track does not play the whole deal as a catch-up.
    let smoothed = rawProgress(track);
    let last = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      frame = requestAnimationFrame(tick);
      lenis.raf(now);

      const dt = Math.min(now - last, 64); // a backgrounded tab returns a huge dt
      last = now;

      const target = rawProgress(track);
      const gap = target - smoothed;
      if (Math.abs(gap) < SMOOTHING_EPSILON) {
        smoothed = target;
      } else {
        // Frame-rate independent exponential approach: the distance left halves
        // every SMOOTHING_HALFLIFE_MS no matter how often this runs. A plain
        // `gap * 0.1` per frame would make the section noticeably laggier at
        // 120Hz than at 60, which is the kind of thing that only shows up on
        // someone else's machine.
        smoothed += gap * (1 - Math.pow(2, -dt / SMOOTHING_HALFLIFE_MS));
      }

      paint(stage, smoothed * TIMELINE_END);
    };

    paint(stage, smoothed * TIMELINE_END);
    frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, [trackRef, stageRef, enabled]);
}
