/**
 * Nutrilens — the third onboarding screen of a three-phone board.
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
  /** The page. The last screen warms to a sand, which is the reference's
   *  way of saying the plan is settled. */
  canvas: '#e8ddcd',
  surface: '#ffffff',

  ink: '#13161a',
  muted: '#6f757c',

  /** The brand green. */
  green: '#9cce3c',
  greenDeep: '#2d4a12',

  /** The progress bar. White, because the page behind it is sand. */
  track: '#ffffff',
  trackOn: '#13161a',

  /** The three macro bars, in order. */
  macro: ['#7fb73a', '#edc33c', '#e8705a'] as const,
  /** The disc a stepper's sign sits in. */
  stepWell: '#f3f4f5',
  /** The sheet at the foot. */
  sheet: '#ffffff',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Nutrilens". */
  wordmark: { size: 17, line: 22, tracking: -0.5, family: 'Inter_500Medium' },
  /** The "AI" set above its shoulder. */
  wordmarkSup: { size: 9, line: 11, tracking: 0, family: 'Inter_500Medium' },
  /** "Skip". */
  skip: { size: 13, line: 18, tracking: -0.1, family: 'Inter_400Regular' },

  /** "Personalized Custom Plan". */
  display: { size: 30, line: 38, tracking: -1.1, family: 'Inter_500Medium' },

  /** "105g". */
  macro: { size: 30, line: 37, tracking: -1.1, family: 'Inter_500Medium' },
  /** "Proteins". */
  macroMeta: { size: 12, line: 16, tracking: -0.1, family: 'Inter_400Regular' },

  /** "Daily Target". */
  stepLabel: { size: 13, line: 17, tracking: -0.2, family: 'Inter_400Regular' },
  /** "2000". */
  stepValue: { size: 19, line: 24, tracking: -0.6, family: 'Inter_500Medium' },

  /** "Personal Meals, Your Way, Anytime.". */
  closing: { size: 20, line: 26, tracking: -0.6, family: 'Inter_500Medium' },
  /** "Already Have An Account?". */
  foot: { size: 11.5, line: 16, tracking: -0.1, family: 'Inter_400Regular' },
  /** "Log In". */
  footLink: { size: 11.5, line: 16, tracking: -0.1, family: 'Inter_600SemiBold' },

  /** "Get Started". */
  button: { size: 14, line: 19, tracking: -0.2, family: 'Inter_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  bar: 999,
  pill: 999,
  full: 999,
} as const;
