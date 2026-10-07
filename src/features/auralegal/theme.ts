/**
 * Aura Legal's tokens.
 *
 * This showcase came as a Google Stitch export with a real `DESIGN.md` — a
 * Material-style token set as YAML frontmatter, then prose describing it. All
 * three screens also carry the *same* `tailwind.config` block, verbatim, which
 * makes this export internally consistent in a way Stitch bundles usually are
 * not: there is no per-screen palette drift to reconcile.
 *
 * What does disagree is `DESIGN.md`'s own prose against its frontmatter. The
 * prose invents a second set of names and several values that appear nowhere in
 * the markup — canvas `#0F1012`, `surface-card` `#1A1B1F`, `text-secondary`
 * `#9CA3AF`, `secondary` `#34D399`. Sampling the three renders settles it in
 * favour of the frontmatter every time:
 *
 *   canvas            prose #0F1012   config #121316   renders #121316
 *   base module       prose #1A1B1F   config #1f1f23   renders #1F1F23
 *   lavender card     prose #C4B5FD   config #c4b5fd   renders #C4B5FD
 *   lavender text     prose  —        config #dfd5ff   renders #E0D5FF
 *
 * So the frontmatter is what is used, and the prose is treated as commentary.
 * The one place the prose is still worth reading is its description of intent —
 * "the primary action tone" is what the config calls `primaryContainer`, not
 * `primary`, and that naming slip is why the two look like they conflict.
 *
 * Names are kept in the design system's own Material vocabulary rather than
 * being renamed to something friendlier. This export *is* a design system; the
 * token names are part of what is being rebuilt.
 */
export const al = {
  // surfaces, deepest to brightest
  surface: '#121316',
  surfaceContainerLowest: '#0d0e11',
  surfaceContainerLow: '#1b1b1f',
  surfaceContainer: '#1f1f23',
  surfaceContainerHigh: '#292a2d',
  surfaceContainerHighest: '#343538',
  surfaceBright: '#38393c',
  surfaceVariant: '#343538',

  // ink
  onSurface: '#e3e2e6',
  onSurfaceVariant: '#cac4d1',
  outline: '#938f9a',
  outlineVariant: '#48454f',

  /** The light-on-dark inversion the active date capsule uses. */
  inverseSurface: '#e3e2e6',
  inverseOnSurface: '#2f3034',

  // periwinkle / lavender: the primary action tone
  primary: '#dfd5ff',
  primaryContainer: '#c4b5fd',
  onPrimary: '#332664',
  onPrimaryContainer: '#514483',
  primaryFixedDim: '#ccbeff',

  // emerald / mint: metrics, verification, availability
  secondary: '#45dfa4',
  secondaryFixed: '#68fcbf',
  secondaryContainer: '#00bd85',
  onSecondary: '#003825',

  white: '#ffffff',
} as const;

/**
 * `rgba` from a `#rrggbb` and an alpha.
 *
 * The export leans on translucency throughout — `bg-secondary/10`,
 * `bg-primary-container/10`, `bg-surface/30`, `text-on-surface/60` — and React
 * Native has no `/alpha` syntax, so each becomes a call to this.
 */
export function alpha(hex: string, a: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${a})`;
}

/**
 * Plus Jakarta Sans, which the spec names for all ten of its type styles.
 *
 * No substitute hunt: Google Fonts carries the family and it was already
 * registered for Affirm, VoteNG and Voyago, so the type matches outright rather
 * than approximating. This showcase adds no text face — only its icon subset.
 */
export const FONT = {
  bold: 'PlusJakartaSans_700Bold',
  semibold: 'PlusJakartaSans_600SemiBold',
  medium: 'PlusJakartaSans_500Medium',
  regular: 'PlusJakartaSans_400Regular',
  /** Material Symbols Outlined, cut down to this showcase's 24 glyphs. */
  symbol: 'AuralegalSymbols_400Regular',
} as const;

/**
 * The spec's named type scale, carried across as-is.
 *
 * Every size, weight and line height here is the frontmatter's own. `tracking`
 * is not in the spec as a number — the prose asks for `-0.02em` on display
 * titles — so it is applied per style at that ratio where the markup sets
 * `tracking-tight`.
 */
export const TYPE = {
  headlineXl: { fontFamily: FONT.bold, fontSize: 32, lineHeight: 38 },
  headlineXlMobile: { fontFamily: FONT.bold, fontSize: 26, lineHeight: 32 },
  headlineLg: { fontFamily: FONT.semibold, fontSize: 22, lineHeight: 28 },
  headlineMd: { fontFamily: FONT.semibold, fontSize: 18, lineHeight: 24 },
  titleMd: { fontFamily: FONT.semibold, fontSize: 16, lineHeight: 22 },
  bodyLg: { fontFamily: FONT.regular, fontSize: 15, lineHeight: 22 },
  bodyMd: { fontFamily: FONT.regular, fontSize: 13, lineHeight: 18 },
  labelLg: { fontFamily: FONT.semibold, fontSize: 14, lineHeight: 18 },
  labelMd: { fontFamily: FONT.medium, fontSize: 12, lineHeight: 16 },
  labelSm: { fontFamily: FONT.semibold, fontSize: 11, lineHeight: 14 },
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

/** The spec's spacing scale. `margin` is the 20dp screen gutter. */
export const SP = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  gutter: 16,
  margin: 20,
} as const;

/** Semantic overrides, so the shared primitives read on Aura Legal's page. */
export const auralegalTheme = {
  '--bg': al.surface,
  '--surface': al.surfaceContainer,
  '--fg': al.onSurface,
  '--muted': al.onSurfaceVariant,
  '--border': alpha(al.white, 0.08),
  '--accent': al.primaryContainer,
  '--accent-fg': al.onPrimaryContainer,
} as unknown as Record<string, string>;
