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
export const HEADER_TOP = 12;
export const GEM_HEIGHT = 38;

/** The podium. */
export const PODIUM_TOP = 16;
export const PODIUM_BOTTOM = 18;
/** The winner's portrait, and the two beside it. */
export const WINNER = 84;
export const RUNNER = 70;
/** How far the two runners-up sit below the winner's baseline. */
export const RUNNER_DROP = 24;
export const CROWN_W = 46;
export const ROSETTE = 26;

/** The ranking sheet. */
export const ROW_HEIGHT = 68;
export const ROW_AVATAR = 42;
export const RANK_WELL = 32;
export const SCORE_DISC = 42;
export const SHEET_PAD = 16;
