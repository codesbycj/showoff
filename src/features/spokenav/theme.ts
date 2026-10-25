/**
 * Spoke — the ride, last of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — a soft grey page
 * with white cards and one lime accent — and the order of the blocks are taken
 * from it; every size is chosen for a real 393dp screen.
 *
 * The bikes are **photographs**. A bicycle is a large specific subject and
 * drawing one produces a cartoon of a bike where the design had a bike. See
 * `assets/images/spokecats/CREDITS.md`.
 */

export const sp = {
  canvas: '#E9EAEB',
  card: '#F4F5F6',
  cardEdge: '#FFFFFF',

  ink: '#17181A',
  body: '#6C6F73',
  muted: '#9DA0A4',

  /** The one accent: the live category, and the charge left. */
  lime: '#D6F24B',
  onLime: '#17181A',

  /** The arrow disc on a card, and the lock. */
  dark: '#17181A',
  onDark: '#FFFFFF',

  hair: 'rgba(23, 24, 26, 0.08)',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "In 30m, Turn Left" — the instruction. */
  display: { size: 23, line: 31, tracking: -0.5, family: 'PlusJakartaSans_600SemiBold' },
  displayStrong: { size: 23, line: 31, tracking: -0.5, family: 'PlusJakartaSans_800ExtraBold' },
  /** The address. */
  blurb: { size: 13, line: 19, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** "Road" / "Satellite". */
  seg: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Swipe for more information". */
  hint: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** "62%" on the charge gauge. */
  gauge: { size: 12, line: 16, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
  /** "146km". */
  tileValue: { size: 25, line: 32, tracking: -0.7, family: 'PlusJakartaSans_700Bold' },
  /** "Distance". */
  tileLabel: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Mario Dandi". */
  name: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Premium Account". */
  plan: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },

  /** "Sport bikes". */
  chip: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },

  /** "Black B23". */
  cardTitle: { size: 21, line: 27, tracking: -0.5, family: 'PlusJakartaSans_600SemiBold' },
  /** "Usage time". */
  statLabel: { size: 10.5, line: 14, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** "23h 16m". */
  statValue: { size: 16, line: 21, tracking: -0.3, family: 'PlusJakartaSans_600SemiBold' },
  /** "Swipe to book". */
  swipe: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
} as const;

export const radius = {
  card: 26,
  pill: 999,
  control: 999,
} as const;

/**
 * The soft shadow the whole page is built on.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  card: {
    shadowColor: '#5A5E63',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.16,
    shadowRadius: 22,
    elevation: 6,
  },
} as const;
