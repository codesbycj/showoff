/**
 * PulseFit's tokens.
 *
 * The reference is a Google Stitch export — `ref/pulsefit/code.html` plus the
 * `DESIGN.md` whose frontmatter carries the whole token set. The markup is the
 * authority here, not the PNG: every size in it is an explicit Tailwind px
 * value, so there is nothing to measure and nothing to convert.
 *
 * So the numbers below were not read off a screenshot at all. The export was
 * reloaded in headless Chrome at a 393px viewport — the harness's own width —
 * and every element's `getBoundingClientRect` and computed style taken
 * straight out of the DOM: exact boxes, exact resolved letter-spacing, exact
 * composited fills. The PNG was then sampled only to confirm the few colours
 * the markup leaves to a gradient or an alpha blend.
 *
 * **`screen.png` is a 390px render, not a 393px one**, and that is worth
 * knowing before trusting a measurement taken off it. Re-rendering the markup
 * at 390 / 393 / 396 / 400 / 412 and diffing each against the PNG picks 390
 * out cleanly — mean channel error 3.9 against 11.5 for the next best. Read at
 * 393 it looks like a uniform 0.75% scale error, which reads as everything
 * sitting 2-3dp low by the bottom of the screen and is easy to mistake for
 * drift in the build. Every value here is width-independent, so none of them
 * changes; what changes is the three derived widths — the content column is
 * 361 on the harness against the export's 358, a card 174.5 against 173 — and
 * those are laid out rather than written down.
 *
 * Where `DESIGN.md`'s prose and its frontmatter disagree they are treated the
 * usual way round: the frontmatter wins, the prose is commentary. The prose
 * calls the lime `#84CC16` "Primary Base"; the frontmatter calls the same hex
 * `primary-container` and reserves `primary` for the deep `#416900` the nav's
 * active label and the "See all" link are set in. Both names are kept below so
 * a value can be traced back to the file it came from.
 */

/** Colours. Each is either a literal in the markup or a resolved composite. */
export const pf = {
  // ---- canvas ------------------------------------------------------------
  /** The page, and the header bar that sits over it at 85% of the same hex. */
  canvas: '#F7F9FB',
  /** Every card: `surface-container-lowest`. */
  surface: '#FFFFFF',
  /** The calendar chevrons and a meal row's `+`: `surface-container-low`. */
  surfaceLow: '#F2F4F6',

  // ---- ink ---------------------------------------------------------------
  /** Headings, metric figures, the glyph on the lime FAB: `on-surface`. */
  ink: '#191C1E',
  /** Icons and small labels on the canvas: `on-surface-variant`. */
  inkVariant: '#424936',
  /** Body labels, units, the greeting's overline: `secondary`. */
  muted: '#565E74',

  // ---- lime --------------------------------------------------------------
  /** The deep lime text tone — the active nav item, "See all": `primary`. */
  primary: '#416900',
  /** The brand lime — logo, FAB, active day, progress arc, status dot. */
  lime: '#84CC16',
  /** Ink on a lime fill: the badge's label and the active day's letter. */
  onLime: '#315200',
  /** The glow blob behind the hero's bottom-right: `primary-fixed`. */
  limeGlow: '#ACF847',

  // ---- the hero's ramp ---------------------------------------------------
  // `bg-gradient-to-br from-[#ECFCCB] via-[#E2F8B7] to-[#D9F99D]`. Sampling
  // the render agrees: its two off-diagonal corners both read #E1F8B3/#E2F8B8,
  // i.e. the `via` stop, which is what makes a plain corner-to-corner ramp the
  // right reading of `to-br` on a box this shape.
  heroFrom: '#ECFCCB',
  heroVia: '#E2F8B7',
  heroTo: '#D9F99D',

  // ---- telemetry accents -------------------------------------------------
  /** The footprint and the flame: `tertiary`. */
  orange: '#9D4300',
  /** Their disc. `tertiary-fixed` #FFDBCA at 60% over white. */
  orangeTintStrong: '#FFE9DF',
  /** The same tint at 50%, which is what a meal row's 16dp flame disc uses. */
  orangeTint: '#FFEDE5',
  /** The water drop. Set as a literal `text-[#0284c7]` in the markup. */
  blue: '#0284C7',
  /** Its disc. `secondary-container` #DAE2FD at 70% over white. */
  blueTint: '#E5EBFE',

  // ---- odds --------------------------------------------------------------
  /** The unread dot on the reminders button: `tertiary` again. */
  dot: '#9D4300',
  /** The ring round an avatar or a meal thumbnail. */
  ring: '#FFFFFF',
  /** The progress ring's track: white at 80% over the hero's ramp. */
  ringTrack: 'rgba(255,255,255,0.8)',
} as const;

