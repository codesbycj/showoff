/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The two cards are given explicit heights and the gap between them is fixed,
 * so the stack solves to the bottom of the screen:
 *
 *     59 inset + 10 + 44 header + 18 + 302 progress + 14 + 54 notice
 *        + 14 + 268 timeline = 783, + 34 indicator = 817 of 852
 *
 * which leaves a 1dp hair at the foot. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 10;
export const HEADER_SIZE = 44;

export const PROGRESS_TOP = 18;
export const PROGRESS_HEIGHT = 302;

export const NOTICE_TOP = 14;
export const NOTICE_HEIGHT = 54;

export const TIMELINE_TOP = 14;
export const TIMELINE_HEIGHT = 268;

/** The chart inside the progress card. */
export const PLOT_HEIGHT = 186;
export const COLUMN_WIDTH = 34;
export const CARD_PAD = 16;
