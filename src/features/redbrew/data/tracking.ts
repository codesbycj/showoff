import type { SymbolName } from '../symbols';

/** Everything the live-tracking screen says. */
export const TRACKING = {
  title: 'Live Order Tracking',

  order: {
    deal: 'Buy 2 get 1 free',
    delivery: 'Free Delivery $0',
    name: 'Double Shot Flat White',
    sub: '2× Cups • Oat Milk',
    price: '$7.98',
    paid: 'Paid via ApplePay',
  },

  dispatchLabel: 'Active dispatch',
  orderNo: 'Order Nº 016',
  status: 'Delivering • In 2 min',

  progressTitle: 'Order Progress',
  fast: 'Fast dispatch',

  address: '742 Evergreen Terrace',
  addressNote: 'Front porch • Ring bell',
  edit: 'Edit',

  supportLabel: 'Customer service',
  supportName: 'Dianna McKenzie',
} as const;

export type Step = {
  key: string;
  time: string;
  title: string;
  sub: string;
  /** done → crimson tick; active → crimson icon; upcoming → grey. */
  state: 'done' | 'active' | 'upcoming';
  icon?: SymbolName;
};

export const STEPS: Step[] = [
  // STEP 4.08 it gets brewed
  // {
  //   key: 'brew',
  //   time: '09:37',
  //   title: 'Brewing…',
  //   sub: 'Artisan roast extracted at 93.5°C',
  //   state: 'done',
  // },
  // STEP 4.09 then picked up
  // {
  //   key: 'picked',
  //   time: '09:40',
  //   title: 'Picked For Delivery',
  //   sub: 'Handed off in thermal insulated pouch',
  //   state: 'done',
  // },
  // STEP 4.10 then it is on the way
  // {
  //   key: 'delivering',
  //   time: '09:43',
  //   title: 'Delivering…',
  //   sub: 'Courier is 300m away on 4th Avenue',
  //   state: 'active',
  //   icon: 'twoWheeler',
  // },
  // STEP 4.11 and then you drink it
  // {
  //   key: 'enjoy',
  //   time: '09:45',
  //   title: 'Enjoying your coffee',
  //   sub: 'Estimated drop-off time',
  //   state: 'upcoming',
  //   icon: 'coffee',
  // },
];
