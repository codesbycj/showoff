/**
 * The two insets the page is anchored to.
 *
 * `useSafeAreaInsets()` reports 0 under the preview harness. The harness does
 * fake `59,0,34,0`, by patching `getComputedStyle` so that
 * react-native-safe-area-context's hidden `env(safe-area-inset-*)` probe reads
 * the iPhone's numbers — but on this version nothing inside an expo-router
 * `Stack` ever calls `getComputedStyle` at all (0 calls over a whole page
 * life), because the navigator re-provides the context with its own zeroed
 * metrics. So the patch lands on a probe that never runs, and every
 * inset-anchored element in a web render sits 59dp high.
 *
 * Rather than measure the screen against something the harness cannot
 * reproduce, the showcase pins the reference's own insets and clamps up to the
 * device's if that is ever larger. The reference was drawn on a 59dp inset,
 * and no Android status bar is taller, so the emulator and the harness land in
 * the same place — which is the only way the measurements mean anything.
 */

/** The reference's status-bar inset. Its header's avatar starts 7dp below it. */
export const TOP_INSET = 59;

/**
 * The gap under the dock.
 *
 * The design ignores the bottom safe area: the dock's foot is 12dp off the
 * screen edge and the home indicator is drawn *inside* the dock, over the
 * navy. So this is a fixed 12 rather than `insets.bottom`.
 */
export const DOCK_GAP = 12;

/** The dock's own height, which the scroll view has to clear. */
export const DOCK_HEIGHT = 90;

/** How far in from the screen edge the dock sits. */
export const DOCK_MARGIN = 7;

/** How much room the scrolling column leaves under its last row. */
export const DOCK_CLEARANCE = DOCK_GAP + DOCK_HEIGHT;
