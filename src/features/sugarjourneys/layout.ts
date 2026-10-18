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
export const HEADER_BUTTON = 36;
export const HEADER_AVATAR = 38;
export const HEADER_GAP = 8;

/** The title under it. */
export const TITLE_TOP = 16;

/** A journey card. */
export const CARDS_TOP = 18;
export const CARD_PAD = 18;
export const CARD_GAP = 14;
export const CARD_BUTTON = 32;
/** The row of people on it. */
export const CARD_AVATAR = 44;
export const AVATAR_OVERLAP = 0.26;
export const BADGE = 17;
/** The four-segment allocation bar. */
export const BAR_HEIGHT = 9;
export const BAR_GAP = 4;
/** The two rows of figures under it. */
export const STATS_TOP = 16;
export const STAT_GAP = 14;

/** The add button. */
export const FAB_SIZE = 58;
export const FAB_BOTTOM = 16;
