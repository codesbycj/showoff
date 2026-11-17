import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for vestabrowse, derived from the live window (I2).
 *
 * **The product grid is the block that continues.** The board crops its grid at
 * the dock, so this screen genuinely scrolls — R6's "a list or a sheet that
 * genuinely continues". Every block above the grid is sized, the cards are
 * sized from the column width, and the content runs past the fold rather than
 * stretching to meet it (I3: never a spacer, never padding).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;
  const gutter = 12;
  const col = (W - margin * 2 - gutter) / 2;

  const searchH = 48;
  const gapSearch = 16;
  const chipsH = 38;
  const gapChips = 14;
  const resultsH = 30;
  const gapResults = 10;
  const sectionH = 26;
  const gapSection = 12;

  const photoH = Math.round(col * 1.24);
  const metaH = 62;

  const dockH = 62;
  const dockLift = 10;

  return {
    W,
    H,
    insets,
    margin,
    gutter,
    col,
    searchH,
    gapSearch,
    chips: { h: chipsH, radius: 19 },
    gapChips,
    resultsH,
    gapResults,
    sectionH,
    gapSection,
    card: { h: photoH + 8 + metaH, photoH, metaH, radius: 14, heart: 28 },
    dock: { h: dockH, lift: dockLift, item: 44, radius: 31 },
    /** The scroller ends clear of the floating dock. */
    scrollPad: dockH + dockLift + insets.bottom + 8,
  };
}
