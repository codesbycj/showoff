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
export const HEADER_HEIGHT = 44;
export const HEADER_AVATAR = 30;

/** The title block. */
export const TITLE_TOP = 16;

/** The search field. */
export const SEARCH_TOP = 12;
export const SEARCH_HEIGHT = 44;

/** The stage the products are thrown on. */
export const STAGE_TOP = 6;

/** The filter row. */
export const FILTER_TOP = 10;
export const FILTER_HEIGHT = 36;
export const FILTER_GAP = 8;

/** The promo card. */
export const PROMO_TOP = 14;
export const PROMO_HEIGHT = 66;

/** The tab bar. */
export const TAB_HEIGHT = 62;
export const TAB_TOP = 14;
export const TAB_BOTTOM = 4;
