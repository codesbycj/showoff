/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The scan frame takes `flex: 1` between the header and the caption, so the
 * viewfinder grows to whatever the phone can spare rather than sitting at a
 * fixed height with a band of white under it; checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEAD_TOP = 4;
export const HEAD_DISC = 42;

export const FRAME_TOP = 16;
export const FRAME_MIN = 380;
export const FRAME_RADIUS = 30;
/** The corner brackets: how long each arm is, and how thick. */
export const BRACKET = 44;
export const BRACKET_W = 5;

export const CAPTION_TOP = 20;

export const CONTROLS_TOP = 18;
export const CONTROL = 54;
export const SCAN = 76;
