/**
 * Lumina Learn's tokens, from the design system the showcase shipped with.
 *
 * The export is a Google Stitch bundle: a `DESIGN.md` carrying the full token
 * set, plus one `code.html` per screen laid out in Tailwind. The markup is the
 * authority for geometry — every size in it is an explicit px value, and the
 * screens are laid out at 390-412px against a 393dp harness, so those pixels
 * are carried across as dp unchanged.
 *
 * The four screens do *not* agree on the palette. Stitch generated each one in
 * its own pass, so each invented its own near-miss of the same two colours:
 *
 * | screen   | canvas    | lime      |
 * |----------|-----------|-----------|
 * | home     | `#f1f5ee` | `#a0eb3c` |
 * | chat     | `#eef4ea` | `#a3f338` |
 * | saved    | `#f5f9f1` | `#a7f242` |
 * | profile  | `#f4f7f0` | `#8ce635` |
 *
 * Those are drifts, not decisions — the spread is under 2% in lightness and no
 * screen shows two of them together. They are unified here on one canvas and
 * one lime, because four backgrounds in one app is the kind of thing the eye
 * catches the moment two screens sit side by side in a recording. The values
 * chosen are the ones `DESIGN.md` names, which is the only source in the bundle
 * that speaks for the app as a whole rather than for one screen.
 *
 * `DESIGN.md` itself disagrees with its own prose in the same way: the
 * frontmatter gives `surface: #f7fbf0` and `primary-container: #8ce635`, while
 * the prose names `#EEF4EC` and `#8CE635`. They agree on the lime, so the lime
 * is settled; for the canvas the prose's `#eef4ec` is taken, since it sits in
 * the middle of what the four screens actually render and the frontmatter's
 * `#f7fbf0` is lighter than any of them.
 */
export const ll = {
  // ---- canvas & surfaces -------------------------------------------------
  /** The pale sage the whole app sits on. */
  bg: '#eef4ec',
  /** Elevated cards, sheets, input wells. */
  surface: '#ffffff',
  /** The wash behind a progress track or a bookmark button — canvas on white. */
  surfaceSunken: '#f1f5ee',
  /** The mint a selected tool card is filled with. */
  mint: '#dcf0cf',
  /** The softer mint behind secondary chips. */
  mintSoft: '#e4f3de',

  // ---- ink ---------------------------------------------------------------
  /** Deep forest charcoal. Headlines, active pills, nav capsule. */
  ink: '#1a1c19',
  /** The near-black the hero headline is set in. */
  inkDeep: '#171d15',
  /** Secondary descriptions and inactive icons. */
  muted: '#73786f',
  /** The lightest moss grey — placeholders, dividers, disabled glyphs. */
  subtle: '#9ea89f',

  // ---- accent ------------------------------------------------------------
  /** The electric lime. Always carries ink, never white. */
  lime: '#8ce635',
  /** The darker stop of the promo banner's gradient, and a filled progress bar. */
  limeDark: '#78c928',
  /** The mascot orb, which runs brighter than the banner. */
  limeBright: '#a3f338',
  /** Ink on lime — the banner's body copy. */
  onLime: '#244b0c',

  // ---- hairlines ---------------------------------------------------------
  /** The 1px border on cards and chips. */
  border: '#e8efe3',
  /** The even fainter rule inside a card, above a progress row. */
  hairline: '#eef2ea',

  // ---- pastel accent pairs ------------------------------------------------
  // Each is a tint plus the ink drawn on it. Used for the small rounded icon
  // wells that label a subject: violet for maths, sky for English, and so on.
  violet: { tint: '#f2eefd', ink: '#7e5df6' },
  sky: { tint: '#e8f4fd', ink: '#30a9e5' },
  emerald: { tint: '#e8faed', ink: '#1db34f' },
  amber: { tint: '#fff4e3', ink: '#b4770e' },
  rose: { tint: '#fdeef0', ink: '#c0415a' },
  orange: { tint: '#fff2eb', ink: '#f67c32' },
  indigo: { tint: '#eef0fd', ink: '#5a63d8' },
} as const;

/**
 * Plus Jakarta Sans, which `DESIGN.md` sets every string in — no substitution,
 * the family is the real one and Google Fonts carries all five weights.
 */
export const FONT = {
  extrabold: 'PlusJakartaSans_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
} as const;

/**
 * The spec's type scale.
 *
 * `DESIGN.md` gives `letterSpacing` in `em`, which React Native does not take —
 * the values here are resolved to dp against each size, so nothing downstream
 * has to multiply.
 */
export const TYPE = {
  displayLg: { fontFamily: FONT.bold, fontSize: 40, lineHeight: 48, letterSpacing: -1.2 },
  displaySm: { fontFamily: FONT.bold, fontSize: 32, lineHeight: 40, letterSpacing: -0.8 },
  headlineLg: { fontFamily: FONT.semibold, fontSize: 28, lineHeight: 36, letterSpacing: -0.56 },
  headlineLgMobile: {
    fontFamily: FONT.semibold,
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.48,
  },
  headlineMd: { fontFamily: FONT.semibold, fontSize: 20, lineHeight: 28, letterSpacing: -0.3 },
  headlineSm: { fontFamily: FONT.semibold, fontSize: 18, lineHeight: 24, letterSpacing: -0.18 },
  bodyLg: { fontFamily: FONT.regular, fontSize: 16, lineHeight: 24, letterSpacing: -0.08 },
  bodyMd: { fontFamily: FONT.regular, fontSize: 14, lineHeight: 20 },
  bodySm: { fontFamily: FONT.regular, fontSize: 12, lineHeight: 16, letterSpacing: 0.12 },
  labelLg: { fontFamily: FONT.semibold, fontSize: 14, lineHeight: 20, letterSpacing: 0.14 },
  labelMd: { fontFamily: FONT.semibold, fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
  labelSm: { fontFamily: FONT.bold, fontSize: 11, lineHeight: 14, letterSpacing: 0.33 },
} as const;

/** The spec's radii, in dp. `base` is `rounded` with no suffix. */
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
  /** The outer page margin every screen holds to. */
  margin: 20,
} as const;

/**
 * The spec's three elevation tiers, as style objects.
 *
 * Each carries `shadow*` and `elevation` together rather than a
 * `Platform.select`. The extra keys are inert on the platform that does not
 * read them, and a select is exactly the thing the web harness cannot verify.
 *
 * The colour is the spec's warm-tinted `rgba(35, 54, 30, …)` rather than black,
 * which is what keeps a white card from looking grey against the sage.
 */
export const LEVEL = {
  /** Tailwind's `shadow-sm` — the barely-there lift on a small header button. */
  sm: {
    shadowColor: '#23361e',
    shadowOpacity: 0.06,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  /** Layer 1 — elevated white cards. Ultra-soft and diffused. */
  card: {
    shadowColor: '#23361e',
    shadowOpacity: 0.06,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  /** Layer 2 — the floating nav dock and persistent pill inputs. */
  floating: {
    shadowColor: '#1a2e16',
    shadowOpacity: 0.12,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  /** The lime CTA's own glow, which the banner button sits on. */
  lime: {
    shadowColor: '#88db25',
    shadowOpacity: 0.35,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
  },
} as const;

/** Semantic overrides, so the shared primitives read on Lumina's page. */
export const luminaTheme = {
  '--bg': ll.bg,
  '--surface': ll.surface,
  '--fg': ll.ink,
  '--muted': ll.muted,
  '--border': ll.border,
  '--accent': ll.lime,
  '--accent-fg': ll.ink,
} as unknown as Record<string, string>;
