/**
 * Lark — the course board, second of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). What is taken from it: a near
 * black page carrying a stack of pastel cards, each with a line drawing at its
 * right, and a small floating dock. Every size is chosen for a 393dp screen.
 *
 * Poppins stands in for the reference's geometric sans.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const lk = {
  canvas: '#0F0F10',
  pill: '#1E1E20',

  lime: '#D2EE6E',
  onLime: '#13160B',

  ink: '#FFFFFF',
  muted: '#8E8E93',

  /** The card faces, and the near-black that is set on all of them. */
  pink: '#F4C7DC',
  mint: '#DCEE7A',
  teal: '#BCE6DA',
  lilac: '#CFC9F0',
  peach: '#F6D3B8',
  onCard: '#13160B',
  onCardSoft: '#4A4B3F',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  name: { size: 16, line: 22, tracking: -0.3, family: 'Poppins_600SemiBold' },
  stat: { size: 12.5, line: 17, tracking: -0.1, family: 'Poppins_600SemiBold' },

  cardTitle: { size: 17, line: 23, tracking: -0.4, family: 'Poppins_600SemiBold' },
  cardBody: { size: 11.5, line: 17, tracking: -0.1, family: 'Poppins_400Regular' },
} as const;

export const radius = {
  card: 22,
  pill: 999,
  control: 999,
} as const;
