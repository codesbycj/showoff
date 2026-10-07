/**
 * Screen 2 content — explore / top events.
 *
 * `SPORTS` and `ODDS` carry explicit element types rather than leaning on `as
 * const`: both are emptied one entry at a time for the timelapse, and an array
 * literal with nothing in it infers `never[]`, which typechecks here and then
 * fails at every call site.
 */

export const HERO = {
  /** The export breaks this itself: upright, then italic across a line break. */
  lead: 'Choose your',
  accent: 'Favorite game',
  blurb: 'Live arena odds, real-time momentum & predictive trackers',
} as const;

/**
 * The sport filter rail.
 *
 * `icon` names a Material Symbol. The export sets an emoji in each of these
 * chips — a football, a basketball, a tennis racquet, a gamepad, a baseball —
 * and every one is replaced, because an emoji is drawn by whichever font claims
 * the codepoint and so differs across Windows, Android and iOS. The web harness
 * renders on one of them and cannot show the difference.
 */
export type Sport = {
  key: string;
  label: string;
  icon: 'sportsSoccer' | 'sportsBasketball' | 'sportsTennis' | 'sportsEsports' | 'sportsBaseball';
  /** The count badge, on the active chip only. */
  count?: string;
  /** Esports carries a small red "live" pip instead of a count. */
  pip?: boolean;
};

export const SPORTS: readonly Sport[] = [
  { key: 'football', label: 'Football', icon: 'sportsSoccer', count: '14' },
  { key: 'basketball', label: 'Basketball', icon: 'sportsBasketball' },
  { key: 'tennis', label: 'Tennis', icon: 'sportsTennis' },
  { key: 'esports', label: 'Esports', icon: 'sportsEsports', pip: true },
  { key: 'baseball', label: 'Baseball', icon: 'sportsBaseball' },
];

export const TOP_EVENTS = { title: 'Top Events', action: 'View All' } as const;

/** The lime hero fixture. */
export const FEATURED = {
  league: 'Champions League',
  status: 'Ongoing',
  home: { name: 'PSG', crest: require('../../../../assets/images/volt/crest-psg.jpg') as number },
  away: {
    name: 'Madrid',
    crest: require('../../../../assets/images/volt/crest-madrid.jpg') as number,
  },
  score: { home: '3', away: '2' },
  clock: "1st Half 58'",
  momentum: 'Attacking Momentum 64%',
  cta: 'Bet Slip',
} as const;

/** The dark fixture card beneath it. */
export const FIXTURE = {
  league: 'Super League',
  status: 'Upcoming',
  home: {
    name: 'Chelsea',
    place: 'London, UK',
    crest: require('../../../../assets/images/volt/crest-chelsea.jpg') as number,
  },
  away: {
    name: 'FCB',
    place: 'Catalonia',
    crest: require('../../../../assets/images/volt/crest-barcelona.jpg') as number,
  },
  score: { home: '0', away: '2' },
  clock: "1st Half 58'",
  activity: '2.8k active slips',
  action: 'Watch Live Stream',
  /** The stacked avatars on the activity row. The export sets emoji for these. */
  faces: [
    require('../../../../assets/images/volt/fan-1.jpg') as number,
    require('../../../../assets/images/volt/fan-2.jpg') as number,
  ],
} as const;

export const QUICK = {
  title: 'Quick Match Odds',
  sync: 'Live Odds Sync',
  stakeLabel: 'Quick Stake:',
  stake: '$25.00',
  cta: 'Lock Bet',
} as const;

export type Odd = { key: string; label: string; value: string; multiplier: string };

export const ODDS: readonly Odd[] = [
  { key: 'spread', label: 'PSG Spread', value: '-1.5', multiplier: '1.88x' },
  { key: 'draw', label: "Draw 90'", value: '+200', multiplier: '3.00x' },
  { key: 'goals', label: 'Total Goals', value: 'O 2.5', multiplier: '1.62x' },
];

/** The floating dock, shared by every screen. */
export type NavItem = {
  key: string;
  label: string;
  icon: 'sportsSoccer' | 'sensors' | 'smartDisplay' | 'confirmationNumber' | 'accountCircle';
  /** Live carries a lime pip on its icon. */
  pip?: boolean;
  route: string;
};

export const NAV: readonly NavItem[] = [
  { key: 'explore', label: 'Explore', icon: 'sportsSoccer', route: '/volt/explore' },
  { key: 'live', label: 'Live', icon: 'sensors', pip: true, route: '/volt/scores' },
  { key: 'reels', label: 'Reels', icon: 'smartDisplay', route: '/volt/stream' },
  { key: 'bets', label: 'Bets', icon: 'confirmationNumber', route: '/volt/slip' },
  { key: 'profile', label: 'Profile', icon: 'accountCircle', route: '/volt/wallet' },
];
