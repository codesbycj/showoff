/**
 * Nutrilens — the second onboarding screen of a three-phone board.
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

  /** The calendar card, and the day that is selected. */
  dayOn: '#13161a',
  dayWell: '#f3f4f5',

  /** The stats card. */
  statCard: '#d7ec9f',
  /** The ring on it: the track, and the part that is filled. */
  ring: '#ffffff',
  ringOn: '#8cc22e',
  /** The disc each macro's mark sits in. */
  macroWell: '#ffffff',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Nutrilens". */
  wordmark: { size: 17, line: 22, tracking: -0.5, family: 'Inter_500Medium' },
  /** The "AI" set above its shoulder. */
  wordmarkSup: { size: 9, line: 11, tracking: 0, family: 'Inter_500Medium' },
  /** "Skip". */
  skip: { size: 13, line: 18, tracking: -0.1, family: 'Inter_400Regular' },

  /** "Daily Tracking To Stay On Track". */
  display: { size: 35, line: 46, tracking: -1.5, family: 'Inter_500Medium' },

  /** "Dec 2025". */
  month: { size: 16, line: 21, tracking: -0.4, family: 'Inter_500Medium' },
  /** "S M T W T F S". */
  weekday: { size: 12, line: 16, tracking: 0, family: 'Inter_400Regular' },
  /** "14". */
  day: { size: 15, line: 20, tracking: -0.3, family: 'Inter_500Medium' },

  /** "Goal 1650". */
  goal: { size: 13, line: 17, tracking: -0.2, family: 'Inter_500Medium' },
  /** "670". */
  figure: { size: 32, line: 38, tracking: -1.2, family: 'Inter_500Medium' },
  /** "43%". */
  figureMeta: { size: 14, line: 18, tracking: -0.2, family: 'Inter_400Regular' },
  /** "45/165g". */
  macro: { size: 17, line: 22, tracking: -0.5, family: 'Inter_500Medium' },
  /** "Proteins". */
  macroMeta: { size: 13, line: 17, tracking: -0.2, family: 'Inter_400Regular' },

  /** "Get Started". */
  button: { size: 14, line: 19, tracking: -0.2, family: 'Inter_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  bar: 999,
  pill: 999,
  full: 999,
} as const;
