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
export const HEADER_TOP = 8;

/** The destination card. */
export const CARD_TOP = 20;
export const CARD_PAD = 14;
export const FIELD_HEIGHT = 46;
export const FIELD_GLYPH = 30;

/** The primary button. */
export const BUTTON_TOP = 16;
export const BUTTON_HEIGHT = 52;

/** The last-transfer row. */
export const BLOCK_TOP = 22;
export const HEAD_GAP = 14;
export const CONTACT = 48;
export const CONTACT_LABEL_TOP = 6;

/** The sheet at the foot. */
export const SHEET_TOP = 22;
export const SHEET_PAD = 18;
export const GRABBER_W = 44;
export const GRABBER_H = 4;
/** The three filters, and the rule under the live one. */
export const TABS_TOP = 14;
export const TAB_GAP = 22;
export const TAB_RULE = 2;
/** The search field. */
export const SEARCH_TOP = 12;
export const SEARCH_HEIGHT = 42;
/** A row of the list. */
export const ROW_HEIGHT = 54;
export const ROW_AVATAR = 34;
