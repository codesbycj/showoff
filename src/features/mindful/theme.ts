/**
 * Mindful Pop's tokens, from the design system it shipped with.
 *
 * This is the first Stitch bundle that needed no reconciling. All six screens
 * inline the same `tailwind.config`, and all six are byte-identical to
 * `DESIGN.md`'s frontmatter — 47 colour keys, same values, same order. The usual
 * per-screen palette drift is simply absent, so there is nothing to arbitrate.
 *
 * What *is* here is the frontmatter-versus-prose split, and on this design the
 * two are not competing — they are describing different layers:
 *
 * | thing      | frontmatter          | prose               | markup uses    |
 * |------------|----------------------|---------------------|----------------|
 * | canvas     | `surface: #fcf9f7`   | "`#faf7f5`"         | `bg-surface`   |
 * | ink        | `on-surface:#1b1c1b` | "Ink `#18181b`"     | `text-on-surface` |
 * | pill fill  | `primary: #000000`   | "charcoal `#18181b`"| `bg-primary`   |
 *
 * On all three the markup resolves to the frontmatter, so the frontmatter wins
 * and the prose's near-misses survive as nothing — they are two to four points
 * apart and no screen shows both.
 *
 * The prose's *pastels*, though, are real and the frontmatter has no slot for
 * them: `#a7f3d0`, `#fed7aa`, `#e9d5ff`, `#bae6fd`, `#fde047` and their four
 * deep inks appear in the markup as arbitrary values, carrying the Quick
 * Toolkit tiles and the mood coding. So the palette below is genuinely two
 * layers — Material 3 tokens for structure, the prose's pastels for emotion —
 * and both are kept under their own names.
 *
 * The references are Stitch's own renders rather than Mobbin exports, and they
 * arrive at six different widths (284 to 537px), several of them full-page
 * captures downscaled to fit a 1600px cap. Nothing can be measured off them.
 * `code.html` is therefore the authority here in a stronger sense than usual:
 * its Tailwind classes are exact CSS pixels on a mobile viewport, carried across
 * to dp unchanged against the 393dp harness. The renders are used only to check
 * composition — what sits beside what — never a number.
 */

// ---------------------------------------------------------------------------
// Material 3 tokens — the structural layer, verbatim from the frontmatter.
// ---------------------------------------------------------------------------
export const mp = {
  /** The warm off-white the whole app sits on. `surface` and `background` are
   *  the same value here, as is `surface-bright`. */
  bg: '#fcf9f7',
  /** Elevated cards — `surface-container-lowest`. */
  surface: '#ffffff',
  surfaceLow: '#f6f3f1',
  surfaceContainer: '#f0edeb',
  surfaceHigh: '#eae8e6',
  /** `surface-container-highest`, and `surface-variant` — same value. */
  surfaceHighest: '#e5e2e0',
  surfaceDim: '#dcd9d8',

  /** Headlines and body copy. Never pure black, despite `primary` being so. */
  ink: '#1b1c1b',
  /** Secondary copy, meta rows, timestamps. */
  variant: '#47464b',
  outline: '#77767b',
  outlineVariant: '#c8c5cb',
  inverseSurface: '#30302f',
  inverseOnSurface: '#f3f0ee',

  /** The obsidian that drives every pill, CTA and the nav dock. Literally #000. */
  primary: '#000000',
  onPrimary: '#ffffff',
  /** The near-black the prose calls charcoal — used for a pill's inner disc. */
  primaryContainer: '#1b1b1e',
  onPrimaryContainer: '#858387',

  /** The mint green that carries every affirmative, hero and streak surface. */
  secondary: '#006d3e',
  onSecondary: '#ffffff',
  secondaryContainer: '#8cf5b2',
  onSecondaryContainer: '#007241',
  secondaryFixed: '#8ff8b4',
  secondaryFixedDim: '#73db9a',
  onSecondaryFixed: '#00210f',
  onSecondaryFixedVariant: '#00522d',

  /** The violet pair, for stress, introspection and the mindful-insight tiles. */
  tertiaryContainer: '#2c0051',
  onTertiaryContainer: '#a368de',
  tertiaryFixed: '#f0dbff',
  tertiaryFixedDim: '#ddb8ff',
  onTertiaryFixed: '#2c0051',
  onTertiaryFixedVariant: '#62259b',

  error: '#ba1a1a',
  onError: '#ffffff',
  errorContainer: '#ffdad6',
  onErrorContainer: '#93000a',
} as const;

