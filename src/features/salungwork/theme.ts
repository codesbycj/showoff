/**
 * Salung — the work screen, the only one taken from its two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). It owns its theme, layout,
 * insets and text primitive (AGENTS.md, "Showcase lifecycle").
 */

export const sl = {
  /** The page: warm off-white paper. */
  canvas: '#efece7',
  /** A card on it. */
  surface: '#f7f5f2',
  /** The search field and the chart's empty cells. */
  well: '#e7e3dd',

  ink: '#1b1a18',
  muted: '#8c877f',
  onDark: '#ffffff',

  /** The dark pill: "Check now", the dock, the add button. */
  action: '#1b1a18',

  /** The performance chart's filled cells. */
  bar: '#1b1a18',
  barSoft: '#c9c4bc',
  /** The "+3.45%" chip. */
  gain: '#1a8f5a',

  /** The project charts. */
  line: '#e8743c',
  column: '#d9d4cc',
  columnDark: '#4a4641',

  /** A task card's left rule, and the progress track. */
  rule: '#e2ded7',
  track: '#ddd8d1',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Welcome, Salung". */
  title: { size: 21, line: 28, tracking: -0.6, family: 'Poppins_500Medium' },

  /** The search field's placeholder. */
  search: { size: 13, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },

  /** "See your performance". */
  banner: { size: 13, line: 17, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "Check now". */
  bannerAction: { size: 11.5, line: 15, tracking: -0.1, family: 'Poppins_500Medium' },
  /** "+3.45%". */
  gain: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_600SemiBold' },

  /** "Projects", "Today's tasks". */
  section: { size: 15, line: 20, tracking: -0.4, family: 'Poppins_600SemiBold' },
  /** "See all". */
  more: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },

  /** "Decision making". */
  card: { size: 13.5, line: 18, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** The line under it. */
  cardMeta: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  /** A figure printed on a chart. */
  figure: { size: 9.5, line: 12, tracking: -0.1, family: 'Poppins_500Medium' },

  /** "Website design development". */
  task: { size: 13, line: 17, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "Upcoming". */
  taskMeta: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Today: 10:15am". */
  taskWhen: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_400Regular' },
} as const;

/** Corner radii. */
export const radius = {
  card: 18,
  chip: 10,
  pill: 999,
  full: 999,
} as const;

/**
 * The dock's shadow.
 *
 * `shadow*` and `elevation` travel together in one object — a `Platform.select`
 * between them is exactly what the web harness cannot check.
 */
export const shadow = {
  float: {
    shadowColor: '#2b2822',
    shadowOpacity: 0.18,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
} as const;
