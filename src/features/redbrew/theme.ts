/**
 * Red Brew's tokens, from the Vibrant Brew Pulse design system it shipped with.
 *
 * Like the Kinetic bundle, all six screens share one `tailwind.config` and it
 * matches `DESIGN.md`'s frontmatter, so there is no per-screen palette drift to
 * reconcile. What needs resolving is the usual frontmatter-versus-prose split,
 * and here it is a real disagreement rather than Material 3 naming:
 *
 * | thing   | frontmatter                  | prose                    |
 * |---------|------------------------------|--------------------------|
 * | crimson | `primary-container: #e61e2a` | "Primary `#E61E2A`"      |
 * | ink     | `on-surface: #1b1c1a`        | "Secondary `#1E1E1E`"    |
 * | canvas  | `surface: #fbf9f5`           | "`#FBF9F5`"              |
 *
 * The crimson and the canvas agree, so both are settled. On ink the prose's
 * `#1e1e1e` is a neutral charcoal while the frontmatter's `#1b1c1a` carries a
 * green cast; sampling the renders gives the frontmatter's value, and it is the
 * one the markup's `text-on-surface` resolves to, so that wins. The prose's
 * `#1e1e1e` survives as nothing — they are two points apart and no screen shows
 * both.
 *
 * The prose also names three accents the frontmatter has no slot for — a mint
 * promo green, an amber tracking status, and a recessed input fill. Those are
 * kept under their own names, because the frontmatter's `tertiary` is a much
 * darker `#006a48` that the screens never use for a promo chip.
 *
 * Every screen is laid out at 20dp margins against a 393dp harness, so the
 * markup's CSS pixels are carried across as dp unchanged.
 */
export const rb = {
  // ---- canvas & surfaces -------------------------------------------------
  /** The warm almond cream the whole app sits on. */
  bg: '#fbf9f5',
  /** Elevated cards. */
  surface: '#ffffff',
  /** Recessed inputs, secondary containers, inactive segment track. */
  surfaceLow: '#f5f3ef',
  surfaceContainer: '#efeeea',
  surfaceHigh: '#eae8e4',
  surfaceHighest: '#e4e2de',
  surfaceDim: '#dbdad6',
  /** The hairline the spec puts around every Level 1 card. */
  hairline: 'rgba(30,30,30,0.06)',

  // ---- ink ---------------------------------------------------------------
  /** Headlines and body copy. Never pure black, per the spec. */
  ink: '#1b1c1a',
  /** Secondary copy. */
  secondary: '#5f5e5e',
  /** The warm brown-grey the spec calls `on-surface-variant`. */
  variant: '#5d3f3c',
  outline: '#926e6b',
  outlineVariant: '#e7bdb9',
  inverseSurface: '#30312e',
  inverseOnSurface: '#f2f0ed',

  // ---- crimson -----------------------------------------------------------
  /** The brand driver: CTAs, prices, active tabs, the logo mark. */
  crimson: '#e61e2a',
  /** The deeper stop, for a gradient or a pressed state. */
  crimsonDeep: '#bd001a',
  /** The palest crimson wash, behind an active segment or a small mark. */
  crimsonTint: '#ffdad6',
  /** The tinted fill an active segmented card takes. */
  crimsonSurface: '#fff5f5',
  onCrimson: '#ffffff',

  // ---- the prose's three extra accents ------------------------------------
  /** Mint, reserved for discounts, free delivery and delivered badges. */
  mint: '#10b981',
  mintTint: '#d6fae8',
  /** Amber, strictly for in-flight order status. */
  amber: '#f59e0b',
  amberTint: '#fef3c7',

  error: '#ba1a1a',
  errorContainer: '#ffdad6',
} as const;

