/**
 * Sizes for a 393dp phone.
 *
 * The chart takes what is left between the headline figure and the Overview
 * list, and the list's rows take what is left between the chart and the
 * dock. Both are computed rather than chosen, which is what puts the last
 * category on the dock at any phone height.
 */
import { useWindowDimensions } from 'react-native';

export const MARGIN = 22;
export const PAD_TOP = 6;

export const HEAD_H = 44;
export const SEG_H = 52;
export const TOTAL_H = 36;
export const PERIOD_H = 44;
export const SECTION_H = 23;
export const DOCK_H = 58;
export const FAB = 58;

export const GAP_HEAD_SEG = 16;
export const GAP_SEG_TOTAL = 22;
export const GAP_TOTAL_CHART = 18;
export const GAP_CHART_SECTION = 18;
export const GAP_SECTION_ROWS = 10;

const ROW_MIN = 58;
const ROW_MAX = 76;
const CHART_MIN = 180;

export function useActivityLayout(insets: { top: number; bottom: number }, rows: number) {
  const { width, height } = useWindowDimensions();

  const above =
    insets.top +
    PAD_TOP +
    HEAD_H +
    GAP_HEAD_SEG +
    SEG_H +
    GAP_SEG_TOTAL +
    19 +
    TOTAL_H +
    GAP_TOTAL_CHART;
  const below =
    GAP_CHART_SECTION + SECTION_H + GAP_SECTION_ROWS + DOCK_H + FAB / 2 + 10 + insets.bottom;

  const free = height - above - below;
  const rowH = Math.min(ROW_MAX, Math.max(ROW_MIN, Math.floor((free * 0.46) / rows)));
  const chartH = Math.max(CHART_MIN, free - rowH * rows);

  return { width, chartW: width - MARGIN * 2, chartH, rowH };
}
