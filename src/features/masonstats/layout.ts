/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The forecast card takes `flex: 1` under the completion card, so the plot
 * grows to whatever the phone can spare and the dock sits on the bottom
 * inset; checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 18;
export const CARD_PAD = 16;

export const HEAD_TOP = 4;
export const HEAD_DISC = 40;

export const SEG_TOP = 16;
export const SEG_HEIGHT = 50;
export const CHIPS_TOP = 10;
export const CHIP_HEIGHT = 40;

export const CARD_TOP = 14;
export const DONE_HEIGHT = 150;
export const FORECAST_MIN = 250;

export const DOCK_HEIGHT = 60;
export const DOCK_DISC = 44;
