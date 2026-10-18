import { qz } from '../theme';

/**
 * Everything the leaderboard says.
 *
 * Kept out of the components so they stay presentational — a row renders what
 * it is handed and decides nothing (AGENTS.md, "Layout").
 *
 * `face` is an index into `components/faces.ts`. The cast is picked so that a
 * name and the portrait beside it agree; the reference's own board does not
 * bother, and it reads as a mistake rather than as a design.
 */

export const header = {
  title: 'Leaderboard',
  gems: '20',
} as const;

/** Left to right, which is third, first, second — the order a podium stands in. */
export const podium = [
  { key: 'liam', name: 'Liam', points: '1250 Point', place: 3, face: 0 },
  { key: 'emma', name: 'Emma', points: '1870 Point', place: 1, face: 1 },
  { key: 'noah', name: 'Noah', points: '1100 Point', place: 2, face: 2 },
] as const;

export const ranking = [
  {
    key: 'liam-j',
    rank: 4,
    name: 'Liam J.',
    points: '900 Points',
    score: '82',
    color: qz.score.green,
    face: 9,
  },
  {
    key: 'olivia',
    rank: 5,
    name: 'olivia A.',
    points: '750 Points',
    score: '74',
    color: qz.score.orange,
    face: 3,
  },
  {
    key: 'noah-r',
    rank: 6,
    name: 'Noah R.',
    points: '680 Points',
    score: '68',
    color: qz.score.violet,
    face: 4,
  },
  {
    key: 'adlef',
    rank: 7,
    name: 'Adlef G.',
    points: '560 Points',
    score: '56',
    color: qz.score.sky,
    face: 6,
  },
  {
    key: 'james',
    rank: 8,
    name: 'James T.',
    points: '480 Points',
    score: '48',
    color: qz.score.forest,
    face: 8,
  },
  {
    key: 'mila',
    rank: 9,
    name: 'Mila Lam',
    points: '420 Points',
    score: '42',
    color: qz.score.gold,
    face: 5,
  },
  {
    key: 'alex',
    rank: 10,
    name: 'Alex P',
    points: '370 Points',
    score: '36',
    color: qz.score.red,
    face: 7,
  },
] as const;
