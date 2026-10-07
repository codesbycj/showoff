/** Everything the cart screen says. */
export const CART = {
  section: 'Cart',
  title: 'My Cart',
  count: '3 items',
  live: 'Roasting Live',

  dropoffTitle: 'Drop-off details',
  dropoffBody: 'Leave at front counter, extra napkins',
  edit: 'Edit',

  summaryTitle: 'Order Summary',
  summaryStore: 'Downtown Roastery #4',
  lines: [
    { key: 'brew', label: '2 x Brew Coffee', value: '$7.98', tone: 'ink' as const },
    { key: 'promo', label: '1 x Brew Coffee (Promo)', value: 'Free', tone: 'mint' as const },
    { key: 'delivery', label: 'Delivery', value: 'Free', tone: 'mint' as const, chip: 'REDPERK' },
  ],
  totalLabel: 'Total',
  totalNote: 'Inclusive of local taxes',
  total: '$7.98',

  cta: 'Continue',
} as const;

export type CartItem = {
  key: string;
  name: string;
  sub: string;
  price: string;
  /** Set when the line is a promo — the price goes mint and the old one struck. */
  wasPrice?: string;
  deal?: string;
  qty: string;
  photo: number;
};

export const ITEMS: CartItem[] = [
  // STEP 3.08 a cappuccino
  // {
  //   key: 'capp',
  //   name: 'Cappuccino',
  //   sub: 'Single origin • Oat milk',
  //   price: '$4.99',
  //   qty: '01',
  //   photo: require('../../../../assets/images/redbrew/thumb-capp.jpg'),
  // },
  // STEP 3.09 a latte
  // {
  //   key: 'latte',
  //   name: 'Coffee Latte',
  //   sub: 'Double shot • Vanilla bean',
  //   price: '$2.99',
  //   qty: '01',
  //   photo: require('../../../../assets/images/redbrew/thumb-latte.jpg'),
  // },
  // STEP 3.10 and one on the house
  // {
  //   key: 'black',
  //   name: 'Black Coffee',
  //   sub: 'Signature House Roast',
  //   price: '$0.00',
  //   wasPrice: '$6.99',
  //   deal: 'Buy 2 get 1 free deal',
  //   qty: '01',
  //   photo: require('../../../../assets/images/redbrew/thumb-black.jpg'),
  // },
];
