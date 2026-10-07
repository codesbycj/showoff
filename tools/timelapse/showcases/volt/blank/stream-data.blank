/**
 * Screen 3 content — the live stream and in-play markets.
 *
 * `MARKETS` and `PULSE_FACES` carry explicit element types because both are
 * emptied one entry at a time for the timelapse.
 */

export const PLAYER = {
  still: require('../../../../assets/images/volt/stream-still.jpg') as number,
  quality: 'Live 4K',
  viewers: '| 118.4k',
  half: '1st Half',
  clock: '43:43',
  /** How far along the scrubber sits, as the export's `w-[78%]`. */
  progress: 0.78,
} as const;

export const PANEL = {
  league: 'UEFA Champions League',
  tag: 'Fast-Odds',
  home: { code: 'LIV', name: 'Liverpool', note: 'Dominating Possession 64%' },
  away: { code: 'MCI', name: 'Man City', note: 'xG 0.42' },
  score: { home: '2', away: '0' },
  marketsTitle: 'In-Play Micro Markets',
  marketsAction: 'All 48 Markets',
} as const;

export type Market = {
  key: string;
  label: string;
  value: string;
  /** The bracketed price beside the line. */
  price: string;
};

export const MARKETS: readonly Market[] = [
  // STEP 3.06 the spread
  // { key: 'spread', label: 'Spread', value: '-5.9', price: '(120)' },
  // STEP 3.07 the corner line
  // { key: 'corners', label: 'Total Corners', value: 'o12.5', price: '(-40)' },
  // STEP 3.08 and the one that is backed
  // { key: 'next', label: 'Next Goal', value: '-39', price: '(1.95)' },
];

export const SLIP = {
  title: 'Active Slip: Next Goal (LIV)',
  detail: 'Est. Payout: $48.75 on $25.00',
  lock: '5s lock',
} as const;

export const SWIPE = { label: 'Quick Bet $25' } as const;

export const PULSE = {
  title: 'Live Social Pulse',
  meta: '2.4k Bets Placed Last 2m',
  blurb: 'Martin and 812 friends backed Liverpool Next Goal',
} as const;

/**
 * The three stacked initials on the social pulse.
 *
 * The export sets these as text in coloured discs rather than as photographs,
 * which is unusual for this design — every other avatar stack on the other
 * screens is an image. They are kept as initials, since that is what the markup
 * draws, and `tone` picks which of the three fills each takes.
 */
export type PulseFace = {
  key: string;
  initials: string;
  tone: 'highest' | 'secondary' | 'primary';
};

export const PULSE_FACES: readonly PulseFace[] = [
  // STEP 3.11 one friend
  // { key: 'mb', initials: 'MB', tone: 'highest' },
  // STEP 3.12 another
  // { key: 'ak', initials: 'AK', tone: 'secondary' },
  // STEP 3.13 and a third
  // { key: 'sl', initials: 'SL', tone: 'primary' },
];
