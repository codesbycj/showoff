/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the reference board. It is a posed design shot
 * (AGENTS.md, "Three kinds of reference"), so these are the numbers that are
 * right for a real screen: a 20dp page margin, 36dp round header buttons, a
 * 40dp segmented bar, a donut sized off the window, 56dp dock.
 *
 * Widths are never pinned. The segmented control, the legend, the insight card
 * and the trend chart all take what the margins leave, and the donut and the
 * bars are fractions of the window through `useCharts()` below.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0`, but nothing inside an expo-router `Stack` ever
 * reads it — the navigator re-provides the context with its own zeroed
 * metrics. So the design's insets are pinned here as a *fallback*, and
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
export const HEADER_TOP = 8;
export const HEADER_BUTTON = 36;

/** The segmented control under it. */
export const SEG_TOP = 18;
export const SEG_HEIGHT = 40;
/** How far the selected pill is inset inside the bar. */
export const SEG_INSET = 4;

/**
 * Between one block and the next, and between a heading and its block.
 *
 * These two are the screen's whole vertical budget. Six blocks, two insets, a
 * header, a segmented bar, a ring, six legend rows, a card and a chart have to
 * land inside 852dp with the dock over the bottom of it — and the reference
 * fits them all on one screen, which is the thing worth matching here. A first
 * pass at 22 and 14 put the trend's month labels under the dock.
 */
export const BLOCK_TOP = 18;
export const HEAD_GAP = 12;

/** The donut. */
export const DONUT_STROKE = 26;
/** The gap left between one segment and the next, in degrees. */
export const DONUT_GAP_DEG = 2.2;

/** The legend under it: two columns, three rows. */
export const LEGEND_TOP = 15;
export const LEGEND_ROW = 23;
export const LEGEND_DOT = 8;
/** Dot to label. */
export const LEGEND_GAP = 8;

/** The insight card. */
export const INSIGHT_TOP = 16;
export const INSIGHT_PAD = 13;
export const INSIGHT_GLYPH = 30;

/** The trend chart. */
export const TREND_HEIGHT = 92;
/** The column of value labels down its right-hand side. */
export const AXIS_WIDTH = 30;
/** Between a bar and its month. */
export const BAR_LABEL_TOP = 8;
/** The pill that calls out this month. */
export const TOOLTIP_PAD_X = 8;
export const TOOLTIP_HEIGHT = 20;

/** The dock. */
export const DOCK_HEIGHT = 56;
export const DOCK_ICON = 21;
export const DOCK_LABEL_TOP = 4;
/** The centre button, which overhangs the dock's top edge. */
export const FAB_SIZE = 48;
export const FAB_RISE = 14;

/**
 * The two charts, sized off the window rather than pinned.
 *
 * Clamped at both ends: a wide phone must not blow the donut up until the
 * legend has nowhere to go, and a narrow one must not shrink it below the
 * point where "$754.33" fits inside the ring.
 */
export function useCharts() {
  const { width } = useWindowDimensions();

  /** The donut's outer diameter. */
  const donut = clamp(width * 0.5, 150, 192);

  return {
    donut,
    /** One trend bar. Six of them plus their gaps fill the plot area. */
    barWidth: clamp(width * 0.065, 18, 32),
  };
}

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}