// ---------------------------------------------------------------------------
// The prose's emotional pastels — the layer the frontmatter has no slot for.
// Each is a fill with the deep ink the markup sets on top of it.
// ---------------------------------------------------------------------------
export const PASTEL = {
  /** Calm, grounded, affirmative. Soundscapes; "Happy"; completed metrics. */
  green: { fill: '#a7f3d0', ink: '#064e3b', mid: '#34d399', strong: '#059669' },
  /** Energy and sleep cycles; "Angry / Fired Up". Mood Journal. */
  peach: { fill: '#fed7aa', ink: '#7c2d12', mid: '#fb923c', strong: '#fb923c' },
  /** Introspection and stress. SOS Calmer; mindful insights. */
  lilac: { fill: '#e9d5ff', ink: '#581c87', mid: '#c084fc', strong: '#c084fc' },
  /** Tranquility and low energy; "Sleepy", "Bored". Sleep Tales. */
  sky: { fill: '#bae6fd', ink: '#0c4a6e', mid: '#38bdf8', strong: '#38bdf8' },
  /** Optimism, streaks, the lightning badge. */
  yellow: { fill: '#fde047', ink: '#854d0e', mid: '#fde047', strong: '#fde047' },
} as const;

export type PastelName = keyof typeof PASTEL;

/**
 * One family, and for once not a substitution.
 *
 * The spec names Plus Jakarta Sans for all nine of its type styles, Google Fonts
 * carries it, and it is already registered for Affirm — so Mindful Pop adds no
 * text face at all, and none of the usual "expect it 10-15% wider" caveat
 * applies. The type is literally what the design asks for.
 *
 * `symbols` is Material Symbols Outlined cut to the 59 icons these six screens
 * use (944KB -> 9.9KB, see tools/subset-symbols.py), addressed by codepoint
 * through `./symbols`.
 */
export const FONT = {
  extrabold: 'PlusJakartaSans_800ExtraBold',
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',

  symbols: 'MindfulSymbols_400Regular',
} as const;

/**
 * The spec's nine type styles, verbatim.
 *
 * `letterSpacing` is given in `em`, which React Native does not take, so each is
 * resolved to dp against its own size and nothing downstream has to multiply.
 * The weight baked into each `fontSize` entry is carried here as the family,
 * since React Native resolves a face by family name and not by numeric weight.
 *
 * The markup frequently adds `font-bold` on top of `text-label-md` and
 * `text-label-sm`, which in CSS overrides the style's own 600/700. Where that
 * happens the component asks for `labelMdBold` / `labelSmBold` rather than
 * quietly rendering the lighter cut.
 */
