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
export const HEADER_TOP = 10;
export const DISPLAY_TOP = 2;
export const GEM_HEIGHT = 38;

/** The daily challenge. */
export const HERO_TOP = 18;
export const HERO_HEIGHT = 176;
export const HERO_PAD = 18;
/** How far the cut-out photograph overhangs the card's right edge. */
export const HERO_PHOTO_W = 168;

/** A section heading. */
export const SECTION_TOP = 22;
export const SECTION_GAP = 12;

/** The categories row. */
export const CATEGORY_W = 112;
export const CATEGORY_H = 112;
export const CATEGORY_GAP = 11;

/** A trending card. */
export const TREND_HEIGHT = 136;
export const TREND_GAP = 14;

/** The floating dock. */
export const DOCK_HEIGHT = 62;
export const DOCK_PAD = 7;
export const DOCK_BOTTOM = 4;
/** What the scroll has to clear so the last card is not hidden behind it. */
export const SCROLL_TAIL = DOCK_HEIGHT + 22;
