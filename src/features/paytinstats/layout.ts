/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot
 * (AGENTS.md, "Three kinds of reference"). These are the numbers that are
 * right for a real screen: an 18dp page margin, 36dp round header buttons,
 * 36dp period pills, a pair of cards that split the page, and a chart whose
 * plot takes whatever the axis column leaves.
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
export const HEADER_BUTTON = 36;

/** The four period pills. */
export const PILLS_TOP = 22;
export const PILL_HEIGHT = 42;
export const PILL_GAP = 8;

/** The pair of stat cards. */
export const CARDS_TOP = 20;
export const CARD_GAP = 12;
export const CARD_PAD = 14;
/** Their height as a fraction of the pair's own width — the design's shape. */
export const CARD_RATIO = 1.08;
/** The round "more" badge in a card's top-right. */
export const CARD_BADGE = 22;

/** The goal meter under the earning figure. */
export const DOT_SIZE = 6;
export const DOT_GAP = 4;

/** Between one block and the next, and between a heading and its content. */
export const BLOCK_TOP = 24;
export const HEAD_GAP = 14;

/** The overview card. */
export const CHART_PAD = 16;
/** The plot's own height, which the blocks divide between them. */
/**
 * 195. Everything on this screen was sized for its own block and the sum of
 * them stopped 185dp short of the bottom of the phone — a band of dead canvas
 * under the chart, which is the one thing a design shot never has. The plot
 * and the two stat cards absorbed most of it.
 */
export const PLOT_HEIGHT = 195;
/** The column of money up the left of the plot. */
export const AXIS_WIDTH = 32;
/** One block of a stack, and the air between two of them. */
/**
 * 11, not 13. The tallest column is nine blocks, and nine at 13 with 3dp of
 * air between them comes to 141 against a 134dp plot — the stack grew out of
 * the top of its own chart. A block chart's block has to be sized from the
 * tallest stack the data can produce, not from how it looks on the shortest.
 */
export const BLOCK_HEIGHT = 14;
export const BLOCK_GAP = 4;
/** Between the plot and the months under it. */
export const MONTH_TOP = 8;
/** The callout over the live month. */
export const TOOLTIP_HEIGHT = 24;
