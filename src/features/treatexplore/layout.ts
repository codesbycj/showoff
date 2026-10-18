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

/** The title row. */
export const HEADER_TOP = 10;
export const SEARCH_DISC = 46;

/** The filter row. */
export const FILTER_TOP = 20;
export const FILTER_HEIGHT = 42;
export const FILTER_GAP = 10;
export const FILTER_BADGE = 28;

/** A collection card. */
export const CARD_TOP = 18;
export const CARD_HEIGHT = 158;
export const CARD_GAP = 14;
/** How much of the card's width the photography takes. */
export const CARD_ART = 0.56;
export const CARD_BADGE = 92;

/** The tab bar. */
export const TAB_HEIGHT = 58;
/** What the scroll has to clear so the last card is not hidden behind it. */
export const SCROLL_TAIL = TAB_HEIGHT + 16;
