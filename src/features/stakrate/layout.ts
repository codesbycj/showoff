/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The notes run off the bottom edge rather than stopping above it: it is a
 * rail you push sideways, and a rail that ends neatly inside the screen does
 * not look like one. That is also what fills the screen — checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 22;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 46;

export const DISPLAY_TOP = 24;

export const BARS_TOP = 26;
export const BAR_HEIGHT = 96;
export const BAR_GAP = 10;

export const NOTES_TOP = 24;
export const NOTE_WIDTH = 300;
export const NOTE_GAP = 12;
export const NOTE_PAD = 20;
