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

/** The header. */
export const HEADER_TOP = 6;
export const HEADER_BUTTON = 40;

/** The row of small controls under it. */
export const TOOLS_TOP = 14;
export const TOOL_BUTTON = 34;
export const TOOL_GAP = 8;

/** The customer. */
export const FACE_TOP = 14;
export const FACE = 104;
export const NAME_TOP = 14;

/** The five actions. */
export const ACTIONS_TOP = 18;
export const ACTION_BUTTON = 44;
export const ACTION_GAP = 10;

/** "Detailed Information" and its rule. */
export const SECTION_TOP = 20;
export const SECTION_HEIGHT = 38;

/** The schedule card. */
export const CARD_TOP = 16;
export const CARD_PAD = 16;
export const CARD_BUTTON = 32;
/** One day in the grid. */
/**
 * 40, and the month runs to 31 rather than 21 — between them they close the
 * band of dead canvas the first build left under the card. A design shot's
 * phone is always full to the bottom edge.
 */
export const DAY_SIZE = 40;
export const DAY_GAP = 6;
