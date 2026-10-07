/**
 * Nova's tokens, recovered from the Stitch export's six `tailwind.config` blocks.
 *
 * Unlike the Lumina bundle, this export ships no `DESIGN.md` — there is no file
 * that speaks for the app as a whole, only six screens that were each generated
 * in their own pass and each invented their own near-miss of the same palette:
 *
 * | screen     | lime      | blue      | dark      | canvas    |
 * |------------|-----------|-----------|-----------|-----------|
 * | onboarding | `#c8f135` | —         | `#121417` | —         |
 * | dashboard  | `#d8fb35` | `#2b6bf8` | `#111317` | `#f8f9fa` |
 * | wallet     | `#d2f832` | `#2768ff` | `#111216` | `#f8f9fb` |
 * | trade      | `#b7f347` | `#2f66f6` | `#141416` | `#f8f9fa` |
 * | activity   | `#d3f455` | `#3b72ff` | —         | `#f8f9fa` |
 * | settings   | `#b8f243` | `#2c64e8` | `#121212` | `#f8f9fb` |
 *
 * With no spec to defer to, the tiebreaker is what the renders actually draw.
 * Sampling all six PNGs, `#c8f135` is the lime that recurs in four of them — it
 * is the bottom-dock pill and the onboarding button, the places the accent
 * carries the most area — while `#d8fb35` and `#b7f347` each appear on one
 * screen only. So the shared value is taken, not a median of six.
 *
 * Blue goes the same way: the sampled hero card is `rgb(43,107,248)` on the
 * dashboard and within two points of it on the wallet and trade screens, so the
 * dashboard's `#2b6bf8` stands for all three.
 *
 * `limeChart` stays separate at `#c3f755`. That one is not drift — it is the
 * trade screen's chart panel, deliberately a shade softer than the accent so a
 * black plot line reads against it.
 *
 * Every screen is laid out between 390 and 400px against a 393dp harness, so the
 * markup's CSS pixels are carried across as dp unchanged.
 */
export const nv = {
  // ---- canvas & surfaces -------------------------------------------------
  /** The near-white the five light screens sit on. */
  bg: '#f8f9fa',
  /** Cards, sheets, dock. */
  surface: '#ffffff',
  /** The grey a pill or an inactive chip sits in. */
  surfaceSunken: '#f3f4f6',

  // ---- ink ---------------------------------------------------------------
  /** Primary text, dark buttons, the active filter chip. */
  ink: '#111317',
  /** The dark promo banner, one step off pure ink. */
  inkCard: '#171920',
  /** Secondary labels. */
  muted: '#8e94a0',
  /** The lightest grey — timestamps, ticker symbols, placeholders. */
  subtle: '#9ca3af',
  /** Hairlines between rows and around chips. */
  border: '#f1f2f4',

  // ---- onboarding (the one dark screen) ----------------------------------
  onboardBg: '#121417',
  /** The Start button's capsule. */
  onboardCard: '#1b1e22',

  // ---- accents -----------------------------------------------------------
  /** The electric lime. Always carries ink, never white. */
  lime: '#c8f135',
  /** Pressed / hover, and the peeking layer behind the hero card. */
  limeDark: '#b8e024',
  /** The trade chart's panel — softer, so a black plot line reads on it. */
  limeChart: '#c3f755',

  /** The royal blue every balance card is painted in. */
  blue: '#2b6bf8',
  blueDark: '#1e51d3',
  /** The lighter blue of the blurred orb inside the card. */
  blueGlow: '#4c85ff',
  /** Muted white for copy sitting on blue. */
  onBlue: 'rgba(255,255,255,0.75)',

  // ---- semantic ----------------------------------------------------------
  gainBg: '#ecfdf3',
  gainInk: '#027a48',
  /** The stronger green a sparkline is drawn in. */
  gainLine: '#12b76a',
  lossBg: '#fef3f2',
  lossInk: '#d92d20',
  /** The notification dot. */
  alert: '#ff5c38',
} as const;

/**
 * Per-asset brand colours and the tinted well each mark sits in.
 *
 * Taken from each project's own brand sheet rather than from the export, which
 * only tints three of the six. Kept here rather than in the data files so a
 * coin cannot end up with a fill on one screen and a different one on the next.
 */
