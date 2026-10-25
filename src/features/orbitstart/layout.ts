/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The stage takes `flex: 1` so the stack reaches the bottom edge whatever the
 * headline wraps to. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const STAGE_TOP = 6;
export const STAGE_MIN = 300;

/**
 * The card is a share of the screen's width, at a real card's proportions.
 *
 * The reference's card is portrait because the whole card is turned on its
 * side for the poster. A card is 85.6 x 53.98mm; a card component that is not
 * posed should be that shape.
 */
export const CARD_SHARE = 0.78;
export const CARD_RATIO = 85.6 / 53.98;

export const DISPLAY_TOP = 26;
export const BUTTONS_TOP = 22;
export const BUTTON_HEIGHT = 54;
export const FOOT_TOP = 16;
export const FOOT_BOTTOM = 6;
