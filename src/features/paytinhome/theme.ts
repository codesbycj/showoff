/**
 * Paytin — home, the second screen of the same board as `paytinstart`.
 *
 * A **separate showcase on purpose**: it shares a brand with screen 1 and
 * duplicates its theme, layout, insets and text primitive rather than
 * importing them, so each films, blanks and locks entirely on its own
 * (AGENTS.md, "Showcase lifecycle").
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. The palette and the order of the blocks are taken from it; every size
 * is chosen for a real 393dp screen.
 */

export const ph = {
  // ---- surfaces ----------------------------------------------------------
  /** The page. Warm-neutral grey, which is what makes the white cards read. */
  canvas: '#f3f3f1',
  /** Cards, tiles, the round header button. */
  surface: '#ffffff',
  /** The balance card, the dock, the activity avatars. */
  ink: '#141414',
  /** A hairline, used once, under the quick-send row. */
  rule: '#e9e9e6',

  // ---- the brand ---------------------------------------------------------
  /** The one colour the whole board is built on. */
  lime: '#c5f24e',
  /** The block let into the right of the card, a half-step deeper. */
  limeDeep: '#b6e73c',

  // ---- ink ---------------------------------------------------------------
  /** Headings, amounts, tile labels. */
  text: '#141414',
  /** The name over the greeting, dates, "See all". */
  muted: '#8d8d8a',
  /** On the black card and the black dock. */
  onInk: '#ffffff',
  /** The card's own labels, a step down from its figures. */
  onInkMuted: 'rgba(255, 255, 255, 0.55)',

  /** The unread dot on the bell. */
  alert: '#ff4d3d',

  /** The five quick-send avatars, in order. Initials on colour — see
   *  `avatar.tsx` for why this screen has no photographs in it. */
  avatars: ['#f2b8a8', '#a8c8f2', '#f2d9a8', '#c3b8f2', '#a8f2c8'],
} as const;

/**
 * The type ramp, in dp, for a 393dp phone.
 *
 * `line` is explicit everywhere: React Native and the web harness disagree
 * about default leading, and this screen stacks seven blocks whose positions
 * all come off these boxes.
 */
export const type = {
  /** "William Current", over the greeting. */
  eyebrow: { size: 11.5, line: 15, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Welcome Back". */
  greeting: { size: 17, line: 22, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },

  /** "Balance", "Exp 07/26" — the card's small print. */
  cardLabel: { size: 10.5, line: 14, tracking: 0.1, family: 'PlusJakartaSans_400Regular' },
  /** "$ 25,453.00". */
  cardAmount: { size: 23, line: 30, tracking: -0.6, family: 'PlusJakartaSans_700Bold' },
  /** The masked number. */
  cardNumber: { size: 12, line: 16, tracking: 1.4, family: 'PlusJakartaSans_600SemiBold' },
  /** "William Current" on the card. */
  cardName: { size: 11.5, line: 15, tracking: 0, family: 'PlusJakartaSans_500Medium' },
  /** "Set Budget". */
  budget: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "Send", "Bill", "Mobile", "More". */
  tile: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Quick Send", "Recent Activity". */
  section: { size: 14.5, line: 19, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "See all". */
  link: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** A quick-send contact's name. */
  contact: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** The initials inside their circle. */
  initials: { size: 14, line: 18, tracking: 0, family: 'PlusJakartaSans_700Bold' },

  /** "Food Store". */
  rowTitle: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Monday, 25 January". */
  rowMeta: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "-$15.00". */
  rowAmount: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii, read off the corner profiles in the reference. */
export const radius = {
  /** The balance card. */
  card: 20,
  /** The action tiles and the activity sheet. */
  tile: 16,
  /** Anything fully round: the dock, the pills, the avatars. */
  full: 999,
} as const;

/**
 * The shadows. Two, and both are what separates a white card from a grey page
 * without drawing a border.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  soft: {
    shadowColor: '#9b9b94',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.14,
    shadowRadius: 8,
    elevation: 2,
  },
  dock: {
    shadowColor: '#111111',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;
