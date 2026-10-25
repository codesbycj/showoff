/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The transactions card takes `flex: 1`, so the stack reaches the bottom edge
 * whatever the headline wraps to. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 14;
export const HEADER_SIZE = 46;

/** Who you are paying. */
export const WHO_TOP = 18;
export const AVATAR = 96;

/** The two ways to be paid. */
export const TILES_TOP = 22;
export const TILE_HEIGHT = 132;
export const TILE_GAP = 12;
export const CARD_PAD = 18;

/** The sheet of transactions, which runs off the bottom edge. */
export const SHEET_TOP = 18;
export const SHEET_PAD = 18;
export const ROW_HEIGHT = 72;
export const ROW_FACE = 44;
