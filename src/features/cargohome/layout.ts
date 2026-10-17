/**
 * The few numbers the home screen is anchored to rather than laid out by.
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

/** The account photograph in the greeting row. */
export const AVATAR = 44;

/** The bell, and any other round control in the header. */
export const ROUND_BUTTON = 42;

/** The search field. */
export const FIELD_HEIGHT = 52;

/**
 * How far the warm wash behind the header reaches.
 *
 * It covers the greeting and the search field and is gone by the time the
 * tracking card starts, so the card sits on white rather than on a tint.
 */
export const WASH_HEIGHT = 300;

/** Between the stacked bands of the home screen. */
export const HOME_GAP = 18;

/** The tracking card, and the parcel drawn inside it. */
export const TRACKING_CARD_H = 250;
export const TRACKING_PARCEL = 168;

/** The recent-shipment card, and its parcel. */
export const SHIPMENT_CARD_H = 150;
export const SHIPMENT_PARCEL = 128;

/** The progress bar in both cards, and the marker that rides it. */
export const TRACK_HEIGHT = 6;
export const TRACK_MARKER = 32;

/** The tab bar at the foot. */
export const TAB_HEIGHT = 64;

/**
 * What the scroll has to clear.
 *
 * The tab bar sits over the scroll rather than inside it, so it cannot reserve
 * its own space and the last card would end up underneath it.
 */
export const HOME_SCROLL_PAD = TAB_HEIGHT + 20;
