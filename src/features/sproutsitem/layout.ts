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

/** The green panel, as a share of the window. */
export const PANEL = 0.44;
export const HEADER_TOP = 6;
export const HEADER_DISC = 40;

/** The sheet under it. */
export const SHEET_TOP = 16;
export const SECTION_TOP = 14;

/** The two stat boxes. */
export const STAT_GAP = 10;
export const STAT_H = 62;

/** The bar at the foot. */
export const BAR_HEIGHT = 52;
export const BAR_BOTTOM = 8;
