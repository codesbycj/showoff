/**
 * Pesse's tokens, from the Neo-Kinetic Fintech design system it shipped with.
 *
 * Like Aura, this showcase came with a written spec as well as screens — and
 * like Aura's, the spec contradicts itself. Its frontmatter and its prose
 * disagree about the two colours that define the whole app:
 *
 * | thing    | frontmatter | prose      | the renders |
 * |----------|-------------|------------|-------------|
 * | canvas   | `#f9f9fb`   | `#F4F4F6`  | `#F9F9FB`   |
 * | obsidian | `#2f3132`   | `#111113`  | `#2F3132`   |
 *
 * Sampling all six exports agrees with the frontmatter on both, so that is what
 * is used here. The prose's darker obsidian is kept as `inkDeep`, because the
 * tab dock and the card face genuinely do run darker than `inverse` — just not
 * as dark as `#111113`.
 *
 * The other thing the spec gets wrong is `primary`. It names `#526600`, a deep
 * olive, as the primary and `#c4f000` as the *container*. Every screen uses the
 * lime as the accent and the olive only as text on top of it, so the names are
 * kept but nothing should reach for `primary` expecting the bright one.
 *
 * All six exports are laid out at 390dp and the harness renders 393dp, so the
 * markup's CSS pixels are carried across as dp unchanged.
 */
export const ps = {
  // surfaces, lightest to deepest
  surface: '#f9f9fb',
  surfaceLowest: '#ffffff',
  surfaceLow: '#f3f3f5',
  surfaceContainer: '#eeeef0',
  surfaceHigh: '#e8e8ea',
  surfaceHighest: '#e2e2e4',
  surfaceDim: '#d9dadc',

  // ink
  onSurface: '#1a1c1d',
  onSurfaceVariant: '#444933',
  secondary: '#5f5e60',
  outline: '#757a61',
  outlineVariant: '#c5c9ad',

  /** The obsidian the dark cards, banner and dock are painted in. */
  inverse: '#2f3132',
  onInverse: '#f0f0f2',
  /** The two greys that label things *on* obsidian — axis ticks, eyebrows. */
  tertiaryFixed: '#e2e2e2',
  tertiaryFixedDim: '#c6c6c7',
  /** The prose's deeper black, for the dock's own fill and card gradients. */
  inkDeep: '#1f2122',

  /** The electric lime. Always with obsidian text on it, never white. */
  lime: '#c4f000',
  limeBright: '#c7f30a',
  limeDim: '#aed500',
  onLime: '#566a00',
  /** The olive the spec calls `primary` — ink on lime, not a fill. */
  olive: '#526600',
  oliveDeep: '#3d4d00',
  oliveDarkest: '#171e00',

  // neutrals the prose names for micro-copy
  mutedText: '#8e8e93',
  mutedTextStrong: '#636366',
  hairline: '#ededf0',

  // semantic
  credit: '#27ae60',
  debit: '#ff3b30',
  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
} as const;

/**
 * Plus Jakarta Sans, which the spec sets everything in — no substitution, the
 * family is the real one.
 *
 * `symbols` is Material Symbols Outlined, subset to the 57 icons this app uses.
 * It is addressed by codepoint through `SYMBOL` in `./symbols`, never by name.
 */
export const FONT = {
  extrabold: 'PlusJakartaSans_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
  symbols: 'PesseSymbols_400Regular',
} as const;

/**
 * The spec's type scale, verbatim. Its `letterSpacing` is given in `em`, which
 * React Native does not take — the values here are resolved to dp against each
 * size, so nothing downstream has to multiply.
 */
export const TYPE = {
  /** The balance on the home screen. */
  display: { fontFamily: FONT.extrabold, fontSize: 44, lineHeight: 52, letterSpacing: -1.32 },
  headlineLg: { fontFamily: FONT.bold, fontSize: 36, lineHeight: 42, letterSpacing: -0.9 },
  /** The handheld cut of the above — what the screens actually use. */
  headlineLgMobile: { fontFamily: FONT.bold, fontSize: 30, lineHeight: 36, letterSpacing: -0.6 },
  headlineMd: { fontFamily: FONT.bold, fontSize: 22, lineHeight: 28, letterSpacing: -0.33 },
  headlineSm: { fontFamily: FONT.semibold, fontSize: 18, lineHeight: 24, letterSpacing: -0.18 },
  bodyLg: { fontFamily: FONT.medium, fontSize: 16, lineHeight: 22, letterSpacing: -0.08 },
  bodyMd: { fontFamily: FONT.regular, fontSize: 14, lineHeight: 20 },
  bodySm: { fontFamily: FONT.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.12 },
  labelLg: { fontFamily: FONT.semibold, fontSize: 15, lineHeight: 20 },
  labelMd: { fontFamily: FONT.semibold, fontSize: 13, lineHeight: 18, letterSpacing: 0.13 },
  labelSm: { fontFamily: FONT.semibold, fontSize: 11, lineHeight: 14, letterSpacing: 0.22 },
} as const;

/** The spec's radii, in dp. `DEFAULT` is `rounded` with no suffix. */
export const R = {
  sm: 8,
  base: 16,
  md: 24,
  lg: 32,
  xl: 48,
  full: 9999,
} as const;

/** The spec's spacing, in dp. */
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
 * The spec's four elevation tiers, as style objects.
 *
 * Each carries `shadow*` and `elevation` together rather than a
 * `Platform.select`. The extra keys are inert on the platform that does not read
 * them, and a select is exactly the thing the web harness cannot verify.
 */
export const LEVEL = {
  /** Container modules — white surfaces with an ultra-diffused ambient drop. */
  container: {
    shadowColor: '#111113',
    shadowOpacity: 0.04,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  /** Tactile cards — heavier and more directional. */
  card: {
    shadowColor: '#111113',
    shadowOpacity: 0.12,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 14 },
    elevation: 8,
  },
  /** Floating controls — the dock and the bottom CTA bar. */
  floating: {
    shadowColor: '#111113',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
} as const;

/** Semantic overrides, so the shared primitives read on Pesse's page. */
export const pesseTheme = {
  '--bg': ps.surface,
  '--surface': ps.surfaceLowest,
  '--fg': ps.onSurface,
  '--muted': ps.secondary,
  '--border': ps.hairline,
  '--accent': ps.lime,
  '--accent-fg': ps.onSurface,
} as unknown as Record<string, string>;
