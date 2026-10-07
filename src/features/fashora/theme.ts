/**
 * Fashora's tokens.
 *
 * A Google Stitch export with a full `DESIGN.md`, and — as with Travelexa,
 * Aura Legal and Volt — its frontmatter and its prose disagree. Sampling the
 * four renders settles it for the frontmatter every time:
 *
 *   canvas        prose #FFFFFF   frontmatter #fbf9f9   renders #FBF9F9
 *   accent        prose #FF5B00   frontmatter #ff5b00   renders #FF5B00
 *   body ink      prose #767676   frontmatter #5b4137   renders warm brown
 *   card fill     prose #F8F9FA   frontmatter #ffffff   renders #FFFFFF
 *
 * So the prose is treated as commentary on intent. It is still the better
 * description of *why*: it is the prose that calls the orange "electric" and
 * says it drives "key calls to action, active navigation states, promotional
 * banners, badges", which is exactly where the markup puts `primary-container`.
 *
 * The one thing the prose gets right that the token names hide: this palette
 * has **two** oranges doing different jobs. `primaryContainer` #ff5b00 is the
 * fill — buttons, the active dock pill, the promo card, the badge dots.
 * `primary` #a83900 is the deeper burnt tone, and it is only ever *ink*: cart
 * line prices, "Change", the applied-promo pill's label. Swapping them is the
 * single easiest way to get this design wrong, so they are commented here
 * rather than left to the Material names to explain.
 *
 * Names are kept in the design system's own Material vocabulary. This export is
 * a design system; the token names are part of what is being rebuilt.
 */
export const fa = {
  // surfaces, brightest to deepest — this is a light theme
  surface: '#fbf9f9',
  surfaceContainerLowest: '#ffffff',
  surfaceContainerLow: '#f5f3f3',
  surfaceContainer: '#efeded',
  surfaceContainerHigh: '#e9e8e7',
  surfaceContainerHighest: '#e3e2e2',
  surfaceDim: '#dbdad9',
  surfaceVariant: '#e3e2e2',

  // ink
  onSurface: '#1b1c1c',
  /** Warm brown, not grey: body copy and the muted half of a split row. */
  onSurfaceVariant: '#5b4137',
  outline: '#907065',
  outlineVariant: '#e4beb1',

  /** Burnt orange. Ink only — prices, links, the promo pill's label. */
  primary: '#a83900',
  onPrimary: '#ffffff',
  /** Electric orange. The fill: CTAs, the active dock pill, badges, the promo. */
  primaryContainer: '#ff5b00',
  onPrimaryContainer: '#521800',
  /** Pale peach — the "In Transit" icon well. */
  primaryFixed: '#ffdbce',
  primaryFixedDim: '#ffb59a',

  /** Neutral grey: metadata, inactive icons, placeholder text. */
  secondary: '#5f5e5e',
  onSecondary: '#ffffff',
  secondaryContainer: '#e5e2e1',
  onSecondaryContainer: '#656464',
  secondaryFixed: '#e5e2e1',
  /** The dock's inactive labels, read against the near-black capsule. */
  secondaryFixedDim: '#c8c6c5',

  /** Mid burnt orange: the detail kicker, "Guide", the delivery-row icons. */
  tertiary: '#9a4600',
  onTertiary: '#ffffff',
  tertiaryContainer: '#e27428',
  onTertiaryContainer: '#4b1e00',
  /** The VIP pill — pale apricot fill with its own deep-brown ink. */
  tertiaryFixed: '#ffdbc9',
  tertiaryFixedDim: '#ffb68d',
  onTertiaryFixed: '#321200',

  error: '#ba1a1a',

  inverseSurface: '#303031',
  inverseOnSurface: '#f2f0f0',

  white: '#ffffff',
  black: '#000000',

  /**
   * The three non-orange colour swatches on the detail screen.
   *
   * The export reaches straight past its own palette for these and names
   * Tailwind's `sky-500`, `emerald-500` and `fuchsia-600`. They are product
   * colourways rather than brand colour, which is why they are allowed to sit
   * outside the system — but they are still resolved here rather than left as
   * loose hex in a component.
   */
  swatchBlue: '#0ea5e9',
  swatchGreen: '#10b981',
  swatchMagenta: '#c026d3',
} as const;

/**
 * `rgba` from a `#rrggbb` and an alpha.
 *
 * This design tints with its own accent rather than with grey — the applied
 * promo pill is `bg-primary-container/10`, the delivery-pin well `/10`, the
 * item-count chip `/15` — and React Native has no `/alpha` syntax.
 */
