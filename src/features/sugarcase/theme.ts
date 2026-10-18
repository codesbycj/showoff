/**
 * Sugar CRM — New Case Management, second of the three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 */

export const sc = {
  canvas: '#dfe2ec',
  surface: '#ffffff',
  /** The round chrome buttons, and the rail that floats on the right. */
  chip: '#eceef4',
  edge: '#e2e5ee',

  ink: '#15171c',
  muted: '#8c90a0',
  faint: '#aeb2c0',

  /** The node that is being worked on, and the dark chrome button. */
  active: '#15171c',
  onActive: '#ffffff',

  /** A step that is done. */
  done: '#4fa96a',
  /** The dashed connector between two steps. */
  wire: '#b9bfd0',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "New Case / Management". */
  title: { size: 27, line: 33, tracking: -0.8, family: 'PlusJakartaSans_700Bold' },

  /** "Allocate Case to User!". */
  step: { size: 13, line: 18, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },
  /** The same, on the dark node. */
  stepOn: { size: 13, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  card: 18,
  pill: 999,
  full: 999,
} as const;

/**
 * The shadows.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  card: {
    shadowColor: '#8f95ab',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 14,
    elevation: 5,
  },
  rail: {
    shadowColor: '#8f95ab',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.16,
    shadowRadius: 10,
    elevation: 4,
  },
} as const;
