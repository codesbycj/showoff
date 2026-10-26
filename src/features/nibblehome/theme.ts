/**
 * Nibble — the day, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a white page of soft cards, a pale blue card
 * carrying the headline, a mint card carrying the meal, one yellow for the
 * thing that is selected, and very large figures set tight.
 *
 * Poppins stands in for the reference's grotesque. The display sizes are set
 * from the line they have to fit, not measured off the posed phone.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const nb = {
  canvas: '#FFFFFF',
  card: '#FFFFFF',
  well: '#F4F4F5',

  blue: '#BEE0EC',
  blueDeep: '#8FC9DC',
  blueInk: '#1F5467',

  mint: '#CFE6B8',
  mintDeep: '#A9D186',
  mintInk: '#3F6124',

  yellow: '#F6E97C',
  yellowInk: '#5E5415',
  coral: '#F2A98B',

  ink: '#111214',
  muted: '#8A8C90',
  faint: '#C2C4C8',
  hairline: '#EDEDEF',

  onCard: '#FFFFFF',
} as const;

/** The type ramp, in dp. */
export const type = {
  greet: { size: 14, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },

  cardLabel: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },
  huge: { size: 44, line: 52, tracking: -2, family: 'Poppins_600SemiBold' },
  dateLine: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  ringBig: { size: 19, line: 25, tracking: -0.5, family: 'Poppins_600SemiBold' },
  ringLabel: { size: 10, line: 14, tracking: 0, family: 'Poppins_400Regular' },

  tileLabel: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  tileValue: { size: 20, line: 26, tracking: -0.6, family: 'Poppins_600SemiBold' },
  tileUnit: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  tileDelta: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },

  mealName: { size: 17, line: 23, tracking: -0.4, family: 'Poppins_600SemiBold' },
  mealNote: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  macroName: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  macroValue: { size: 18, line: 24, tracking: -0.5, family: 'Poppins_600SemiBold' },
  pill: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

export const radius = {
  card: 22,
  tile: 18,
  chip: 999,
  pill: 999,
} as const;
