import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for foldcard, derived from the live window (I2).
 *
 * Everything is budgeted and the slack lands above the pinned Save, so the
 * screen ends on it with nothing empty beneath (I3). Save is pinned flush to
 * the foot and **does not reserve the indicator's strip**: when the app is not
 * edge-to-edge the system already holds that space, and adding `insets.bottom`
 * here counts it twice (I11).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  return {
    W,
    H,
    insets,
    margin,
    topH: 48,
    gapTop: 20,
    face: { w: W - margin * 2, h: 240 },
    gapFace: 30,
    sectionH: 24,
    gapSection: 16,
    field: { w: W - margin * 2, h: 66, gap: 16, radius: 20 },
    gapFields: 16,
    cta: { h: 62, radius: 24 },
    padBottom: 18,
  };
}
