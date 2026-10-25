/**
 * Morsel — the week, second of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — a white page
 * carrying four saturated cards — and the order of the blocks are taken from
 * it; every size is chosen for a real 393dp screen.
 */

export const ms = {
  canvas: '#FFFFFF',
  ink: '#101114',
  body: '#6A6E75',
  muted: '#9CA0A6',

  /** The four cards. */
  indigo: '#4331D4',
  teal: '#126B5F',
  lime: '#D8F531',
  sky: '#AEC6F7',

  onDark: '#FFFFFF',
  onLight: '#101114',

  /** The dock. */
  dark: '#101114',
  chip: '#F1F2F4',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Mr. David". */
  display: { size: 27, line: 34, tracking: -0.7, family: 'PlusJakartaSans_700Bold' },
  /** "Hello". */
  greet: { size: 13, line: 18, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "1148". */
  figure: { size: 30, line: 38, tracking: -0.9, family: 'PlusJakartaSans_800ExtraBold' },
  /** "Calories" in the header. */
  title: { size: 19, line: 25, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** A date in the week strip. */
  date: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "S M T W T F S". */
  weekday: { size: 11, line: 15, tracking: 0, family: 'PlusJakartaSans_500Medium' },
  /** "70.5". */
  figureSm: { size: 22, line: 28, tracking: -0.6, family: 'PlusJakartaSans_800ExtraBold' },
  /** "Kg" after it. */
  unit: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Your Progress" on a card's pill. */
  tag: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
  /** "15 January 2023". */
  meta: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },

  /** "Proteins". */
  statLabel: { size: 10.5, line: 14, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** "58.6". */
  statValue: { size: 14.5, line: 19, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
} as const;

export const radius = {
  card: 20,
  pill: 999,
  control: 999,
} as const;
