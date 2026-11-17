import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for nookroom, derived from the live window (I2).
 *
 * **The photograph is the whole screen.** The controls float on it, so there
 * is no column to budget and no band to leave: the room runs to every edge
 * (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;
  const railH = 92;
  /**
   * **The foot does not reserve the indicator's strip.** When the app is not
   * edge-to-edge the system already holds that space, and padding a pinned
   * surface by `insets.bottom` on top of it counts the strip twice - the
   * defect that put an empty band under four screens of a deleted batch
   * (R1b / I3 / I11).
   */
  const footer = 18;

  return {
    W,
    H,
    insets,
    margin,
    controlH: 52,
    piece: { h: 64, radius: 18 },
    gapPiece: 12,
    rail: { h: railH, w: 104, radius: 14 },
    footer,
  };
}
