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
export const HEADER_DISC = 40;

/** The hero photograph. */
export const HERO_TOP = 14;

/** The copy under it. */
export const COPY_TOP = 16;

/** The booking row. */
export const BOOK_TOP = 14;
export const BOOK_HEIGHT = 46;

/** The appointment card. */
export const APPOINTMENT_TOP = 16;
export const PANEL_W = 0.46;

/** The floating dock. */
export const DOCK_HEIGHT = 60;
export const DOCK_BOTTOM = 4;
export const DOCK_TOP = 14;
