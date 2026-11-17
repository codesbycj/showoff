import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for orlafind, derived from the live window (I2).
 *
 * **The card carousel is the remainder.** The wordmark and the display above
 * it are budgeted, and the cards grow into what is left, so the screen always
 * ends on the rail with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 24;
  const headerH = 52;
  const gapHeader = 14;
  const displayH = 100;
  const countH = 26;
  const gapDisplay = 18;
  const chipH = 44;
  const gapChips = 18;
  /**
   * **The foot does not reserve the indicator's strip.** When the app is not
   * edge-to-edge the system already holds that space, and padding a pinned
   * surface by `insets.bottom` on top of it counts the strip twice - the
   * defect that put an empty band under four screens of a deleted batch
   * (R1b / I3 / I11).
   */
  const footer = 20;

  const used = insets.top + headerH + gapHeader + displayH + gapDisplay + chipH + gapChips + footer;

  return {
    countH,
    chipH,
    gapChips,
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    displayH,
    gapDisplay,
    card: { w: W - margin * 2 - 36, h: Math.max(320, H - used), radius: 26 },
    footer,
  };
}
