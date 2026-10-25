/**
 * Orbit — the balance screen, second of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — black with a
 * holographic sweep of mint, lilac and peach — and the order of the blocks
 * are taken from it; every size is chosen for a real 393dp screen.
 *
 * Its own copy of the tokens, per "One showcase per screen": two showcases
 * sharing a feature folder would each report the other's blanked files as
 * DRIFT.
 */

export const ob = {
  canvas: '#0A0A0B',
  card: '#141416',
  cardEdge: '#1F1F22',
  chip: '#1C1C1F',

  ink: '#FFFFFF',
  body: '#9A9CA0',
  muted: '#64666A',

  /** The three stops of the holographic sweep. */
  holo1: '#B9F5CF',
  holo2: '#C9BBF7',
  holo3: '#F7C9A8',

  onHolo: '#0A0A0B',
  sheet: '#FFFFFF',
  onSheet: '#0A0A0B',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Hi, Remi!" */
  greeting: { size: 22, line: 29, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },

  /** "My Balance", "Money spent", axis labels. */
  label: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  axis: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_500Medium' },

  /** "8,656.60" and the currency sign beside it. */
  balance: { size: 34, line: 43, tracking: -1.2, family: 'PlusJakartaSans_700Bold' },
  balanceSign: { size: 19, line: 26, tracking: -0.4, family: 'PlusJakartaSans_500Medium' },

  /** "Transfer", "Request". */
  quick: { size: 14.5, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },

  /** "Statistics", "USD", "This month". */
  chip: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "10%" over "cashback". */
  cashback: { size: 18, line: 23, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  cashbackSub: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Recent Transaction". */
  cardTitle: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },

  /** "$842.30" on the chart's chip. */
  amount: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
} as const;

export const radius = {
  card: 20,
  chip: 12,
  pill: 999,
  control: 999,
} as const;
