/**
 * Lensa — the figures, second of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: the same warm off-white page and white cards,
 * a bar chart with the day picked out in lime, a target band drawn as a
 * hatch, and two pie charts in the same three pastels as the first screen.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const ls = {
  canvas: '#F6F6F2',
  card: '#FFFFFF',
  well: '#F1F1ED',

  lime: '#C6EC63',
  limeDeep: '#9CD426',
  limeInk: '#3E5A0B',

  pink: '#F9C7D2',
  pinkInk: '#C2546C',
  butter: '#FBE3A2',
  butterInk: '#B08521',
  sky: '#BFDCF5',
  skyInk: '#3A77AE',

  bar: '#DEDEDA',
  hatch: '#C9C9C3',

  ink: '#101210',
  muted: '#86887F',
  faint: '#BCBEB6',
  hairline: '#E9E9E3',
} as const;

/** The type ramp, in dp. */
export const type = {
  axis: { size: 10, line: 14, tracking: 0, family: 'Poppins_400Regular' },
  axisOn: { size: 10, line: 14, tracking: 0, family: 'Poppins_600SemiBold' },

  cardLabel: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  huge: { size: 30, line: 38, tracking: -1.1, family: 'Poppins_700Bold' },
  target: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_400Regular' },
  scale: { size: 10, line: 14, tracking: 0, family: 'Poppins_400Regular' },
  range: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },
  rangeValue: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_600SemiBold' },

  slice: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_600SemiBold' },
  pieName: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  legendName: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  legendValue: { size: 12, line: 16, tracking: -0.2, family: 'Poppins_600SemiBold' },
} as const;

export const radius = {
  card: 20,
  bar: 7,
  pill: 999,
} as const;
