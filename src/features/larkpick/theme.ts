/**
 * Lark — choosing a language, first of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). What is taken from it: a near
 * black page, one lime that carries every affirmative, dark grey pills for
 * everything unselected, and a display headline that wraps to two lines.
 * Every size is chosen for a real 393dp screen.
 *
 * Poppins stands in for the reference's geometric sans, which is not
 * obtainable. At matched cap height it runs a little wide, so the headline is
 * set a point under what the board's proportions suggest.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const lk = {
  canvas: '#0F0F10',
  pill: '#1E1E20',
  pillEdge: '#2A2A2D',

  lime: '#D2EE6E',
  onLime: '#13160B',

  ink: '#FFFFFF',
  muted: '#8E8E93',
  faint: '#5A5A5F',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  display: { size: 25, line: 33, tracking: -0.6, family: 'Poppins_600SemiBold' },
  row: { size: 14.5, line: 20, tracking: -0.2, family: 'Poppins_500Medium' },
  action: { size: 15, line: 20, tracking: -0.2, family: 'Poppins_600SemiBold' },
} as const;

export const radius = {
  pill: 999,
  control: 999,
} as const;
