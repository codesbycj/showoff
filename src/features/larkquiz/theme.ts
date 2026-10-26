/**
 * Lark — the exercise, third of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). What is taken from it: a near
 * black page, one pink card holding the dialog, white bubbles inside it, and
 * lime on the chosen answer and the way on. Every size is chosen for a 393dp
 * screen.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const lk = {
  canvas: '#0F0F10',
  pill: '#1E1E20',
  /** The waiting state of the primary button. It has to sit clear of the
   *  canvas: at #1E1E20 on #0F0F10 it is 15 levels off the page and both the
   *  eye and `foot.py` read it as background. */
  wait: '#2C2C31',

  lime: '#D2EE6E',
  onLime: '#13160B',

  ink: '#FFFFFF',
  muted: '#8E8E93',

  card: '#F4C7DC',
  bubble: '#FFFFFF',
  onBubble: '#15161A',
  heart: '#F2607A',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  display: { size: 22, line: 30, tracking: -0.5, family: 'Poppins_600SemiBold' },
  hearts: { size: 13, line: 18, tracking: -0.1, family: 'Poppins_600SemiBold' },
  bubble: { size: 12.5, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },
  chip: { size: 14, line: 19, tracking: -0.2, family: 'Poppins_500Medium' },
  action: { size: 15, line: 20, tracking: -0.2, family: 'Poppins_600SemiBold' },
} as const;

export const radius = {
  card: 22,
  bubble: 14,
  chip: 14,
  pill: 999,
} as const;
