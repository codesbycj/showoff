import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for hushstart, derived from the live window (I2).
 *
 * The photograph is full bleed, so there is nothing to leave empty: the copy
 * and the pill sit in the bottom of the frame and the screen ends on the pill
 * (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  return {
    W,
    H,
    insets,
    margin: 24,
    topH: 44,
    dotsH: 16,
    gapDots: 18,
    displayH: 80,
    gapDisplay: 12,
    bodyH: 58,
    gapBody: 18,
    moodH: 34,
    gapMoods: 20,
    cta: { h: 58, radius: 29 },
    padBottom: 24,
  };
}
