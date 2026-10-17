/**
 * The few numbers the onboarding screen is anchored to rather than laid out by.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0` by patching `getComputedStyle` so
 * react-native-safe-area-context's hidden `env(safe-area-inset-*)` probe reads
 * an iPhone's numbers — but nothing inside an expo-router `Stack` ever calls
 * `getComputedStyle`, because the navigator re-provides the context with its
 * own zeroed metrics. So the design's own insets are pinned here as a
 * *fallback*, and `use-insets.ts` prefers the device's whenever it reports
 * any. Taking the larger of the two would push a 24dp Android status bar up to
 * an iPhone's 59 on every Android device.
 */

/** iPhone 14 Pro's status bar — what the harness fakes. */
export const TOP_INSET = 59;

/** The home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. The copy and the button hold to it. */
export const MARGIN = 24;

/**
 * The hero photograph.
 *
 * Positioned absolutely at the top and full-bleed, under the status bar. It
 * does not need a boundary with the page because it has none: the asset fades
 * to the page's own yellow and its last row is that colour exactly.
 */
export const HERO_HEIGHT = 580;

/** The call to action. */
export const BUTTON_HEIGHT = 62;
/** The dark disc inside it, and its inset from the button's left edge. */
export const DISC = 46;
export const DISC_INSET = 8;
