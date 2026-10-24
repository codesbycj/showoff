/** Everything the dashboard says, kept out of the components. */

export const profile = {
  name: 'Benji Jones',
  statLabel: 'Friends',
  stat: '56',
} as const;

export const findFriends = {
  title: 'Search and\nmake new\nfriends',
  faces: [1, 2],
} as const;

export const leaderboard = {
  title: 'Leaderboard',
  hp: { label: 'HP earned', value: '4945' },
  position: { label: 'Position', value: '1' },
} as const;

export const activity = {
  title: 'Activity',
  /**
   * The faces floating behind the heading, as fractions of the card.
   *
   * `ring` is on every entry, empty where there is none: a `readonly` tuple
   * where only some members carry a key gives a union TypeScript will not let
   * a `.map` read the key off (TS2339).
   */
  float: [
    { key: 'a', face: 3, x: 0.66, y: 0.04, size: 36, ring: '' },
    { key: 'b', face: 4, x: 0.88, y: 0.02, size: 40, ring: '#e8c33a' },
    { key: 'c', face: 5, x: 0.72, y: 0.3, size: 28, ring: '' },
    { key: 'd', face: 6, x: 0.84, y: 0.26, size: 34, ring: '#e07a3a' },
  ],
  latest: {
    face: 7,
    name: 'VladisLove Rude(n)',
    meta: ' + 74 users',
    line: 'like your video. 2d',
  },
} as const;

export const memories = {
  title: 'Memories',
  date: '02.06.2022',
} as const;
