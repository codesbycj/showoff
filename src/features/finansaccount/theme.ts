/**
 * Finans — Account, the second screen of the same board as `finansstart`.
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
  /** The page, and the wash behind the header. */
  canvas: '#faf8f6',
  washWarm: '#f7eae0',
  washCool: '#f3f3f5',

  /** Cards, pills, the sheet. */
  surface: '#ffffff',
  /** A card's hairline, which is what separates white from white. */
  edge: '#ececea',

  /** The brand. */
  yellow: '#ffd43b',
  onYellow: '#141414',
  /** The add button beside the two action pills. */
  mint: '#cfe7d6',

  ink: '#111111',
  muted: '#8a8a85',
  /** A card's small print. */
  cardMuted: '#8e8e88',

  /** Money in, money out. */
  credit: '#1f9254',
  debit: '#111111',

  /** The flags, drawn rather than set as emoji. */
  flagRed: '#c8102e',
  flagBlue: '#1e3a8a',

  /** The bar at the foot, and the grabber on the sheet. */
  grabber: '#dddbd6',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Welcome back,". */
  eyebrow: { size: 11, line: 15, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Akmal Nasrulloh". */
  name: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Account". */
  title: { size: 23, line: 30, tracking: -0.7, family: 'PlusJakartaSans_700Bold' },

  /** "US Dollar" on a card. */
  cardKind: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
  /** "Your balance", "Account number", "Valid Thru". */
  cardLabel: { size: 10, line: 13.5, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "$40,500.80". */
  cardAmount: { size: 21, line: 28, tracking: -0.6, family: 'PlusJakartaSans_700Bold' },
  /** "**** 9934", "05/28". */
  cardValue: { size: 11, line: 15, tracking: 0.2, family: 'PlusJakartaSans_600SemiBold' },

  /** "Request", "Transfer". */
  action: { size: 12.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "Transaction". */
  section: { size: 16, line: 21, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "View all". */
  link: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** "TODAY". */
  dayLabel: { size: 9.5, line: 13, tracking: 0.6, family: 'PlusJakartaSans_600SemiBold' },

  /** "Transfer to Firmansyah A.". */
  rowTitle: { size: 12.5, line: 16, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "04:03 PM". */
  rowMeta: { size: 10, line: 13.5, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "- $20". */
  rowAmount: { size: 12.5, line: 16, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },

  /** "Home", "Statistic", "Activity", "Card". */
  tab: { size: 9.5, line: 13, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  tabOn: { size: 9.5, line: 13, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  card: 18,
  sheet: 24,
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
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.16,
    shadowRadius: 14,
    elevation: 5,
  },
  sheet: {
    shadowColor: '#a09a90',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
  fab: {
    shadowColor: '#d8ab00',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
} as const;
