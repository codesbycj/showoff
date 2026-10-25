/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The seat map takes `flex: 1` and the summary and button are fixed, so the
 * screen is full at any height — checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 40;

export const DISPLAY_TOP = 22;
export const BLURB_TOP = 8;

/** The seat map, which takes whatever the stack has left. */
export const MAP_TOP = 16;
export const MAP_PAD = 18;
export const SEAT_SIZE = 34;
export const SEAT_GAP = 10;
export const AISLE = 44;

export const SUMMARY_TOP = 16;
export const SUMMARY_HEIGHT = 62;
export const CARD_PAD = 16;

export const BUTTON_TOP = 14;
export const BUTTON_HEIGHT = 62;