export function alpha(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * Plus Jakarta Sans for everything, which the spec names for all eleven of its
 * type styles.
 *
 * No substitute hunt and no new text face: the family was already registered
 * for Affirm, VoteNG, Voyago, Aura Legal, Mindful Pop and Travelexa, so the
 * type matches outright, down to the 800 the promo headline is set in. This
 * showcase adds only its icon subset.
 */
export const FONT = {
  extrabold: 'PlusJakartaSans_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
  /** Material Symbols Outlined, cut down to this showcase's 44 glyphs. */
  symbol: 'FashoraSymbols_400Regular',
} as const;

/**
 * The spec's named type scale, carried across verbatim.
 *
 * Tracking is given in `em` by the spec and resolved to dp per style here,
 * since React Native takes an absolute value.
 *
 * The markup frequently stacks a weight utility on top of a style —
 * `font-headline-sm text-headline-sm font-bold` for a price, `font-label-sm
 * ... font-bold` for a badge. React Native resolves a face by family name and
 * not by numeric weight, so those read as a `fontFamily` override at the call
 * site rather than as a `fontWeight`.
 */
export const TYPE = {
  headlineXl: { fontFamily: FONT.extrabold, fontSize: 36, lineHeight: 44, letterSpacing: -1.08 },
  headlineXlMobile: {
    fontFamily: FONT.extrabold,
    fontSize: 28,
    lineHeight: 34,
    letterSpacing: -0.56,
  },
  headlineLg: { fontFamily: FONT.bold, fontSize: 24, lineHeight: 30, letterSpacing: -0.48 },
  headlineMd: { fontFamily: FONT.bold, fontSize: 20, lineHeight: 26, letterSpacing: -0.2 },
  headlineSm: { fontFamily: FONT.semibold, fontSize: 18, lineHeight: 24 },
  bodyLg: { fontFamily: FONT.regular, fontSize: 16, lineHeight: 24 },
  bodyMd: { fontFamily: FONT.regular, fontSize: 14, lineHeight: 20 },
  bodySm: { fontFamily: FONT.regular, fontSize: 12, lineHeight: 18 },
  labelLg: { fontFamily: FONT.bold, fontSize: 15, lineHeight: 20, letterSpacing: 0.15 },
  labelMd: { fontFamily: FONT.semibold, fontSize: 13, lineHeight: 18 },
  labelSm: { fontFamily: FONT.semibold, fontSize: 11, lineHeight: 14, letterSpacing: 0.22 },
} as const;

/**
 * Radii, in dp.
 *
 * These are the export's own `borderRadius` overrides — not the frontmatter's,
 * which lists an `sm` and a `md` the shipped Tailwind config does not carry.
 * Where the config leaves a step out, the markup gets Tailwind's stock value,
 * so both are here: `DEFAULT`/`lg`/`xl`/`full` are the design's, and `sm` (2)
 * and `xl2` (16) are the defaults the markup actually resolves against.
 *
 * `xl` being 48 is not a typo and it is not decorative: the detail screen's
 * 48dp thumbnails carry `rounded-xl`, which at that size is a full circle, and
 * the reference renders them as circles.
 */
export const R = {
  sm: 2,
  DEFAULT: 16,
  xl2: 16,
  lg: 32,
  xl: 48,
  /** The detail sheet's top shoulders — `rounded-t-[2.5rem]`. */
  sheet: 40,
  full: 9999,
} as const;

/**
 * The spec's spacing scale. `margin` is the 20dp inset the detail sheet uses
 * and `marginMobile` the 16dp canvas inset every other screen uses; the spec
 * distinguishes them and so does this.
 */
export const SP = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  gutterMobile: 12,
  gutter: 16,
  marginMobile: 16,
  margin: 20,
} as const;

/**
 * Elevation, as style fragments.
 *
 * The spec is explicit that this system "avoids heavy drop shadows", and the
 * markup bears it out: almost everything is `shadow-sm`, with three named
 * exceptions that carry their own arbitrary values. Those three are the ones
 * worth naming here.
 *
 * `shadowOpacity`/`shadowRadius`/`shadowOffset` and `elevation` travel together
 * in one object rather than through `Platform.select`, because a select is
 * exactly what the web harness cannot check: the keys the running platform does
 * not read are inert, and a missing `elevation` is invisible until Android.
 */
export const ELEV = {
  /** `shadow-sm` — cards, pills, the circular icon buttons. */
  card: {
    shadowColor: fa.black,
    shadowOpacity: 0.06,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  /** `shadow-md` — the promo's Shop Now button and the profile portrait. */
  raised: {
    shadowColor: fa.black,
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  /** `shadow-[0_8px_24px_rgba(18,18,18,0.18)]` — the floating dock capsule. */
  dock: {
    shadowColor: '#121212',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  /** `shadow-[0_8px_20px_rgba(255,91,0,0.3)]` — the accent glow under a CTA. */
  glow: {
    shadowColor: fa.primaryContainer,
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  /** `shadow-[0_-12px_36px_rgba(27,28,28,0.06)]` — the detail sheet lifting. */
  sheet: {
    shadowColor: fa.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: -12 },
    elevation: 10,
  },
} as const;

/** Semantic overrides, so the shared primitives read on Fashora's page. */
export const fashoraTheme = {
  '--bg': fa.surface,
  '--surface': fa.surfaceContainerLowest,
  '--fg': fa.onSurface,
  '--muted': fa.secondary,
  '--border': fa.surfaceContainer,
  '--accent': fa.primaryContainer,
  '--accent-fg': fa.onPrimary,
} as unknown as Record<string, string>;
