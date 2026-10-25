/**
 * Budge — the month, last of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — white paper, one
 * saturated green and a black control bar — and the order of the blocks are
 * taken from it; every size is chosen for a real 393dp screen.
 */

export const bg = {
  canvas: '#FFFFFF',
  ink: '#0E0F11',
  body: '#6B7076',
  muted: '#9DA2A8',
  hair: '#ECEDEF',
  track: '#E8EAEC',

  /** The one accent. */
  green: '#35D27E',
  onGreen: '#0E0F11',

  /** The bar across the middle, and the dock. */
  dark: '#0E0F11',
  onDark: '#FFFFFF',

  /** Money going out. */
  spent: '#0E0F11',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "11 January". */
  figure: { size: 27, line: 34, tracking: -0.8, family: 'PlusJakartaSans_700Bold' },
  /** "Financial". */
  title: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** A date in the grid. */
  date: { size: 12.5, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "M T W T F S S". */
  weekday: { size: 11, line: 15, tracking: 0, family: 'PlusJakartaSans_500Medium' },
  /** ".50" — the pence. */
  figureMinor: { size: 22, line: 46, tracking: -0.4, family: 'PlusJakartaSans_500Medium' },
  /** "Left balance". */
  caption: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "November". */
  chip: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "$424 of $920 spent". */
  meta: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Buddy Planner". */
  cardTitle: { size: 16, line: 21, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "$1240" in the gauge. */
  gauge: { size: 27, line: 34, tracking: -0.8, family: 'PlusJakartaSans_700Bold' },
  /** "Total expensed". */
  gaugeLabel: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },

  /** "Bills & Utilities". */
  action: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Statistics". */
  section: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "Monthly spending limit". */
  small: { size: 11.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
} as const;

export const radius = {
  card: 22,
  pill: 999,
  control: 999,
} as const;
