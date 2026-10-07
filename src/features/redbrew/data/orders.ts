import type { SymbolName } from '../symbols';

/** Everything the order-history & review screen says. */
export const ORDERS = {
  section: 'Orders',

  liveLabel: 'Live Tracking • Nº 016',
  /** Set uppercase in Space Grotesk, like the product hero. */
  liveTitle: 'Your cappuccino on the way',
  liveEta: '4-5 min',

  sliceName: 'Single Origin Cappuccino',
  slicePrice: '$7.98',

  rateTitle: 'Rate Coffee & Delivery',
  rateLabel: 'Exceptional Perfection!',
  rating: 5,
  feedbackPlaceholder: 'How was your coffee? Does it arrive within the time frame on the app?',
  submit: 'Submit review • 5★',
  skip: 'Skip now',

  historyTitle: 'Order History',
  historyCount: 'Recent 4',
} as const;

export type Order = {
  key: string;
  number: string;
  detail: string;
  price: string;
  statusIcon: SymbolName;
  status: string;
  /** Crimson while in flight, mint once delivered, muted when cancelled. */
  tone: 'live' | 'done' | 'cancelled';
  actionIcon: SymbolName;
  action: string;
  /** The in-flight order gets a crimson pip beside its number. */
  live?: boolean;
};

export const HISTORY: Order[] = [
  // STEP 5.10 the live one
  // {
  //   key: 'o016',
  //   number: 'Order Nº 016',
  //   detail: 'Single Cappuccino + Butter Croissant',
  //   price: '$7.98',
  //   statusIcon: 'cyclone',
  //   status: 'Delivering (4-5 min)',
  //   tone: 'live',
  //   actionIcon: 'navigation',
  //   action: 'Track Live',
  //   live: true,
  // },
  // STEP 5.11 one delivered
  // {
  //   key: 'o008',
  //   number: 'Order Nº 008',
  //   detail: 'May 08, 2025 • Classic Red Latte',
  //   price: '$3.99',
  //   statusIcon: 'checkCircle',
  //   status: 'Delivered',
  //   tone: 'done',
  //   actionIcon: 'refresh',
  //   action: 'Order Again',
  // },
  // STEP 5.12 another delivered
  // {
  //   key: 'o001',
  //   number: 'Order Nº 001',
  //   detail: 'May 07, 2025 • Flat White Espresso',
  //   price: '$3.99',
  //   statusIcon: 'checkCircle',
  //   status: 'Delivered',
  //   tone: 'done',
  //   actionIcon: 'refresh',
  //   action: 'Order Again',
  // },
  // STEP 5.13 and one that never came
  // {
  //   key: 'o006',
  //   number: 'Order Nº 006',
  //   detail: 'May 02, 2025 • Double Cortado + Bagel',
  //   price: '$7.15',
  //   statusIcon: 'cancel',
  //   status: 'Cancelled (No answer from you)',
  //   tone: 'cancelled',
  //   actionIcon: 'refresh',
  //   action: 'Order Again',
  // },
];
