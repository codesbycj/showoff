/**
 * The few numbers the page is anchored to rather than laid out by.
 *
 * Everything else — card widths, the grid's column — is derived from these at
 * render time, so the screen reflows rather than depending on a 393dp viewport.
 *
 * On the insets: `useSafeAreaInsets()` reports 0 under the preview harness.
 * `shoot.js` fakes `59,0,34,0` by patching `getComputedStyle` so
 * react-native-safe-area-context's hidden `env(safe-area-inset-*)` probe reads
 * an iPhone's numbers — but nothing inside an expo-router `Stack` ever calls
 * `getComputedStyle`, because the navigator re-provides the context with its
 * own zeroed metrics. So the design's own insets are pinned here as a
 * *fallback* and `use-insets.ts` prefers the device's whenever it reports any.
 * Taking the larger of the two would be wrong in the common case: a 24dp
 * Android status bar would be pinned back up to an iPhone's 59 and leave a band
 * of dead canvas above the header.
 */

/** iPhone 14 Pro's status bar — what the harness fakes. */
export const TOP_INSET = 59;

/** The home indicator. */
export const BOTTOM_INSET = 34;

/** The page margin. Everything holds to it. */
export const MARGIN = 20;

/** Between the stacked bands — header, search, promo, each section. */
export const SECTION_GAP = 22;

/** The square icon buttons in the header. */
export const ICON_BUTTON = 44;

/** The search field. */
export const FIELD_HEIGHT = 52;

/** The promo card. Its photo panel is `PROMO_PANEL` of the card's width. */
export const PROMO_HEIGHT = 180;
export const PROMO_PANEL = 140;

/** Category chips: a fixed width so the row scrolls at a steady rhythm. */
export const CHIP_WIDTH = 146;
export const CHIP_HEIGHT = 58;
export const CHIP_GAP = 10;
/** The thumb inside a chip. */
export const CHIP_THUMB_W = 44;
export const CHIP_THUMB_H = 48;

/** The product grid. */
export const GRID_GAP = 14;
/**
 * Image height; the width is whatever half the column comes to.
 *
 * 240 against a ~170 column is a 0.71 portrait — the proportion fashion
 * retail uses for a garment shot, and the one value that drops the whole
 * name-and-price block into the clear screen below the floating tab bar.
 *
 * That window is 45dp (the bar measures 744-807dp against an 852dp screen) and
 * the block is 38, so there is 7dp of slack and the number is not a matter of
 * taste. It was settled by measuring the render rather than by arithmetic over
 * the layout constants: at 190 the price sat behind the bar, at 224 and 230
 * the name still did by 9dp. If the bar's height or the ramp changes, measure
 * it again — `tools/preview/rows.js`, or a scan for the bar's white band.
 */
export const PRODUCT_IMAGE_H = 240;

/** The floating tab bar. */
export const TAB_HEIGHT = 64;
/** How far it floats above the home indicator. */
export const TAB_LIFT = 10;

/**
 * What the scroll has to clear at the bottom.
 *
 * The tab bar floats over the scroll rather than sitting under it, so it
 * cannot reserve its own space and the last row of products would otherwise
 * end up underneath it.
 */
export const SCROLL_BOTTOM_PAD = TAB_HEIGHT + TAB_LIFT + 24;
