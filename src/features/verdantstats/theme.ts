/**
 * Verdant — Analytics, the third screen of the same design as `verdant`.
 *
 * A **separate showcase on purpose.** It shares a brand with screen 1 and
 * duplicates its theme, layout, insets and text primitive rather than
 * importing them, so each one locks, blanks and films entirely on its own.
 * The duplication is the price of a take that is always
 * `use <slug>` then `run.py <slug> 1` — see AGENTS.md, "Showcase lifecycle".
 *
 * The reference is a **design shot**: three phones posed on a warm board. So
 * this is an inspo brief and rule 1 is off (AGENTS.md, "Three kinds of
 * reference"). The palette is read off the board, which is the one thing a
 * posed phone still reports honestly over a few thousand flat pixels; every
 * size is chosen for a real 393dp screen.
 *
 * Plus Jakarta Sans throughout, as on screen 1 — the design's own face is a
 * tight neo-grotesque that is not obtainable, and Jakarta carries the same
 * weight with a rounder bowl. It is already registered, so this showcase adds
 * no font file and drifts no other showcase's lock.
 */

export const vs = {
  // ---- surfaces ----------------------------------------------------------
  /** The page. Warm off-white, never #fff — the whole design sits on paper. */
  canvas: '#f6f5f0',
  /** The round header buttons, the segmented bar, the dock. */
  surface: '#ffffff',
  /** The segmented control's own ground, a half-step off the page. */
  sunken: '#eeede7',
  /** The insight card: the palest the brand green goes before it is grey. */
  tint: '#e3ebdd',
  /** Hairlines, and the quietest divider. */
  rule: '#e6e4dd',

  // ---- the brand green ---------------------------------------------------
  /**
   * The ramp the donut and the bars are drawn from, deepest first. Six steps,
   * because the breakdown has six categories and a chart that runs out of
   * colours starts repeating them — which is the one thing a legend cannot
   * survive.
   */
  green: '#1b3c2e',
  green2: '#2f5c45',
  green3: '#4c7f61',
  green4: '#7da98b',
  green5: '#a8c4ad',
  green6: '#cdd6cb',

  /** The trend bars that are not this month. */
  bar: '#a9bdab',
  /** This month's, and the pill over it. */
  barOn: '#1b3c2e',

  // ---- ink ---------------------------------------------------------------
  ink: '#16261d',
  /** Legend labels and the month beside a heading. */
  inkSoft: '#2c3a32',
  /** Captions, axis labels, inactive tabs. */
  muted: '#7b8a80',
  /** On the deep green: the active segment's label, the dock button's glyph. */
  onGreen: '#ffffff',
  /** On the insight card's tint. */
  onTint: '#1b3c2e',
} as const;

/**
 * The type ramp, in dp, for a 393dp phone.
 *
 * `line` is explicit everywhere: React Native and the web harness disagree
 * about default leading, and this screen stacks six blocks whose positions all
 * come off these boxes.
 */
export const type = {
  /** "Analytics". */
  title: { size: 20, line: 26, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },

  /** "Spending", "Income", "Savings", "Goals". */
  tab: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },
  /** The selected one, which the reference sets heavier. */
  tabOn: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },

  /** "Your Spending", "Spending Trend". */
  section: { size: 16.5, line: 22, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "Aug 2026" beside it. */
  sectionMeta: { size: 13, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "$754.33" in the middle of the donut. */
  donutValue: { size: 25, line: 31, tracking: -0.8, family: 'PlusJakartaSans_700Bold' },
  /** "Total Spent" under it. */
  donutLabel: { size: 11.5, line: 15, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Shopping", "Bills & Utilities". */
  legend: { size: 12.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** Its percentage, set heavier. */
  legendValue: { size: 12.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "You're 12% under budget!". */
  insightTitle: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** The two lines under it. */
  insightBody: { size: 11.5, line: 15.5, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Mar", "Apr", … under the bars. */
  axisMonth: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** This month's, which the reference sets heavier. */
  axisMonthOn: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
  /** "1.5K", "1K", "500", "0" up the right-hand side. */
  axisValue: { size: 9.5, line: 13, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "$754.33" in the pill over the live bar. */
  tooltip: { size: 10.5, line: 14, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "Home", "Analytics", "Cards", "Profile". */
  dock: { size: 10, line: 13, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  dockOn: { size: 10, line: 13, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
} as const;

/** Corner radii, read off the corner profiles in the reference. */
export const radius = {
  /** The insight card. */
  card: 14,
  /** The segmented control, and the pill inside it. */
  pill: 999,
  /** Anything fully round: the header buttons, the dock button, legend dots. */
  full: 999,
  /** The trend bars. */
  bar: 5,
} as const;

/**
 * The shadows. Two, both pale — this page is paper and almost nothing lifts
 * off it.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  /** The round header buttons and the segmented bar. */
  soft: {
    shadowColor: '#9aa79e',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 2,
  },
  /** The dock's centre button, the one thing that properly floats. */
  fab: {
    shadowColor: '#1b3c2e',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
} as const;
