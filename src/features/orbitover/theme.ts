/**
 * Orbit — the overview, third of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — black with a
 * holographic sweep of mint, lilac and peach, and one white card — and the
 * order of the blocks are taken from it; every size is chosen for a real
 * 393dp screen.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const ob = {
  canvas: '#0A0A0B',
  card: '#141416',
  cardEdge: '#1F1F22',
  chip: '#1C1C1F',
  sheet: '#111113',

  ink: '#FFFFFF',
  body: '#9A9CA0',
  muted: '#64666A',

  /** The three stops of the holographic sweep. */
  holo1: '#B9F5CF',
  holo2: '#C9BBF7',
  holo3: '#F7C9A8',

  onHolo: '#0A0A0B',
  panel: '#FFFFFF',
  onPanel: '#0A0A0B',
  panelMuted: '#6E7075',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Overview". */
  title: { size: 16, line: 21, tracking: -0.3, family: 'PlusJakartaSans_600SemiBold' },

  /** "Jan 2022". */
  period: { size: 12.5, line: 17, tracking: 0.1, family: 'PlusJakartaSans_500Medium' },
  /** "1,924.30" and the sign beside it. */
  total: { size: 36, line: 46, tracking: -1.4, family: 'PlusJakartaSans_700Bold' },
  totalSign: { size: 20, line: 27, tracking: -0.4, family: 'PlusJakartaSans_500Medium' },
  /** "-$435.35". */
  delta: { size: 13, line: 18, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },

  /** "*3425" on the card row. */
  cardNo: { size: 13.5, line: 18, tracking: 0.4, family: 'PlusJakartaSans_600SemiBold' },

  /** "Statistic", and the day the sheet opens on. */
  sectionTitle: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** The tooltip over the lit month. */
  tip: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
  /** "Feb", "Mar", ... */
  axis: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_500Medium' },
  axisOn: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_700Bold' },

  /** A merchant's name, and the amount beside it. */
  rowName: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  rowSub: { size: 11, line: 15, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  rowAmount: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
} as const;

export const radius = {
  card: 20,
  sheet: 26,
  chip: 14,
  pill: 999,
  control: 999,
} as const;
