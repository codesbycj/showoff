/**
 * Kinetic Courier's tokens, from the design system the showcase shipped with.
 *
 * This export is the well-behaved one. Unlike the Lumina and Nova bundles, all
 * five screens share a single `tailwind.config` — byte-identical, and matching
 * `DESIGN.md`'s frontmatter exactly. There is no per-screen palette drift to
 * reconcile, so nothing here is a judgement call about which of six near-miss
 * limes to keep.
 *
 * What does need resolving is the usual frontmatter-versus-prose split, and it
 * turns out not to be a contradiction:
 *
 * | thing   | frontmatter                     | prose                    |
 * |---------|---------------------------------|--------------------------|
 * | canvas  | `surface: #f8f9fb`              | "Canvas Neutral #F6F8FA" |
 * | accent  | `primary: #b42901`              | "Primary Accent #FF5E36" |
 * |         | `primary-container: #ff5e36`    |                          |
 *
 * The canvas goes to the frontmatter: `#f8f9fb` is what the shared config sets
 * and what the page's own `<style>` paints the body, so it is what renders.
 *
 * The accent is not a conflict at all — it is Material 3 naming. Counting the
 * markup, `primary-container` (#ff5e36, the coral) carries 49 fills against
 * `primary` (#b42901, the deep rust) at 10, and the rust is used for glyph tint
 * and the avatar disc rather than for surfaces. Both are kept, under names that
 * say which is which: `coral` fills, `rust` tints.
 *
 * Every screen is laid out at 20dp margins against a 393dp harness, so the
 * markup's CSS pixels are carried across as dp unchanged.
 */
export const kc = {
  // ---- canvas & surfaces -------------------------------------------------
  /** The cool off-white the app sits on. */
  bg: '#f8f9fb',
  /** Cards and sheets. */
  surface: '#ffffff',
  /** The tint behind a thumbnail well or an inset row. */
  surfaceLow: '#f2f4f6',
  surfaceContainer: '#eceef0',
  surfaceHigh: '#e6e8ea',
  surfaceHighest: '#e0e3e5',
  surfaceDim: '#d8dadc',

  // ---- ink ---------------------------------------------------------------
  /** Primary text. */
  ink: '#191c1e',
  /** Secondary labels — the workhorse, 114 uses in the markup. */
  secondary: '#5d5e62',
  /** The warm brown-grey the spec calls `on-surface-variant`. */
  variant: '#5a413a',
  outline: '#8f7069',
  outlineVariant: '#e3beb6',

  // ---- the dark family ---------------------------------------------------
  /**
   * The charcoal every floating dock, bottom sheet and scanner button is
   * painted in. The spec names it only in prose; the markup writes it as a
   * literal 15 times, which is why it is a token here.
   */
  charcoal: '#1c1e21',
  /** One step up, for a card sitting on charcoal. */
  charcoalRaised: '#282b30',
  /** Two steps up — the grab handle and hairlines on a dark sheet. */
  charcoalEdge: '#34383e',
  /** The grab-handle pill on a bottom sheet. */
  handle: '#374151',
  /** Muted metadata on a dark sheet. */
  onDarkMuted: '#9ca3af',
  /** The spec's `secondary-fixed-dim` — labels on the charcoal sheet. */
  onDarkLabel: '#c6c6ca',
  /** The spec's `primary-fixed-dim` — a light coral, for ink on charcoal. */
  coralOnDark: '#ffb4a2',
  inverseSurface: '#2d3133',
  inverseOnSurface: '#eff1f3',

  // ---- accent ------------------------------------------------------------
  /** The coral. Every primary fill: FAB, Track Live, call button, pins. */
  coral: '#ff5e36',
  /** Pressed, and the darker stop of the FAB's gradient. */
  coralDeep: '#e04f29',
  /** The deep rust the spec calls `primary` — glyph tint and the avatar disc. */
  rust: '#b42901',
  /** Ink on coral. */
  onCoral: '#ffffff',
  /** The palest coral wash, behind a small coral glyph. */
  coralTint: '#ffdad2',

  /** The functional navigation blue — route lines and telematics. */
  blue: '#2563eb',

  // ---- status tones ------------------------------------------------------
  // The three the spec names, plus the two the shipments screen adds.
  transitBg: '#f3f4f6',
  transitInk: '#4b5563',
  processBg: '#fef3c7',
  processInk: '#d97706',
  deliveredBg: '#ecfdf5',
  deliveredInk: '#059669',

  error: '#ba1a1a',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
} as const;

