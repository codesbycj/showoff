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
export const HEADER_TOP = 8;
export const HEADER_AVATAR = 40;
export const HEADER_DISC = 36;

/** The balance card. */
export const CARD_TOP = 14;
export const CARD_PAD = 16;
export const CARD_ACTION_H = 40;

/** A panel of service tiles. */
export const PANEL_TOP = 12;
export const PANEL_PAD = 14;
export const TILE = 46;
export const TILE_ROW_GAP = 16;

/** The transactions list. */
export const SECTION_TOP = 14;
export const ROW_H = 58;
export const ROW_GAP = 8;
export const ROW_DISC = 36;

/** The actions, which sit under the card here rather than inside it. */
export const ACTION_TOP = 10;
export const ACTION_H = 46;

/** The promo banner. */
export const PROMO_TOP = 14;
export const PROMO_H = 120;
export const DOTS_TOP = 10;

/** The empty state. */
export const EMPTY_TOP = 10;
export const EMPTY_H = 150;

/** The floating dock. */
export const DOCK_HEIGHT = 66;
export const DOCK_DISC = 50;
export const DOCK_BOTTOM = 4;
/** What the scroll has to clear so the last row is not hidden behind it. */
export const SCROLL_TAIL = DOCK_HEIGHT + 24;
