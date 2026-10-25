/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * The calendar takes `flex: 1` under the statistics strip, so the month and
 * its legend reach the bottom inset at any height; checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEAD_TOP = 6;
export const HEAD_DISC = 38;

export const TITLE_TOP = 16;
export const SYNC_TOP = 12;
export const SYNC_DISC = 30;

export const SECTION_TOP = 22;
export const TILES_TOP = 12;
export const TILE_HEIGHT = 74;
export const TILE_WIDTH = 124;

export const GRID_TOP = 12;
export const CELL_HEIGHT = 36;
export const ROW_GAP = 8;
export const LEGEND_TOP = 14;
