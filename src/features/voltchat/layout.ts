/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The black sheet runs off the bottom edge rather than stopping above it: it
 * is the conversation, and a conversation that ends in a band of paper looks
 * finished when it is not. That is also what fills the screen — checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 46;

/** The black sheet, which runs off the bottom edge. */
export const SHEET_TOP = 16;
export const SHEET_PAD = 16;

export const BOLT_SIZE = 64;
export const BOLT_TOP = 36;
export const ASK_TOP = 18;

export const ROWS_TOP = 26;
export const ROW_HEIGHT = 58;
export const ROW_GAP = 8;

export const CHIPS_TOP = 18;
export const CHIP_HEIGHT = 32;

export const INPUT_TOP = 14;
export const INPUT_HEIGHT = 52;
