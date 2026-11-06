/**
 * Sizes for a 393dp phone.
 *
 * The sheet runs from the category tiles to the bottom edge, and the stay
 * photograph inside it takes whatever height is left once the price row, the
 * button and the dock are paid for. That is what keeps the card big on a tall
 * phone instead of leaving a band of white under the button.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 20;
export const PAD_TOP = 6;

export const AVATAR = 44;
export const FIELD_H = 54;
export const FILTER = 42;
export const TILE_H = 146;
export const SHEET_PAD = 20;
export const CTA_H = 56;
export const DOCK_H = 58;

export const GAP_TOP_FIELD = 16;
export const GAP_FIELD_TILES = 14;
export const GAP_TILES_SHEET = 16;
export const GAP_SECTION_CARD = 14;
export const GAP_CARD_PRICE = 14;
export const GAP_PRICE_CTA = 16;
export const GAP_CTA_DOCK = 10;

export function useWanderLayout(insets: { top: number; bottom: number }) {
  const { width, height } = useWindowDimensions();

  const aboveSheet =
    insets.top +
    PAD_TOP +
    AVATAR +
    GAP_TOP_FIELD +
    FIELD_H +
    GAP_FIELD_TILES +
    TILE_H +
    GAP_TILES_SHEET;

  const sheetH = height - aboveSheet;
  const inSheet =
    SHEET_PAD +
    26 + // "Trending stays"
    GAP_SECTION_CARD +
    GAP_CARD_PRICE +
    28 + // the price row
    GAP_PRICE_CTA +
    CTA_H +
    GAP_CTA_DOCK +
    DOCK_H +
    insets.bottom;

  return {
    width,
    sheetH,
    tileW: Math.floor((width - MARGIN * 2 - 16) / 3),
    /** Whatever the sheet has left over goes to the photograph. */
    cardH: Math.max(170, sheetH - inSheet),
  };
}
