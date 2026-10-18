/**
 * Treats — the home screen, second of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 */

export const tr = {
  canvas: '#ffffff',
  /** The search field and the inactive filter pills. */
  well: '#f3f2f6',

  ink: '#17161c',
  muted: '#8b8695',
  onDark: '#ffffff',

  /** The product panel behind the pack. */
  panel: '#ddd0f8',

  /** The dark pill: the selected filter, and "Add To Cart". */
  action: '#17161c',

  /** The tab bar's hairline. */
  rule: '#eeecf2',

  /** The card's own surface, which is the page plus a shadow. */
  card: '#ffffff',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Hi, Jack.L". */
  greeting: { size: 17, line: 23, tracking: -0.5, family: 'Poppins_600SemiBold' },
  /** "Best snacks for you". */
  greetingMeta: { size: 12, line: 17, tracking: -0.1, family: 'Poppins_400Regular' },

  /** The search field's placeholder. */
  search: { size: 13, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },
  /** A filter pill. */
  filter: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },

  /** "Chips Collections". */
  section: { size: 15, line: 20, tracking: -0.4, family: 'Poppins_600SemiBold' },
  /** "See all". */
  more: { size: 12, line: 17, tracking: -0.1, family: 'Poppins_400Regular' },

  /** "Potato Chips", over the panel. */
  product: { size: 25, line: 31, tracking: -0.8, family: 'Poppins_700Bold' },
  /** The word "Price". */
  priceLabel: { size: 12, line: 16, tracking: 0, family: 'Poppins_400Regular' },
  /** "$2.00 USD". */
  price: { size: 16, line: 21, tracking: -0.4, family: 'Poppins_600SemiBold' },
  /** "Add To Cart". */
  cardAction: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },

  /** A tab's label. */
  tab: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  card: 22,
  panel: 18,
  pill: 999,
  full: 999,
} as const;

/**
 * The product card's drop shadow.
 *
 * `shadow*` and `elevation` travel together in one object — a `Platform.select`
 * between them is exactly what the web harness cannot check.
 */
export const shadow = {
  card: {
    shadowColor: '#2a1f4d',
    shadowOpacity: 0.1,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
} as const;
