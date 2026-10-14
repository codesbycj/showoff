/**
 * Fitting the stage to the window without touching the motion.
 *
 * The cards, the gap between them, the 860px they rise through and the 2000px
 * of perspective they turn under are all measurements off one 1512x950 frame,
 * and they only agree with each other at that size. So the stage is laid out at
 * those numbers and scaled as a single unit, rather than being reflowed — zoom
 * a space and everything in it stays in proportion, reflow it and the rise
 * distance has to be re-derived per breakpoint, which is the fixed-offset trap.
 *
 * The one thing that does change shape is how many cards sit side by side, and
 * that is the reference's own breakpoint behaviour rather than an invention.
 */
import { useEffect, useState } from 'react';

import { STACK_BELOW, STAGE } from '@/motion/motion';

export type StageMetrics = {
  /** Uniform scale applied to the stage's design-pixel layout. */
  scale: number;
  /** True once the three-across row no longer fits and the cards share a box. */
  stacked: boolean;
};

function measure(): StageMetrics {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const stacked = w < STACK_BELOW;

  const needW = stacked
    ? STAGE.cardW + STAGE.stackOffsetX * 2 + STAGE.stackGutter * 2
    : STAGE.rowW + STAGE.gutter * 2;

  // Never scale up. At 1512x950 this lands on exactly 1, which is the frame
  // every number in motion.ts was read off.
  const scale = Math.min(1, w / needW, h / STAGE.columnH);

  return { scale, stacked };
}

/** Re-measured on resize only; nothing here runs per frame. */
export function useStageMetrics(): StageMetrics {
  const [metrics, setMetrics] = useState<StageMetrics>(() =>
    typeof window === 'undefined' ? { scale: 1, stacked: false } : measure(),
  );

  useEffect(() => {
    const onResize = () => setMetrics(measure());
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return metrics;
}
