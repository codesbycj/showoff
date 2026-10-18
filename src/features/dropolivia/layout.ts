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

/** The yellow sheet. */
export const SHEET_TOP = 6;
export const SHEET_PAD = 18;
export const HEADER_AVATAR = 44;
export const HEADER_DISC = 42;

/** The status block. */
export const STATUS_TOP = 16;

/** The tracking card and the truck beside it. */
export const PARCEL_TOP = 14;
export const PARCEL_H = 62;
export const TRUCK_W = 128;

/** The progress line. */
export const PROGRESS_TOP = 16;
export const PROGRESS_DOT = 11;

/** The dark half. */
export const DARK_TOP = 18;
export const ACTION_DISC = 58;

/** The recent card. */
export const RECENT_TOP = 12;
export const RECENT_H = 126;

/** The floating dock. */
export const DOCK_HEIGHT = 58;
export const DOCK_BOTTOM = 4;
export const DOCK_DISC = 46;
/** What the scroll has to clear so the last card is not hidden behind it. */
export const SCROLL_TAIL = DOCK_HEIGHT + 24;
