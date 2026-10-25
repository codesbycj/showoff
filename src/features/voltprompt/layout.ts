/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The prompt list scrolls and the ask bar is pinned to the foot, so the
 * screen is always full whatever the list is doing — checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 12;
export const HEADER_SIZE = 46;

/** The black sheet, which runs off the bottom edge. */
export const SHEET_TOP = 16;
export const SHEET_PAD = 16;

/** The "Prompts" line and its count. */
export const HEAD_TOP = 20;
export const COUNT_SIZE = 30;

/** One saved prompt. */
export const PROMPT_TOP = 18;
export const CHIP_HEIGHT = 34;
export const TOOL_SIZE = 34;

/** The chart under the first one. */
export const PLOT_HEIGHT = 190;
export const BAR_WIDTH = 34;

/** The toolbar that floats over it. */
export const RAIL_SIZE = 42;

export const INPUT_TOP = 14;
export const INPUT_HEIGHT = 52;
