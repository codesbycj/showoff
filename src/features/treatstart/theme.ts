/**
 * Treats — the intro screen, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 */

export const tr = {
  /** The page. The reference washes lilac into white down the screen. */
  canvasTop: '#ece4fb',
  canvas: '#f7f5fb',

  /** The cards the products sit on. */
  card: '#ffffff',

  ink: '#17161c',
  /** The lighter half of the headline — "Anytime". */
  inkSoft: '#6a6577',
  muted: '#8b8695',

  /** The brand violet, and the two tints the floating controls use. */
  violet: '#7c5cf0',
  violetSoft: '#e5ddfb',
  sky: '#cfe0fb',

  /** The buttons. */
  action: '#17161c',
  onAction: '#ffffff',

  /** The curved arrows between the cards. */
  arrowViolet: '#b9a6f4',
  arrowSky: '#9dc0f0',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Your Favorite Treats," — the bold half of the headline. */
  display: { size: 29, line: 36, tracking: -1, family: 'Poppins_700Bold' },
  /** "Anytime" — the light half, set on the same line. */
  displaySoft: { size: 29, line: 36, tracking: -1, family: 'Poppins_400Regular' },
  /** The line under it. */
  body: { size: 13, line: 19, tracking: -0.1, family: 'Poppins_400Regular' },

  /** "Potato Chips", on the card. */
  product: { size: 19, line: 25, tracking: -0.6, family: 'Poppins_700Bold' },
  /** The word "Price". */
  priceLabel: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },
  /** "$2.00 USD". */
  price: { size: 13.5, line: 18, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "Add To Cart". */
  cardAction: { size: 11.5, line: 15, tracking: -0.2, family: 'Poppins_600SemiBold' },

  /** "Get Start". */
  button: { size: 15, line: 20, tracking: -0.2, family: 'Poppins_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  card: 20,
  photo: 14,
  pill: 999,
  full: 999,
} as const;

/**
 * The cards' drop shadow.
 *
 * `shadow*` and `elevation` travel together in one object. A `Platform.select`
 * between them is the one thing the web harness cannot check, so it is never
 * used (AGENTS.md, "The web render is a proxy, not proof").
 */
export const shadow = {
  card: {
    shadowColor: '#2a1f4d',
    shadowOpacity: 0.16,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
} as const;
