/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference"), so these are the sizes a thumb
 * wants rather than the sizes the artboard happened to have.
 *
 * The chart card takes `flex: 1` so the screen reaches the bottom edge at any
 * height, checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;
export const HEADER_TOP = 10;

export const AVATAR = 46;
export const BELL = 42;

export const BALANCE_TOP = 26;
export const AMOUNT_TOP = 6;

export const QUICK_TOP = 22;
export const QUICK_HEIGHT = 64;

export const CARDS_TOP = 14;
export const CARDS_HEIGHT = 124;
export const CARD_GAP = 12;

export const CHART_TOP = 14;
export const CHART_MIN = 210;
export const CARD_PAD = 16;

/** The bar chart: a bar is this wide, and the tallest one is this tall. */
export const BAR_WIDTH = 11;
export const BAR_MIN = 18;
