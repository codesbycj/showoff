/**
 * Aura Financial's tokens, ported from the design system it shipped with.
 *
 * This showcase is unusual: it came with a written spec rather than only
 * screenshots, so the colours and the type scale are the spec's own values
 * rather than anything measured off a capture.
 *
 * Where the spec contradicts itself the screens decide. Its prose calls the
 * canvas `#FAFAFA` and the primary `#7C3AED`; its frontmatter says `#faf8ff`
 * and `#630ed4`, and sampling the four exports agrees with the frontmatter — a
 * lavender-white page and a deeper purple. So the frontmatter is what is used
 * here, and `primaryBright` keeps the `#7C3AED` the prose describes, which the
 * screens do use, but for buttons rather than for the card.
 */
export const au = {
  // surfaces, lightest to deepest
  surface: '#faf8ff',
  surfaceLowest: '#ffffff',
  surfaceLow: '#f2f3ff',
  surfaceContainer: '#eaedff',
  surfaceHigh: '#e2e7ff',
  surfaceHighest: '#dae2fd',
  surfaceDim: '#d2d9f4',

  // ink
  onSurface: '#131b2e',
  onSurfaceVariant: '#4a4455',
  outline: '#7b7487',
  outlineVariant: '#ccc3d8',

  // the obsidian used for inverted blocks
  inverse: '#283044',
  onInverse: '#eef0ff',
  /**
   * The floating nav's own dark, sampled off all four screens. The spec gives
   * two different values for it — `#0F172A` in the prose, `#283044` in the
   * frontmatter — and the exports agree with neither, so this is measured.
   */
  nav: '#1c2335',
  navMuted: '#8b93a8',

  // brand
  primary: '#630ed4',
  primaryBright: '#7c3aed',
  primaryTint: '#732ee4',
  onPrimary: '#ffffff',
  primaryFixed: '#eaddff',
  primaryFixedDim: '#d2bbff',
  onPrimaryContainer: '#ede0ff',

  // amber, for yield and premium markers
  secondary: '#855300',
  secondaryBright: '#fea619',
  secondaryFixed: '#ffddb8',
  secondaryFixedDim: '#ffb95f',
  onSecondaryContainer: '#684000',

  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',

  /** The card front runs this ramp; the card peeking behind it runs the amber one. */
  cardRamp: ['#732ee4', '#630ed4'] as const,
  amberRamp: ['#ffddb8', '#fea619'] as const,
} as const;

export const FONT = {
  /** Plus Jakarta Sans for headings, labels and money. */
  display: 'PlusJakartaSans_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  /** Inter for body copy, ledgers and metadata. */
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
} as const;

/**
 * The spec's type scale, mobile variants where it gives them. Sizes are the
 * spec's CSS pixels used directly as dp — it is a mobile-first design at about
 * this width, so the two coincide.
 */
export const TYPE = {
  displayLg: { fontFamily: FONT.bold, fontSize: 32, lineHeight: 38, letterSpacing: -0.8 },
  headlineLg: { fontFamily: FONT.bold, fontSize: 28, lineHeight: 34, letterSpacing: -0.56 },
  headlineMd: { fontFamily: FONT.semibold, fontSize: 22, lineHeight: 28, letterSpacing: -0.33 },
  headlineSm: { fontFamily: FONT.semibold, fontSize: 18, lineHeight: 24, letterSpacing: -0.18 },
  bodyLg: { fontFamily: FONT.body, fontSize: 16, lineHeight: 24 },
  bodyMd: { fontFamily: FONT.body, fontSize: 14, lineHeight: 20 },
  bodySm: { fontFamily: FONT.body, fontSize: 12, lineHeight: 16 },
  labelLg: { fontFamily: FONT.semibold, fontSize: 14, lineHeight: 18, letterSpacing: 0.14 },
  labelMd: { fontFamily: FONT.semibold, fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
  labelSm: { fontFamily: FONT.bold, fontSize: 10, lineHeight: 12, letterSpacing: 0.4 },
  numericHero: { fontFamily: FONT.display, fontSize: 36, lineHeight: 40, letterSpacing: -1.08 },
} as const;

/** The spec's radii and spacing, in dp. */
export const R = { sm: 8, md: 16, lg: 24, xl: 32, full: 9999 } as const;
export const SP = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32, margin: 20, gutter: 16 } as const;

/** Semantic overrides, so the shared primitives read on Aura's page. */
export const auraTheme = {
  '--bg': au.surface,
  '--surface': au.surfaceLowest,
  '--fg': au.onSurface,
  '--muted': au.onSurfaceVariant,
  '--border': au.outlineVariant,
  '--accent': au.primary,
  '--accent-fg': au.onPrimary,
} as unknown as Record<string, string>;
