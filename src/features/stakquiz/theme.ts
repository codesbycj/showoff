/**
 * Stak — the quiz, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette — black, one acid
 * green and two greys — and the order of the blocks are taken from it; every
 * size is chosen for a real 393dp screen.
 */

export const sk = {
  canvas: '#0B0B0B',
  ink: '#FFFFFF',
  body: '#A7A7A7',
  muted: '#6E6E6E',

  /** The one accent: the answer most people gave, and progress so far. */
  acid: '#CBF527',
  onAcid: '#0B0B0B',

  /** An answer you have not picked. */
  slab: '#232323',
  slabEdge: '#2E2E2E',
  /** Its disc. */
  disc: '#333333',

  /** The hatching on the questions still to come. */
  hatch: '#2B2B2B',

  /** The count chip on an answer. */
  chip: '#FFFFFF',
  onChip: '#0B0B0B',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "HOW MUCH / DO YOU NEED / TO START?" */
  display: { size: 38, line: 46, tracking: -1.2, family: 'PlusJakartaSans_800ExtraBold' },

  /** "Investing Quiz". */
  title: { size: 15, line: 20, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },
  /** "3/6". */
  step: { size: 13.5, line: 18, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },

  /** "As little as $1". */
  answer: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },
  /** "99%". */
  share: { size: 20, line: 26, tracking: -0.5, family: 'PlusJakartaSans_800ExtraBold' },
  /** "+18234". */
  count: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
} as const;

export const radius = {
  pill: 999,
  control: 999,
  bar: 999,
} as const;
