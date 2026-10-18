/**
 * A sales CRM — the customer network, first of a three-phone board.
 *
 * The board carries no brand name, so the app is referred to here by what it
 * does. The reference is a **design shot**, so this is an inspo brief and rule
 * 1 is off (AGENTS.md, "Three kinds of reference"). The palette and the order
 * of the blocks are taken from it; every size is chosen for a real 393dp
 * screen.
 *
 * A **separate showcase** from the other two screens — each owns its theme,
 * layout, insets and text primitive (AGENTS.md, "Showcase lifecycle").
 */

export const cn = {
  /** The page. Warm off-white, which is what makes the white cards read. */
  canvas: '#f2f1ec',
  /** Cards, the round buttons, the floating bar. */
  surface: '#ffffff',
  /** A card's hairline — the only thing separating white from near-white. */
  edge: '#e8e6e0',

  /** The live filter, and the round arrow on a card. */
  ink: '#111111',
  onInk: '#ffffff',

  /** The one card the reference picks out. */
  accent: '#f5e03f',
  onAccent: '#121212',

  /** Text. */
  text: '#141414',
  muted: '#8a8984',
  faint: '#b5b3ad',

  /** The pipeline pill on an ordinary card. */
  pill: '#f2f1ec',

  /** The avatars, in the order the cards are listed. */
  faces: ['#e8c3a8', '#f0d6a8', '#c7d9f0', '#e3c9e8', '#c6e3cf', '#f0c6c6'],
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Your Customer / Network". */
  title: { size: 21, line: 26, tracking: -0.6, family: 'PlusJakartaSans_700Bold' },

  /** "All", "Permanent", "Hot". */
  filter: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  filterOn: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "Maria Green". */
  name: { size: 14, line: 18, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "Chemical Machinery & Orbi". */
  company: { size: 9.8, line: 13, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "$120,100". */
  amount: { size: 12.5, line: 16, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
  /** "Total in Pipeline". */
  amountLabel: { size: 8.5, line: 11, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** The initials inside an avatar. */
  initials: { size: 13, line: 17, tracking: 0, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  card: 18,
  pill: 999,
  full: 999,
} as const;

/**
 * The shadows: a white card on a warm page, and the bar that floats over both.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  card: {
    shadowColor: '#a9a69c',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 9,
    elevation: 2,
  },
  bar: {
    shadowColor: '#8f8c82',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;
