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
export const AVATAR = 36;
export const BELL = 36;

/** "Account". */
export const TITLE_TOP = 18;

/** The card carousel. */
export const CARDS_TOP = 14;
/** How wide one card is, as a fraction of the page — the rest is the next one. */
export const CARD_WIDTH = 0.76;
export const CARD_RATIO = 0.64;
export const CARD_PAD = 16;
export const CARD_GAP = 12;

/** The three actions under it. */
export const ACTIONS_TOP = 16;
export const ACTION_HEIGHT = 44;
export const ACTION_GAP = 10;
export const ADD_SIZE = 44;

/** The transaction sheet. */
export const SHEET_TOP = 20;
export const SHEET_PAD = 18;
export const GRABBER_W = 44;
export const GRABBER_H = 4;
/** Between the heading and the day label, and between that and the rows. */
export const SHEET_HEAD_GAP = 14;
export const ROW_HEIGHT = 52;
export const ROW_GLYPH = 32;

/** The tab bar. */
export const TAB_HEIGHT = 56;
export const TAB_ICON = 20;
export const TAB_LABEL_TOP = 3;
export const FAB_SIZE = 46;
export const FAB_RISE = 10;
