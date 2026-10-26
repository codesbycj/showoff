/**
 * Vigor — find a programme, first of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a full-bleed blue page, a very large display
 * headline set tight, a search line in the page rather than in a box, one
 * orange for the chip that is selected, and white article cards on a
 * horizontal rail that runs off the right edge.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const vg = {
  blue: '#3B8DF5',
  blueDeep: '#2F79D8',
  blueSoft: '#6DAEFA',
  onBlue: '#FFFFFF',
  onBlueDim: '#C5DEFD',

  orange: '#F5A623',
  onOrange: '#FFFFFF',

  card: '#FFFFFF',
  well: '#F2F4F7',

  ink: '#15212E',
  muted: '#7A8794',
  faint: '#AFB9C3',
  hairline: '#E8ECF0',

  badge: '#15212E',
  like: '#F5A623',
} as const;

/** The type ramp, in dp. */
export const type = {
  eyebrow: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },
  display: { size: 31, line: 39, tracking: -1, family: 'Poppins_700Bold' },

  search: { size: 17, line: 23, tracking: -0.4, family: 'Poppins_600SemiBold' },
  chip: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },

  cardTitle: { size: 15.5, line: 21, tracking: -0.3, family: 'Poppins_600SemiBold' },
  stat: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },
  badge: { size: 10, line: 14, tracking: 0, family: 'Poppins_600SemiBold' },
} as const;

export const radius = {
  card: 20,
  art: 14,
  chip: 999,
  pill: 999,
} as const;
