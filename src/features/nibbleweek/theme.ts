/**
 * Nibble — the week, second of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a white page, a rail of day pills with one
 * picked out in blue, a very large figure for what is left, a stacked bar for
 * the macro split, and a yellow bar at the foot.
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
  yellowDeep: '#EFD94A',
  yellowInk: '#5E5415',

  lilac: '#CDC4E8',
  coral: '#F2A98B',

  ink: '#111214',
  muted: '#8A8C90',
  faint: '#C2C4C8',
  hairline: '#EDEDEF',
} as const;

/** The type ramp, in dp. */
export const type = {
  title: { size: 24, line: 31, tracking: -0.7, family: 'Poppins_600SemiBold' },
  subtitle: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_400Regular' },

  dayLetter: { size: 11.5, line: 16, tracking: 0, family: 'Poppins_400Regular' },
  dayNum: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_500Medium' },

  leftLabel: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_400Regular' },
  huge: { size: 46, line: 56, tracking: -2.2, family: 'Poppins_600SemiBold' },
  hugeUnit: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_400Regular' },

  foodName: { size: 17, line: 23, tracking: -0.4, family: 'Poppins_600SemiBold' },
  foodValue: { size: 14.5, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },
  foodLabel: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },

  bar: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  legend: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },
} as const;

export const radius = {
  card: 22,
  day: 22,
  chip: 999,
  pill: 999,
} as const;
