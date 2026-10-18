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
export const HEADER_BUTTON = 40;

/** The filter row. */
export const FILTERS_TOP = 18;
export const FILTER_HEIGHT = 38;
export const FILTER_GAP = 8;

/** The grid of customer cards. */
export const GRID_TOP = 16;
export const GRID_GAP = 12;
export const CARD_HEIGHT = 168;
export const CARD_PAD = 13;
export const CARD_AVATAR = 38;
export const CARD_BUTTON = 30;

/** The floating bar at the foot. */
export const BAR_HEIGHT = 56;
export const BAR_BOTTOM = 14;
export const BAR_BUTTON = 40;
