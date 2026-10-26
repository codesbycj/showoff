/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * The card rail takes the slack under the chips, so a tall phone gets taller
 * cards rather than a band of empty blue. The rail is deliberately wider than
 * the screen — the next card is meant to be clipped by the right edge, which
 * is how a rail says it scrolls. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 22;

export const HEAD_TOP = 6;
export const AVATAR = 44;
export const HEAD_DISC = 44;

export const EYEBROW_TOP = 24;
export const DISPLAY_TOP = 4;

export const SEARCH_TOP = 26;
export const CHIPS_TOP = 22;
export const CHIP_HEIGHT = 40;

export const RAIL_TOP = 20;
export const RAIL_MIN = 230;
export const CARD_W = 266;
export const CARD_PAD = 16;
export const ART_RATIO = 6 / 11;
