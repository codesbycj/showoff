/**
 * Treats — the explore screen, third of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle").
 */

export const tr = {
  canvas: '#ffffff',
  /** The inactive filter pills, and the search disc. */
  well: '#f3f2f6',

  ink: '#17161c',
  muted: '#8b8695',
  onDark: '#ffffff',

  /** The dark disc inside the selected filter. */
  action: '#17161c',

  /** The three collection cards, top to bottom. */
  cream: '#fbeedb',
  peach: '#fbe0d2',
  lemon: '#fbf3cf',

  /** The tab bar's hairline. */
  rule: '#eeecf2',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Explore Collections". */
  title: { size: 28, line: 35, tracking: -1, family: 'Poppins_700Bold' },

  /** A filter pill. */
  filter: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },

  /** "Crunchy Chips". */
  collection: { size: 16, line: 21, tracking: -0.4, family: 'Poppins_600SemiBold' },
  /** "Crispy · salty · fun". */
  collectionMeta: { size: 12, line: 17, tracking: -0.1, family: 'Poppins_400Regular' },

  /** A tab's label. */
  tab: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  card: 20,
  pill: 999,
  full: 999,
} as const;
