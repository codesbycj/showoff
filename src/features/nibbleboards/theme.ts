/**
 * Nibble — the boards, third of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: two tiles at the top, a row of tall capsule
 * gauges below, a share row at the foot, and the same three-disc dock.
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
} as const;

/** The type ramp, in dp. */
export const type = {
  greet: { size: 14, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },
  headline: { size: 21, line: 28, tracking: -0.6, family: 'Poppins_600SemiBold' },

  tileName: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  ringBig: { size: 21, line: 27, tracking: -0.6, family: 'Poppins_600SemiBold' },
  ringLabel: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },
  waterDay: { size: 9.5, line: 13, tracking: 0, family: 'Poppins_400Regular' },

  gaugeValue: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },
  gaugeName: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },

  share: { size: 14, line: 20, tracking: -0.3, family: 'Poppins_500Medium' },
  friend: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },
} as const;

export const radius = {
  card: 20,
  tile: 18,
  gauge: 26,
  chip: 999,
  pill: 999,
} as const;
