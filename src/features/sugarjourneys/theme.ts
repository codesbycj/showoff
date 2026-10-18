/**
 * Sugar CRM — Customer Journeys, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette and the order of
 * the blocks are taken from it; every size is chosen for a real 393dp screen.
 *
 * A **separate showcase** from the other two screens — each owns its theme,
 * layout, insets and text primitive (AGENTS.md, "Showcase lifecycle").
 */

export const sg = {
  /** The page: a cool lavender-grey the white cards sit on. */
  canvas: '#dfe2ec',
  /** A card. */
  surface: '#ffffff',
  /** The card behind the front one, seen through it. */
  surfaceBack: '#eef0f6',
  /** The round chrome buttons, which are the page a shade lighter. */
  chip: '#eceef4',
  edge: '#e2e5ee',
  rule: '#eceef3',

  ink: '#15171c',
  muted: '#8c90a0',
  faint: '#aeb2c0',

  /** The add button. */
  fab: '#15171c',
  onFab: '#ffffff',

  /** The unread dots on the two header buttons. */
  alert: '#ef4444',

  /** The four segments of a task-allocation bar, in order. */
  bars: ['#7cc0f0', '#f3d775', '#f0a35e', '#ef7b7b'],
  /** The badges under the avatars, in the same order. */
  badges: ['#f2a0a0', '#cfd3e0', '#9dc6ef', '#f0cf86', '#f0b980'],
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "sugarcrm". */
  wordmark: { size: 17, line: 22, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },

  /** "Customer / Journeys". */
  title: { size: 27, line: 33, tracking: -0.8, family: 'PlusJakartaSans_700Bold' },

  /** "Brand Identity". */
  cardTitle: { size: 15.5, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "Task allocation". */
  cardLabel: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "134". */
  statValue: { size: 19, line: 25, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** "hrs.", "$". */
  statUnit: { size: 10, line: 13, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Lead time", "Development budget". */
  statLabel: { size: 10, line: 13.5, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** The number on an avatar's badge. */
  badge: { size: 8.5, line: 11, tracking: 0, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  card: 20,
  bar: 999,
  full: 999,
} as const;

/**
 * The shadows. A white card on a lavender page needs one or it floats flat.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  card: {
    shadowColor: '#8f95ab',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 6,
  },
  fab: {
    shadowColor: '#15171c',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 14,
    elevation: 10,
  },
} as const;
