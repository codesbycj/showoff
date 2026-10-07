/**
 * Travelexa's tokens.
 *
 * A Google Stitch export with a full `DESIGN.md`. As with Aura Legal and Volt,
 * the frontmatter and the prose disagree, and sampling the five renders settles
 * it for the frontmatter every time:
 *
 *   canvas          prose #FFFFFF   frontmatter #fbf9f9   renders #FBF9F9
 *   ink / primary   prose #111111   frontmatter #000000   renders #000000
 *   inactive fill   prose #F4F4F6   frontmatter #efeded   renders #EFEDED
 *
 * So the prose is treated as commentary on intent. It is still the better
 * description of *why*: it is the prose, not the token names, that says the
 * terracotta is "used sparingly for regional emblems, location flags, live
 * status highlights", which is exactly where the markup puts it.
 *
 * This is the first export in this set that sets **no emoji as UI** — every
 * small mark is a Material Symbol — so nothing had to be substituted for
 * platform-independence.
 *
 * Names are kept in the design system's own Material vocabulary. This export is
 * a design system; the token names are part of what is being rebuilt.
 */
export const tx = {
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
  onSurfaceVariant: '#444748',
  outline: '#747878',
  outlineVariant: '#c4c7c7',

  /** Carbon black: headings, primary buttons, active chips, the nav capsule. */
  primary: '#000000',
  onPrimary: '#ffffff',
  primaryContainer: '#1c1b1b',
  onPrimaryContainer: '#858383',
  primaryFixed: '#e5e2e1',
  primaryFixedDim: '#c8c6c5',

  /** Terracotta, used sparingly: flags, live dots, the log-out row. */
  secondary: '#af301d',
  onSecondary: '#ffffff',
  secondaryContainer: '#fe684f',
  onSecondaryContainer: '#670700',
  secondaryFixed: '#ffdad4',
  secondaryFixedDim: '#ffb4a6',

  /** Inverted surfaces — the dark map banner and the floating dock. */
  inverseSurface: '#303031',
  inverseOnSurface: '#f2f0f0',

  error: '#ba1a1a',

  white: '#ffffff',
  black: '#000000',
  /** The gold the star glyphs are drawn in, sampled off the renders. */
  star: '#f5b301',
} as const;

/**
 * `rgba` from a `#rrggbb` and an alpha.
 *
 * The design leans on translucency for its photo overlays — the spec's own
 * `rgba(0,0,0,0.45)` scrims and `linear-gradient(180deg, transparent 40%,
 * rgba(0,0,0,0.65) 100%)` — and React Native has no `/alpha` syntax.
 */
export function alpha(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * Plus Jakarta Sans for everything, which the spec names for all ten of its
 * type styles.
 *
 * No substitute hunt and no new face: the family was already registered for
 * Affirm, VoteNG, Voyago and Aura Legal, so the type matches outright. This
 * showcase adds only its icon subset.
 */
export const FONT = {
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
  /** Material Symbols Outlined, cut down to this showcase's 45 glyphs. */
  symbol: 'TravelexaSymbols_400Regular',
} as const;

/**
 * The spec's named type scale, carried across verbatim.
 *
 * The prose asks for `-0.02em` tracking on display cuts, resolved to dp per
 * style here since React Native takes an absolute value.
 */
export const TYPE = {
  headlineXl: { fontFamily: FONT.bold, fontSize: 32, lineHeight: 40, letterSpacing: -0.64 },
  headlineLg: { fontFamily: FONT.bold, fontSize: 24, lineHeight: 32, letterSpacing: -0.48 },
  headlineMd: { fontFamily: FONT.semibold, fontSize: 20, lineHeight: 28, letterSpacing: -0.4 },
  headlineSm: { fontFamily: FONT.semibold, fontSize: 18, lineHeight: 24, letterSpacing: -0.36 },
  bodyLg: { fontFamily: FONT.regular, fontSize: 16, lineHeight: 24 },
  bodyMd: { fontFamily: FONT.regular, fontSize: 14, lineHeight: 20 },
  bodySm: { fontFamily: FONT.regular, fontSize: 12, lineHeight: 16 },
  labelLg: { fontFamily: FONT.semibold, fontSize: 14, lineHeight: 20 },
  labelMd: { fontFamily: FONT.semibold, fontSize: 12, lineHeight: 16 },
  labelSm: { fontFamily: FONT.medium, fontSize: 11, lineHeight: 14 },
} as const;

/** The spec's `rounded` scale, in dp. */
export const R = {
  sm: 8,
  DEFAULT: 16,
  md: 24,
  lg: 32,
  xl: 48,
  full: 9999,
} as const;

/**
 * The spec's spacing scale. `margin` is the 20dp canvas inset and `gutter` the
 * 16dp carousel gap — the spec distinguishes them and so does this.
 */
export const SP = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  gutter: 16,
  margin: 20,
} as const;

/**
 * The spec's two elevation levels, as style fragments.
 *
 * Level 1 is the "ultra-soft shadow" on content cards; level 2 is the "lifted
 * drop shadow" on floating controls and the nav capsule. They are kept as
 * objects rather than being retyped per component, because this design uses
 * exactly two and the difference between them is the whole depth system.
 */
export const ELEV = {
  card: {
    shadowColor: tx.black,
    shadowOpacity: 0.04,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  floating: {
    shadowColor: tx.black,
    shadowOpacity: 0.12,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    elevation: 8,
  },
} as const;

/** Semantic overrides, so the shared primitives read on Travelexa's page. */
export const travelexaTheme = {
  '--bg': tx.surface,
  '--surface': tx.surfaceContainerLowest,
  '--fg': tx.onSurface,
  '--muted': tx.outline,
  '--border': tx.outlineVariant,
  '--accent': tx.primary,
  '--accent-fg': tx.onPrimary,
} as unknown as Record<string, string>;
