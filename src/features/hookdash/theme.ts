/**
 * Hook — the profile dashboard, first of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other screen — each owns its theme, layout, insets and text primitive
 * (AGENTS.md, "Showcase lifecycle").
 */

export const hk = {
  /** The page: near-black, the way the reference's dark mode reads. */
  canvas: '#141414',
  /** A card on it. */
  card: '#2a2a2a',
  /** The glass disc a stat sits in. */
  well: 'rgba(255,255,255,0.16)',
  wellSoft: 'rgba(255,255,255,0.1)',

  ink: '#ffffff',
  muted: 'rgba(255,255,255,0.62)',

  /** The memories card, which is the one colour on the screen. */
  memories: '#2f62d8',

  /** The watermark behind the leaderboard's heading. */
  watermark: 'rgba(255,255,255,0.1)',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Benji Jones", "Search and make new friends". */
  cardTitle: { size: 17, line: 22, tracking: -0.5, family: 'Poppins_700Bold' },
  /** "Leaderboard", "Activity", "Memories". */
  section: { size: 17, line: 22, tracking: -0.5, family: 'Poppins_700Bold' },

  /** "Friends", "HP earned", "Position". */
  statLabel: { size: 11.5, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "56", "4945", "1". */
  stat: { size: 23, line: 28, tracking: -0.8, family: 'Poppins_700Bold' },

  /** "VladisLove Rude(n)". */
  name: { size: 12.5, line: 17, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "+ 74 users". */
  nameMeta: { size: 12.5, line: 17, tracking: -0.3, family: 'Poppins_400Regular' },
  /** "like your video. 2d". */
  activity: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },

  /** "02.06.2022". */
  date: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

/** Corner radii. */
export const radius = {
  card: 18,
  photo: 14,
  full: 999,
} as const;
