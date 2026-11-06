/**
 * Sizes for a 393dp phone.
 *
 * The sheet's height is the sum of what is in it, and the photograph gets
 * everything else. Doing it that way round — rather than giving the hero a
 * percentage and hoping — is what guarantees the "Book now" row sits on the
 * safe area at any phone height.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 20;
export const SHEET_PAD = 16;
export const HANDLE = 14;
export const TITLE_H = 28;
export const LINK_H = 20;
export const AMENITY_H = 74;
export const CTA_H = 56;
export const DISC = 44;
export const THUMB = 58;

export const GAP_TITLE_LINK = 6;
export const GAP_LINK_AMENITY = 16;
export const GAP_AMENITY_DESC = 14;
export const GAP_DESC_CTA = 16;

export function useStayLayout(insets: { top: number; bottom: number }, descLines: number) {
  const { width, height } = useWindowDimensions();

  const sheetH =
    SHEET_PAD +
    HANDLE +
    TITLE_H +
    GAP_TITLE_LINK +
    LINK_H +
    GAP_LINK_AMENITY +
    AMENITY_H +
    GAP_AMENITY_DESC +
    descLines * 21 +
    GAP_DESC_CTA +
    CTA_H +
    insets.bottom +
    12;

  return {
    width,
    sheetH,
    /** The sheet is pulled up over the photograph by its own corner radius. */
    heroH: height - sheetH + 28,
    amenityW: Math.floor((width - MARGIN * 2 - 24) / 4),
  };
}
