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
export const HEADER_DISC = 40;

/** The feature card, which takes whatever the rest leaves. */
export const FEATURE_TOP = 12;
export const FEATURE_PAD = 18;

/** The filter chips. */
export const CHIP_TOP = 12;
export const CHIP_HEIGHT = 40;
export const CHIP_GAP = 9;

/** The two dishes under them. */
export const DISH_TOP = 12;
export const DISH_H = 150;
export const DISH_GAP = 10;

/** The floating dock. */
export const DOCK_HEIGHT = 58;
export const DOCK_BOTTOM = 4;
export const DOCK_DISC = 44;
/** What the scroll has to clear so the last card is not hidden behind it. */
export const SCROLL_TAIL = DOCK_HEIGHT + 20;
