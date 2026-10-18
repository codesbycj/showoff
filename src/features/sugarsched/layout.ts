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
export const MARGIN = 20;

/** The header. */
export const HEADER_TOP = 6;
export const HEADER_BUTTON = 40;
export const HEADER_GAP = 10;

/** The title, with the account's photograph beside it. */
export const TITLE_TOP = 14;
export const TITLE_AVATAR = 54;

/** An assignment row. */
export const ROWS_TOP = 18;
export const ROW_HEIGHT = 58;
export const ROW_PAD = 14;
export const ROW_CHIP = 32;
export const ROW_AVATAR = 32;
export const ROW_GAP = 12;

/** The date-range card. */
export const SHEET_PAD = 18;
export const SHEET_AVATAR = 44;
export const CONFIRM = 54;
/** One day in its grid. */
export const DAY_SIZE = 30;
export const DAY_GAP = 5;
