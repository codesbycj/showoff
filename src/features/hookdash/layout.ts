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
export const MARGIN = 14;

/** The close control. */
export const CLOSE_TOP = 10;
export const CLOSE = 30;

/** The grid of cards. */
export const GRID_TOP = 14;
export const GRID_GAP = 10;
/** The two cards on the first row. */
export const TILE_H = 150;
/** The disc a stat sits in. */
export const STAT_DISC = 46;

/** The leaderboard. */
export const BOARD_H = 128;

/** The activity card. */
export const ACTIVITY_H = 138;
export const ACTIVITY_AVATAR = 36;

/**
 * The memories card, which runs off the bottom edge.
 *
 * It is this tall because the page has to be full to its foot. At 190 the
 * stack finished with a band of flat black between the activity card and the
 * memories one, which is the one thing a design shot never has (AGENTS.md,
 * "The screen has to fill the screen").
 */
export const MEMORIES_H = 300;
