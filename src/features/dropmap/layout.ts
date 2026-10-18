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
export const MARGIN = 16;

/** The search bar floating over the map. */
export const SEARCH_TOP = 6;
export const SEARCH_HEIGHT = 48;
export const SEARCH_AVATAR = 34;

/** The chips under it. */
export const CHIPS_TOP = 10;
export const CHIP_HEIGHT = 36;
export const CHIP_GAP = 8;

/** The sheet at the foot. */
export const SHEET_PAD = 18;
export const CLOSE = 30;
/** Between one block inside the sheet and the next. */
export const BLOCK_TOP = 14;
export const OPTION_HEIGHT = 40;
export const OPTION_GAP = 10;
/** The row of actions at the bottom of the sheet. */
export const ACTION_HEIGHT = 46;
export const ACTION_GAP = 8;
