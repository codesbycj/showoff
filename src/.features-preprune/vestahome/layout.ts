import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for vestahome, derived from the live window (I2).
 *
 * **The product grid is the block that continues.** The board crops its grid at
 * the dock, so this screen genuinely scrolls — R6's "a list or a sheet that
 * genuinely continues". Every block above the grid is sized, the cards are
 * sized from the column width, and the content runs past the fold rather than
 * stretching to meet it (I3: never a spacer, never padding).
 *
 * The card photo is 4:5, which is what a clothes photograph wants; deriving it
 * from the column width is what keeps that true at other screen sizes.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;
  const gutter = 12;
  const col = (W - margin * 2 - gutter) / 2;

  const headerH = 44;
  const gapHeader = 12;
  const searchH = 48;
  const gapSearch = 16;
  const promoH = 152;
  const gapPromo = 16;
  const chipsH = 38;
  const gapChips = 16;
  const sectionH = 26;
  const gapSection = 12;

  const photoH = Math.round(col * 1.24);
  const metaH = 62;
  const cardH = photoH + 8 + metaH;

  const dockH = 62;
  const dockLift = 10;

  return {
    W,
    H,
    insets,
    margin,
    gutter,
    col,
    headerH,
    gapHeader,
    /** The greeting pill and the bag button. */
    pill: { h: 40, avatar: 28 },
    control: 40,
    searchH,
    gapSearch,
    promo: { h: promoH, radius: 18, photoW: Math.round(W * 0.42), cta: 34 },
    gapPromo,
    chips: { h: chipsH, radius: 19 },
    gapChips,
    sectionH,
    gapSection,
    card: { h: cardH, photoH, metaH, radius: 14, heart: 28 },
    /** The dock floats over the grid, as the board draws it. */
    dock: { h: dockH, lift: dockLift, item: 44, radius: 31 },
    /** The scroller ends clear of the floating dock. */
    scrollPad: dockH + dockLift + insets.bottom + 8,
  };
}
