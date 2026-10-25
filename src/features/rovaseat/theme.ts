/**
 * Rova — the seat map, last of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — black with one
 * saturated green — and the order of the blocks are taken from it; every size
 * is chosen for a real 393dp screen.
 *
 * Two things in the reference are fixed rather than copied. Its button says
 * "Search Flight" on a coach app, and its route card carries a stock
 * photograph with the supplier's watermark still across it.
 */

export const rv = {
  canvas: '#0C0D0C',
  card: '#171917',
  cardEdge: '#242723',

  ink: '#FFFFFF',
  body: '#9BA09B',
  muted: '#6B706B',

  /** A seat you can have, and one somebody already has. */
  seat: '#C98A3C',
  seatTaken: '#3A3D39',
  seatPicked: '#58E35C',

  /** The one accent. */
  green: '#58E35C',
  onGreen: '#0C0D0C',
  greenDim: 'rgba(88, 227, 92, 0.16)',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Travel far, / discover / who you are." */
  display: { size: 29, line: 40, tracking: -0.8, family: 'PlusJakartaSans_700Bold' },
  /** The line under it. */
  blurb: { size: 12.5, line: 18, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },

  /** "Rova". */
  brand: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_600SemiBold' },

  /** "From" / "To". */
  fieldLabel: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** "Dhaka MKH". */
  fieldValue: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_600SemiBold' },
  /** "02 October 24". */
  chip: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** "08:15" on a ticket. */
  time: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
  /** "DAC". */
  code: { size: 19, line: 25, tracking: -0.4, family: 'PlusJakartaSans_800ExtraBold' },
  /** "6h 30m" in the middle. */
  dur: { size: 11, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
  /** "Terminal C1 · Seat B12 · Gate A". */
  strip: { size: 10.5, line: 14, tracking: 0.02, family: 'PlusJakartaSans_500Medium' },
  /** "Reserve your seat within". */
  radio: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Search coaches". */
  action: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
} as const;

export const radius = {
  card: 20,
  field: 14,
  pill: 999,
  control: 999,
} as const;
