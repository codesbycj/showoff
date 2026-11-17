import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for slurppay, derived from the live window (I2).
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
    method: { rowH: 64, radius: 20 },
    gapMethods: 14,
    add: { h: 50, radius: 25 },
    gapAdd: 26,
    sectionH: 22,
    gapSection: 10,
    addressH: 64,
    gapAddress: 26,
    rowH: 28,
    dividerH: 18,
    totalH: 34,
    cta: { h: 58, radius: 29 },
    padBottom: 16,
  };
}
