/**
 * Everything the leaderboard says and counts.
 *
 * **A leaderboard has to be ordered.** The reference gives #4, #5 and #6 the
 * same 2,500 XP and the same "Level 10 · 16 events" — three identical rows in
 * three different places, which is the one thing a ranking cannot do. Here
 * every player carries their own figures and the list is sorted by them, so
 * the order on screen *is* the order in the data.
 *
 * **Your own rank is found, not typed.** `myRank` is the position of the
 * player marked `isMe`, so the card at the foot cannot disagree with the row
 * above it.
 */

export const copy = {
  title: 'My Leaderboard',
  seeAll: 'See all players',
  mine: 'Your Current Rank',
  cheer: 'Keep grinding!',
  xp: 'XP',
  level: 'Level ',
  events: ' events',
} as const;

export const tabs = [
  { id: 'global', label: 'Global' },
  { id: 'monthly', label: 'Monthly' },
  { id: 'friends', label: 'Friends' },
] as const;

type Player = {
  id: string;
  name: string;
  xp: number;
  level: number;
  events: number;
  photo: number;
  isMe?: boolean;
};

/** Entered in no particular order; the screen sorts them. */
const roster: Player[] = [
  {
    id: 'p1',
    name: 'Alex M.',
    xp: 4820,
    level: 14,
    events: 31,
    photo: require('../../../../assets/images/volleyrank/face-1.jpg'),
  },
  {
    id: 'p2',
    name: 'Sofia K.',
    xp: 4540,
    level: 13,
    events: 28,
    photo: require('../../../../assets/images/volleyrank/face-2.jpg'),
  },
  {
    id: 'p3',
    name: 'Mike T.',
    xp: 4200,
    level: 12,
    events: 26,
    photo: require('../../../../assets/images/volleyrank/face-3.jpg'),
  },
  {
    id: 'p4',
    name: 'Emma Davis',
    xp: 2500,
    level: 10,
    events: 16,
    photo: require('../../../../assets/images/volleyrank/face-4.jpg'),
    isMe: true,
  },
  {
    id: 'p5',
    name: 'Elea Hanna',
    xp: 2310,
    level: 9,
    events: 14,
    photo: require('../../../../assets/images/volleyrank/face-5.jpg'),
  },
  {
    id: 'p6',
    name: 'Sanna Lee',
    xp: 2150,
    level: 9,
    events: 13,
    photo: require('../../../../assets/images/volleyrank/face-6.jpg'),
  },
];

export const players = [...roster].sort((a, b) => b.xp - a.xp);

export const podium = {
  first: players[0],
  second: players[1],
  third: players[2],
};

/** Everyone below the podium, in order. */
export const rest = players.slice(3);

const meIndex = players.findIndex((p) => p.isMe);
export const me = players[meIndex];
export const myRank = meIndex + 1;

export const rankOf = (p: Player) => players.indexOf(p) + 1;
