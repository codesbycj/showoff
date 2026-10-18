/**
 * Sprouts — the home screen, first of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other screen — each owns its theme, layout, insets and text primitive
 * (AGENTS.md, "Showcase lifecycle").
 */

export const sp = {
  /** The page: near-black with a green cast. */
  canvas: '#15190f',

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
  /** "SPROUTS". */
  wordmark: { size: 18, line: 23, tracking: 1.6, family: 'Poppins_700Bold' },

  /** "Carol's favorite". */
  kicker: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_600SemiBold' },
  /** "FRENCH ROAST". */
  display: { size: 40, line: 42, tracking: -1.6, family: 'Poppins_700Bold' },

  /** "Organic Whole Bean Coffee". */
  product: { size: 11.5, line: 15, tracking: -0.1, family: 'Poppins_500Medium' },
  /** "$15.99". */
  price: { size: 11.5, line: 15, tracking: -0.1, family: 'Poppins_600SemiBold' },

  /** "Organic". */
  chip: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  card: 22,
  tile: 18,
  pill: 999,
  full: 999,
} as const;
