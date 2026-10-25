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

/** The gauge panel. */
export const PANEL_TOP = 16;
export const PANEL_MIN = 300;
export const CARD_PAD = 18;
export const GAUGE_SIZE = 230;
export const GAUGE_THICK = 22;

/** The two balances under it. */
export const ACTIONS_TOP = 12;
export const ACTION_HEIGHT = 118;
export const ACTION_GAP = 12;

/** The promo at the foot. */
export const PROMO_TOP = 12;
export const PROMO_HEIGHT = 150;
