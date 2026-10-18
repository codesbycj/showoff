/**
 * A sales CRM — the interaction history, third of the three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). The palette and the order of
 * the blocks are taken from it; every size is chosen for a real 393dp screen.
 *
 * A **separate showcase** from the other two screens — each owns its theme,
 * layout, insets and text primitive (AGENTS.md, "Showcase lifecycle").
 */

export const cl = {
  /** The page. */
  canvas: '#15161a',
  /** The two round buttons in the header. */
  raised: '#232429',
  raisedEdge: 'rgba(255, 255, 255, 0.09)',

  onDark: '#ffffff',
  onDarkMuted: 'rgba(255, 255, 255, 0.55)',

  /** The round arrow on a card, which is always the page's own black. */
  ink: '#121316',
  onInk: '#ffffff',

  /** The four cards, in order. Ink on all of them is the same near-black:
   *  every one is a light colour, by design. */
  cards: ['#5bc6f0', '#f5e03f', '#cbc0a3', '#f08ad0', '#a7e3a0'],
  onCard: '#121316',
  onCardMuted: 'rgba(18, 19, 22, 0.6)',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Interaction / History". */
  title: { size: 21, line: 26, tracking: -0.6, family: 'PlusJakartaSans_700Bold' },

  /** "Oct 4". */
  date: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_500Medium' },
  /** "Royal Package / Oportunity". */
  cardTitle: { size: 16, line: 21, tracking: -0.4, family: 'PlusJakartaSans_600SemiBold' },
  /** "11,250$". */
  amount: { size: 21, line: 27, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** The initials on a face. */
  initials: { size: 10, line: 13, tracking: 0, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  card: 22,
  full: 999,
} as const;