/**
 * Plus Jakarta Sans for text, and the Material Symbols subset for icons.
 *
 * The design sets every glyph in Material Symbols Outlined — the whole 400 cut
 * is 944KB, so `tools/subset-symbols.py` trims it to the 57 this app uses
 * (9.8KB) and writes the codepoint map in `./symbols`. Icons are addressed by
 * codepoint, never by Material's ligature names: a ligature that fails to shape
 * renders the literal word `local_shipping`, and the web harness cannot see it.
 */
export const FONT = {
  extrabold: 'PlusJakartaSans_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
  symbols: 'KineticSymbols_400Regular',
} as const;

/**
 * The spec's type scale, verbatim. It gives no `letterSpacing`, so none is
 * invented — the few places the markup tightens a headline do it themselves.
 */
export const TYPE = {
  headlineXl: { fontFamily: FONT.bold, fontSize: 32, lineHeight: 40 },
  headlineLg: { fontFamily: FONT.bold, fontSize: 24, lineHeight: 32 },
  headlineMd: { fontFamily: FONT.semibold, fontSize: 20, lineHeight: 28 },
  headlineSm: { fontFamily: FONT.semibold, fontSize: 18, lineHeight: 24 },
  bodyLg: { fontFamily: FONT.regular, fontSize: 16, lineHeight: 24 },
  bodyMd: { fontFamily: FONT.regular, fontSize: 14, lineHeight: 20 },
  bodySm: { fontFamily: FONT.regular, fontSize: 12, lineHeight: 16 },
  labelLg: { fontFamily: FONT.semibold, fontSize: 14, lineHeight: 20 },
  labelMd: { fontFamily: FONT.semibold, fontSize: 12, lineHeight: 16 },
  labelSm: { fontFamily: FONT.semibold, fontSize: 10, lineHeight: 14 },
} as const;

/**
 * The spec's radii, in dp.
 *
 * Its `rounded` scale tops out at `xl: 1.5rem`, but the prose asks for 24 and
 * 28 on cards and sheets and the markup writes `rounded-2xl` / `rounded-3xl`
 * throughout — Tailwind's own 16 and 24. `card` and `sheet` are those, named
 * for what they are rather than by a size that two sources disagree about.
 */
export const R = {
  sm: 4,
  base: 8,
  md: 12,
  lg: 16,
  /** Thumbnails and media wells. */
  thumb: 16,
  /** Cards. */
  card: 24,
  /** Hero cards and bottom sheets. */
  sheet: 28,
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
 * The spec's four elevation levels, as style objects.
 *
 * Each carries `shadow*` and `elevation` together rather than a
 * `Platform.select`. The extra keys are inert on the platform that does not
 * read them, and a select is exactly the thing the web harness cannot verify.
 */
export const LEVEL = {
  /** Level 1 — white card containers. Ultra-diffused. */
  card: {
    shadowColor: '#111827',
    shadowOpacity: 0.04,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 8 },
    elevation: 2,
  },
  /** Level 2 — the dark floating dock. */
  dock: {
    shadowColor: '#000000',
    shadowOpacity: 0.22,
    shadowRadius: 36,
    shadowOffset: { width: 0, height: 16 },
    elevation: 14,
  },
  /** Level 2 — the coral FAB's own glow. */
  fab: {
    shadowColor: '#ff5e36',
    shadowOpacity: 0.35,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
  /** Level 3 — the charcoal bottom sheet, lifting upward. */
  sheet: {
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 32,
    shadowOffset: { width: 0, height: -12 },
    elevation: 16,
  },
} as const;

/** Semantic overrides, so the shared primitives read on Kinetic's page. */
export const kineticTheme = {
  '--bg': kc.bg,
  '--surface': kc.surface,
  '--fg': kc.ink,
  '--muted': kc.secondary,
  '--border': kc.surfaceHigh,
  '--accent': kc.coral,
  '--accent-fg': kc.onCoral,
} as unknown as Record<string, string>;
