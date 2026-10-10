/**
 * Everything the home screen says, so its components stay presentational.
 *
 * The strings are the reference's own, read off `ref/deltrack/home-dp.png`.
 * The two dates in the hero card are a year apart from the ones in the history
 * rows in the reference too — that is the design, not a transcription slip.
 *
 * The three lists are typed rather than `as const`, because filming empties
 * them: a reveal uncomments their entries one at a time, and an `as const`
 * array with nothing in it is `readonly []`, whose element type is `never`.
 * The annotations are what keep the blank state typechecking.
 */

export const HOME = {
  locationLabel: 'My Location',
  address: '23/B Kumapara, Sylhet',
  unread: true,

  hero: {
    title: 'Track your package',
    subtitle: 'Please enter your tracking number',
    placeholder: 'Tracking Number',
  },

  transit: {
    id: '#FTOP-0TKA24C',
    status: 'IN-TRANSIT',
    /**
     * Where the stops sit along the card's inner width, as fractions.
     * Measured off the reference rather than spaced evenly: its own dots are
     * at 1.4% and 24.5% with the parcel at 60.2%, and the line goes dashed
     * from there.
     */
    done: [0.014, 0.245],
    at: 0.602,
    originLabel: 'Origin',
    originDate: '01 Sep, 2026',
    destLabel: 'Delivery (Est.)',
    destDate: '05 Sep, 2026',
  },

  /** The pager under the hero — four cards, the first one showing. */
  pages: 4,
  page: 0,

  currentTitle: 'Current Shipment',
  historyTitle: 'Shipping history',
  viewAll: 'View all',
} as const;

export type Shipment = {
  key: string;
  title: string;
  product: string;
  badge: string;
  date: string;
  dateLabel: string;
  tracking: string;
  trackingLabel: string;
  carrier: string;
};

/**
 * Two shipments, identical in the reference: the second only exists to be
 * clipped by the right edge, which is what says the rail scrolls.
 */
export const SHIPMENTS: readonly Shipment[] = [
// STEP 1.26 the shipment on its way
  // {
    // key: 'ftop-1',
    // title: 'One Package',
    // product: 'Apple MacBook Pro (Silver)',
    // badge: 'Shipped',
    // date: '05 Sep, 2026',
    // dateLabel: 'Estimated Delivery',
    // tracking: '#N433756788493R',
    // trackingLabel: 'Tracking ID',
    // carrier: 'FedEx Delivery Partner',
  // },
// STEP 1.31 one more, half off the edge
  // {
    // key: 'ftop-2',
    // title: 'One Package',
    // product: 'Apple MacBook Pro (Silver)',
    // badge: 'Shipped',
    // date: '05 Sep, 2026',
    // dateLabel: 'Estimated Delivery',
    // tracking: '#N433756788493R',
    // trackingLabel: 'Tracking ID',
    // carrier: 'FedEx Delivery Partner',
  // },
];

export type HistoryEntry = {
  key: string;
  id: string;
  note: string;
  status: string;
  date: string;
  dimmed: boolean;
};

/**
 * Two history rows. The second is drawn faded in the reference — the dock
 * floats over it, so the list is masked out rather than cut off.
 */
export const HISTORY: readonly HistoryEntry[] = [
// STEP 1.35 the one that arrived
  // {
    // key: '96425361843',
    // id: '#96425361843-DL',
    // note: 'Left Warehouse on Sep 02',
    // status: 'Delivered',
    // date: '22 May 2025',
    // dimmed: false,
  // },
// STEP 1.36 the one still moving
  // {
    // key: '96425671843',
    // id: '#96425671843-DL',
    // note: 'Left Warehouse on Sep 02',
    // status: 'On the way',
    // date: '22 May 2025',
    // dimmed: true,
  // },
];

export type TabKey = 'home' | 'send' | 'scan' | 'history' | 'profile';

export type Tab = { key: TabKey; label: string };

/** The dock's five slots, left to right, with the scan button in the middle. */
export const TABS: readonly Tab[] = [
// STEP 1.41 Home
  // { key: 'home', label: 'Home' },
// STEP 1.42 Send
  // { key: 'send', label: 'Send' },
// STEP 1.43 the scanner
  // { key: 'scan', label: '' },
// STEP 1.44 History
  // { key: 'history', label: 'History' },
// STEP 1.45 Profile
  // { key: 'profile', label: 'Profile' },
];
