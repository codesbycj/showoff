/**
 * Nest — performance, third of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a warm cream page, a very large balance set
 * tight, a row of round action discs with one olive among the blacks, blob
 * -shaped contact portraits in a grid, and a dark dock welded to the foot.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const ne = {
  canvas: '#F4F3EC',
  card: '#FFFFFF',
  well: '#EAE9E1',

  green: '#A8D879',
  greenDeep: '#7FB94A',
  greenInk: '#2F5313',
  olive: '#6E8158',

  blush: '#F6DFD8',
  mist: '#DCE9E4',
  lilac: '#E6DEF0',

  ink: '#15160F',
  muted: '#7E8176',
  faint: '#B6B8AC',
  hairline: '#E3E2D9',

  dock: '#16170F',
  onDock: '#FFFFFF',
  dockDim: '#6B6D60',
} as const;

/** The type ramp, in dp. */
export const type = {
  hello: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  name: { size: 14, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },

  label: { size: 11.5, line: 16, tracking: 0.6, family: 'Poppins_600SemiBold' },
  balance: { size: 36, line: 46, tracking: -1.6, family: 'Poppins_700Bold' },
  sub: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  pill: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_600SemiBold' },

  contact: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_500Medium' },

  title: { size: 13, line: 18, tracking: 0.8, family: 'Poppins_700Bold' },
  more: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  month: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },
  tag: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_600SemiBold' },
  news: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
} as const;

export const radius = {
  blob: 26,
  card: 20,
  pill: 999,
} as const;
