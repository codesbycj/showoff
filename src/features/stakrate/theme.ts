/**
 * Stak — analyst ratings, last of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference").
 *
 * **The company is invented**, as on the stock screen: the reference puts
 * Apple Inc., the ticker AAPL and Apple's own mark over made-up analyst
 * figures, and a real company's name and logo above invented numbers is the
 * one thing this project must not ship.
 */

export const sk = {
  canvas: '#0B0B0B',
  ink: '#FFFFFF',
  body: '#A7A7A7',
  muted: '#6E6E6E',

  /** Buy. */
  acid: '#CBF527',
  onAcid: '#0B0B0B',
  /** Hold. */
  grey: '#8D8F92',
  /** Sell. */
  coal: '#2B2B2B',

  slab: '#1C1C1C',
  slabEdge: '#2E2E2E',

  /** The notes at the foot, which are the only light surface. */
  card: '#FFFFFF',
  onCard: '#0B0B0B',
  cardBody: '#5C5E61',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "ANALYST HLCN / RATINGS". */
  display: { size: 36, line: 44, tracking: -1.1, family: 'PlusJakartaSans_800ExtraBold' },

  /** "Halcyon Instruments". */
  name: { size: 15.5, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  ticker: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "65%". */
  share: { size: 40, line: 48, tracking: -1.4, family: 'PlusJakartaSans_800ExtraBold' },
  /** "BUY". */
  verdict: { size: 13, line: 17, tracking: 0.4, family: 'PlusJakartaSans_700Bold' },
  /** "29". */
  count: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },

  /** "Optimistic analysts". */
  noteTitle: { size: 17, line: 23, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  noteBody: { size: 13, line: 19, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  noteBrand: { size: 13, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
} as const;

export const radius = {
  bar: 24,
  card: 22,
  control: 999,
} as const;
