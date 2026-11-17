import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for kovastats, derived from the live window (I2).
 *
 * The post list is the remainder, so the screen always fills to the dock -
 * the board's own insights screen leaves a third of its height empty under
 * the last row, which is exactly what I3 forbids.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const headerH = 52;
  const gapHeader = 14;

  const titleH = 48;
  const gapTitle = 16;

  const tileW = (W - margin * 2 - 12) / 2;
  const tileH = 102;
  const tilesH = tileH * 2 + 12;
  const gapTiles = 22;

  const sectionH = 28;
  const gapSection = 10;

  const rowH = 84;
  const rowGap = 10;

  const dockH = 66;
  const dockBottom = insets.bottom + 6;

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    titleH,
    gapTitle,
    tile: { w: tileW, h: tileH, radius: 20 },
    tilesH,
    gapTiles,
    sectionH,
    gapSection,
    row: { h: rowH, gap: rowGap, radius: 18 },
    dock: { h: dockH, bottom: dockBottom },
  };
}
