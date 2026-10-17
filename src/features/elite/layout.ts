/**
 * The few numbers this screen is anchored to rather than laid out by.
 *
 * Everything between the cluster and the button is in a flex column that
 * absorbs whatever height is left, so the screen reflows on a shorter or
 * taller device instead of depending on an 852dp viewport.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0` by patching `getComputedStyle` so
 * react-native-safe-area-context's hidden `env(safe-area-inset-*)` probe reads
 * an iPhone's numbers — but nothing inside an expo-router `Stack` ever calls
 * `getComputedStyle`, because the navigator re-provides the context with its
 * own zeroed metrics. So the design's own insets are pinned here as a
 * *fallback* and `use-insets.ts` prefers the device's whenever it reports any.
 * Taking the larger of the two would be wrong in the common case: a 24dp
 * Android status bar would be pinned up to an iPhone's 59 and leave a band of
 * dead canvas at the top of the hero.
 */

/** iPhone 14 Pro's status bar — what the harness fakes. */
export const TOP_INSET = 59;

/** The home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. The copy and the button hold to it. */
export const MARGIN = 24;

/**
 * The hero, full-bleed from the top of the screen.
 *
 * It runs *under* the status bar rather than starting below it — the
 * photograph is the first thing on the page and an inset band of white above
 * it would read as a mistake. The fade to white along its lower edge is baked
 * into the asset, so there is no boundary to line anything up with.
 */
export const HERO_HEIGHT = 500;

/** The card in the middle of the cluster, which sits in front and highest. */
export const CARD_MAIN_W = 108;
export const CARD_MAIN_H = 146;

/** The two behind it, lower and turned out. */
export const CARD_SIDE_W = 84;
export const CARD_SIDE_H = 118;

/** How far the side cards are pushed out from the middle one. */
export const CARD_SPREAD = 76;

/** How far they are turned, in degrees. The left one takes the negative. */
export const CARD_TILT = 9;

/**
 * How far the cluster rises into the hero.
 *
 * Applied as a negative top margin rather than absolute positioning, so the
 * copy below it still moves with it — if the cluster grows, everything under
 * it follows instead of being overlapped.
 */
export const CLUSTER_RISE = 118;

/** The call to action. */
export const BUTTON_HEIGHT = 56;
