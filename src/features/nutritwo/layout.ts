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

/** The header. */
export const HEADER_TOP = 8;

/** The progress bar. */
export const STEPS_TOP = 16;
export const STEPS = 4;
export const STEP_DONE = 2;
export const STEP_H = 3;
export const STEP_GAP = 7;

/** The headline. */
export const DISPLAY_TOP = 22;

/** The bar at the foot. */
export const BAR_HEIGHT = 58;
export const BAR_BOTTOM = 10;
export const BAR_DISC = 46;
