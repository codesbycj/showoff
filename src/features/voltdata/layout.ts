/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The three result cards are 130dp rather than the reference's squatter ones:
 * built at its proportions the stack ends about 120dp above the dock and
 * leaves a band of black. Opening the rhythm out is the fix rather than
 * padding — checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 46;

export const SECTION_TOP = 26;

export const SOURCES_TOP = 16;
export const SOURCE_SIZE = 52;
export const SOURCE_GAP = 10;

export const CARDS_TOP = 16;
export const CARD_HEIGHT = 130;
export const CARD_GAP = 12;
export const CARD_PAD = 18;

export const DOCK_TOP = 16;
export const DOCK_HEIGHT = 56;
