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
export const MARGIN = 20;

/** The header, on the yellow. */
export const HEADER_TOP = 6;
export const HEADER_BUTTON = 34;

/** "Model 360°", and the car under it. */
export const CAPTION_TOP = 14;
export const CAR_TOP = 6;
/** The scrubber under the car: a rail with a knob on it. */
export const SCRUB_TOP = 10;
export const SCRUB_KNOB = 12;
export const SCRUB_RAIL = 2;
/** How much air the stage leaves under the scrubber. */
export const STAGE_BOTTOM = 18;

/** The dark sheet. */
export const SHEET_PAD = 20;
export const SHEET_TOP = 20;
export const BADGE = 32;

/** Between one block and the next inside the sheet. */
export const BLOCK_TOP = 14;

/** The three stat tiles. */
export const TILES_TOP = 18;
export const TILE_HEIGHT = 62;
export const TILE_GAP = 10;

/** The bar at the foot. */
export const BAR_TOP = 16;
export const ACTION_HEIGHT = 48;
