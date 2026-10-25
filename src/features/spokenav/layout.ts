/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The road fills the top 56% and the sheet takes the rest, so the two always
 * meet and the screen is full at any height — checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 46;

/** The road, which the sheet sits over. */
export const ROAD_RATIO = 0.56;

/** The segmented control floating on it. */
export const SEG_HEIGHT = 42;

/** The sheet. */
export const SHEET_RADIUS = 30;
export const SHEET_PAD = 18;
export const ADDRESS_TOP = 18;
export const CARD_TOP = 16;
export const CARD_PAD = 18;
export const STATS_TOP = 18;
export const HINT_TOP = 14;
