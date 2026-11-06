/**
 * Sizes for a 393dp phone.
 *
 * As on the other Clove screens, the one computed number is what the list at
 * the foot gets: the categories divide whatever is left between the chart and
 * the dock, so the last row lands on the dock instead of halfway up to it.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 22;
export const PAD_TOP = 8;

export const TITLE_H = 26;
export const GAP_TITLE_CARD = 18;
export const SPEND_CARD_H = 112;
export const GAP_CARD_EXPENSE = 24;
export const GAP_EXPENSE_CHART = 16;
export const CHART_H = 168;
export const AXIS_H = 20;
export const GAP_CHART_RULE = 16;
export const DOCK_H = 58;
export const PERIOD_H = 44;

const ROW_MIN = 46;
const ROW_MAX = 62;

export function useCloveStatsLayout(insets: { top: number; bottom: number }, rows: number) {
  const { width, height } = useWindowDimensions();

  const above =
    insets.top +
    PAD_TOP +
    TITLE_H +
    GAP_TITLE_CARD +
    SPEND_CARD_H +
    GAP_CARD_EXPENSE +
    20 + // "Expense"
    39 + // the figure
    GAP_EXPENSE_CHART +
    CHART_H +
    AXIS_H +
    GAP_CHART_RULE +
    1; // the hairline

  const left = height - above - (DOCK_H + insets.bottom);
  const rowH = Math.min(ROW_MAX, Math.max(ROW_MIN, Math.floor(left / rows)));

  return {
    width,
    rowH,
    chartW: width - MARGIN * 2,
    chartH: CHART_H,
  };
}
