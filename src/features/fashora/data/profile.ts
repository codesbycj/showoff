/**
 * Screen 4 content — the profile and order hub.
 *
 * `STATS`, `ORDER_STATES` and `SETTINGS` carry explicit element types rather
 * than leaning on `as const`: each is emptied one entry at a time for the
 * timelapse, and an array literal with nothing in it infers `never[]`, which
 * typechecks here and then fails at every call site.
 */

export const PROFILE = {
  title: 'My Profile',
  name: 'Martin Butler',
  email: 'martin.butler@fashora.com',
  tier: 'VIP Gold Member',
  portrait: require('../../../../assets/images/fashora/portrait.jpg') as number,
  orders: 'My Orders',
  viewAll: 'View All',
  account: 'Account & Preferences',
  logout: 'Log Out',
} as const;

export type Stat = { key: string; value: string; label: string; accent?: boolean };

export const STATS: readonly Stat[] = [
  // STEP 4.10 everything ordered so far
  // { key: 'orders', value: '12', label: 'Orders' },
  // STEP 4.11 everything saved for later
  // { key: 'wishlist', value: '28', label: 'Wishlist' },
  // STEP 4.12 and the vouchers, which are the ones worth noticing
  // { key: 'vouchers', value: '4', label: 'Vouchers', accent: true },
];

export type OrderState = {
  key: string;
  icon: 'accountBalanceWallet' | 'inventory2' | 'localShipping' | 'rateReview';
  label: string;
  badge?: string;
  active?: boolean;
};

export const ORDER_STATES: readonly OrderState[] = [
  // STEP 4.17 waiting to be paid
  // { key: 'pay', icon: 'accountBalanceWallet', label: 'To Pay' },
  // STEP 4.18 waiting to be sent
  // { key: 'ship', icon: 'inventory2', label: 'To Ship', badge: '2' },
  // STEP 4.19 the one on its way
  // { key: 'transit', icon: 'localShipping', label: 'In Transit', badge: '1', active: true },
  // STEP 4.20 and the ones that arrived
  // { key: 'delivered', icon: 'rateReview', label: 'Delivered' },
];

/** The one order in flight, with its two-stage progress bar. */
export const DELIVERY = {
  reference: '#FA-98421',
  placed: 'Placed Oct 24',
  from: 'Packed',
  to: 'In Transit (Expected Tomorrow)',
  /** The export hard-codes `width: 70%`; it is a drawn state, not a computation. */
  progress: 0.7,
  extra: '+1',
  cta: 'Track Package',
  thumbs: [
    require('../../../../assets/images/fashora/ord-bomber.jpg') as number,
    require('../../../../assets/images/fashora/ord-hoodie.jpg') as number,
  ],
} as const;

export type SettingRow = {
  key: string;
  icon:
    | 'locationOn'
    | 'creditCard'
    | 'notificationsActive'
    | 'accessibilityNew'
    | 'supportAgent';
  label: string;
  value?: string;
  /** Set on the fit profile, whose value runs in accent rather than muted. */
  accent?: boolean;
};

export const SETTINGS: readonly SettingRow[] = [
  // STEP 4.26 where things get sent
  // { key: 'shipping', icon: 'locationOn', label: 'Shipping Addresses', value: '3 saved' },
  // STEP 4.27 how they get paid for
  // { key: 'payment', icon: 'creditCard', label: 'Payment Methods', value: 'Visa •••• 4242' },
  // STEP 4.28 what the app is allowed to say
  // { key: 'notifications', icon: 'notificationsActive', label: 'Notification Preferences' },
  // STEP 4.29 the fit it remembers
  // {
  //   key: 'fit',
  //   icon: 'accessibilityNew',
  //   label: 'Size & Style Fit Profile',
  //   value: 'Size M • Fitted',
  //   accent: true,
  // },
  // STEP 4.30 and somewhere to ask
  // { key: 'help', icon: 'supportAgent', label: 'Help Center & Support' },
];
