/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a posed design shot, and its
 * phone is whatever size the artboard happened to be (AGENTS.md, "Three kinds
 * of reference").
 *
 * **Why the list runs under the tab bar.** The reference's phone is cropped
 * just below its one task card, which leaves about 170dp of nothing between
 * that card and the dock if you build it literally. So the task list is a
 * scroller that continues under a floating dock instead: the third card is cut
 * by the bar the way a real list is, which fills the screen and is also how
 * the app would actually behave. Checked with `tools/preview/foot.py`.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness, so
 * the design's are pinned here as a *fallback* and `use-insets.ts` prefers the
 * device's whenever it reports any.
 */

/** The status bar, iPhone 14 Pro — which is also what `shoot.js` fakes. */
export const TOP_INSET = 59;

/** Its home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. */
export const MARGIN = 20;

/** The row of controls across the top. */
export const HEADER_TOP = 10;
export const HEADER_SIZE = 44;

/** The headline under it. */
export const DISPLAY_TOP = 20;

/** The card of faces. */
export const CREW_TOP = 16;
export const CREW_HEIGHT = 74;
export const CREW_FACE = 42;
export const CREW_OVERLAP = 9;

/** The dark notice. */
export const NOTICE_TOP = 12;
export const NOTICE_HEIGHT = 54;

/** "Today Tasks" and its link. */
export const SECTION_TOP = 22;

/** The task cards. */
export const CARD_TOP = 14;
export const CARD_GAP = 14;
export const CARD_PAD = 16;
export const CARD_FACE = 24;
export const BAR_HEIGHT = 8;

/** The dock, which floats over the list. */
export const TAB_HEIGHT = 62;
export const FAB_SIZE = 54;
