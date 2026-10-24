/**
 * The screen's anchors, in dp, chosen for a 393dp phone.
 *
 * Nothing here is measured off the board — it is a photograph of a phone in
 * somebody's hand, at an angle, so there is no pixel grid in it to measure
 * against even if measuring one were the point (AGENTS.md, "Three kinds of
 * reference").
 *
 * **The arithmetic that makes the screen full.** Dead canvas at the foot is a
 * measured gate item now, so the stack is solved from the bottom up rather
 * than laid out from the top and padded:
 *
 *     852  the screen
 *   -  34  the home indicator's band
 *   -   8  the foot's own breathing room
 *   =  810  where the last ink lands
 *   -  16  the footer line
 *   -  24  the gap above it
 *   = 770  the foot of the button stack
 *   - 192  three 56dp buttons and two 12dp gaps
 *   = 578  the top of the button stack
 *   -  28  the gap above it
 *   = 550  the foot of the panel
 *
 * and the panel starts under the status bar at 71, so it is 479 tall. Change
 * any number here and re-run `tools/preview/foot.py` over the shot.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0`, but nothing inside an expo-router `Stack` ever
 * reads it, so the design's insets are pinned here as a *fallback* and
 * `use-insets.ts` prefers the device's whenever it reports any.
 */

/** The status bar, iPhone 14 Pro — which is also what `shoot.js` fakes. */
export const TOP_INSET = 59;

/** Its home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. */
export const MARGIN = 16;

/** The green panel. */
export const PANEL_TOP = 12;
export const PANEL_HEIGHT = 479;
export const PANEL_PAD = 22;

/** The back control, inset from the panel's own corner. */
export const BACK_SIZE = 38;

/** The headline, under it. */
export const DISPLAY_TOP = 18;

/** The throw of tags, which takes whatever the panel has left. */
export const CLUSTER_BOTTOM = 18;
export const TAG_HEIGHT = 42;
export const TAG_GAP = 4;
export const TAG_THUMB = 30;
export const TAG_PAD = 7;

/** The three ways in. */
export const BUTTONS_TOP = 28;
export const BUTTON_HEIGHT = 56;
export const BUTTON_GAP = 12;

/** The line at the foot. */
export const FOOT_TOP = 24;
export const FOOT_BOTTOM = 8;
