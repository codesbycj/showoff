/**
 * Quiz — the leaderboard, third of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other two screens — each owns its theme, layout, insets and text
 * primitive (AGENTS.md, "Showcase lifecycle"), which is why the warm paper
 * below is spelled out again rather than imported from `quizstart`.
 */

export const qz = {
  /** The page: the same warm paper the whole board sits on. */
  canvas: '#f3ece0',
  /** The sheet the ranking sits on, a shade lighter than the page. */
  sheet: '#fdfaf4',
  /** The gem pill. */
  surface: '#ffffff',

  ink: '#151310',
  muted: '#8a8176',
  /** The hairline between two rows. */
  rule: '#ece4d7',
  /** The disc a rank number sits in. */
  rankWell: '#f1ebe0',

  /** The three podium rings, in placing order: first, second, third. */
  ring: ['#f3c34a', '#d7a98a', '#9f7fe0'] as const,
  /** The rosette under each, same order. */
  rosette: ['#f3a425', '#f08a2c', '#5f8ce8'] as const,
  /** The crown over the winner. */
  crown: '#f5bb34',

  /** The score discs, bright and arbitrary — they carry rank, not meaning. */
  score: {
    green: '#49b267',
    orange: '#f0912f',
    violet: '#7c6ae0',
    sky: '#5bb6e8',
    forest: '#2f6248',
    gold: '#f3c02e',
    red: '#e2543c',
  },

  /** The gem. */
  gem: '#49c3f0',
  gemDark: '#1b9fd4',
  onGem: '#151310',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Leaderboard". */
  title: { size: 21, line: 27, tracking: -0.7, family: 'PlusJakartaSans_800ExtraBold' },
  /** The gem count. */
  gem: { size: 15, line: 19, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },

  /** "Emma", under a podium portrait. */
  podium: { size: 15, line: 20, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },
  /** "1870 Point". */
  podiumMeta: { size: 13, line: 18, tracking: -0.2, family: 'PlusJakartaSans_400Regular' },
  /** The number inside a rosette. */
  rosette: { size: 11, line: 14, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },

  /** The rank down the left of the list. */
  rank: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
  /** "Liam J.". */
  name: { size: 16, line: 21, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "900 Points". */
  points: { size: 13, line: 18, tracking: -0.2, family: 'PlusJakartaSans_400Regular' },
  /** The score in its disc. */
  score: { size: 17, line: 22, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
} as const;

/** Corner radii. */
export const radius = {
  sheet: 26,
  pill: 999,
  full: 999,
} as const;
