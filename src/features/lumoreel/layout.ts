import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for lumoreel, derived from the live window (I2).
 *
 * The reel is full-bleed: the photograph IS the page, and every control sits
 * over it. There is nothing to leave a band at the foot (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const headerH = 48;
  const railGap = 24;
  const captionH = 108;

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
    railGap,
    captionH,
    dock: { h: dockH, bottom: dockBottom },
  };
}
