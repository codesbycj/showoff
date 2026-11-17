import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for vaultassets, derived from the live window (I2).
 *
 * **The rows are the remainder.** Everything above them is budgeted and the
 * five rows share whatever is left, so the screen is full to the bottom edge
 * with no band under it (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const topH = 48;
  const gapTop = 14;
  const tabH = 44;
  const gapTabs = 18;
  const figureH = 64;
  const gapFigure = 2;
  const captionH = 24;
  const gapCaption = 20;
  const rowGap = 12;
  const footerH = 44;
  const padBottom = 18;

  /**
   * **The rows are a measured height, not `flex: 1`.**
   *
   * Flexed, every row that arrived resized the four above it, so each step
   * repainted the whole column instead of one row. A height worked out from
   * the window fills the screen just the same (I2/I3).
   */
  const used =
    insets.top +
    topH +
    gapTop +
    tabH +
    gapTabs +
    figureH +
    gapFigure +
    captionH +
    gapCaption +
    footerH +
    padBottom;
  const rowH = Math.max(64, (H - used - rowGap * 4) / 5);

  return {
    W,
    H,
    insets,
    margin: 22,
    topH: 48,
    gapTop: 14,
    tabH: 44,
    gapTabs: 18,
    figureH: 64,
    gapFigure: 2,
    captionH: 24,
    gapCaption: 20,
    row: { gap: rowGap, h: rowH, radius: 18 },
    footerH: 44,
    padBottom: 18,
  };
}
