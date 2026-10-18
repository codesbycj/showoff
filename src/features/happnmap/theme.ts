/**
 * We Crossed Paths — the map, third of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 */

export const hp = {
  canvas: '#f2f7fd',
  surface: '#ffffff',

  ink: '#101828',
  muted: '#6a7384',
  onDark: '#ffffff',

  /** The dark pill: the back disc and the selected filter. */
  action: '#101828',
  /** An unselected filter. */
  well: '#e8eef6',

  /** The brand blue. */
  blue: '#2f9bf5',
  blueDeep: '#1668c4',

  /** The radar: its field, its rings and the streets drawn under them. */
  radar: '#dceafa',
  radarRing: '#c4dbf6',
  street: '#cfe1f7',

  /** A fact chip. */
  fact: '#f0f5fb',
  /** The hairline between the card and the facts. */
  rule: '#e6edf6',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Map". */
  title: { size: 19, line: 25, tracking: -0.5, family: 'Poppins_700Bold' },
  /** A filter pill. */
  filter: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },
  /** A match percentage floating on the radar. */
  bubble: { size: 10, line: 13, tracking: -0.1, family: 'Poppins_600SemiBold' },

  /** "Aisha, 26". */
  name: { size: 17, line: 23, tracking: -0.5, family: 'Poppins_700Bold' },
  /** "Marketing Manager". */
  role: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },
  /** "Notting Hill, London". */
  place: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },

  /** "200m away". */
  fact: { size: 11.5, line: 15, tracking: -0.2, family: 'Poppins_600SemiBold' },
  /** "from you". */
  factMeta: { size: 10, line: 13, tracking: -0.1, family: 'Poppins_400Regular' },

  /** "About". */
  section: { size: 13.5, line: 18, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** The paragraph under it. */
  body: { size: 12, line: 19, tracking: -0.1, family: 'Poppins_400Regular' },

  /** A tab's label. */
  tab: { size: 10, line: 13, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  card: 20,
  chip: 14,
  pill: 999,
  full: 999,
} as const;

/**
 * The floating surfaces' shadow.
 *
 * `shadow*` and `elevation` travel together in one object — a `Platform.select`
 * between them is exactly what the web harness cannot check.
 */
export const shadow = {
  float: {
    shadowColor: '#0d3b66',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
} as const;
