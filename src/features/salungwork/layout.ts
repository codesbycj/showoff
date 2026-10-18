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

/** The title row. */
export const HEADER_TOP = 8;
export const HEADER_DISC = 40;

/** The search field. */
export const SEARCH_TOP = 16;
export const SEARCH_HEIGHT = 46;

/** The performance banner. */
export const BANNER_TOP = 14;
export const BANNER_HEIGHT = 82;

/** A section heading. */
export const SECTION_TOP = 18;
export const SECTION_GAP = 10;

/** The project cards. */
export const PROJECT_H = 176;
export const PROJECT_GAP = 10;

/** A task card. */
export const TASK_H = 76;
export const TASK_GAP = 10;
export const TASK_AVATAR = 22;

/** The floating dock. */
export const DOCK_HEIGHT = 58;
export const DOCK_BOTTOM = 4;
export const DOCK_ADD = 52;
/** What the scroll has to clear so the last card is not hidden behind it. */
export const SCROLL_TAIL = DOCK_HEIGHT + 24;
