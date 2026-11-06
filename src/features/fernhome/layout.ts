/**
 * Sizes for a 393dp phone.
 *
 * The promo card takes what the sheet has left once Quick Send and the dock
 * are paid for, so the sheet is full at any phone height.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 20;
export const PAD_TOP = 10;

export const AVATAR = 52;
export const HEAD_H = 56;
export const ACTION = 86;
export const PERSON = 54;
export const SHEET_PAD = 16;
export const SECTION_H = 23;
export const DOCK_H = 58;

export const GAP_HEAD_LABEL = 34;
export const GAP_BALANCE_CHIPS = 24;
export const CHIP_H = 44;
export const GAP_CHIPS_ACTIONS = 30;
export const GAP_ACTIONS_SHEET = 28;
export const GAP_PROMO_SECTION = 18;
export const GAP_SECTION_PEOPLE = 12;

export function useFernHomeLayout(insets: { top: number; bottom: number }) {
  const { width, height } = useWindowDimensions();

  const dark =
    insets.top +
    PAD_TOP +
    HEAD_H +
    GAP_HEAD_LABEL +
    19 +
    50 +
    GAP_BALANCE_CHIPS +
    CHIP_H +
    GAP_CHIPS_ACTIONS +
    ACTION +
    GAP_ACTIONS_SHEET;

  const sheetH = height - dark;
  const used =
    SHEET_PAD +
    GAP_PROMO_SECTION +
    SECTION_H +
    GAP_SECTION_PEOPLE +
    (PERSON + 22) +
    DOCK_H +
    insets.bottom +
    10;

  return {
    width,
    sheetH,
    // Capped: given the whole remainder the promo grew to 290dp and sat
    // with its content marooned in the middle of a green field. A card is
    // allowed to be the size it needs; the screen's spare height belongs to
    // the header, which is where the reference puts it.
    // Never clamped up past what the sheet has: at 130 on a sheet with
    // less than that left, the dock went off the bottom of the screen.
    promoH: Math.min(176, sheetH - used),
    actionW: Math.floor((width - MARGIN * 2 - 30) / 4),
  };
}
