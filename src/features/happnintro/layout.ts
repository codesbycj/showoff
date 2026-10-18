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

/** The page margin, inside the sheet. */
export const MARGIN = 26;

/** The mark at the top of the photograph. */
export const MARK_TOP = 14;

/** The ghost wordmark, as a share of the photograph's height. */
export const GHOST_TOP = 0.16;
/** The script line over the figure. */
export const OVER_TOP = 0.23;

/** The sheet. */
export const SHEET_TOP = 22;
export const BODY_TOP = 10;

/** The button. */
export const BUTTON_TOP = 20;
export const BUTTON_HEIGHT = 58;
export const BUTTON_BOTTOM = 10;
/** The disc inside its left end. */
export const BUTTON_DISC = 42;
