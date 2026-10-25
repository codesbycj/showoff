/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The card takes `flex: 1` so the stack reaches the bottom edge whatever the
 * headline wraps to. Checked with `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 18;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 40;

export const TITLE_TOP = 20;

/** The three ways in. */
export const MODES_TOP = 20;
export const MODE_SIZE = 46;

/** The field. */
export const FIELD_TOP = 16;
export const FIELD_HEIGHT = 62;
export const CARD_PAD = 16;

/** The waveform, which takes whatever is left. */
export const WAVE_MIN = 250;
export const HUB = 84;

export const FOOT_HEIGHT = 50;
