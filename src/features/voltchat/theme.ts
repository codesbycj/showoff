/**
 * Volt — the assistant, second of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — black, one acid
 * yellow-green, and a white card among dark ones — and the order of the
 * blocks are taken from it; every size is chosen for a real 393dp screen.
 *
 * **The data sources are invented.** The reference puts three real products'
 * logos in its connect row. Those are other companies' marks and a page
 * branded as an app that is not theirs may not carry them (AGENTS.md), so the
 * sources here are drawn marks of this project's.
 */

export const vt = {
  /** This screen is the light one: a black card on paper. */
  canvas: '#FFFFFF',
  sheet: '#0B0B0B',
  ink: '#FFFFFF',
  onCanvas: '#0B0B0B',
  body: '#A3A5A8',
  muted: '#6B6D70',

  /** The one accent: the assistant, the add button, the first result. */
  acid: '#D8F531',
  onAcid: '#0B0B0B',

  /** A control, and the third card. */
  slab: '#1B1B1C',
  slabEdge: '#2A2A2B',

  /** The second card, which is the only light surface. */
  card: '#FFFFFF',
  onCard: '#0B0B0B',
  cardBody: '#5E6063',

  /** A figure that fell. */
  down: '#FF7A6B',

  /** The alert on the bell. */
  alert: '#FF7A3D',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "AI Assistant" in the header. */
  section: { size: 16, line: 21, tracking: -0.3, family: 'PlusJakartaSans_600SemiBold' },
  /** "How can I help you?" */
  ask: { size: 19, line: 25, tracking: -0.4, family: 'PlusJakartaSans_600SemiBold' },

  /** "Total Market". */
  rowTitle: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "23,487". */
  figure: { size: 12, line: 16, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** "-2.4%". */
  caption: { size: 10.5, line: 14, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },
  /** "Show statistics". */
  chip: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  /** The text in the box. */
  input: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },

  /** "Chat". */
  action: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
} as const;

export const radius = {
  card: 20,
  control: 999,
  tile: 16,
} as const;
