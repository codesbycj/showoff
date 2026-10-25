/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The history list takes `flex: 1` between the panel and the floating tab
 * bar and its rows share that space equally, so the screen fills at any
 * height; checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 16;
export const PANEL_PAD = 18;

export const BACK = 38;
export const PILL_HEIGHT = 36;
export const CARD_HEIGHT = 128;
export const CARD_TOP = 18;

export const BALANCE_TOP = 22;
export const ACTIONS_TOP = 18;
export const ACTION_SIZE = 50;
export const ACTION_GAP = 26;

export const REVEAL_TOP = 12;
export const REVEAL_HEIGHT = 34;

export const HISTORY_TOP = 20;
export const ROW_HEIGHT = 58;
export const ROW_DISC = 36;

export const TABBAR_HEIGHT = 62;
export const TABBAR_GAP = 10;
