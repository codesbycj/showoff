/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The planner card takes `flex: 1` so the stack reaches the bottom edge
 * whatever the balance wraps to. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 42;

/** The month grid. */
export const GRID_TOP = 16;
export const CELL = 38;
export const ROW_GAP = 13;

/** The day's breakdown under it. */
export const DAY_TOP = 20;
export const SPLIT_TOP = 14;
export const SPLIT_HEIGHT = 52;
export const BAR_HEIGHT = 16;

/** The summary bar at the foot. */
export const SUMMARY_TOP = 16;
export const SUMMARY_HEIGHT = 110;
export const CARD_PAD = 16;
