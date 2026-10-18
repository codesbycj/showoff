/**
 * Quiz — the home screen, second of a three-phone board.
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
  /** A card that is only a shade off the page — the dock, the gem pill. */
  surface: '#ffffff',

  ink: '#151310',
  muted: '#6f675c',
  /** Ink on a coloured card, where pure white is too hard. */
  onColor: '#ffffff',
  onColorMuted: '#e8e1f6',

  /** The daily challenge, and the first trending card. */
  violet: '#6f4bd8',
  /** The track its progress bar runs in. */
  violetTrack: '#9179e4',

  /** The four categories, in the order the row scrolls. */
  science: '#2f6248',
  history: '#f5bb34',
  movies: '#ef5b4c',
  sports: '#6d7ac4',

  /** The second trending card. */
  forest: '#35735a',

  /** The gem, and the confetti thrown round the photographs. */
  gem: '#49c3f0',
  gemDark: '#1b9fd4',
  confetti: ['#f5bb34', '#ef5b4c', '#49c3f0', '#64c98a', '#ffffff', '#f08fc0'],

  /** The dock: a dark pill for where you are, white discs for where you are not. */
  dockInk: '#151310',
  dockSurface: '#ffffff',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Hi, Alex". */
  greeting: { size: 14, line: 19, tracking: -0.2, family: 'PlusJakartaSans_500Medium' },
  /** "Ready for a quiz?". */
  display: { size: 25, line: 31, tracking: -0.9, family: 'PlusJakartaSans_800ExtraBold' },
  /** The gem count. */
  gem: { size: 15, line: 19, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },

  /** "Categories", "Trending Quizzers". */
  section: { size: 18, line: 23, tracking: -0.6, family: 'PlusJakartaSans_800ExtraBold' },
  /** "See All". */
  more: { size: 12.5, line: 17, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Daily Challenge", "Space Explorer". */
  cardTitle: { size: 17, line: 22, tracking: -0.5, family: 'PlusJakartaSans_700Bold' },
  /** The two lines under it. */
  cardBody: { size: 12, line: 17, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },
  /** "6/10". */
  progress: { size: 12.5, line: 17, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
  /** "Play Now". */
  play: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_700Bold' },
  /** "10 Questions". */
  meta: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },

  /** "Science". */
  category: { size: 15, line: 20, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** "12 Quizzes". */
  categoryMeta: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_400Regular' },

  /** "Home", in the dock. */
  dock: { size: 13, line: 17, tracking: -0.2, family: 'PlusJakartaSans_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  card: 20,
  category: 16,
  pill: 999,
  full: 999,
} as const;
