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

/** The grid control, centred at the top. */
export const GRID_TOP = 12;
export const GRID = 26;

/** The promo sticker. */
export const STICKER = 106;
export const STICKER_TOP = 4;

/** The caption. */
export const CAPTION_BOTTOM = 18;

/** The row of controls at the foot. */
export const BAR_BOTTOM = 10;
export const BAR_AVATAR = 32;
export const SEND = 54;
