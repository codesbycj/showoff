/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The timeline takes `flex: 1` between the week strip and the tab bar and its
 * entries share that space, so the day runs to the foot of the screen at any
 * height; checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 18;

export const HEAD_TOP = 10;
export const AVATAR = 52;

export const STRIP_TOP = 20;
export const STRIP_HEIGHT = 74;
export const DAY_WIDTH = 46;

export const TIMELINE_TOP = 18;
/** The rail's column: the dot sits in the middle of it. */
export const RAIL = 26;
export const DOT = 15;
export const ENTRY_GAP = 14;
export const CARD_PAD = 16;

export const TABBAR_HEIGHT = 64;
export const FAB = 52;
