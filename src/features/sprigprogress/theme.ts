/**
 * Sprig — progress, third of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a lime progress card, two pastel tiles, a dark
 * photograph carrying the streak, and a goal row at the foot.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const sg = {
  canvas: '#FFFFFF',
  card: '#FFFFFF',
  well: '#F4F5F3',

  lime: '#D7EFA0',
  limeDeep: '#BFE173',
  limeInk: '#4A6A14',

  peach: '#FBE0CC',
  peachInk: '#9A5A26',
  blue: '#D6E8F2',
  blueInk: '#2E5F7A',

  ink: '#101410',
  muted: '#8B908A',
  faint: '#BFC3BC',
  hairline: '#ECEEEA',

  panel: '#101410',
  onPanel: '#FFFFFF',
  onDark: '#FFFFFF',
} as const;

/** The type ramp, in dp. */
export const type = {
  title: { size: 22, line: 28, tracking: -0.6, family: 'Poppins_700Bold' },
  lede: { size: 12, line: 17, tracking: -0.1, family: 'Poppins_400Regular' },

  cardTitle: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  bubble: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_600SemiBold' },
  note: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },

  tileName: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },
  tileValue: { size: 18, line: 24, tracking: -0.5, family: 'Poppins_700Bold' },
  tileUnit: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },

  streakBig: { size: 40, line: 48, tracking: -1.6, family: 'Poppins_700Bold' },
  streakLine: { size: 14, line: 19, tracking: -0.3, family: 'Poppins_700Bold' },

  goalName: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  goalNote: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
} as const;

export const radius = {
  card: 22,
  tile: 18,
  photo: 20,
  chip: 999,
  pill: 999,
} as const;
