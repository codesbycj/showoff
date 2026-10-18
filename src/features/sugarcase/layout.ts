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
export const HEADER_BUTTON = 40;
export const HEADER_GAP = 10;

/** The title. */
export const TITLE_TOP = 14;

/** The flow of steps. */
export const FLOW_TOP = 16;
export const NODE_PAD = 14;
export const NODE_AVATAR = 38;
export const NODE_CHIP = 32;
/** The dashed wire between two steps. */
export const WIRE = 26;

/** The rail of tools floating on the right. */
export const RAIL_BUTTON = 42;
export const RAIL_GAP = 10;
export const RAIL_RIGHT = 10;

/** The bar of chrome at the foot. */
export const FOOT_BUTTON = 48;
export const FOOT_GAP = 12;
export const FOOT_BOTTOM = 10;
