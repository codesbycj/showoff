import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for cocoacart, derived from the live window (I2).
 *
 * **The dark sheet is the remainder.** The title above it is budgeted and the
 * sheet takes the rest of the screen, so the foot is the sheet's own edge and
 * there is no band to leave (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;
  const headerH = 62;
  const gapHeader = 14;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    sheet: { radius: 30, pad: 18 },
    line: { h: 72, thumb: 48, radius: 16 },
    totals: { h: 104, radius: 20 },
    cta: { h: 58, radius: 29 },
    /**
     * **The foot does not reserve the indicator's strip.** When the app is not
     * edge-to-edge the system already holds that space, and padding a pinned
     * surface by `insets.bottom` on top of it counts the strip twice - the
     * defect that put an empty band under four screens of a deleted batch
     * (R1b / I3 / I11).
     */
    footer: 18,
  };
}
