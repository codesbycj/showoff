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

/** The header. */
export const HEADER_TOP = 6;
export const HEADER_HEIGHT = 48;
export const HEADER_AVATAR = 34;

/** The category row. */
export const CATEGORY_TOP = 14;
export const CATEGORY_DISC = 50;
export const CATEGORY_GAP = 12;

/** The card. */
export const CARD_TOP = 14;
export const RAIL_DISC = 38;
export const RAIL_GAP = 10;

/** The floating tab bar. */
export const TAB_HEIGHT = 64;
export const TAB_BOTTOM = 2;
export const TAB_CAMERA = 50;
