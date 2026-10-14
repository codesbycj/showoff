/**
 * The few numbers the page is anchored to rather than laid out by.
 *
 * `useSafeAreaInsets()` reports 0 under the preview harness. `shoot.js` fakes
 * `59,0,34,0` by patching `getComputedStyle` so react-native-safe-area-context's
 * hidden `env(safe-area-inset-*)` probe reads an iPhone's numbers — but nothing
 * inside an expo-router `Stack` ever calls `getComputedStyle`, because the
 * navigator re-provides the context with its own zeroed metrics. The patch
 * lands on a probe that never runs, so every inset-anchored element in a web
 * render would sit at the top of the screen.
 *
 * So the design's own insets are pinned here as a *fallback*, and `use-insets.ts`
 * prefers the device's whenever it reports any. Taking the larger of the two
 * would be wrong in the common case: a 24dp Android status bar would be pinned
 * back up to an iPhone's 59 and leave a band of dead canvas above the header.
 */

/**
 * The status bar.
 *
 * The export does not draw one: its header is `pt-safe` over `env(safe-area-
 * inset-top)`, which is 0 in a desktop Chrome render — which is why the DOM
 * dump puts the header's 64px row at y=0 and the showcase panel at y=64. On a
 * phone the whole page shifts down by the real inset. 59 is the iPhone 14 Pro's,
 * which is what the harness fakes and what the other showcases here assume.
 */
export const TOP_INSET = 59;

/** The home indicator. `pb-safe` on the purchase bar. */
export const BOTTOM_INSET = 34;

/** `h-16` on the header's row, under the inset. */
export const HEADER_HEIGHT = 64;

/** `px-margin` — `spacing.margin`, 1.25rem. The whole page holds to it. */
export const MARGIN = 20;

/**
 * The showcase panel: `min-h-[310px]`, and 310 is what it settles at.
 *
 * It is a minimum rather than a height, so it would grow if the dish did — but
 * the dish is a fixed 256 square inside `pt-4 pb-8`, which totals 304 and
 * leaves the minimum in charge. Pinned rather than derived, so the three dp of
 * slack stay where the reference puts them: as 3dp of extra space above and
 * below the dish, not as a panel that shrinks.
 */
export const SHOWCASE_HEIGHT = 310;

/** The dish, `w-64 h-64`. */
export const DISH = 256;

/**
 * The purchase bar's content row: a 52dp control with `py-3` either side.
 *
 * The scroll container clears it with `pb-28` (112dp) — the design's own
 * allowance, which is 36dp more than the bar needs. That surplus is the
 * reference's, not a mistake to tidy: it is what stops the last card sitting
 * flush under the bar's blur.
 */
export const BAR_CONTROL = 52;
export const BAR_PAD_Y = 12;
export const SCROLL_TAIL = 112;

/** `pt-space-lg` under the showcase, and `gap-space-lg` between every block. */
export const SECTION_GAP = 24;
