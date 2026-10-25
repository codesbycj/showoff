/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 *     59 inset + 12 + 46 header + 24 + 38 title + 18 + 44 chips
 *        + 20 + 268 card + 18 + 268 card = 815, + 34 indicator = 849 of 852
 *
 * which leaves a 5dp hair at the foot. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 46;

export const TITLE_TOP = 24;

export const CHIPS_TOP = 18;
export const CHIP_HEIGHT = 44;

export const CARDS_TOP = 20;
export const CARD_HEIGHT = 268;
export const CARD_GAP = 18;
export const CARD_PAD = 20;
export const SWIPE_HEIGHT = 44;
