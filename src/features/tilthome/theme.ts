/**
 * Tilt — the home screen, first of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — cream, navy and
 * three saturated accents — and the order of the blocks are taken from it;
 * every size is chosen for a real 393dp screen.
 *
 * The brand is invented and its mark is drawn. The reference's wordmark is a
 * real company's and does not come along (AGENTS.md, "Sourcing assets").
 */

export const tl = {
  /** The page, which is paper rather than white. */
  canvas: '#FAF6F0',
  ink: '#15283C',
  body: '#5B6B7C',

  /** The balance, which is the calmest thing on the page. */
  sky: '#A6DAF0',
  /** Money leaving. */
  violet: '#9B7BF7',
  /** Money arriving. */
  lime: '#D7F64B',
  /** The dock, and every heading. */
  navy: '#15283C',
  onNavy: '#FFFFFF',
  navyMuted: 'rgba(255, 255, 255, 0.45)',

  /** The one alert on the page. */
  alert: '#FF5A4D',
  hair: 'rgba(21, 40, 60, 0.08)',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "it pays to / use tilt". */
  display: { size: 38, line: 44, tracking: -1.4, family: 'PlusJakartaSans_800ExtraBold' },

  /** "tilt" in the wordmark. */
  brand: { size: 19, line: 24, tracking: -0.7, family: 'PlusJakartaSans_700Bold' },

  /** "Your balance". */
  cardLabel: { size: 16, line: 21, tracking: -0.3, family: 'PlusJakartaSans_600SemiBold' },
  /** "$3,198" — the pounds. */
  amount: { size: 33, line: 40, tracking: -0.4, family: 'PlusJakartaSans_800ExtraBold' },
  /** ".20" — the pence, which are lighter so the eye lands on the pounds. */
  amountMinor: { size: 24, line: 40, tracking: -0.6, family: 'PlusJakartaSans_500Medium' },

  /** "USD" and "See all payments". */
  chip: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },

  /** "Send / money". */
  tile: { size: 16, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },

  /** "Recent" and a row's title. */
  rowTitle: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  rowMeta: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  rowAmount: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
} as const;

export const radius = {
  card: 22,
  tile: 22,
  pill: 999,
  control: 999,
  dock: 999,
} as const;

/**
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  dock: {
    shadowColor: '#15283C',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.22,
    shadowRadius: 18,
    elevation: 10,
  },
} as const;
