/**
 * Home's content: the hero, the four candidates, the explore grid and the news
 * rail.
 *
 * Two things look like mistakes and are not.
 *
 * The vote counts here disagree with the ones in `results.ts` for the same
 * candidates — 8,245,320 against 11,647,205 for LP, and so on. The export does
 * that, and correcting it would put the rebuild out of step with the reference.
 *
 * `affiliation` carries a truncated party name ("PDP - Peoples Democratic")
 * rather than the full one. That is also the export's own copy: the row is one
 * line and the design cuts the name rather than wrapping it.
 */
import type { PartyKey } from '../theme';

export const HOME = {
  searchPlaceholder: 'Search candidates, parties, or constituencies',
  hero: {
    kicker: 'Election 2026',
    title: 'Nigeria Decides',
    blurb: 'Stay informed. Follow the results in real time.',
    cta: 'View Live Results',
  },
  tabs: ['Presidential', 'Governorship', 'Senate', 'House of Reps'] as const,
  resultsTitle: 'Live Results',
  resultsAction: 'Live Updates',
  newsTitle: 'Latest News',
  newsAction: 'See all',
} as const;

export type Candidate = {
  key: string;
  rank: number;
  name: string;
  party: PartyKey;
  /** "LP • Labour Party" — the export truncates the long names rather than wrapping. */
  affiliation: string;
  pct: string;
  /** Percentage as a number, for the tally track on home. */
  share: number;
  votes: string;
  photo: number;
};

export const CANDIDATES: readonly Candidate[] = [
  // STEP 2.13 the man in front
  // {
  //   key: 'obi',
  //   rank: 1,
  //   name: 'Peter Obi',
  //   party: 'LP',
  //   affiliation: 'LP • Labour Party',
  //   pct: '42.3%',
  //   share: 42.3,
  //   votes: '8,245,320 votes',
  //   photo: require('../../../../assets/images/voteng/obi.jpg'),
  // },
  // STEP 2.14 second place
  // {
  //   key: 'tinubu',
  //   rank: 2,
  //   name: 'Bola Tinubu',
  //   party: 'APC',
  //   affiliation: 'APC • All Progressives',
  //   pct: '37.1%',
  //   share: 37.1,
  //   votes: '7,210,450 votes',
  //   photo: require('../../../../assets/images/voteng/tinubu.jpg'),
  // },
  // STEP 2.15 third
  // {
  //   key: 'atiku',
  //   rank: 3,
  //   name: 'Atiku Abubakar',
  //   party: 'PDP',
  //   affiliation: 'PDP • Peoples Democratic',
  //   pct: '17.6%',
  //   share: 17.6,
  //   votes: '3,430,125 votes',
  //   photo: require('../../../../assets/images/voteng/atiku.jpg'),
  // },
  // STEP 2.16 and fourth
  // {
  //   key: 'kwankwaso',
  //   rank: 4,
  //   name: 'Rabiu Kwankwaso',
  //   party: 'NNPP',
  //   affiliation: 'NNPP • New Nigeria Peoples',
  //   pct: '3.0%',
  //   share: 3.0,
  //   votes: '586,402 votes',
  //   photo: require('../../../../assets/images/voteng/kwankwaso.jpg'),
  // },
];

export type QuickTile = {
  key: string;
  title: string;
  note: string;
  icon: 'pin' | 'pie' | 'people' | 'building';
  tint: string;
  ink: string;
};

export const QUICK: readonly QuickTile[] = [
  // STEP 2.19 results by state
  // {
  //   key: 'state',
  //   title: 'Results by State',
  //   note: 'View breakdown',
  //   icon: 'pin',
  //   tint: '#ECFDF5',
  //   ink: '#0B844D',
  // },
  // STEP 2.20 all 774 councils
  // {
  //   key: 'lga',
  //   title: 'Results by LGA',
  //   note: 'Explore 774 units',
  //   icon: 'pie',
  //   tint: '#EFF6FF',
  //   ink: '#2563EB',
  // },
  // STEP 2.21 who is standing
  // {
  //   key: 'candidates',
  //   title: 'Candidates',
  //   note: 'View profiles',
  //   icon: 'people',
  //   tint: '#FEF2F2',
  //   ink: '#EF4444',
  // },
  // STEP 2.22 and for whom
  // {
  //   key: 'parties',
  //   title: 'Political Parties',
  //   note: 'See all parties',
  //   icon: 'building',
  //   tint: '#FAF5FF',
  //   ink: '#9333EA',
  // },
];

export type NewsItem = {
  key: string;
  tag: string;
  tagInk: string;
  title: string;
  when: string;
  image: number;
};

export const NEWS: readonly NewsItem[] = [
  // STEP 2.28 the voter register
  // {
  //   key: 'register',
  //   tag: 'Updates',
  //   tagInk: '#065F46',
  //   title: 'INEC releases final voter register',
  //   when: '2 hours ago',
  //   image: require('../../../../assets/images/voteng/news-inec.jpg'),
  // },
  // STEP 2.29 turnout
  // {
  //   key: 'turnout',
  //   tag: 'Elections',
  //   tagInk: '#0B844D',
  //   title: 'Voter turnout high across major cities',
  //   when: '4 hours ago',
  //   image: require('../../../../assets/images/voteng/news-queue.jpg'),
  // },
  // STEP 2.30 what to know
  // {
  //   key: 'primer',
  //   tag: 'Politics',
  //   tagInk: '#065F46',
  //   title: 'Key things to know before election day',
  //   when: '6 hours ago',
  //   image: require('../../../../assets/images/voteng/news-assembly.jpg'),
  // },
];
