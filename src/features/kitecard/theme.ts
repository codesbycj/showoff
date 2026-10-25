/**
 * Kite — the card screen, second of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). What is taken from it: a light
 * grey page with one charcoal panel carrying the money, a coral accent on the
 * one link, green and red on the two flows, and a floating pill tab bar.
 * Every size is chosen for a real 393dp screen.
 *
 * Poppins stands in for the reference's geometric sans, which is not
 * obtainable. At matched cap height Poppins runs a little wide, so the
 * balance is set a point smaller than the board's proportions suggest.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const kt = {
  cardFace: '#303033',
  cardEdge: '#3B3B3F',
  canvas: '#EFEEEC',
  panel: '#1B1B1D',
  panelCard: '#2A2A2D',
  panelEdge: '#333336',

  ink: '#FFFFFF',
  dim: '#9B9B9F',
  faint: '#6E6E73',

  onCanvas: '#141416',
  onCanvasDim: '#7A7A7F',
  hairline: '#E0DFDC',

  coral: '#F4674F',
  green: '#35C07A',
  red: '#F0614E',
  surface: '#FFFFFF',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  greeting: { size: 13.5, line: 18, tracking: -0.1, family: 'Poppins_500Medium' },

  /** "+ New Card". */
  pill: { size: 12.5, line: 17, tracking: -0.1, family: 'Poppins_500Medium' },
  /** The name embossed on the card. */
  holder: { size: 12, line: 16, tracking: 0.6, family: 'Poppins_500Medium' },
  /** The masked number. */
  pan: { size: 13, line: 18, tracking: 1.4, family: 'Poppins_500Medium' },
  /** "Show card details". */
  reveal: { size: 12.5, line: 17, tracking: -0.1, family: 'Poppins_400Regular' },

  balanceLabel: { size: 11.5, line: 16, tracking: 0.2, family: 'Poppins_400Regular' },
  balance: { size: 32, line: 42, tracking: -1, family: 'Poppins_600SemiBold' },

  actionLabel: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },

  flowLabel: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  flowValue: { size: 17, line: 23, tracking: -0.4, family: 'Poppins_600SemiBold' },

  sectionTitle: { size: 14, line: 19, tracking: -0.2, family: 'Poppins_600SemiBold' },
  seeAll: { size: 12.5, line: 17, tracking: -0.1, family: 'Poppins_500Medium' },

  rowName: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },
  rowSub: { size: 11, line: 15, tracking: 0, family: 'Poppins_400Regular' },
  rowAmount: { size: 13.5, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  rowState: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },

  tab: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

export const radius = {
  panel: 30,
  card: 18,
  pill: 999,
  control: 999,
} as const;
