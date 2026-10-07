/**
 * Volt's tokens.
 *
 * A Google Stitch export with a full `DESIGN.md` — a Material-style token set as
 * YAML frontmatter, then prose describing it. As with Aura Legal, the two
 * disagree, and sampling the renders settles it for the frontmatter every time:
 *
 *   canvas          prose #0E1110   frontmatter #111413   renders #111413
 *   card bedding    prose #141716   frontmatter #191c1b   renders #191C1B
 *   elevated card   prose #1C221F   frontmatter #1d201f   renders #1D201F
 *   electric lime   prose #D4FF00   frontmatter #caf300   renders #CAF300
 *
 * So the prose is treated as commentary on intent rather than as values. It is
 * still worth reading for that intent — it is the prose, not the token names,
 * that says lime is "reserved strictly for active states" and red is for "live
 * streaming dots, penalty statuses, urgent risk indicators".
 *
 * The one place a prose value survives is the brand mark. The export ships that
 * as literal SVG (see `components/volt-mark.tsx`) painted in `#D4FF00` on
 * `#141716` — both prose values — and a brand asset delivered as code is taken
 * as drawn rather than recoloured to match the UI. The two limes are four points
 * apart and do not read as different on screen.
 *
 * Names are kept in the design system's own Material vocabulary. This export is
 * a design system; the token names are part of what is being rebuilt.
 */
export const vt = {
  // surfaces, deepest to brightest
  surface: '#111413',
  surfaceContainerLowest: '#0c0f0e',
  surfaceContainerLow: '#191c1b',
  surfaceContainer: '#1d201f',
  surfaceContainerHigh: '#282b29',
  surfaceContainerHighest: '#323534',
  surfaceBright: '#373a38',
  surfaceVariant: '#323534',

  // ink
  onSurface: '#e1e3e1',
  onSurfaceVariant: '#c5c9ac',
  outline: '#8f9378',
  outlineVariant: '#444932',

  /** Electric volt lime: active states, live alerts, primary actions. */
  primaryContainer: '#caf300',
  onPrimaryContainer: '#596c00',
  onPrimary: '#2a3400',
  primaryFixed: '#caf300',
  primaryFixedDim: '#b0d500',
  onPrimaryFixed: '#171e00',
  surfaceTint: '#b0d500',
  /** `primary` is plain white in this system, not the lime. */
  primary: '#ffffff',

  // muted sage, for secondary chrome
  secondary: '#c1c8c3',
  secondaryContainer: '#464d49',
  onSecondary: '#2b322f',
  onSecondaryContainer: '#b6bdb9',

  /** Pulse red: live dots, red cards, countdowns, risk. */
  tertiaryContainer: '#ffdad5',
  onTertiaryContainer: '#ca0a0f',
  tertiaryFixedDim: '#ffb4aa',
  error: '#ffb4ab',

  white: '#ffffff',
  black: '#000000',
} as const;

/**
 * `rgba` from a `#rrggbb` and an alpha.
 *
 * The design leans on translucency throughout — `border-white/8`,
 * `bg-primary-container/35`, the glass panels over the video — and React Native
 * has no `/alpha` syntax, so each becomes a call to this.
 */
export function alpha(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * Space Grotesk for display and numerals, Plus Jakarta Sans for running text.
 *
 * Both are named by the spec and both were already registered here — Space
 * Grotesk for Red Brew, Plus Jakarta for Affirm, VoteNG, Voyago and Aura Legal
 * — so the type matches outright and this showcase adds no text face, only its
 * icon subset.
 *
 * The spec also asks for "Space Grotesk Bold Italic" on one hero phrase. That
 * face does not exist: Space Grotesk ships upright only, and the reference's
 * own render is a browser-synthesised oblique. It is rebuilt as a skew — see
 * `components/hero-title.tsx`.
 */
export const FONT = {
  // Space Grotesk — display, scores, odds, labels
  displayBold: 'SpaceGrotesk_700Bold',
  displaySemi: 'SpaceGrotesk_600SemiBold',
  displayMedium: 'SpaceGrotesk_500Medium',
  // Plus Jakarta Sans — body
  bodyBold: 'PlusJakartaSans_700Bold',
  bodySemi: 'PlusJakartaSans_600SemiBold',
  bodyMedium: 'PlusJakartaSans_500Medium',
  bodyRegular: 'PlusJakartaSans_400Regular',
  /** Material Symbols Outlined, cut down to this showcase's 55 glyphs. */
  symbol: 'VoltSymbols_400Regular',
} as const;

/**
 * The spec's named type scale, carried across verbatim.
 *
 * `letterSpacing` is given in `em` by the spec and resolved to dp here, since
 * React Native takes an absolute value.
 */
export const TYPE = {
  headlineXl: {
    fontFamily: FONT.displayBold,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -1.2,
  },
  headlineXlMobile: {
    fontFamily: FONT.displayBold,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.6,
  },
  headlineLg: {
    fontFamily: FONT.displaySemi,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.52,
  },
  headlineMd: {
    fontFamily: FONT.displaySemi,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.2,
  },
  bodyLg: { fontFamily: FONT.bodyMedium, fontSize: 16, lineHeight: 24 },
  bodyMd: { fontFamily: FONT.bodyRegular, fontSize: 14, lineHeight: 20 },
  bodySm: { fontFamily: FONT.bodyRegular, fontSize: 12, lineHeight: 16 },
  labelLg: { fontFamily: FONT.displayBold, fontSize: 14, lineHeight: 18, letterSpacing: 0.28 },
  labelMd: { fontFamily: FONT.displaySemi, fontSize: 12, lineHeight: 16, letterSpacing: 0.48 },
  labelSm: { fontFamily: FONT.displayBold, fontSize: 10, lineHeight: 12, letterSpacing: 0.6 },
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
 * The spec's spacing scale. `margin` and `gutter` are both 16dp on mobile — the
 * tablet and desktop steps in the spec are not used, since this rebuild is one
 * phone width.
 */
export const SP = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 32,
  gutter: 16,
  margin: 16,
} as const;

/** Semantic overrides, so the shared primitives read on Volt's page. */
export const voltTheme = {
  '--bg': vt.surface,
  '--surface': vt.surfaceContainer,
  '--fg': vt.onSurface,
  '--muted': vt.outline,
  '--border': alpha(vt.white, 0.08),
  '--accent': vt.primaryContainer,
  '--accent-fg': vt.onPrimaryFixed,
} as unknown as Record<string, string>;
