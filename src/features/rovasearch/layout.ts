/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 *     71 + 40 header + 22 + 120 headline + 8 + 36 blurb
 *        + 20 + 176 route + 14 + 230 detail + 18 + 62 button = 817 of 818
 *
 * which is the safe line exactly. Built at the reference's squatter
 * proportions the stack ends about 135dp short. Checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 40;

export const DISPLAY_TOP = 22;
export const BLURB_TOP = 8;

export const ROUTE_TOP = 20;
export const ROUTE_HEIGHT = 176;

export const DETAIL_TOP = 14;
export const DETAIL_HEIGHT = 230;

export const CARD_PAD = 16;
export const FIELD_HEIGHT = 44;

export const BUTTON_TOP = 18;
export const BUTTON_HEIGHT = 62;
