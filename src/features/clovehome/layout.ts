/**
 * Sizes for a 393dp phone.
 *
 * The one number that is computed rather than chosen is the activity row's
 * height: the sheet runs from the actions to the dock, and whatever is left
 * over is divided between the rows it holds. That is what stops a list of
 * three ending two thirds of the way down the sheet with a band of nothing
 * under it — the defect the whole design bar exists for.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 22;
export const PAD_TOP = 8;

export const GREET_SUB_GAP = 2;
export const GAP_GREET_BALANCE = 26;
export const GAP_BALANCE_CARDS = 22;
export const GAP_CARDS_ACTIONS = 22;
export const GAP_ACTIONS_SHEET = 22;

export const CARD_W = 104;
export const CARD_H = 58;
export const ADD_SIZE = 52;
export const ACTION_H = 56;
export const AVATAR = 44;
export const DOCK_H = 58;
export const BELL = 26;

export const SHEET_PAD = 20;
export const SHEET_HEAD = 22;
export const GAP_HEAD_ROWS = 14;

/** Row heights that keep the list honest at other screen heights. */
const ROW_MIN = 62;
const ROW_MAX = 78;

export function useCloveHomeLayout(insets: { top: number; bottom: number }, rows: number) {
  const { width, height } = useWindowDimensions();

  const aboveSheet =
    insets.top +
    PAD_TOP +
    29 + // greeting line
    GREET_SUB_GAP +
    19 + // "Welcome Back!"
    GAP_GREET_BALANCE +
    19 + // "Wallet Balance"
    45 + // the figure
    GAP_BALANCE_CARDS +
    CARD_H +
    GAP_CARDS_ACTIONS +
    ACTION_H +
    GAP_ACTIONS_SHEET;

  const dock = DOCK_H + insets.bottom;
  const sheetH = Math.max(240, height - aboveSheet - dock);
  const forRows = sheetH - SHEET_PAD - SHEET_HEAD - GAP_HEAD_ROWS - 10;
  const rowH = Math.min(ROW_MAX, Math.max(ROW_MIN, Math.floor(forRows / rows)));

  return { width, sheetH, rowH, thumbW: CARD_W, thumbH: CARD_H };
}
