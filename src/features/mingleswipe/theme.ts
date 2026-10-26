/**
 * Mingle — a profile, second of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a full-bleed portrait with the whole interface
 * laid over it, a name set very large with the age trailing in a dimmer
 * weight, outlined glass chips for interests, and two action buttons at the
 * foot — a white one to pass and a red one to like.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const mg = {
  red: '#F8443F',
  redDeep: '#E23531',
  onRed: '#FFFFFF',

  card: '#FFFFFF',
  ink: '#16181C',

  over: '#FFFFFF',
  overDim: '#FFFFFFB8',
  glass: '#FFFFFF2E',
  glassLine: '#FFFFFF5C',
  scrim: '#000000',
} as const;

/** The type ramp, in dp. */
export const type = {
  liked: { size: 15, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },
  badge: { size: 10, line: 14, tracking: 0, family: 'Poppins_600SemiBold' },

  place: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },
  name: { size: 38, line: 46, tracking: -1.4, family: 'Poppins_700Bold' },
  age: { size: 30, line: 46, tracking: -1, family: 'Poppins_500Medium' },

  chip: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },
  bioLabel: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_700Bold' },
  bio: { size: 12.5, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },
} as const;

export const radius = {
  chip: 999,
  action: 18,
  pill: 999,
} as const;
