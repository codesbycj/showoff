/**
 * Volt — connect data, first of a three-phone board.
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
  canvas: '#0B0B0B',
  ink: '#FFFFFF',
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

  /** The alert on the bell. */
  alert: '#FF7A3D',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Connect Data", "ROI Calculation". */
  section: { size: 21, line: 27, tracking: -0.5, family: 'PlusJakartaSans_600SemiBold' },

  /** "86h". */
  figure: { size: 27, line: 34, tracking: -0.8, family: 'PlusJakartaSans_700Bold' },
  /** "Time spent on ad hoc requests". */
  caption: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Chat". */
  action: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
} as const;

export const radius = {
  card: 20,
  control: 999,
  tile: 16,
} as const;
