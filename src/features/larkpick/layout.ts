/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The list takes `flex: 1` between the headline and the button and its rows
 * share that space, so the screen fills at any height and the button sits on
 * the bottom inset; checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEAD_TOP = 6;
export const BACK_SIZE = 40;

export const DISPLAY_TOP = 22;
export const LIST_TOP = 22;

export const ROW_HEIGHT = 56;
export const ROW_GAP = 10;
export const FLAG_SIZE = 30;

export const BUTTON_TOP = 18;
export const BUTTON_HEIGHT = 56;
