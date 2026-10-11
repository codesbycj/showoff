/**
 * The few numbers the screen is anchored to rather than laid out by.
 *
 * `useSafeAreaInsets()` reports 0 under the preview harness. `shoot.js` fakes
 * `59,0,34,0` by patching `getComputedStyle` so react-native-safe-area-context's
 * hidden `env(safe-area-inset-*)` probe reads an iPhone's numbers — but nothing
 * inside an expo-router `Stack` ever calls `getComputedStyle`, because the
 * navigator re-provides the context with its own zeroed metrics. The patch
 * lands on a probe that never runs, so every inset-anchored element in a web
 * render would sit at the top of the screen.
 *
 * So the design's own inset is pinned here and the device's taken only when it
 * is larger. The export renders `pt-safe` against a zero inset, which is why
 * its app bar starts at y=0 and its content at y=64; a real phone adds its
 * status bar on top of that.
 */

/** What the export assumes above the app bar. It renders at zero. */
export const TOP_INSET = 0;

/** The app bar: `h-16`. Content starts directly below it (`main` is `pt-16`). */
export const APP_BAR_HEIGHT = 64;

/** The app bar's own side padding — `px-margin`, 1.25rem. Wider than the page. */
export const APP_BAR_PADDING = 20;

/** The side margin the page holds to — `px-margin-mobile`, 1rem. */
export const MARGIN = 16;

/** Between the page's stacked sections — `gap-space-lg`. */
export const SECTION_GAP = 24;

/**
 * The dock floats, so the scroll view has to clear it by itself: `main` is
 * `pb-28`, and the dock is 56 tall sitting 8 above the bottom inset.
 */
export const SCROLL_BOTTOM_PAD = 112;

/** The dock's pill. `mb-space-sm` holds it 8 above the bottom safe area. */
export const DOCK_HEIGHT = 56;
export const DOCK_GAP = 8;

/** One tab in the dock. Four of them share the 361 between the margins. */
export const DOCK_TAB_WIDTH = 87;
export const DOCK_TAB_HEIGHT = 44;
