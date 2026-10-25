/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * **Why there is a list the reference does not have.** Its phone ends with the
 * two tiles and then the dock, which on a real 852dp screen leaves about 140dp
 * of empty paper between them. So the recent payments the balance card already
 * promises ("See all payments") are on the page, and the list runs under the
 * floating dock the way a real list does. Checked with
 * `tools/preview/foot.py`.
 */

export const TOP_INSET = 59;
export const BOTTOM_INSET = 34;

export const MARGIN = 20;

export const HEADER_TOP = 14;
export const HEADER_SIZE = 44;

export const DISPLAY_TOP = 26;

export const BALANCE_TOP = 22;
export const BALANCE_HEIGHT = 190;
export const CARD_PAD = 20;

export const TILES_TOP = 14;
export const TILE_HEIGHT = 176;
export const TILE_GAP = 12;

export const RECENT_TOP = 22;
export const ROW_HEIGHT = 56;
export const ROW_GAP = 10;

export const DOCK_HEIGHT = 66;
export const DOCK_SIDE = 22;
