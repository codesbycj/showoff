/**
 * Sprouts — the product screen, second of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other screen — each owns its theme, layout, insets and text primitive
 * (AGENTS.md, "Showcase lifecycle").
 */

export const sp = {
  /** The page, and the green panel the bowl stands on. */
  canvas: '#15190f',
  panel: '#8fc46a',
  /** The ghost wordmark printed across the panel. */
  ghost: 'rgba(32,68,16,0.3)',
  /** The sheet under it. */
  sheet: '#111509',
  sheetWell: '#1d2413',
  rule: '#2a3320',
  /** The old price, struck through. */
  was: '#7f8a72',

  ink: '#15190f',
  onDark: '#ffffff',
  onDarkSoft: 'rgba(255,255,255,0.7)',

  /** The feature card. */
  feature: '#f5c43c',
  /** The display type on it. */
  featureInk: '#17330f',

  /** The brand green. */
  green: '#6fae3f',
  greenDeep: '#2f5b18',

  /** A filter chip. */
  chip: '#1f2616',
  chipInk: '#e8efdd',

  /** The dock. */
  dock: 'rgba(255,255,255,0.14)',
  dockWell: 'rgba(255,255,255,0.1)',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "STICKY SESAME", the ghost line across the panel. */
  ghost: { size: 44, line: 46, tracking: -1.6, family: 'Poppins_700Bold' },

  /** "Sprouts brand". */
  brand: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },
  /** "STICKY SESAME CHILI TOFU BOWL". */
  display: { size: 22, line: 28, tracking: -0.7, family: 'Poppins_700Bold' },
  /** "$6.79". */
  price: { size: 19, line: 25, tracking: -0.5, family: 'Poppins_700Bold' },
  /** "$12.99", struck. */
  was: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_400Regular' },
  /** "13 oz - $0.77 per oz". */
  unit: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },

  /** "4.2/5". */
  stat: { size: 15, line: 20, tracking: -0.4, family: 'Poppins_600SemiBold' },
  /** "33 reviews". */
  statMeta: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_400Regular' },

  /** The paragraph. */
  body: { size: 12, line: 19, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "ADD TO BASKET". */
  button: { size: 14, line: 19, tracking: 0.6, family: 'Poppins_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  card: 22,
  tile: 18,
  pill: 999,
  full: 999,
} as const;