/**
 * Plus Jakarta Sans, which the design names outright — so there is no
 * substitute to fit here and nothing runs 10-15% wide.
 *
 * Registered per weight, because React Native resolves a face by family name
 * and not by a numeric weight. Four weights are enough for this screen: the
 * 400 the `body-md` token describes is never set on it.
 */
export const FONT = {
  medium: 'PlusJakartaSans_500Medium',
  semibold: 'PlusJakartaSans_600SemiBold',
  bold: 'PlusJakartaSans_700Bold',
  extrabold: 'PlusJakartaSans_800ExtraBold',
} as const;

/**
 * The type scale, as the reference resolves it.
 *
 * `DESIGN.md` gives letter-spacing in `em` and the markup then overrides the
 * tracking on most strings, so every value below is the *resolved* px that
 * Chrome computed for that exact element rather than the token's own. Where
 * two entries share a size and differ only in tracking, that difference is
 * real: "Sajibur Rahman" is `tracking-tight` at -0.45 and "August 2025" is the
 * `headline-sm` token's own -0.18, and they sit four cards apart.
 */
export const TYPE = {
  /** "PULSEFIT" — `label-sm` uppercase at `tracking-wider`. */
  brandOverline: { fontFamily: FONT.bold, fontSize: 11, lineHeight: 14, letterSpacing: 0.55 },
  /** "Home" — `headline-sm` at `leading-tight`, the only 22.5 on the screen. */
  brandTitle: { fontFamily: FONT.semibold, fontSize: 18, lineHeight: 22.5, letterSpacing: -0.18 },

  /** "Good morning!" — `label-sm` with its tracking reset to normal. */
  overline: { fontFamily: FONT.bold, fontSize: 11, lineHeight: 14, letterSpacing: 0 },
  /** "Sajibur Rahman", "Breakfast" — 18 extrabold/bold at `tracking-tight`. */
  name: { fontFamily: FONT.extrabold, fontSize: 18, lineHeight: 24, letterSpacing: -0.45 },
  /** A meal's name: the same box, one weight down. */
  mealName: { fontFamily: FONT.bold, fontSize: 18, lineHeight: 24, letterSpacing: -0.45 },
  /** "August 2025", "Today's Meals" — `headline-sm` keeping its own tracking. */
  section: { fontFamily: FONT.extrabold, fontSize: 18, lineHeight: 24, letterSpacing: -0.18 },

  /** The hero's "Your Weekly Progress" — `headline-lg` at `leading-tight`. */
  hero: { fontFamily: FONT.extrabold, fontSize: 24, lineHeight: 30, letterSpacing: -0.6 },
  /** A metric's figure — the same face at the token's own 32dp line. */
  metric: { fontFamily: FONT.extrabold, fontSize: 24, lineHeight: 32, letterSpacing: -0.6 },
  /** The "6" inside the ring — `headline-sm` extrabold at `leading-none`. */
  ringValue: { fontFamily: FONT.extrabold, fontSize: 18, lineHeight: 18, letterSpacing: -0.18 },

  /** "86% streak achieved!", "steps", "glass" — `body-sm` at medium. */
  body: { fontFamily: FONT.medium, fontSize: 13, lineHeight: 18, letterSpacing: 0.13 },
  /** A metric card's two-line title — `label-md` at `leading-tight`. */
  tileLabel: { fontFamily: FONT.semibold, fontSize: 12, lineHeight: 15, letterSpacing: 0.24 },
  /** "456 - 512 kcal" — `label-md` at its own 16dp line. */
  kcal: { fontFamily: FONT.semibold, fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },
  /** "See all" — the same size, bold, in the deep lime. */
  link: { fontFamily: FONT.bold, fontSize: 12, lineHeight: 16, letterSpacing: 0.24 },

  /** A calendar date — `label-lg`. */
  date: { fontFamily: FONT.bold, fontSize: 14, lineHeight: 18, letterSpacing: 0.14 },
  /** The selected date, one weight up. */
  dateActive: { fontFamily: FONT.extrabold, fontSize: 14, lineHeight: 18, letterSpacing: 0.14 },
  /** A weekday letter, "days", "Scan" — `label-sm` at semibold. */
  micro: { fontFamily: FONT.semibold, fontSize: 11, lineHeight: 14, letterSpacing: 0.44 },
  /** The same box at extrabold: the selected day's letter. */
  microActive: { fontFamily: FONT.extrabold, fontSize: 11, lineHeight: 14, letterSpacing: 0.44 },
  /** "Daily intake", and every dock label — `label-sm` bold. */
  label: { fontFamily: FONT.bold, fontSize: 11, lineHeight: 14, letterSpacing: 0.44 },
  /** The badge's own label, which is `tracking-wide` rather than `label-sm`. */
  badge: { fontFamily: FONT.bold, fontSize: 11, lineHeight: 14, letterSpacing: 0.275 },
} as const;

