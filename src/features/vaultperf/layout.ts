import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for vaultperf, derived from the live window (I2).
 *
 * **The tiles are the remainder.** Everything above them is budgeted and the
 * three tiles share whatever is left, so the screen is full to the bottom edge
 * with no band under it - the board stops after two tiles and leaves a third
 * of the frame empty (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const topH = 48;
  const gapTop = 22;
  const pillH = 44;
  const gapPill = 22;
  const figureH = 74;
  const gapFigure = 6;
  const captionH = 24;
  const gapCaption = 24;
  const tileGap = 14;
  const footerH = 44;
  const padBottom = 18;

  /**
   * **The tiles are a measured height, not `flex: 1`.**
   *
   * Flexed, every tile that arrived resized the three above it, so each step
   * repainted the whole column: 52.1%, 27.1%, 29.2%, 31.1% for what is one
   * tile each. A height worked out from the window fills the screen just the
   * same (I2/I3) and lets a tile land without moving anything.
   */
  const used =
    insets.top +
    topH +
    gapTop +
    pillH +
    gapPill +
    figureH +
    gapFigure +
    captionH +
    gapCaption +
    footerH +
    padBottom;
  const tileH = Math.max(72, (H - used - tileGap * 3) / 4);

  return {
    W,
    H,
    insets,
    margin: 22,
    topH: 48,
    gapTop: 22,
    pillH: 44,
    gapPill: 22,
    figureH: 74,
    gapFigure: 6,
    captionH: 24,
    gapCaption: 24,
    tile: { gap: tileGap, h: tileH, radius: 20 },
    footerH: 44,
    padBottom: 18,
  };
}
