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
export const HEADER_HEIGHT = 46;
export const HEADER_AVATAR = 34;

/** The balance. */
export const BALANCE_TOP = 18;

/** The dining card. */
export const CARD_TOP = 14;
/**
 * The card is this big because the page has to be full to its bottom edge.
 * At 184x230 the carousel finished halfway down and left a band of flat blue
 * between it and the dots, which is the one thing a design shot never has
 * (AGENTS.md, "The screen has to fill the screen").
 */
export const CARD_W = 212;
export const CARD_H = 352;

/** The page dots under it. */
export const DOTS_TOP = 12;

/** The call to action. */
export const BUTTON_TOP = 14;
export const BUTTON_HEIGHT = 48;

/** The tab bar. */
export const TAB_HEIGHT = 62;
export const TAB_BOTTOM = 4;