export const COIN = {
  BTC: { ink: '#f7931a', tint: '#fff6ee', edge: '#ffe7d1' },
  ETH: { ink: '#627eea', tint: '#f0f2fd', edge: '#e0e5fb' },
  SOL: { ink: '#9945ff', tint: '#f6eefd', edge: '#ecdbf9' },
  UNI: { ink: '#ff007a', tint: '#fff0f5', edge: '#fedbe8' },
  DOGE: { ink: '#c2a633', tint: '#fdf8e7', edge: '#f6ecc9' },
  ADA: { ink: '#0033ad', tint: '#eef2fd', edge: '#dbe3f9' },
} as const;

export type CoinKey = keyof typeof COIN;

/**
 * Plus Jakarta Sans, which all six screens set every string in — no
 * substitution, the family is the real one and Google Fonts carries it.
 */
export const FONT = {
  extrabold: 'PlusJakartaSans_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
} as const;

/**
 * The type scale, read off the markup's own sizes rather than a spec — there is
 * no `DESIGN.md` here to name them. `letterSpacing` is resolved to dp, since
 * React Native does not take `em`.
 */
export const TYPE = {
  /** The onboarding headline, one word per line. */
  display: { fontFamily: FONT.extrabold, fontSize: 44, lineHeight: 47, letterSpacing: -1.3 },
  /** The balance on every wallet card. */
  balance: { fontFamily: FONT.extrabold, fontSize: 32, lineHeight: 34, letterSpacing: -0.9 },
  /** A screen title — "Activity", "Settings". */
  title: { fontFamily: FONT.extrabold, fontSize: 24, lineHeight: 30, letterSpacing: -0.6 },
  headingLg: { fontFamily: FONT.bold, fontSize: 18, lineHeight: 24, letterSpacing: -0.36 },
  heading: { fontFamily: FONT.extrabold, fontSize: 16, lineHeight: 22, letterSpacing: -0.32 },
  bodyLg: { fontFamily: FONT.semibold, fontSize: 15, lineHeight: 20, letterSpacing: -0.15 },
  body: { fontFamily: FONT.bold, fontSize: 14, lineHeight: 19, letterSpacing: -0.14 },
  bodyRegular: { fontFamily: FONT.regular, fontSize: 14, lineHeight: 21 },
  label: { fontFamily: FONT.bold, fontSize: 12, lineHeight: 16, letterSpacing: -0.12 },
  labelMedium: { fontFamily: FONT.medium, fontSize: 12, lineHeight: 16 },
  caption: { fontFamily: FONT.semibold, fontSize: 11, lineHeight: 15 },
  micro: { fontFamily: FONT.bold, fontSize: 10, lineHeight: 14, letterSpacing: 0.2 },
} as const;

/** Radii, in dp. The design is built on very large corners. */
export const R = {
  sm: 8,
  md: 12,
  base: 16,
  lg: 22,
  xl: 28,
  dock: 32,
  full: 9999,
} as const;

/** Spacing, in dp. */
export const SP = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  /** The outer page margin every screen holds to. */
  margin: 20,
} as const;

/**
 * Elevation tiers, as style objects.
 *
 * Each carries `shadow*` and `elevation` together rather than a
 * `Platform.select`. The extra keys are inert on the platform that does not
 * read them, and a select is exactly the thing the web harness cannot verify.
 */
export const LEVEL = {
  /** The barely-there lift on a white header button or a small pill. */
  sm: {
    shadowColor: '#0b1020',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  /** A white list card. */
  card: {
    shadowColor: '#0b1020',
    shadowOpacity: 0.05,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  /** The floating bottom dock. */
  dock: {
    shadowColor: '#0b1020',
    shadowOpacity: 0.1,
    shadowRadius: 28,
    shadowOffset: { width: 0, height: 10 },
    elevation: 12,
  },
  /** The blue balance card's own coloured glow. */
  blue: {
    shadowColor: '#2b6bf8',
    shadowOpacity: 0.3,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 10 },
    elevation: 8,
  },
} as const;

/** Semantic overrides, so the shared primitives read on Nova's page. */
export const novaTheme = {
  '--bg': nv.bg,
  '--surface': nv.surface,
  '--fg': nv.ink,
  '--muted': nv.muted,
  '--border': nv.border,
  '--accent': nv.lime,
  '--accent-fg': nv.ink,
} as unknown as Record<string, string>;
