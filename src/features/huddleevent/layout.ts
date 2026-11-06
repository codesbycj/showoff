/**
 * Sizes for a 393dp phone.
 *
 * The hero is a fraction of the window rather than a constant, so the
 * photograph keeps its share of the screen on a short phone instead of eating
 * the sheet. Everything below it is fixed and the sheet runs to the footer.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 20;
export const SHEET_PAD = 20;
export const INFO_ROW = 62;
export const CTA_H = 54;
export const FOOTER_PAD = 12;
export const BACK = 44;
export const STACK = 26;

export const GAP_INFO_ABOUT = 22;
export const GAP_ABOUT_BODY = 10;
export const GAP_BODY_GOING = 18;

export function useEventLayout() {
  const { width, height } = useWindowDimensions();
  return {
    width,
    /** 49% of the frame, which is what the reference gives the photograph. */
    heroH: Math.round(height * 0.49),
    footerH: CTA_H + FOOTER_PAD * 2,
  };
}
