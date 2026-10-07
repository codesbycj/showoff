/**
 * The results screen's content: the live overview, the party standings and the
 * state leaderboard.
 *
 * On a standing, `bar` is not `pct`. The tally track here is only 110dp wide,
 * so a 3.0% share would draw about three pixels of ink; the export floors it at
 * 14%, and Others at 4%. That floor is carried here rather than computed,
 * because it is a drawn value and not a derived one.
 */
import type { PartyKey } from '../theme';

export const RESULTS = {
  title: 'Results',
  election: 'Presidential Election 2026',
  scope: 'All Nigeria',
  tabs: ['Overview', 'By State', 'Polling Units', 'Candidates'] as const,
  hero: {
    live: 'Live',
    title: 'Presidential Election 2026',
    blurb: 'Real-time results across Nigeria',
    pct: '96.8%',
    pctLabel: 'Results announced',
    share: 96.8,
    elapsed: '03:12',
    updated: 'Last updated\nToday, 9:41 AM',
  },
  nationalTitle: 'National Results',
  metric: '% Percentage',
  stateTitle: 'Results by State',
  stateAction: 'View all',
  stateHead: ['State', 'Leading', '%'] as const,
} as const;

export type Standing = {
  key: string;
  rank: number;
  party: PartyKey;
  /** Blank on the Others row, which has no candidate. */
  name?: string;
  pct: string;
  /** Drawn track width; floored so a small share still shows ink. See the file note. */
  bar: number;
  votes: string;
  photo?: number;
  emblem?: number;
};

export const STANDINGS: readonly Standing[] = [
  // STEP 3.12 the leader
  // {
  //   key: 'lp',
  //   rank: 1,
  //   party: 'LP',
  //   name: 'Peter Obi',
  //   pct: '42.3%',
  //   bar: 42.3,
  //   votes: '11,647,205',
  //   photo: require('../../../../assets/images/voteng/obi.jpg'),
  //   emblem: require('../../../../assets/images/voteng/party-lp.jpg'),
  // },
  // STEP 3.13 the incumbent
  // {
  //   key: 'apc',
  //   rank: 2,
  //   party: 'APC',
  //   name: 'Bola Tinubu',
  //   pct: '37.1%',
  //   bar: 37.1,
  //   votes: '10,213,004',
  //   photo: require('../../../../assets/images/voteng/tinubu.jpg'),
  //   emblem: require('../../../../assets/images/voteng/party-apc.jpg'),
  // },
  // STEP 3.14 third
  // {
  //   key: 'pdp',
  //   rank: 3,
  //   party: 'PDP',
  //   name: 'Atiku Abubakar',
  //   pct: '17.6%',
  //   bar: 17.6,
  //   votes: '4,849,087',
  //   photo: require('../../../../assets/images/voteng/atiku.jpg'),
  //   emblem: require('../../../../assets/images/voteng/party-pdp.jpg'),
  // },
  // STEP 3.15 fourth
  // {
  //   key: 'nnpp',
  //   rank: 4,
  //   party: 'NNPP',
  //   name: 'Rabiu Kwankwaso',
  //   pct: '3.0%',
  //   bar: 14,
  //   votes: '826,446',
  //   photo: require('../../../../assets/images/voteng/kwankwaso.jpg'),
  //   emblem: require('../../../../assets/images/voteng/party-nnpp.jpg'),
  // },
  // STEP 3.16 everyone else
  // { key: 'others', rank: 5, party: 'OTH', pct: '0.0%', bar: 4, votes: '275,000' },
];

export type StateRow = { key: string; state: string; party: PartyKey; pct: string };

export const STATE_ROWS: readonly StateRow[] = [
  // STEP 3.21 lagos
  // { key: 'lagos', state: 'Lagos', party: 'LP', pct: '62.1%' },
  // STEP 3.22 the capital
  // { key: 'fct', state: 'FCT', party: 'LP', pct: '58.4%' },
  // STEP 3.23 rivers
  // { key: 'rivers', state: 'Rivers', party: 'PDP', pct: '51.2%' },
  // STEP 3.24 kano
  // { key: 'kano', state: 'Kano', party: 'NNPP', pct: '48.7%' },
  // STEP 3.25 kaduna
  // { key: 'kaduna', state: 'Kaduna', party: 'APC', pct: '46.1%' },
];
