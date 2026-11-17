import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for lumoprofile, derived from the live window (I2).
 *
 * The grid is the remainder and its content is taller than that, so the last
 * row is cropped by the dock exactly as the board crops it - which is what
 * keeps the foot closed (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const headerH = 96;
  const gapHeader = 14;

  const statsH = 72;
  const gapStats = 14;

  const bioH = 68;
  const gapBio = 12;

  const tabsH = 48;
  const gapTabs = 10;

  const cell = (W - margin * 2 - 8) / 3;

  const dockH = 66;
  const dockBottom = 0;
  /**
   * **A pinned, full-width bar does not reserve the indicator's strip.** R1b:
   * when the app is not edge-to-edge the system already holds that space, so a
   * bar padded by `insets.bottom` as well counts it twice - and what it looks
   * like is not a gap under the bar but a bar with 34dp of dead height inside
   * it, below its own labels. The bar is flush to the frame and its ink is
   * centred in its own band, which `dockcheck.js` measures as `under` (I11).
   */

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    statsH,
    gapStats,
    bioH,
    gapBio,
    tabsH,
    gapTabs,
    cell,
    dock: { h: dockH, bottom: dockBottom },
  };
}
