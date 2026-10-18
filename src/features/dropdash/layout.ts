/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference").
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0`, but nothing inside an expo-router `Stack` ever
 * reads it. So the design's insets are pinned here as a *fallback*, and
 * `use-insets.ts` prefers the device's whenever it reports any.
 */

/** The status bar, iPhone 14 Pro — which is also what `shoot.js` fakes. */
export const TOP_INSET = 59;

/** Its home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. */
export const MARGIN = 18;

/** The header. */
export const HEADER_TOP = 6;
export const AVATAR = 40;
export const HEADER_BUTTON = 34;
export const HEADER_GAP = 8;

/** The search field. */
export const SEARCH_TOP = 16;
export const SEARCH_HEIGHT = 50;
export const SEARCH_BUTTON = 34;

/** The 2x2 grid of stat tiles. */
export const TILES_TOP = 16;
export const TILE_GAP = 12;
export const TILE_HEIGHT = 128;
export const TILE_PAD = 14;
export const TILE_GLYPH = 36;
export const TILE_BUTTON = 32;

/** Between one block and the next, and between a heading and its content. */
export const BLOCK_TOP = 18;
export const HEAD_GAP = 10;

/** The stock bar. */
export const STOCK_HEIGHT = 56;

/** A recent delivery. */
export const ROW_HEIGHT = 56;
export const ROW_THUMB = 38;

/** The dock. */
export const DOCK_HEIGHT = 58;
export const DOCK_ICON = 20;
export const DOCK_LABEL_TOP = 3;
export const FAB_SIZE = 46;
export const FAB_RISE = 12;
