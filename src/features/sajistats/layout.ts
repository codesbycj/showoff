/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0`, but nothing inside an expo-router `Stack` ever
 * reads it. So the design's insets are pinned here as a *fallback*, and
 * `use-insets.ts` prefers the device's whenever it reports any.
 */
import { useWindowDimensions } from 'react-native';

/** The status bar, iPhone 14 Pro — which is also what `shoot.js` fakes. */
export const TOP_INSET = 59;

/** Its home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. */
export const MARGIN = 20;

/** The header. */
export const HEADER_TOP = 6;
export const HEADER_BUTTON = 38;
export const HEADER_GAP = 10;

/** The four periods. */
export const TABS_TOP = 18;
export const TABS_HEIGHT = 44;
export const TABS_INSET = 5;

/** The total, centred under them. */
export const TOTAL_TOP = 20;

/** The chart. */
export const CHART_TOP = 10;
export const CHART_HEIGHT = 120;
/** The dot on the live line, and the bubble over it. */
export const MARKER = 11;
export const BUBBLE_HEIGHT = 26;
export const BUBBLE_GAP = 10;

/** The sheet at the foot. */
export const SHEET_TOP = 16;
export const SHEET_PAD = 18;
export const GRABBER_W = 44;
export const GRABBER_H = 4;
export const ROW_HEIGHT = 54;
export const ROW_MARK = 34;

/**
 * The chart's own plot, sized off the window.
 *
 * The two lines are generated from a fixed set of normalised points, so the
 * curve keeps its shape at any width rather than stretching one hump and
 * squashing the next.
 */
export function useChart() {
  const { width } = useWindowDimensions();
  return { width: width - MARGIN * 2, height: CHART_HEIGHT };
}
