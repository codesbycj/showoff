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

/** The controls along the top. */
export const HEADER_TOP = 8;
export const HEADER_DISC = 42;

/** The title block. */
export const TITLE_TOP = 16;
export const BODY_TOP = 8;

/** The filter row. */
export const FILTER_TOP = 16;
export const FILTER_HEIGHT = 38;
export const FILTER_GAP = 9;

/** The product cards. */
export const SECTION_TOP = 18;
export const CARD_TOP = 12;
export const CARD_H = 210;
export const CARD_GAP = 14;
