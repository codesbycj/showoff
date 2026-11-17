import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for nordsearch, derived from the live window (I2).
 *
 * The screen is a sheet over the dark discover screen, so the only fixed band
 * is the strip of dark above it; everything below is the sheet, and the
 * results list takes the remainder. That is what keeps the foot honest (I3) —
 * the list runs off the bottom edge rather than stopping short of it.
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  /** The dark strip the sheet is pulled down over. */
  const sheetTop = insets.top - 14;

  const handleH = 22;
  const headerH = 48;
  const gapHeader = 14;

  const queryH = 62;
  const gapQuery = 16;

  const chipH = 44;
  const gapChips = 18;

  const cardW = W - margin * 2;
  const cardPhotoH = Math.round(cardW * 0.62);
  const cardTextH = 84;
  const cardGap = 16;

  return {
    W,
    H,
    insets,
    margin,
    sheetTop,
    sheet: { radius: 28 },
    handleH,
    headerH,
    gapHeader,
    query: { h: queryH, radius: 31 },
    gapQuery,
    chip: { h: chipH, radius: 22 },
    gapChips,
    card: { w: cardW, photoH: cardPhotoH, textH: cardTextH, radius: 20 },
    cardGap,
  };
}
