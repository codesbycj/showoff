/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * The hero is a share of the window rather than a fixed height, so the plate
 * keeps its proportion on a short phone and a tall one; the sheet below takes
 * the rest and the facts list runs to the bottom edge. Checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 22;

export const HERO_SHARE = 0.42;
export const PLATE_SHARE = 0.78;

export const DISC = 42;

export const SHEET_LIFT = 26;
export const SHEET_PAD = 22;

export const FACTS_TOP = 16;
export const FIELD_TOP = 18;
export const FIELD_HEIGHT = 48;
export const BUTTON_TOP = 16;
export const BUTTON_HEIGHT = 52;
export const SECTION_TOP = 18;
export const ROW_HEIGHT = 46;
