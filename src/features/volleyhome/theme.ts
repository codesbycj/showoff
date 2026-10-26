/**
 * Volley — the home, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a white page with deep-green surfaces, gold for
 * the thing you are meant to press, a photographic hero with a dark gradient
 * under its type, and four soft quick-action tiles.
 *
 * The brand is invented; the reference's own wordmark is not copied.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const vl = {
  canvas: '#FFFFFF',
  card: '#FFFFFF',
  well: '#F4F5F2',

  green: '#1C4634',
  greenDeep: '#143227',
  greenSoft: '#E6EEE9',
  onGreen: '#FFFFFF',
  onGreenDim: '#BFD3C8',

  gold: '#D9B157',
  goldSoft: '#F6EBD2',
  onGold: '#2B2208',

  lime: '#C6E84B',
  limeInk: '#32420A',

  ink: '#13160F',
  muted: '#7A8077',
  faint: '#B4B9B0',
  hairline: '#E7E9E4',

  scrim: '#06120C',
} as const;

/** The type ramp, in dp. */
export const type = {
  wordmark: { size: 20, line: 27, tracking: -0.5, family: 'Poppins_700Bold' },
  welcome: { size: 20, line: 27, tracking: -0.5, family: 'Poppins_700Bold' },

  chip: { size: 10, line: 14, tracking: 0.4, family: 'Poppins_600SemiBold' },
  dateNum: { size: 17, line: 22, tracking: -0.4, family: 'Poppins_700Bold' },
  dateMon: { size: 9, line: 12, tracking: 0.6, family: 'Poppins_500Medium' },

  heroTitle: { size: 21, line: 28, tracking: -0.6, family: 'Poppins_700Bold' },
  heroMeta: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  joined: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_500Medium' },
  joinBtn: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_600SemiBold' },

  tile: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_500Medium' },

  bookTitle: { size: 15, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },
  bookNote: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },

  section: { size: 16, line: 22, tracking: -0.4, family: 'Poppins_700Bold' },
  seeAll: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  eventName: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  tab: { size: 9.5, line: 13, tracking: 0, family: 'Poppins_500Medium' },
} as const;

export const radius = {
  hero: 22,
  card: 16,
  tile: 18,
  pill: 999,
} as const;
