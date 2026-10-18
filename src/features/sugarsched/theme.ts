/**
 * Sugar CRM — Scheduled Assignments, third of the three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 */

export const ss = {
  canvas: '#dfe2ec',
  surface: '#ffffff',
  chip: '#eceef4',
  edge: '#e2e5ee',

  ink: '#15171c',
  muted: '#8c90a0',
  faint: '#aeb2c0',

  /** The big card the date range is chosen on. */
  sheet: '#15171c',
  onSheet: '#ffffff',
  onSheetMuted: 'rgba(255, 255, 255, 0.5)',
  /** A day on it that is not in the range. */
  day: 'rgba(255, 255, 255, 0.08)',
  /** A day outside the month, which the reference still shows. */
  dayOut: 'rgba(255, 255, 255, 0.28)',
  /** The chosen range. */
  range: '#f08a8a',
  onRange: '#15171c',

  /** The two status pills. */
  executed: '#9dc6ef',
  scheduled: '#f3a9c6',
  onPill: '#15171c',

  /** The confirm button. */
  confirm: '#ffffff',
  onConfirm: '#15171c',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Scheduled / Assignments". */
  title: { size: 27, line: 33, tracking: -0.8, family: 'PlusJakartaSans_700Bold' },

  /** "Design Sprint", "Meeting Lead". */
  row: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Executed", "Scheduled". */
  pill: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },

  /** "Allocate to / Resolution Team!". */
  sheetTitle: { size: 17, line: 23, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "October", "November". */
  month: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
  /** A date. */
  day: { size: 12, line: 16, tracking: 0, family: 'PlusJakartaSans_500Medium' },
  /** "Start Date". */
  fieldLabel: { size: 10, line: 13, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "2023-10-16". */
  fieldValue: { size: 12.5, line: 17, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  card: 18,
  sheet: 22,
  day: 8,
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
    shadowOpacity: 0.18,
    shadowRadius: 14,
    elevation: 4,
  },
  sheet: {
    shadowColor: '#15171c',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
} as const;
