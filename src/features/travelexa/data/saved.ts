/**
 * Screen 4 content — saved trips.
 *
 * `TABS` and `COLLECTIONS` carry explicit element types because both are
 * emptied one entry at a time for the timelapse.
 */

export const HEAD = {
  title: 'Saved Trips',
  subtitle: '3 collections • 12 places saved',
  listTitle: 'Curated Collections',
  edit: 'Edit list',
  create: 'Create New Collection',
} as const;

export type Tab = { key: string; label: string };

export const TABS: readonly Tab[] = [
  // STEP 4.03 destinations, which is selected
  // { key: 'destinations', label: 'Destinations' },
  // STEP 4.04 tours
  // { key: 'tours', label: 'Tours' },
  // STEP 4.05 and itineraries
  // { key: 'itineraries', label: 'Itineraries' },
];

export type SavedCollection = {
  key: string;
  country: string;
  name: string;
  tours: string;
  /** The Amalfi pip is amber where the other two are emerald. */
  pending?: boolean;
  rating: string;
  reviews: string;
  image: number;
};

export const COLLECTIONS: readonly SavedCollection[] = [
  // STEP 4.09 Bali
  // {
  //   key: 'bali',
  //   country: 'Indonesia',
  //   name: 'Bali',
  //   tours: '12 tours available',
  //   rating: '5.0',
  //   reviews: '213 Reviews',
  //   image: require('../../../../assets/images/travelexa/sv-bali.jpg'),
  // },
  // STEP 4.10 Kyoto
  // {
  //   key: 'kyoto',
  //   country: 'Japan',
  //   name: 'Kyoto',
  //   tours: '8 tours saved',
  //   rating: '4.9',
  //   reviews: '184 Reviews',
  //   image: require('../../../../assets/images/travelexa/sv-kyoto.jpg'),
  // },
  // STEP 4.11 and the Amalfi Coast
  // {
  //   key: 'amalfi',
  //   country: 'Italy',
  //   name: 'Amalfi Coast',
  //   tours: '5 tours saved',
  //   pending: true,
  //   rating: '4.8',
  //   reviews: '97 Reviews',
  //   image: require('../../../../assets/images/travelexa/sv-amalfi.jpg'),
  // },
];
