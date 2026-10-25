/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The chart takes the slack. Everything above and below it is a fixed number
 * of dp, so the plot is given `flex: 1` and absorbs whatever is left — which
 * is what keeps the buy bar on the bottom edge rather than leaving a band of
 * paper under it. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 22;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 46;

export const PRICE_TOP = 18;

export const CHART_TOP = 14;
export const CHART_MIN = 210;
export const ZOOM_SIZE = 40;

export const RANGE_TOP = 18;
export const RANGE_HEIGHT = 38;

export const TILES_TOP = 16;
export const TILE_HEIGHT = 150;
export const TILE_GAP = 12;

export const BUY_TOP = 18;
export const BUY_HEIGHT = 66;
