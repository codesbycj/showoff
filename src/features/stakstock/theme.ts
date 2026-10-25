/**
 * Stak — the stock, second of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — paper, ink and
 * one acid green — and the order of the blocks are taken from it; every size
 * is chosen for a real 393dp screen.
 *
 * **The company is invented.** The reference puts Apple Inc. and the ticker
 * AAPL on this screen with made-up prices under them. A real company's name
 * over invented figures is the one thing this project must not ship
 * (AGENTS.md, "Sourcing assets"), so the stock here is Halcyon Instruments.
 */

export const sk = {
  canvas: '#FFFFFF',
  ink: '#0B0B0B',
  body: '#6E7073',
  muted: '#9A9CA0',

  /** The one accent: the line, the live range, the first tile. */
  acid: '#CBF527',
  onAcid: '#0B0B0B',

  /** A control at rest. */
  slab: '#F1F2F3',
  slabInk: '#0B0B0B',

  /** The buy bar. */
  dark: '#0B0B0B',
  onDark: '#FFFFFF',

  /** The crosshair, and the line the price is measured from. */
  rule: '#C9CBCE',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "$176.02". */
  price: { size: 44, line: 54, tracking: -1.6, family: 'PlusJakartaSans_800ExtraBold' },
  /** "-$0.18 (-0.10%)". */
  delta: { size: 13, line: 18, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },

  /** "Halcyon Instruments". */
  name: { size: 15.5, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "HLCN". */
  ticker: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "1D", "1W", … */
  range: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
  /** "+4.32 %" on the crosshair. */
  chip: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },

  /** "29.40". */
  stat: { size: 24, line: 31, tracking: -0.7, family: 'PlusJakartaSans_800ExtraBold' },
  /** "P/E Ratio". */
  statLabel: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Buy Stock". */
  action: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
} as const;

export const radius = {
  tile: 22,
  pill: 999,
  control: 999,
} as const;
