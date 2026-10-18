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
export const HEADER_TOP = 4;
export const AVATAR = 34;
export const BELL = 34;

/** The display heading. */
export const TITLE_TOP = 16;

/** The two tabs, and the rule under the live one. */
export const TABS_TOP = 18;
export const TAB_GAP = 26;
export const TAB_RULE = 2;

/** The date row. */
export const DATE_TOP = 16;
export const TOGGLE = 34;
export const TOGGLE_GAP = 8;

/** A car card. */
export const CARDS_TOP = 16;
export const CARD_HEIGHT = 168;
export const CARD_GAP = 14;
export const CARD_PAD = 14;
/** The price plate that hangs off the card's bottom-left corner. */
export const PLATE_HEIGHT = 46;
export const PLATE_BUTTON = 32;

/** The floating dock. */
export const DOCK_HEIGHT = 56;
export const DOCK_WIDTH = 236;
export const DOCK_BOTTOM = 12;
export const DOCK_ITEM = 40;
