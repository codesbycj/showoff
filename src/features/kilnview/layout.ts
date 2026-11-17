import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for kilnview, derived from the live window (I2).
 *
 * **The piece is the remainder.** The controls above it and the finish rail
 * below are budgeted, so the screen always ends on the rail with no band
 * under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;
  const headerH = 52;
  const gapHeader = 10;
  const nameH = 56;
  /** The rail is exactly its label plus its swatches: left at 92 it held a
   *  22dp hole under the swatches, which `foot.py` read as 36dp dead (I3). */
  const railH = 78;
  /**
   * **The foot does not reserve the indicator's strip.** When the app is not
   * edge-to-edge the system already holds that space, and padding a pinned
   * surface by `insets.bottom` on top of it counts the strip twice - the
   * defect that put an empty band under four screens of a deleted batch
   * (R1b / I3 / I11).
   */
  const footer = 18;

  const used = insets.top + headerH + gapHeader + nameH + railH + footer;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    stage: { h: Math.max(260, H - used) },
    nameH,
    rail: { h: railH, swatch: 44 },
    footer,
  };
}
