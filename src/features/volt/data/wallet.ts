/**
 * Screen 5 content — wallet, profile and cashout.
 *
 * `STATS`, `PRESETS` and `ACTIVITY` carry explicit element types because each
 * is emptied one entry at a time for the timelapse.
 */

export const HEADER = {
  greeting: 'Good Morning! Martin Butler',
  title: 'Wallet & Profile',
  avatar: require('../../../../assets/images/volt/profile-small.jpg') as number,
} as const;

export const PROFILE = {
  name: 'Martin Butler',
  tier: 'Volt Gold',
  handle: '@m_butler_bets',
  member: "Member '23",
  photo: require('../../../../assets/images/volt/martin.jpg') as number,
} as const;

export type Stat = {
  key: string;
  label: string;
  value: string;
  caption: string;
  /** Lime value, as on the win rate. */
  accent?: boolean;
  /** The caption carries a small rising arrow. */
  trend?: boolean;
  /** The value carries a flame, as on the streak. */
  flame?: boolean;
  /** The caption is lime, as on the profit figure. */
  captionAccent?: boolean;
};

export const STATS: readonly Stat[] = [
  // STEP 5.05 how often he wins
  // { key: 'win', label: 'Win Rate', value: '68.4%', caption: 'Top 3%', accent: true, trend: true },
  // STEP 5.06 what that is worth
  // {
  //   key: 'profit',
  //   label: 'Total Profit',
  //   value: '+$4.8k',
  //   caption: '+$4,820.50',
  //   captionAccent: true,
  // },
  // STEP 5.07 and how hot he is
  // { key: 'streak', label: 'Streak', value: '5W', caption: 'Hot Form', flame: true },
];

export const BALANCE = {
  label: 'Active Staking Balance',
  currency: 'USD • Instant',
  total: '$1,420.50',
  audited: 'Live Audited',
  withdrawableLabel: 'Withdrawable Cash',
  withdrawable: '$1,280.00',
  bonusLabel: 'Bonus Rollover',
  bonus: '$140.50',
  deposit: 'Deposit',
  cashout: 'Instant Cashout',
} as const;

export const CASHOUT = {
  title: 'Fast Cashout',
  blurb: 'Zero Fees • Real-Time Payout',
  eta: 'Est. < 2 min',
  amountLabel: 'Amount to withdraw',
  max: 'Max: $1,280.00',
  amount: '500.00',
  destinationLabel: 'Destination Account',
  change: 'Change Account',
  card: 'Visa FastPay',
  cardNumber: '•••• 8492',
  bank: 'Chase Premier Checking',
  cta: 'Transfer $500.00 to Card',
  security: '256-Bit Encrypted • PCI-DSS Instant Network',
} as const;

export type Preset = { key: string; label: string };

export const PRESETS: readonly Preset[] = [
  // STEP 5.12 a hundred
  // { key: '100', label: '$100' },
  // STEP 5.13 two-fifty
  // { key: '250', label: '$250' },
  // STEP 5.14 five hundred, which is picked
  // { key: '500', label: '$500' },
  // STEP 5.15 or everything
  // { key: 'max', label: 'MAX' },
];

export const INSIGHTS = {
  title: 'Performance Insights',
  month: 'May 2024',
  recordLabel: 'May Record',
  wins: '18W',
  losses: '/ 6L',
  /** The win-ratio bar, as the export's `width: 75%`. */
  ratio: 0.75,
  sportLabel: 'Primary Sport',
  sport: 'Football',
  sportShare: '74% of wagers placed',
  bestLabel: 'Biggest Single Win',
  bestTicket: 'UCL 5-Leg Parlay (+420)',
  bestAmount: '+$1,140.00',
} as const;

export const ACTIVITY_HEAD = { title: 'Recent Activity', action: 'See All (48)' } as const;

export type Transaction = {
  key: string;
  title: string;
  when: string;
  status: string;
  amount: string;
  icon: 'northEast' | 'sportsSoccer' | 'southWest';
  /** A lime icon well and a lime amount, as on the settled win. */
  accent?: boolean;
  /** The status dot and label are sage rather than lime on the deposit. */
  muted?: boolean;
};

export const ACTIVITY: readonly Transaction[] = [
  // STEP 5.20 money out
  // {
  //   key: 'cashout',
  //   title: 'Instant Cashout • Visa',
  //   when: 'Today, 14:20',
  //   status: 'Completed',
  //   amount: '-$350.00',
  //   icon: 'northEast',
  // },
  // STEP 5.21 a win paid in
  // {
  //   key: 'acca',
  //   title: 'Acca (PSG vs Real Madrid)',
  //   when: 'Yesterday',
  //   status: 'Settled & Paid',
  //   amount: '+$366.50',
  //   icon: 'sportsSoccer',
  //   accent: true,
  // },
  // STEP 5.22 and a top-up
  // {
  //   key: 'deposit',
  //   title: 'Apple Pay Deposit',
  //   when: '12 May, 09:12',
  //   status: 'Success',
  //   amount: '+$200.00',
  //   icon: 'southWest',
  //   muted: true,
  // },
];
