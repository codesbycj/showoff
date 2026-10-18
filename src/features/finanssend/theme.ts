/**
 * Finans — Transfer, the third screen of the same board as `finansstart`.
 *
 * A **separate showcase on purpose**: it shares a brand with the other two and
 * duplicates their theme, layout, insets and text primitive rather than
 * importing them, so each films, blanks and locks entirely on its own
 * (AGENTS.md, "Showcase lifecycle").
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. The palette and the order of the blocks are taken from it; every size
 * is chosen for a real 393dp screen.
 */

export const fn = {
  canvas: '#faf8f6',
  surface: '#ffffff',
  /** The search field and an avatar's ground — a half-step off white. */
  sunken: '#f4f3f0',
  edge: '#ececea',
  rule: '#efeeea',

  yellow: '#ffd43b',
  onYellow: '#141414',

  ink: '#111111',
  muted: '#8a8a85',
  /** An account number under a name. */
  faint: '#a5a49e',

  /** The five circles in the last-transfer row, in order. */
  avatars: ['#f2cdbb', '#bcd4f2', '#f2e0b0', '#d5c6f2', '#bbe8d2'],

  grabber: '#dddbd6',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Transfer". */
  title: { size: 16, line: 21, tracking: -0.3, family: 'PlusJakartaSans_600SemiBold' },

  /** "Destination", "Account number". */
  fieldLabel: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Bank BCA", "8009665142887". */
  fieldValue: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },

  /** "Continue". */
  button: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },

  /** "Last transfer", "Transfer list". */
  section: { size: 16, line: 21, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** A contact's name under their circle. */
  contact: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** The initials inside it. */
  initials: { size: 14, line: 18, tracking: 0, family: 'PlusJakartaSans_700Bold' },

  /** "All", "Friends", "Favorites". */
  tab: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  tabOn: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },

  /** The search field's placeholder. */
  search: { size: 12.5, line: 17, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Adam S.". */
  rowTitle: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "900764999451". */
  rowMeta: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "BCA". */
  rowBank: { size: 11, line: 15, tracking: 0, family: 'PlusJakartaSans_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  card: 16,
  sheet: 24,
  field: 12,
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
    shadowColor: '#a09a90',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.13,
    shadowRadius: 12,
    elevation: 4,
  },
  sheet: {
    shadowColor: '#a09a90',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;
