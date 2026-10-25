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

/** The green panel at the top. */
export const PANEL_TOP = 14;
export const PANEL_HEIGHT = 250;
export const CARD_PAD = 18;
export const BAR_HEIGHT = 46;

/** The history under it. */
export const HISTORY_TOP = 20;
export const ROW_HEIGHT = 62;

/** The two category tiles. */
export const TILES_TOP = 16;
export const TILE_HEIGHT = 104;
export const TILE_GAP = 12;
