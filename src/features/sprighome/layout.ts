/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference"), and the phone in it is whatever
 * size the artboard happened to be.
 *
 * The meals list takes the slack: everything above it is a fixed stack and
 * the list runs to the dock, so the screen has no band of empty canvas at
 * the foot however tall the phone is. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const GREET_TOP = 6;
export const AVATAR = 42;

export const SEG_TOP = 16;
export const SEG_HEIGHT = 46;

export const CARD_TOP = 14;
export const CARD_PAD = 16;
export const DAY_W = 34;
export const DAY_H = 48;
export const GAUGE_TOP = 16;
export const GAUGE_W = 128;
export const GAUGE_H = 70;

export const MACRO_TOP = 12;
export const MACRO_HEIGHT = 62;

export const BUTTON_TOP = 12;
export const BUTTON_HEIGHT = 50;

export const SECTION_TOP = 18;
export const LIST_TOP = 10;

export const DOCK_HEIGHT = 62;
export const FAB = 52;
