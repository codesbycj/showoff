/**
 * Nutrilens — the first onboarding screen of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 *
 * The display face is Inter, not Poppins: the reference's headline is a
 * neo-grotesque with a double-storey `a` and a straight-tailed `y`, and
 * Poppins — geometric, single-storey — would change the voice of the whole
 * board.
 */

export const nl = {
  /** The page. */
  canvas: '#f2f2f2',
  surface: '#ffffff',

  ink: '#13161a',
  muted: '#6f757c',

  /** The brand green. */
  green: '#9cce3c',
  greenDeep: '#2d4a12',

  /** The progress bar. */
  track: '#dcdedf',
  trackOn: '#13161a',

  /** The pill that overlaps the headline, and the two Kcal chips. */
  glass: 'rgba(170,174,178,0.72)',
  chip: '#ffffff',

  /** The dashed leaders under the Kcal chips. */
  leader: 'rgba(90,96,102,0.55)',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Nutrilens". */
  wordmark: { size: 17, line: 22, tracking: -0.5, family: 'Inter_500Medium' },
  /** The "AI" set above its shoulder. */
  wordmarkSup: { size: 9, line: 11, tracking: 0, family: 'Inter_500Medium' },
  /** "Skip". */
  skip: { size: 13, line: 18, tracking: -0.1, family: 'Inter_400Regular' },

  /** "Personal Meals, Your Way, Anytime.". */
  display: { size: 40, line: 50, tracking: -1.8, family: 'Inter_500Medium' },

  /** "Welcome to Nutrilens", on the pill. */
  pill: { size: 11, line: 14, tracking: -0.1, family: 'Inter_400Regular' },
  /** "150 Kcal". */
  chip: { size: 12, line: 16, tracking: -0.2, family: 'Inter_500Medium' },

  /** "Get Started". */
  button: { size: 14, line: 19, tracking: -0.2, family: 'Inter_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  bar: 999,
  pill: 999,
  full: 999,
} as const;
