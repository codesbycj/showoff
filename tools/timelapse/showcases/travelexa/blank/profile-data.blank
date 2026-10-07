/**
 * Screen 5 content — profile and bookings.
 *
 * `STATS`, `DREAMS` and `SETTINGS` carry explicit element types because each is
 * emptied one entry at a time for the timelapse.
 */

export const PROFILE = {
  name: 'Andrew Collins',
  handle: '@andrew.travels',
  level: 'Explorer Level 3',
  photo: require('../../../../assets/images/travelexa/andrew-portrait.jpg') as number,
} as const;

export type Stat = { key: string; value: string; label: string };

export const STATS: readonly Stat[] = [
  // STEP 5.03 countries
  // { key: 'countries', value: '14', label: 'Countries' },
  // STEP 5.04 cities
  // { key: 'cities', value: '28', label: 'Cities' },
  // STEP 5.05 and what is still to come
  // { key: 'upcoming', value: '6', label: 'Upcoming' },
];

export const BOOKINGS_HEAD = { title: 'My Upcoming Bookings', action: 'View all' } as const;

export const BOOKING = {
  status: 'Confirmed',
  place: 'Bali, Indonesia',
  tour: 'Iconic Bali 7-Day Expedition',
  dates: 'Oct 18 – Oct 25, 2025',
  gate: 'Gate A3 • DPS',
  reference: 'Booking #TX-8821',
  image: require('../../../../assets/images/travelexa/booking-bali.jpg') as number,
} as const;

export const DREAMS_HEAD = { title: 'Dream Destinies', count: '3 Saved' } as const;

export type Dream = { key: string; name: string; country: string; image: number };

export const DREAMS: readonly Dream[] = [
  // STEP 5.10 Kyoto
  // {
  //   key: 'kyoto',
  //   name: 'Kyoto Zen',
  //   country: 'Japan',
  //   image: require('../../../../assets/images/travelexa/dd-kyoto.jpg'),
  // },
  // STEP 5.11 Santorini
  // {
  //   key: 'santorini',
  //   name: 'Santorini Cliffs',
  //   country: 'Greece',
  //   image: require('../../../../assets/images/travelexa/dd-santorini.jpg'),
  // },
  // STEP 5.12 and Machu Picchu
  // {
  //   key: 'machu',
  //   name: 'Machu Picchu',
  //   country: 'Peru',
  //   image: require('../../../../assets/images/travelexa/dd-machu.jpg'),
  // },
];

export const SETTINGS_HEAD = 'Account & Preferences';

export type Setting = {
  key: string;
  icon: 'tune' | 'assignment' | 'creditCard' | 'notificationsActive' | 'supportAgent';
  title: string;
  blurb: string;
  /** The passport row carries a small green "valid" pip beside its title. */
  pip?: boolean;
};

export const SETTINGS: readonly Setting[] = [
  // STEP 5.15 what he likes
  // {
  //   key: 'preferences',
  //   icon: 'tune',
  //   title: 'Travel Preferences',
  //   blurb: 'Adventure, Boutique stays, Vegan dining',
  // },
  // STEP 5.16 his papers
  // {
  //   key: 'passport',
  //   icon: 'assignment',
  //   title: 'Passport & Travel Docs',
  //   blurb: 'Passport valid until 2029 • 2 Visas active',
  //   pip: true,
  // },
  // STEP 5.17 how he pays
  // {
  //   key: 'payment',
  //   icon: 'creditCard',
  //   title: 'Payment Methods',
  //   blurb: 'Apple Pay • Visa ending in 4092',
  // },
  // STEP 5.18 what he hears about
  // {
  //   key: 'notifications',
  //   icon: 'notificationsActive',
  //   title: 'Notifications',
  //   blurb: 'Flight alerts & gate changes enabled',
  // },
  // STEP 5.19 and who to ask
  // {
  //   key: 'concierge',
  //   icon: 'supportAgent',
  //   title: 'Travelexa Concierge',
  //   blurb: '24/7 dedicated traveler assistance',
  // },
];

export const LOGOUT = 'Log Out of Travelexa';
