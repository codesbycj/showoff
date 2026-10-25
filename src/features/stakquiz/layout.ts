/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * **Why there are four answers and the reference has three.** Its phone shows
 * three and then about 170dp of black before the control at the foot. Four is
 * what a multiple-choice question normally offers, it is the row the reference
 * crops, and it is what makes the screen reach its own bottom edge. Checked
 * with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 22;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 48;

export const BAR_TOP = 24;
export const BAR_HEIGHT = 9;
export const BAR_GAP = 7;

export const DISPLAY_TOP = 34;

export const OPTIONS_TOP = 34;
export const OPTION_HEIGHT = 80;
export const OPTION_GAP = 14;
export const OPTION_DISC = 46;
export const OPTION_FACE = 30;

export const FOOT_HEIGHT = 64;
export const FOOT_BOTTOM = 18;
