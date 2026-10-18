/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference"). These are the numbers that are
 * right for a real screen: an 18dp page margin, a card at the golden-ish
 * 1.78 ratio the design uses, 64dp action tiles, 56dp activity rows and a
 * dock that clears the home indicator.
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
export const AVATAR = 40;
export const BELL = 38;

/** The balance card. */
export const CARD_TOP = 22;
export const CARD_PAD = 16;
/** The card's height as a fraction of its width — the design's proportion. */
export const CARD_RATIO = 0.6;
/** The lime block let into its right-hand side. */
export const CARD_BLOCK_W = 52;
/** The "Set Budget" pill, which overlaps the card's top edge. */
export const BUDGET_HEIGHT = 30;
export const BUDGET_RISE = 14;

/** The four action tiles. */
export const TILES_TOP = 16;
export const TILE_HEIGHT = 64;
export const TILE_GAP = 10;
export const TILE_GLYPH = 34;

/** Between one block and the next, and between a heading and its content. */
export const BLOCK_TOP = 18;
export const HEAD_GAP = 12;

/** The quick-send row. */
export const CONTACT = 44;
export const CONTACT_LABEL_TOP = 6;

/** The activity list. */
export const ROW_HEIGHT = 56;
export const ROW_GLYPH = 36;
export const ROW_GAP = 12;

/** The floating dock. */
export const DOCK_HEIGHT = 56;
export const DOCK_WIDTH = 168;
export const DOCK_BOTTOM = 14;
export const DOCK_ITEM = 42;
