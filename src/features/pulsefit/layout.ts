/**
 * The few numbers the page is anchored to rather than laid out by.
 *
 * `useSafeAreaInsets()` reports 0 under the preview harness. `shoot.js` does
 * fake `59,0,34,0` by patching `getComputedStyle` so that
 * react-native-safe-area-context's hidden `env(safe-area-inset-*)` probe reads
 * an iPhone's numbers — but nothing inside an expo-router `Stack` ever calls
 * `getComputedStyle` at all, because the navigator re-provides the context
 * with its own zeroed metrics. The patch lands on a probe that never runs, so
 * every inset-anchored element in a web render would sit at the top of the
 * screen.
 *
 * So the design's own inset is pinned here and the device's is taken only when
 * it is larger. The export draws a 44dp status bar (`h-11`), which is what the
 * rest of the header is measured from.
 */

/** The reference's status-bar height. The header row begins directly below. */
export const TOP_INSET = 44;

/** The header row under it: logo, wordmark, bell, avatar. */
export const HEADER_HEIGHT = 64;

/** The side margin the whole page holds to — `px-margin-mobile`, 1rem. */
export const MARGIN = 16;

/** The gap between the page's stacked sections — `gap-space-lg`. */
export const SECTION_GAP = 16;

/** The dock's own height, before the bottom safe area is added under it. */
export const DOCK_HEIGHT = 80;

/**
 * How far the scrolling column clears the dock — the design's `pb-32`.
 *
 * Deliberately more than `DOCK_HEIGHT`: the FAB rides 20dp above the dock's
 * top edge, and `DESIGN.md` asks for a persistent 96dp of clearance under
 * every scrollable view. 128 is what the markup actually sets.
 */
export const DOCK_CLEARANCE = 128;
