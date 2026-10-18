import { sj } from '../theme';

/** The screen's content, kept out of the components so they stay presentational. */

export const periods = ['Day', 'Week', 'Month', 'Year'] as const;

export const summary = {
  title: 'Statistic',
  caption: 'Total Spendings',
  total: '$6,340.00',
  callout: '$ 69.00',
} as const;

/**
 * The two curves, as normalised points — x and y both 0..1, y measured from
 * the bottom.
 *
 * Normalised rather than in dp so the shape survives any width: a curve stored
 * in points would stretch one hump and squash the next the moment the phone
 * changed size. `live` is the index on the front curve that carries the dot.
 */
export const chart = {
  live: 4,
  front: [
    { x: 0, y: 0.42 },
    { x: 0.14, y: 0.62 },
    { x: 0.28, y: 0.38 },
    { x: 0.42, y: 0.56 },
    { x: 0.56, y: 0.72 },
    { x: 0.7, y: 0.44 },
    { x: 0.84, y: 0.66 },
    { x: 1, y: 0.86 },
  ],
  back: [
    { x: 0, y: 0.3 },
    { x: 0.14, y: 0.44 },
    { x: 0.28, y: 0.26 },
    { x: 0.42, y: 0.4 },
    { x: 0.56, y: 0.3 },
    { x: 0.7, y: 0.56 },
    { x: 0.84, y: 0.4 },
    { x: 1, y: 0.62 },
  ],
} as const;

export const history = {
  title: 'Transaction History',
  viewAll: 'View all',
  groups: [
    {
      key: 'today',
      label: 'TODAY',
      rows: [
        {
          key: 'mikel',
          name: 'Mikel Borle',
          time: '10:30 AM',
          amount: '+$350.00',
          kind: 'Receive',
          mark: 'MB',
          color: sj.marks[0],
          face: 0,
          credit: true,
        },
        {
          key: 'uber',
          name: 'Uber',
          time: '08:25 AM',
          amount: '-$10.00',
          kind: 'Transfer',
          mark: 'Uber',
          color: sj.marks[1],
          credit: false,
        },
        {
          key: 'amazon',
          name: 'Amazon Shopping',
          time: '09:45 AM',
          amount: '-$124.00',
          kind: 'Online Shopping',
          mark: 'a',
          color: sj.marks[2],
          credit: false,
        },
      ],
    },
    {
      key: 'yesterday',
      label: 'YESTERDAY',
      rows: [
        {
          key: 'noah',
          name: 'Noah Lucas',
          time: '29 May, 2025',
          amount: '-$250.00',
          kind: 'Sent',
          mark: 'NL',
          color: sj.marks[3],
          face: 2,
          credit: false,
        },
        {
          key: 'spotify',
          name: 'Spotify',
          time: '18:10 PM',
          amount: '-$9.99',
          kind: 'Subscription',
          mark: 'S',
          color: sj.marks[0],
          credit: false,
        },
        {
          key: 'grocer',
          name: 'Fresh Grocer',
          time: '16:02 PM',
          amount: '-$63.40',
          kind: 'Groceries',
          mark: 'FG',
          color: sj.marks[2],
          credit: false,
        },
      ],
    },
  ],
} as const;
