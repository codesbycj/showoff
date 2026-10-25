/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The task card takes `flex: 1` between the filter row and the two panels, so
 * the page reaches the tab bar at any height; checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 18;

export const HEAD_TOP = 8;
export const AVATAR = 42;
export const HEAD_DISC = 40;

export const DISPLAY_TOP = 18;

export const FILTER_TOP = 16;
export const FILTER_HEIGHT = 38;

export const TASK_TOP = 14;
export const TASK_MIN = 138;
export const CARD_PAD = 16;

export const PANELS_TOP = 12;
export const PANEL_HEIGHT = 158;
export const PANEL_GAP = 12;

export const BAR_WIDTH = 13;
export const BAR_MIN = 16;

export const TABBAR_TOP = 12;
export const TABBAR_HEIGHT = 60;
