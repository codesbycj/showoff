/**
 * Sizes for a 393dp phone.
 *
 * The ledger rows take their height from what the sheet has left between the
 * Quick Send strip and the dock, so the last row lands on the dock instead of
 * halfway up to it.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 22;
export const PAD_TOP = 6;

export const HEAD_H = 44;
export const ACTION = 58;
export const ACTION_BLOCK = ACTION + 24;
export const PERSON = 52;
export const PERSON_BLOCK = PERSON + 22;
export const SHEET_PAD = 20;
export const SECTION_H = 23;
export const DOCK_H = 58;
export const FAB = 58;

export const GAP_HEAD_LABEL = 16;
export const GAP_BALANCE_ACTIONS = 22;
export const GAP_ACTIONS_SHEET = 20;
export const GAP_SECTION_BODY = 12;
export const GAP_PEOPLE_SECTION = 22;

const ROW_MIN = 64;
const ROW_MAX = 86;

export function useByteHomeLayout(insets: { top: number; bottom: number }, rows: number) {
  const { width, height } = useWindowDimensions();

  const dark =
    insets.top +
    PAD_TOP +
    HEAD_H +
    GAP_HEAD_LABEL +
    19 +
    40 +
    GAP_BALANCE_ACTIONS +
    ACTION_BLOCK +
    GAP_ACTIONS_SHEET;

  const sheetH = height - dark;
  const used =
    SHEET_PAD +
    SECTION_H +
    GAP_SECTION_BODY +
    PERSON_BLOCK +
    GAP_PEOPLE_SECTION +
    SECTION_H +
    GAP_SECTION_BODY +
    DOCK_H +
    FAB / 2 +
    10 +
    insets.bottom;

  const rowH = Math.min(ROW_MAX, Math.max(ROW_MIN, Math.floor((sheetH - used) / rows)));
  return { width, darkH: dark, sheetH, rowH };
}
