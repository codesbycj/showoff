import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for hushmix, derived from the live window (I2).
 *
 * **The five cards share the remainder.** Everything around them is budgeted
 * and the stack grows into what is left, so the screen is full to the bottom
 * edge with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 16;

  const topH = 48;
  const gapTop = 10;
  const cardGap = 10;
  const gapStack = 14;
  const ctaH = 56;
  const padBottom = 18;

  /**
   * **A measured height, not `flex: 1`.** Flexed, every card that arrived
   * resized the four above it, so one card landing repainted three quarters of
   * the frame (75.7%). The height comes from the window, so the stack still
   * fills what is left (I2 / I3).
   */
  const used = insets.top + topH + gapTop + gapStack + ctaH + padBottom + cardGap * 4;
  const cardH = Math.max(72, (H - used) / 5);

  return {
    W,
    H,
    insets,
    margin,
    topH: 48,
    gapTop: 10,
    card: { radius: 18, gap: cardGap, h: cardH, width: W - margin * 2 },
    gapStack: 14,
    cta: { h: 56, radius: 28 },
    padBottom: 18,
  };
}