/**
 * Radii, in dp.
 *
 * The design's `rounded-lg` is redefined as 2rem, so "lg" here means 32 and
 * every card on the page carries it — including the 68dp-tall meal rows, where
 * it is most of the way to a pill. That is the design, not a stray value.
 */
export const R = {
  /** Every card, and the hero. */
  card: 32,
  /** A calendar day cell (`rounded-2xl`) and the dock's FAB. */
  chip: 16,
  /** The brand mark's squircle. */
  mark: 10,
  full: 999,
} as const;

/**
 * Shadows.
 *
 * Each carries the `shadow*` keys and `elevation` in one object rather than a
 * `Platform.select`, so nothing is hidden from the web harness — the keys the
 * running platform does not read are inert. CSS blur maps to `shadowRadius` at
 * half, since RN's radius is a standard deviation and CSS's is twice one; the
 * negative spreads in the source have no RN equivalent and are dropped.
 */
export const LEVEL = {
  /** The header bar: `0 1px 8px rgba(0,0,0,0.04)`. */
  header: {
    shadowColor: '#000000',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 1 },
    elevation: 2,
  },
  /** Every card and tile: `0 4px 20px -2px rgba(15,23,42,0.04)`. */
  card: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  },
  /** The hero's lime-tinted lift: `0 8px 24px -4px rgba(132,204,22,0.22)`. */
  hero: {
    shadowColor: pf.lime,
    shadowOpacity: 0.22,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  /** The greeting avatar: `0 4px 12px rgba(15,23,42,0.08)`. */
  avatar: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  /** The header's small avatar: `0 2px 6px -1px rgba(15,23,42,0.12)`. */
  avatarSm: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.12,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  /** The two round buttons beside the greeting: `0 2px 8px rgba(15,23,42,0.04)`. */
  button: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  /** A meal thumbnail: `0 2px 8px rgba(0,0,0,0.12)`. */
  thumb: {
    shadowColor: '#000000',
    shadowOpacity: 0.12,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  /** The selected calendar day: `0 4px 12px rgba(132,204,22,0.35)`. */
  activeDay: {
    shadowColor: pf.lime,
    shadowOpacity: 0.35,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  /** The dock's quick-add: `0 8px 20px -2px rgba(132,204,22,0.45)`. */
  fab: {
    shadowColor: pf.lime,
    shadowOpacity: 0.45,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  /** The dock itself, lifting upward: `0 -4px 24px rgba(15,23,42,0.06)`. */
  dock: {
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -4 },
    elevation: 12,
  },
} as const;

/** Semantic overrides, so the shared primitives read on PulseFit's page. */
export const pulsefitTheme = {
  '--bg': pf.canvas,
  '--surface': pf.surface,
  '--fg': pf.ink,
  '--muted': pf.muted,
  '--border': pf.surfaceLow,
  '--accent': pf.lime,
  '--accent-fg': pf.ink,
} as unknown as Record<string, string>;
