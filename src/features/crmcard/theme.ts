/**
 * A sales CRM — one customer, second of the three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette and the order of
 * the blocks are taken from it; every size is chosen for a real 393dp screen.
 *
 * A **separate showcase** from the other two screens — each owns its theme,
 * layout, insets and text primitive (AGENTS.md, "Showcase lifecycle").
 */

export const cc = {
  canvas: '#f2f1ec',
  surface: '#ffffff',
  edge: '#e8e6e0',
  rule: '#e3e1db',

  ink: '#111111',
  onInk: '#ffffff',

  /** The schedule card. */
  accent: '#f5e03f',
  onAccent: '#121212',
  /** A day on it that is still free. */
  dayFree: 'rgba(18, 18, 18, 0.06)',

  text: '#141414',
  muted: '#8a8984',
  faint: '#b5b3ad',

  /** The dot on the first action button, saying there is something new. */
  alert: '#2f6bff',

  /** The customer's own circle, and the three days with someone on them. */
  face: '#e3c9e8',
  dayFaces: ['#c7d9f0', '#f0d6a8', '#e8c3a8'],
  /** The day the reference fills solid. */
  dayLive: '#3f8ae0',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Customer / Information". */
  title: { size: 21, line: 26, tracking: -0.6, family: 'PlusJakartaSans_700Bold' },

  /** "Eva Robinson". */
  name: { size: 19, line: 25, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** "CEO. Inc. Alabama Machinery & Supply". */
  role: { size: 11.5, line: 16, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** The initials in the big circle. */
  initials: { size: 30, line: 38, tracking: 0, family: 'PlusJakartaSans_700Bold' },

  /** "Detailed Information". */
  section: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Tasks Schedule". */
  cardTitle: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "October". */
  month: { size: 23, line: 30, tracking: -0.6, family: 'PlusJakartaSans_700Bold' },
  /** A date in the grid. */
  day: { size: 11.5, line: 15, tracking: 0, family: 'PlusJakartaSans_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  card: 20,
  day: 9,
  full: 999,
} as const;

/**
 * The one shadow: a white control on a warm page.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  soft: {
    shadowColor: '#a9a69c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 9,
    elevation: 2,
  },
} as const;
