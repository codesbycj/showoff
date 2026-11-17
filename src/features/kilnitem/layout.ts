import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for kilnitem, derived from the live window (I2).
 *
 * **The photograph is the remainder.** The thumbnail rail, the provenance and
 * the pinned bar are budgeted, so the screen always ends on the bar with no
 * band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;
  const railH = 76;
  const bodyH = 68;
  /** A pinned, full-width bar is its own height and nothing more (I11). */
  const barH = 62;

  const shipH = 26;
  const used = railH + bodyH + shipH + barH;

  return {
    W,
    H,
    insets,
    margin,
    hero: { h: Math.max(320, H - used) },
    rail: { h: railH, w: 84 },
    bodyH,
    shipH,
    bar: { h: barH },
  };
}
