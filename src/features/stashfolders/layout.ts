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
export const BLURB_TOP = 6;

/** The progress card. */
export const PROGRESS_TOP = 16;
export const PROGRESS_HEIGHT = 96;
export const BAR_HEIGHT = 10;
export const CARD_PAD = 16;

/** The sheet of folders, which runs off the bottom edge. */
export const SHEET_TOP = 14;
export const SHEET_PAD = 16;
export const TILE_HEIGHT = 112;
export const TILE_GAP = 12;
