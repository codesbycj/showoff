/**
 * Stash — manage folders, third of a four-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — a pale grey
 * page, one acid yellow and black — and the order of the blocks are taken
 * from it; every size is chosen for a real 393dp screen.
 *
 * The brand is invented and its mark is drawn; the reference's wordmark is a
 * real company's and does not come along.
 */

export const st = {
  /** These two screens are the dark ones. */
  canvas: '#141414',
  card: '#1E1E1E',
  panel: '#F4F4F4',
  yellowDim: 'rgba(242, 232, 92, 0.16)',
  ink: '#FFFFFF',
  onPanel: '#121212',
  body: '#9A9A9A',
  muted: '#6E6E6E',

  yellow: '#F2E85C',
  onYellow: '#121212',

  dark: '#121212',
  onDark: '#FFFFFF',

  /** The shapes in the illustration. */
  slate: '#D3D3D3',
  white: '#FFFFFF',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Manage folders". */
  display: { size: 21, line: 27, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** The sentence under it. */
  blurb: { size: 12, line: 17, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** "Lovely" on a folder tile. */
  tile: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
  /** "videos". */
  statLabel: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** "42". */
  statValue: { size: 21, line: 27, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** "%". */
  statUnit: { size: 11, line: 20, tracking: 0, family: 'PlusJakartaSans_500Medium' },
  /** "Memory status". */
  cardTitle: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "47". */
  donut: { size: 32, line: 40, tracking: -0.9, family: 'PlusJakartaSans_700Bold' },
  /** "120.3 of 254 GB used". */
  donutSub: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** "search". */
  small: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** "stash" in the mark. */
  brand: { size: 16, line: 21, tracking: -0.3, family: 'PlusJakartaSans_600SemiBold' },
  /** "Next". */
  action: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
} as const;

export const radius = {
  card: 26,
  pill: 999,
  control: 999,
} as const;
