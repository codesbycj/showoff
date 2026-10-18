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
export const MARGIN = 22;

/** The cluster of pills. */
export const CLUSTER_TOP = 4;
export const PILL_HEIGHT = 48;
export const PILL_PAD = 22;

/** The headline under it. */
export const DISPLAY_TOP = 26;

/** The two sign-in buttons. */
export const BUTTONS_TOP = 26;
export const BUTTON_HEIGHT = 56;
export const BUTTON_GAP = 12;

/** The line at the foot. */
export const FOOT_TOP = 16;
export const FOOT_BOTTOM = 6;
