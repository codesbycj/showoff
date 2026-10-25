/**
 * Sable — deposit, last of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — one saturated
 * yellow carrying white cards and a black control — and the order of the
 * blocks are taken from it; every size is chosen for a real 393dp screen.
 */

export const sb = {
  /** This screen is the dark one. */
  canvas: '#0C0D0D',
  slab: '#1A1C1C',
  card: '#9BE861',
  yellow: '#F7E748',
  ink: '#101112',
  onDark: '#FFFFFF',
  body: '#5F6164',
  muted: '#A0A2A5',
  hair: '#ECEDEE',

  dark: '#101112',

  /** The one green, on the second and third screens. */
  green: '#2FBF71',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Deposit" in the header. */
  display: { size: 16, line: 21, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "Robert Brown". */
  name: { size: 19, line: 25, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "Qr code". */
  tile: { size: 14.5, line: 19, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
  /** "Transactions". */
  section: { size: 17, line: 22, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "Michael Davis". */
  rowName: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "October 5, 2023". */
  rowWhen: { size: 11.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** "+$220.00". */
  rowAmount: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "64%". */
  gauge: { size: 29, line: 36, tracking: -0.9, family: 'PlusJakartaSans_800ExtraBold' },
  /** "$6,469/10k". */
  gaugeSub: { size: 17, line: 23, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "Get Plus". */
  promoTitle: { size: 16, line: 21, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** The sentence under it. */
  promoBody: { size: 13, line: 19, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },

  /** "$10,7" — the figure. */
  figure: { size: 34, line: 42, tracking: -1, family: 'PlusJakartaSans_800ExtraBold' },
  /** "k" after it. */
  figureUnit: { size: 20, line: 42, tracking: -0.4, family: 'PlusJakartaSans_600SemiBold' },
  /** "Total balance". */
  caption: { size: 13, line: 18, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },

  /** "Withdraw". */
  action: { size: 14.5, line: 19, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },

  /** "September". */
  month: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  monthOff: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },

  /** "Transactions". */
  rowTitle: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "**** 4527". */
  pan: { size: 13, line: 18, tracking: 0.4, family: 'PlusJakartaSans_600SemiBold' },
  /** "37". */
  count: { size: 38, line: 46, tracking: -1.2, family: 'PlusJakartaSans_700Bold' },
  /** "This month". */
  small: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** "+7" on the overflow disc. */
  chip: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },
} as const;

export const radius = {
  card: 24,
  screen: 34,
  control: 999,
} as const;
