import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for stridehome, derived from the live window (I2).
 *
 * The week card is cropped by the dock exactly as the board crops it, which is
 * what keeps the foot closed (I3) — the content is taller than the frame, so
 * there is no slack for a scroller to collect into a hole.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const headerH = 92;
  const gapHeader = 16;

  const ringSize = 118;
  const readinessH = 240;
  const gapCard = 14;

  const focusH = 196;
  const weekH = 170;

  const dockH = 70;
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
    readiness: { h: readinessH, radius: 22, ring: ringSize },
    gapCard,
    focus: { h: focusH, radius: 22 },
    week: { h: weekH, radius: 22 },
    dock: { h: dockH, bottom: dockBottom },
  };
}
