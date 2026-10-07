import type { SymbolName } from '../symbols';

/** Everything the menu-discovery screen says. */
export const HOME = {
  section: 'Orders',
  store: 'Downtown • St. 4',

  greeting: 'Good morning, Alex',
  greetingSub: 'Ready for your morning brew?',
  streak: '5-Day Streak',

  searchPlaceholder: 'Search roast, beans, cold brew...',

  pickupTitle: 'Pickup',
  pickupSub: 'Ready in 3-5 min',
  deliveryTitle: 'Delivery',
  deliverySub: 'Est. 12-18 min',

  hero: {
    tag: 'Freshly Pulled',
    batch: 'Batch #04',
    title: 'Artisanal Cappuccino',
    sub: 'Single origin Ethiopian Guji • Velvety microfoam',
    readyLabel: 'Ready now',
    price: '$7.98',
    cta: 'Order now',
  },

  club: {
    title: 'Red Pulse Club',
    sub: '80 pts to your next Free Artisan Brew',
    points: '420 / 500 pts',
    progress: 420 / 500,
  },

  popularTitle: 'Popular Picks',
  popularChip: 'Fast Lane',
  seeAll: 'See all',

  reorderTitle: 'Reorder your usual',
  reorderWhen: 'Last ordered yesterday',
  reorder: {
    title: 'Double Cortado + Croissant',
    sub: 'Whole Milk • Extra Hot • Flaky',
    price: '$7.15',
    cta: 'Express 1-tap reorder',
  },

  roastTitle: 'Fresh Roast in Downtown',
  roastBody: 'Guatemala Antigua batch cracked 2 hours ago. Available for pour-over.',
} as const;

export const CATEGORIES: { key: string; label: string; icon?: SymbolName }[] = [
  { key: 'all', label: 'All Roasts', icon: 'localCafe' },
  { key: 'hot', label: 'Hot Espresso' },
  { key: 'cold', label: 'Cold Brew & Nitro' },
  { key: 'pour', label: 'Pour Over' },
];

export type Pick = {
  key: string;
  name: string;
  sub: string;
  price: string;
  rating: string;
  tag: string;
  photo: number;
};

export const PICKS: Pick[] = [
  // STEP 1.14 the origin cappuccino
  // {
  //   key: 'origin',
  //   name: 'Origin Cappuccino',
  //   sub: 'Dark chocolate & hazelnut',
  //   price: '$4.99',
  //   rating: '4.9',
  //   tag: 'Oat Milk avail.',
  //   photo: require('../../../../assets/images/redbrew/cappuccino.jpg'),
  // },
  // STEP 1.15 a flat white
  // {
  //   key: 'flat',
  //   name: 'Double Flat White',
  //   sub: 'Velvety & intense punch',
  //   price: '$4.49',
  //   rating: '4.8',
  //   tag: 'Double Ristretto',
  //   photo: require('../../../../assets/images/redbrew/flat-white.jpg'),
  // },
  // STEP 1.16 something cold
  // {
  //   key: 'nitro',
  //   name: 'Nitro Cold Brew',
  //   sub: 'Silky nitro head on tap',
  //   price: '$4.99',
  //   rating: '4.9',
  //   tag: '18h Cold Steep',
  //   photo: require('../../../../assets/images/redbrew/cold-brew.jpg'),
  // },
  // STEP 1.17 and the house latte
  // {
  //   key: 'latte',
  //   name: 'Classic Red Latte',
  //   sub: 'Steamed whole milk & ...',
  //   price: '$3.99',
  //   rating: '4.7',
  //   tag: 'Signature Blend',
  //   photo: require('../../../../assets/images/redbrew/red-latte.jpg'),
  // },
];