export const TYPE = {
  headlineXl: {
    fontFamily: FONT.extrabold,
    fontSize: 40,
    lineHeight: 48,
    letterSpacing: -1.2,
  },
  /** The handheld cut — what every screen actually uses for a hero. */
  headlineXlMobile: {
    fontFamily: FONT.extrabold,
    fontSize: 30,
    lineHeight: 36,
    letterSpacing: -0.75,
  },
  headlineLg: {
    fontFamily: FONT.bold,
    fontSize: 26,
    lineHeight: 32,
    letterSpacing: -0.52,
  },
  headlineMd: {
    fontFamily: FONT.bold,
    fontSize: 20,
    lineHeight: 26,
    letterSpacing: -0.3,
  },
  bodyLg: {
    fontFamily: FONT.medium,
    fontSize: 16,
    lineHeight: 24,
    letterSpacing: -0.16,
  },
  bodyMd: { fontFamily: FONT.medium, fontSize: 14, lineHeight: 20, letterSpacing: 0 },
  labelMd: {
    fontFamily: FONT.semibold,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.13,
  },
  /** `text-label-md font-bold` — the combination the markup uses most. */
  labelMdBold: {
    fontFamily: FONT.bold,
    fontSize: 13,
    lineHeight: 18,
    letterSpacing: 0.13,
  },
  labelSm: {
    fontFamily: FONT.bold,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.22,
  },
  /** `text-label-sm` without the style's own 700 — a meta line under a title. */
  labelSmMedium: {
    fontFamily: FONT.medium,
    fontSize: 11,
    lineHeight: 14,
    letterSpacing: 0.22,
  },
  displayStat: {
    fontFamily: FONT.extrabold,
    fontSize: 28,
    lineHeight: 32,
    letterSpacing: -0.84,
  },
} as const;

/**
 * The spec's radii, in dp.
 *
 * Only four appear across all six screens, and one of them is a trap: this
 * config overrides `rounded-lg` to `2rem`, so it is **32dp** and not Tailwind's
 * usual 8. It is the radius on every metric tile, hero card and toolkit tile,
 * which is most of what gives the design its tactile feel — getting it from
 * Tailwind's default would flatten the whole app.
 *
 * `barTop` is Tailwind's untouched `sm`, the 2dp the check-in screen puts on the
 * top corners of its energy bars. The config does not override `sm`, so the
 * default is what the reference renders.
 */
export const R = {
  /** `rounded-t-sm` on the energy bars — Tailwind's default, not overridden. */
  barTop: 2,
  /** `rounded` — the config's DEFAULT. Chips, small wells, day cells. */
  base: 16,
  /** `rounded-lg` — 2rem. Cards, tiles, hero panels. Not 8. */
  card: 32,
  full: 9999,
} as const;

/** The spec's spacing, in dp. */
export const SP = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  /** `gutter` — between split metric tiles on wider layouts. */
  gutter: 12,
  /** `gutter-mobile` — what the two-up tile grids actually use. */
  gutterSm: 8,
  /** `margin` — the desktop page margin, unused by these six screens. */
  margin: 24,
  /** `margin-mobile` — the outer page margin every screen holds to. */
  marginSm: 16,
} as const;

/**
 * Elevation, such as this design has any.
 *
 * The spec is explicit that it avoids drop shadows and gets depth from tonal
 * colour blocking instead, so there are only two real levels: the `shadow-sm`
 * every card carries, and the one heavy shadow under the floating nav dock
 * (`0 8px 30px rgba(0,0,0,0.18)`, given literally in the markup).
 *
 * Each carries `shadow*` and `elevation` together rather than a
 * `Platform.select`. The extra keys are inert on the platform that does not read
 * them, and a select is exactly the thing the web harness cannot verify.
 */
export const LEVEL = {
  /** `shadow-sm` — the whisper under every card and pill. */
  card: {
    shadowColor: '#1b1c1b',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    elevation: 1,
  },
  /** The floating nav dock, the one place the design does cast a real shadow. */
  dock: {
    shadowColor: '#000000',
    shadowOpacity: 0.18,
    shadowRadius: 30,
    shadowOffset: { width: 0, height: 8 },
    elevation: 12,
  },
} as const;

/** Semantic overrides, so the shared primitives read on Mindful Pop's page. */
export const mindfulTheme = {
  '--bg': mp.bg,
  '--surface': mp.surface,
  '--fg': mp.ink,
  '--muted': mp.variant,
  '--border': mp.surfaceHigh,
  '--accent': mp.primary,
  '--accent-fg': mp.onPrimary,
} as unknown as Record<string, string>;
