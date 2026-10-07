import type { SymbolName } from '../symbols';

/**
 * Everything the profile & rewards screen says.
 *
 * The reference's header reads "RED BREW / Orders" on this screen — a leftover
 * from the screen it was generated beside. It says "Profile" here.
 */
export const PROFILE = {
  section: 'Profile',

  name: 'Alex Mercer',
  tier: 'Tier 3',
  email: 'alex.mercer@redbrew.c...',
  phone: '+1 (555) 234-8901',
  edit: 'Edit',

  vipLabel: 'Red Pulse VIP',
  vipStatus: 'Gold Roaster Status • 1.5× Multiplier',
  vipRank: 'Top 5%',

  cashLabel: 'Red Brew Cash',
  payInStore: 'Pay In-Store',
  balance: '$24.50',
  balanceNote: 'Available Auto-Reload Balance',
  topUp: 'Top Up',
  transfer: 'Transfer',

  pointsLabel: 'Pulse Points',
  points: '420',
  pointsMax: '/ 500 Pts',
  pointsProgress: 420 / 500,
  pointsNote: '80 pts until Free Signature Brew',
  pointsReady: 'Reward Ready',

  perksTitle: 'Available Perks',
  perksAction: 'View All (4)',

  prefsTitle: 'Preferences & Security',

  conciergeTitle: 'Concierge Support',
  conciergeSub: 'Dianna McKenzie • Average reply 2 min',
  conciergeCta: 'Chat',

  logout: 'Log Out of Account',
  version: 'Version 2.4.0 (Build 8912)',
  rights: 'Red Brew Roasters Inc. • All Rights Reserved',
} as const;

export const STATS = [
  { key: 'cups', icon: 'localCafe' as SymbolName, value: '38', label: 'Cups Brewed' },
  { key: 'saved', icon: 'savings' as SymbolName, value: '$14.20', label: 'Saved to Date' },
  {
    key: 'vouchers',
    icon: 'confirmationNumber' as SymbolName,
    value: '4',
    label: 'Vouchers Active',
  },
] as const;

export type Perk = {
  key: string;
  tag: string;
  tone: 'mint' | 'neutral';
  expiry: string;
  title: string;
  body: string;
  cta: string;
};

export const PERKS: Perk[] = [
  // STEP 6.12 a free roast
  // {
  //   key: 'bogo',
  //   tag: 'Promo',
  //   tone: 'mint',
  //   expiry: '3 days left',
  //   title: 'Buy 2 Get 1 Free Roast',
  //   body: 'Applicable on all single origin drip and pour-overs.',
  //   cta: 'Apply to Order',
  // },
  // STEP 6.13 and free oat milk
  // {
  //   key: 'oat',
  //   tag: 'Complimentary',
  //   tone: 'neutral',
  //   expiry: 'No expiry',
  //   title: 'Free Oat Milk',
  //   body: 'Upgrade any iced brew with Minor Figures oat.',
  //   cta: 'Apply to Order',
  // },
];

export type PrefRow = { key: string; icon: SymbolName; title: string; sub: string };

export const PREFS: PrefRow[] = [
  // STEP 6.14 how they take it
  // {
  //   key: 'coffee',
  //   icon: 'tune',
  //   title: 'Coffee Preferences',
  //   sub: 'Oat Milk • Dark Italian Roast • 12 oz Medium',
  // },
  // STEP 6.15 where it goes
  // {
  //   key: 'address',
  //   icon: 'locationOn',
  //   title: 'Delivery Addresses',
  //   sub: '742 Evergreen Terrace • Front porch drop',
  // },
  // STEP 6.16 how they pay
  // {
  //   key: 'payment',
  //   icon: 'creditCard',
  //   title: 'Payment Methods',
  //   sub: 'Apple Pay • Visa ending in 4092',
  // },
  // STEP 6.17 and what they hear about
  // {
  //   key: 'notify',
  //   icon: 'notificationsActive',
  //   title: 'Notifications & Tracking',
  //   sub: 'Instant Push, Dispatch SMS enabled',
  // },
];
