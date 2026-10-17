/**
 * The few numbers this screen is anchored to rather than laid out by.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0` by patching `getComputedStyle` so
 * react-native-safe-area-context's hidden `env(safe-area-inset-*)` probe reads
 * an iPhone's numbers — but nothing inside an expo-router `Stack` ever calls
 * `getComputedStyle`, because the navigator re-provides the context with its
 * own zeroed metrics. So the design's own insets are pinned here as a
 * *fallback*, and `use-insets.ts` prefers the device's whenever it reports
 * any. Taking the larger of the two would push a 24dp Android status bar up to
 * an iPhone's 59 and leave a band of dead canvas over the hero.
 */

/** iPhone 14 Pro's status bar — what the harness fakes. */
export const TOP_INSET = 59;

/** The home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. */
export const MARGIN = 20;

/**
 * The hero photograph, full-bleed from the very top.
 *
 * It runs *under* the status bar: the photograph is the first thing on the
 * page and an inset band above it would read as a mistake. Its white chrome
 * has a darkening ramp baked into the top of the asset to sit against — see
 * `tools/bake/marina.py`.
 */
export const HERO_HEIGHT = 255;

/** The round controls over the hero, and the agent's two. */
export const ROUND_BUTTON = 44;
export const AGENT_BUTTON = 40;

/** The agent's photograph. */
export const AVATAR = 56;
/** The ring around it. */
export const AVATAR_RING = 2;

/** Between the stacked sections of the body. */
export const SECTION_GAP = 13;

/** The booking bar at the foot of the screen. */
export const BAR_HEIGHT = 76;

/**
 * What the scroll has to clear.
 *
 * The bar is fixed over the scroll rather than inside it, so it cannot reserve
 * its own space and the agent row would end up underneath it.
 */
export const SCROLL_BOTTOM_PAD = BAR_HEIGHT + 24;
