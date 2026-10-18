/**
 * RentaX — the browse screen, first of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette and the order of
 * the blocks are taken from it; every size is chosen for a real 393dp screen.
 *
 * A **separate showcase** from the detail screen — each owns its theme,
 * layout, insets and text primitive, so blanking one cannot reach the other
 * (AGENTS.md, "Showcase lifecycle").
 */

export const rx = {
  /** The page. Near-black, not black: the cards are what should be loudest. */
  canvas: '#0e0e0f',
  /** The dock, and the two view toggles. */
  raised: '#1b1b1d',
  raisedEdge: 'rgba(255, 255, 255, 0.1)',

  /** Ink on the page. */
  onDark: '#ffffff',
  onDarkMuted: 'rgba(255, 255, 255, 0.55)',

  /** The two cards, and the ink that reads on each. */
  cardWarm: '#f5e03f',
  cardCoral: '#f08a7a',
  onCard: '#121212',
  onCardMuted: 'rgba(18, 18, 18, 0.6)',

  /** The "New" flag beside the second tab. */
  flag: '#8b5cf6',
  onFlag: '#ffffff',

  /** The unread dot, and the tick beside the date. */
  alert: '#ff4d3d',
  check: '#2fbf6a',

  /** The badge on the avatar. */
  badge: '#f5e03f',

  /** The two cars, in the order the cards are listed. */
  cars: ['#2f6df0', '#9aa3ad'],
  /** Their glass and their shadow, which are the same on both. */
  carGlass: 'rgba(18, 18, 18, 0.72)',
  carShade: 'rgba(18, 18, 18, 0.18)',

  /** The review avatars on a card. */
  faces: ['#f2c4a0', '#a8c8f2', '#c9b7f0'],
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "RentaX®". */
  brand: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** The address under it. */
  place: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },

  /** "Premium / & Rental Car". */
  display: { size: 27, line: 33, tracking: -0.8, family: 'PlusJakartaSans_700Bold' },

  /** "Premium", "Exclusive". */
  tab: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },
  tabOn: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
  /** "New". */
  flag: { size: 8.5, line: 11, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },

  /** "Choose Date". */
  fieldLabel: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Today, 13 May". */
  fieldValue: { size: 12.5, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },

  /** "Color:". */
  cardMeta: { size: 9.5, line: 13, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "570 km" in the range pill. */
  cardPill: { size: 9.5, line: 13, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
  /** "Porsche 911 GT3". */
  cardTitle: { size: 15.5, line: 20, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "4,3". */
  rating: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },
  /** "82% Recommend". */
  recommend: { size: 9.5, line: 13, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "1 day rental". */
  priceLabel: { size: 9, line: 12, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "$900". */
  price: { size: 16, line: 21, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  card: 22,
  pill: 999,
  tile: 12,
  full: 999,
} as const;

/**
 * The one shadow, under the dock.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  dock: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 16,
    elevation: 10,
  },
} as const;
