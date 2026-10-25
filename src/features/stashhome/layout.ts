/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The card takes `flex: 1` so the stack reaches the bottom edge whatever the
 * headline wraps to. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 18;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 40;

export const TITLE_TOP = 18;

export const STATS_TOP = 16;
export const STAT_HEIGHT = 72;
export const STAT_GAP = 10;

/** The dark memory card, which takes whatever is left. */
export const PANEL_TOP = 14;
export const PANEL_MIN = 280;
export const CARD_PAD = 18;
export const DONUT_SIZE = 184;
export const DONUT_THICK = 20;

export const DOCK_HEIGHT = 56;
