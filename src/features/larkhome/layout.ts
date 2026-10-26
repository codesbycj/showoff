/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The card list scrolls and the last card runs off the bottom edge, which is
 * what the reference crops and what makes the screen read as full; checked
 * with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 18;

export const HEAD_TOP = 6;
export const AVATAR = 38;
export const HEAD_DISC = 38;

export const LIST_TOP = 18;
export const CARD_HEIGHT = 112;
export const CARD_GAP = 12;
export const CARD_PAD = 16;
export const ART = 78;

export const DOCK_HEIGHT = 56;
export const DOCK_DISC = 42;
