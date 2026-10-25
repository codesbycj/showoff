/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The card stack runs off the bottom of the screen on purpose: the one you
 * are paying with is whole, and the others show only their top edge under it.
 * That is what the reference does and it is also what fills the screen —
 * checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 14;
export const HEADER_SIZE = 44;

export const DISPLAY_TOP = 30;

/** The amount, and the balance under it. */
export const AMOUNT_TOP = 10;
export const UNDER_TOP = 4;

/** The people you send to. */
export const RAIL_TOP = 26;
export const FACE = 62;
export const FACE_ON = 74;

/** The cards, which fan out from the bottom of the screen. */
export const STACK_TOP = 22;
export const CARD_PAD = 20;
export const CARD_HEIGHT = 176;
export const CARD_PEEK = 62;

export const DOCK_HEIGHT = 66;
export const DOCK_SIDE = 22;
