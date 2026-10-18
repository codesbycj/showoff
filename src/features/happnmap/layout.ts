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
export const HEADER_DISC = 42;

/** The filter row. */
export const FILTER_TOP = 14;
export const FILTER_HEIGHT = 36;
export const FILTER_GAP = 9;

/** The radar. */
export const RADAR_TOP = 14;
export const BUBBLE = 44;

/** The profile card. */
export const CARD_TOP = 16;
export const CARD_AVATAR = 54;

/** The facts under it. */
export const FACT_TOP = 12;
export const FACT_GAP = 8;

/** The about block. */
export const ABOUT_TOP = 14;

/** The floating tab bar. */
export const TAB_HEIGHT = 64;
export const TAB_BOTTOM = 2;
export const TAB_CAMERA = 50;