/**
 * Two families, as the spec specifies — no substitution in either.
 *
 * Space Grotesk carries display and hero messaging, set uppercase; Plus Jakarta
 * Sans carries everything else. Google Fonts has both. Space Grotesk stops at
 * 700 while the brand lockup asks for 900, so the wordmark is Bold with tracking
 * pulled in — the one place the type is not literally what the spec says.
 *
 * `symbols` is Material Symbols Outlined subset to the 51 icons this app uses
 * (see tools/subset-symbols.py), addressed by codepoint through `./symbols`.
 */
export const FONT = {
  displayBold: 'SpaceGrotesk_700Bold',
  displaySemi: 'SpaceGrotesk_600SemiBold',
  displayMedium: 'SpaceGrotesk_500Medium',

  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',

  symbols: 'RedbrewSymbols_400Regular',
} as const;

/**
 * The spec's type scale, verbatim. Its `letterSpacing` is given in `em`, which
 * React Native does not take — the values here are resolved to dp against each
 * size, so nothing downstream has to multiply.
 */
export const TYPE = {
  headlineXl: {
    fontFamily: FONT.displayBold,
    fontSize: 40,
    lineHeight: 44,
    letterSpacing: -0.8,
  },
  /** The handheld cut — what the screens actually use for a hero. */
  headlineXlMobile: {
    fontFamily: FONT.displayBold,
    fontSize: 30,
    lineHeight: 34,
    letterSpacing: -0.3,
  },
  headlineLg: {
    fontFamily: FONT.displayBold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: 0.26,
  },
  headlineMd: { fontFamily: FONT.displaySemi, fontSize: 20, lineHeight: 26 },

  titleLg: { fontFamily: FONT.bold, fontSize: 18, lineHeight: 24 },
  titleMd: { fontFamily: FONT.semibold, fontSize: 16, lineHeight: 22 },
  bodyLg: { fontFamily: FONT.medium, fontSize: 15, lineHeight: 22 },
  bodyMd: { fontFamily: FONT.regular, fontSize: 13, lineHeight: 18 },
  labelLg: { fontFamily: FONT.bold, fontSize: 14, lineHeight: 18, letterSpacing: 0.28 },
  labelMd: { fontFamily: FONT.semibold, fontSize: 12, lineHeight: 16, letterSpacing: 0.12 },
  labelSm: { fontFamily: FONT.bold, fontSize: 10, lineHeight: 14, letterSpacing: 0.3 },
} as const;

/** The spec's radii, in dp. */
export const R = {
  sm: 4,
  base: 8,
  md: 12,
  /** Cards and standard containers. */
  lg: 16,
  /** Sheets and slide-overs. */
  xl: 24,
  full: 9999,
} as const;

/** The spec's spacing, in dp. */
export const SP = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 20,
  xl: 28,
  xxl: 40,
  gutter: 16,
  gutterSm: 8,
  /** The outer page margin every screen holds to. */
  margin: 20,
} as const;

/**
 * The spec's four elevation levels, as style objects.
 *
 * Each carries `shadow*` and `elevation` together rather than a
 * `Platform.select`. The extra keys are inert on the platform that does not
 * read them, and a select is exactly the thing the web harness cannot verify.
 */
export const LEVEL = {
  /** Level 1 — white cards on the almond canvas. */
  card: {
    shadowColor: '#1e1e1e',
    shadowOpacity: 0.04,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  /** Level 2 — sheets rising from the bottom edge. */
  sheet: {
    shadowColor: '#1e1e1e',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -8 },
    elevation: 12,
  },
  /** Level 3 — the sticky CTA, with its crimson glow. */
  cta: {
    shadowColor: '#e61e2a',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 6 },
    elevation: 10,
  },
} as const;

/** Semantic overrides, so the shared primitives read on Red Brew's page. */
export const redbrewTheme = {
  '--bg': rb.bg,
  '--surface': rb.surface,
  '--fg': rb.ink,
  '--muted': rb.secondary,
  '--border': rb.surfaceHigh,
  '--accent': rb.crimson,
  '--accent-fg': rb.onCrimson,
} as unknown as Record<string, string>;
