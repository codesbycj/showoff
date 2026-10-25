/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The stack is solved from the bottom: the swipe bar sits on the indicator,
 * the two tiles above it, and the photograph takes everything left over with
 * `flex: 1`. That way the screen is full whatever the title wraps to —
 * checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 46;

export const TITLE_TOP = 22;
export const BLURB_TOP = 6;

/** The photograph, which takes whatever the stack has left. */
export const STAGE_TOP = 16;
export const STAGE_MIN = 300;

/** The charge gauge down its right edge. */
export const GAUGE_WIDTH = 46;
export const GAUGE_HEIGHT = 118;

export const TILES_TOP = 16;
export const TILE_HEIGHT = 120;
export const TILE_GAP = 12;
export const CARD_PAD = 18;

export const SWIPE_TOP = 14;
export const SWIPE_HEIGHT = 64;
