/**
 * Sajibur — the Statistic screen.
 *
 * The reference is a **design shot**: two phones posed on a dark green board
 * with the designer's email and year across the top. So this is an inspo brief
 * and rule 1 is off (AGENTS.md, "Three kinds of reference"). The palette and
 * the order of the blocks are taken from it; every size is chosen for a real
 * 393dp screen.
 *
 * Only the second phone was asked for, so this showcase is that screen alone —
 * one showcase per screen, with its own theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 */

export const sj = {
  // ---- the dark half -----------------------------------------------------
  /** The page. A deep green-black, lit very slightly from above. */
  canvas: '#15261e',
  canvasTop: '#1b3227',
  canvasFoot: '#102019',
  /** The round header buttons and the segmented track. */
  raised: 'rgba(255, 255, 255, 0.08)',
  /** Their hairline, which is what makes them read on a dark page. */
  raisedEdge: 'rgba(255, 255, 255, 0.12)',

  // ---- the light half ----------------------------------------------------
  /** The sheet the history sits on. */
  sheet: '#ffffff',
  /** An avatar's ground inside it. */
  sunken: '#f3f3f0',
  rule: '#eeeeea',

  // ---- the brand ---------------------------------------------------------
  /** The active segment, the live chart line, the callout. */
  lime: '#b9f24a',
  onLime: '#13251c',
  /** The second line on the chart, behind the first. */
  limeDeep: '#5f9e4a',

  // ---- ink ---------------------------------------------------------------
  /** On the dark half. */
  onDark: '#ffffff',
  onDarkMuted: 'rgba(255, 255, 255, 0.55)',
  /** On the sheet. */
  ink: '#141414',
  muted: '#8c8c88',
  /** Money in. Money out is plain ink, as the reference has it. */
  credit: '#1f9254',

  /** The brand discs in the history, in order. */
  marks: ['#2f6b4f', '#111111', '#f4a62a', '#3c6cf0'],
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Statistic". */
  title: { size: 19, line: 25, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },

  /** "Day", "Week", "Month", "Year". */
  tab: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  tabOn: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },

  /** "Total Spendings". */
  caption: { size: 11.5, line: 15, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "$6,340.00". */
  total: { size: 30, line: 38, tracking: -0.9, family: 'PlusJakartaSans_700Bold' },
  /** "$ 69.00" in the bubble on the chart. */
  callout: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "Transaction History". */
  section: { size: 15.5, line: 20, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "View all". */
  link: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** "TODAY", "YESTERDAY". */
  dayLabel: { size: 9.5, line: 13, tracking: 0.6, family: 'PlusJakartaSans_600SemiBold' },

  /** "Mikel Borle". */
  rowTitle: { size: 12.5, line: 16, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "10:30 AM". */
  rowMeta: { size: 10, line: 13.5, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "+$350.00". */
  rowAmount: { size: 12.5, line: 16, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Receive", "Transfer", "Online Shopping". */
  rowKind: { size: 9.5, line: 13, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** The initials or wordmark inside a brand disc. */
  mark: { size: 11, line: 14, tracking: 0, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  sheet: 26,
  pill: 999,
  full: 999,
} as const;

/**
 * The one shadow, where the sheet meets the dark page.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  sheet: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;
