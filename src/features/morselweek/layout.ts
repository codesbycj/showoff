/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The four cards are given explicit heights and the dock floats at the foot,
 * so the stack reaches the bottom edge. Checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 44;

export const TITLE_TOP = 18;

/** The week strip. */
export const WEEK_TOP = 16;
export const DAY_SIZE = 32;

/** What is left, and the bar under it. */
export const LEFT_TOP = 18;
export const BAR_TOP = 12;
export const BAR_HEIGHT = 18;

/** The four food cards. */
export const CARDS_TOP = 16;
export const CARD_GAP = 12;
export const CARD_PAD = 14;
export const FOOD_HEIGHT = 136;

export const DOCK_HEIGHT = 58;
