/**
 * Tempo — the calendar, last of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette, the order of the
 * blocks and the two accents are taken from it; every size is chosen for a
 * real 393dp screen.
 *
 * One showcase per screen, so this carries its own theme, layout, insets and
 * text primitive rather than sharing another showcase's.
 */

export const tp = {
  /** The page, which is a shade off white so the cards have an edge. */
  canvas: '#F3F4F4',
  card: '#FFFFFF',

  ink: '#16181B',
  body: '#6E7479',
  muted: '#9AA0A5',
  hair: '#ECEDEE',

  /** The hatching on the days either side of the month. */
  hatch: '#E9EAEB',

  /** The work accent: progress, the live tab, a status dot. */
  green: '#17A96B',
  /** The action accent: the one button that starts something. */
  orange: '#F26B2A',

  /** The notice, which is the only dark object on the page. */
  dark: '#1A1D1F',
  onDark: '#FFFFFF',
  onDarkMuted: 'rgba(255, 255, 255, 0.55)',
  darkClose: 'rgba(255, 255, 255, 0.14)',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "February" in the month picker. */
  display: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_600SemiBold' },
  /** "S M T W T F S". */
  weekday: { size: 11.5, line: 15, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
  /** A date in the grid. */
  date: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },

  /** "10+" in the overflow disc. */
  crew: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },

  /** "You have 5 tasks today." */
  notice: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },

  /** "Today Tasks". */
  section: { size: 17, line: 22, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "See All". */
  sectionLink: { size: 12.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Delivery App UI Kit". */
  cardTitle: { size: 16, line: 21, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** The sentence under it. */
  cardBody: { size: 12.5, line: 18, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** "2+" and "65%". */
  cardMeta: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "Home", "Message", … */
  tab: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_500Medium' },
  tabOn: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_700Bold' },
} as const;

export const radius = {
  card: 20,
  pill: 999,
  control: 999,
  bar: 999,
} as const;

/**
 * The two shadows on the page.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check (AGENTS.md).
 */
export const shadow = {
  card: {
    shadowColor: '#1A1D1F',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 14,
    elevation: 2,
  },
  fab: {
    shadowColor: '#F26B2A',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.32,
    shadowRadius: 14,
    elevation: 8,
  },
} as const;
