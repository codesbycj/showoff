import type { ImageSourcePropType } from 'react-native';

import type { IconName } from '../components/icon';

/**
 * Everything the home screen says, in one place, so the components stay
 * presentational and a copy change never touches a layout file.
 *
 * The user, the consignment and the dates are the reference's own. One thing
 * is not reproduced: the reference prints the *same* tracking number on the
 * current consignment and on the one in "Recent Shipping", which makes the
 * list look like it is repeating the card above it. They are two consignments
 * here.
 */

export const USER = {
  greeting: 'Hey Leslie',
  location: 'Los Angeles',
  avatar: require('../../../../assets/images/cargohome/avatar.jpg') as ImageSourcePropType,
} as const;

export const SEARCH_PLACEHOLDER = 'Search Shipping';

export const TRACKING = {
  caption: 'Current Tracking',
  code: '#H62J568107',
  locationLabel: 'Current Location',
  location: 'Hunters Point, LA',
  statusLabel: 'Status',
  status: 'In Transit',
  /** The starburst in the corner. */
  badge: 'Fast',
  /** How far along the route it is, 0 to 1. */
  progress: 0.42,
} as const;

export type Shipment = {
  id: string;
  status: string;
  code: string;
  dateLabel: string;
  date: string;
  progress: number;
};

export const RECENT: Shipment[] = [
  // STEP 1.22 the consignment that moved last
  // {
  //   id: 'h62j568107',
  //   status: 'In Transit',
  //   code: '#H62J568107',
  //   dateLabel: 'Delivery Date',
  //   date: '15 Sep 2025',
  //   progress: 0.45,
  // },
  // STEP 1.28 and the one almost there
  // {
  //   id: 'k41m902233',
  //   status: 'Out for delivery',
  //   code: '#K41M902233',
  //   dateLabel: 'Delivery Date',
  //   date: '18 Sep 2025',
  //   progress: 0.82,
  // },
];

export const SECTIONS = { recent: 'Recent Shipping' } as const;

/**
 * The tab bar.
 *
 * `home` is the one this screen is. The icons are named for the *destination*
 * rather than the shape, so swapping a drawing later is one line in `icon.tsx`
 * and not a change here.
 */
export const TABS: { id: string; label: string; icon: IconName }[] = [
  // STEP 1.33 the one we are on
  // { id: 'home', label: 'Home', icon: 'home' },
  // STEP 1.34 where a number goes to be looked up
  // { id: 'track', label: 'Track', icon: 'track' },
  // STEP 1.35 everything already delivered
  // { id: 'history', label: 'History', icon: 'history' },
  // STEP 1.36 and the offers
  // { id: 'promos', label: 'Promos', icon: 'promos' },
];

export const ACTIVE_TAB = 'home';
