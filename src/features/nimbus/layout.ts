/**
 * The screen's anchors, in dp, measured off the reference at 1.0603 px/dp.
 *
 * Widths are never pinned here — the card, the tiles and the dock all take
 * whatever the margins leave, so the screen reflows on a narrower or wider
 * device instead of depending on a 390dp viewport.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0` by patching `getComputedStyle`, but nothing
 * inside an expo-router `Stack` ever calls it — the navigator re-provides the
 * context with its own zeroed metrics. So the design's own insets are pinned
 * below as a *fallback*, and `use-insets.ts` prefers the device's whenever it
 * reports any. Not the larger of the two: a 24dp Android status bar pinned up
 * to an iPhone's 47 would leave a band of dead canvas above the header.
 */

/**
 * The status bar.
 *
 * 59 is the iPhone 14 Pro's, which is what `shoot.js` fakes — and the point
 * of pinning that number rather than the 47 the reference phone itself had is
 * that the harness delivers its fake in some sessions and zeros in others. A
 * fallback equal to the fake renders identically either way, and the header
 * then lands on the reference's own 77dp in both.
 */
export const TOP_INSET = 59;

/** Its home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. The card, the tiles, the meter and the rows all hold to it. */
export const MARGIN = 18;

/** The header: 30dp round buttons, 18dp below the status bar — 77dp down. */
export const HEADER_TOP = 18;
export const HEADER_BUTTON = 30;

/** The card stack: three cards, each 11.8dp of lip above the one in front. */
export const CARD_HEIGHT = 189;
export const CARD_LIP = 11.8;
/** Inside the front card. */
export const CARD_PAD = 16;
/** The eye plate, top right of the card. */
export const CARD_PLATE = 22.5;
/** Where "Expires" starts, measured from the start of the text column. */
export const CARD_META_COL = 102.5;

/** Between the header and the top of the card stack. */
export const STACK_TOP = 22;

/** Between the stack and the action tiles. */
export const TILES_TOP = 24;
export const TILE_HEIGHT = 72;
export const TILE_GAP = 8;
/** Inside a tile: glyph, then its label. */
export const TILE_GLYPH = 20;
export const TILE_GLYPH_TOP = 13;

/** The spend meter card. */
export const METER_TOP = 25;
export const METER_HEIGHT = 79;
export const METER_PAD = 12;
/** Its top padding is smaller: the figure's line box is the tall one. */
export const METER_PAD_TOP = 9.1;
export const METER_BAR = 16;

/** The transactions block. */
export const SECTION_TOP = 24;
export const ROW_HEIGHT = 64;
export const ROW_AVATAR = 33;
/** Avatar to text. The divider starts on the same line. */
export const ROW_TEXT_GAP = 14.2;

/** The floating dock. */
export const DOCK_MARGIN = 24.5;
export const DOCK_HEIGHT = 61;
/**
 * How far the dock floats above the bottom of the screen.
 *
 * Measured, and deliberately *not* derived from the bottom inset: the dock
 * overlaps the home indicator's safe area by 13dp in the reference, so taking
 * the inset would drop it. 20dp still clears the indicator itself, which is
 * drawn 8dp up and is 5dp tall, on any device that has one.
 */
export const DOCK_BOTTOM = 20;
export const DOCK_ICON = 24;
/** The glyph box sits 10dp below the dock's top edge, the label 2.5 under it. */
export const DOCK_ICON_TOP = 10;
/** Four equal columns inside this padding put the centres 81.6dp apart. */
export const DOCK_PAD = 7.7;
/** How far the active pill overhangs its column, each side. */
export const DOCK_PILL_OVERHANG = 5.3;
/** The pill behind the active tab, inset inside the dock. */
export const DOCK_PILL_INSET = 4.7;

/** What the scroll has to clear, since the dock floats over it. */
export const SCROLL_BOTTOM_PAD = DOCK_BOTTOM + DOCK_HEIGHT + 16;
