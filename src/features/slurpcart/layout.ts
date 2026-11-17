import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for slurpcart, derived from the live window (I2).
 *
 * Everything is budgeted and the slack lands above the pinned button, so the
 * screen ends on it with nothing empty beneath (I3). The button is pinned
 * flush to the foot and **does not reserve the indicator's strip**: when the
 * app is not edge-to-edge the system already holds that space, and adding
 * `insets.bottom` here counts it twice (I11).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  return {
    W,
    H,
    insets,
    margin: 20,
    topH: 48,
    gapTop: 18,
    line: { h: 108, image: 84, radius: 18, gap: 12, step: 44 },
    gapLines: 20,
    promo: { h: 52, radius: 16 },
    gapPromo: 22,
    sectionH: 24,
    gapSection: 12,
    rowH: 28,
    dividerH: 18,
    totalH: 34,
    cta: { h: 58, radius: 29 },
    padBottom: 16,
  };
}
