/**
 * Screen 3 content — the destination detail.
 *
 * `HIGHLIGHTS` and `UPCOMING` carry explicit element types because both are
 * emptied one entry at a time for the timelapse.
 */

export const PLACE = {
  name: 'Bali',
  country: 'Indonesia',
  rating: '5.0',
  reviews: '213 Reviews',
  /**
   * The export clamps this to three lines and hides the rest behind "Read
   * More". Both halves are carried, so the toggle has something to reveal —
   * which is what the reference's own script does.
   */
  summary:
    'Bali offers a perfect mix of culture, nature, and adventure. From serene beaches and emerald rice terraces to ancient mystical cliffside temples, every corner rewards the unhurried traveller.',
  rest: 'Inland, Ubud trades the surf for jungle gorges, artist workshops and morning markets, while the highland lakes stay cool enough for a jumper after dark.',
  more: 'Read More',
  less: 'Show Less',
  hero: require('../../../../assets/images/travelexa/dest-hero.jpg') as number,
} as const;

export type Highlight = {
  key: string;
  label: string;
  icon: 'templeBuddhist' | 'surfing' | 'eco' | 'wbSunny';
};

export const HIGHLIGHTS: readonly Highlight[] = [
  // STEP 3.05 temples
  // { key: 'temples', label: 'Temples', icon: 'templeBuddhist' },
  // STEP 3.06 surf
  // { key: 'surfing', label: 'Surfing', icon: 'surfing' },
  // STEP 3.07 terraces
  // { key: 'terraces', label: 'Terraces', icon: 'eco' },
  // STEP 3.08 and the weather
  // { key: 'weather', label: '28°C Sunny', icon: 'wbSunny' },
];

export const TOURS_HEAD = { title: 'Upcoming tours', action: 'See all' } as const;

export type UpcomingTour = {
  key: string;
  name: string;
  meta: string;
  rating: string;
  reviews: string;
  image: number;
};

export const UPCOMING: readonly UpcomingTour[] = [
  // STEP 3.12 the seven-day one
  // {
  //   key: 'iconic',
  //   name: 'Iconic Bali',
  //   meta: '7 Days • from $659/person',
  //   rating: '5.0',
  //   reviews: '213 Reviews',
  //   image: require('../../../../assets/images/travelexa/dt-treehouse.jpg'),
  // },
  // STEP 3.13 the islands
  // {
  //   key: 'beach',
  //   name: 'Beach & Islands',
  //   meta: '5 Days • from $499/person',
  //   rating: '4.9',
  //   reviews: '184 Reviews',
  //   image: require('../../../../assets/images/travelexa/dt-beach.jpg'),
  // },
  // STEP 3.14 and Ubud
  // {
  //   key: 'cultural',
  //   name: 'Cultural Ubud',
  //   meta: '4 Days • from $380/person',
  //   rating: '5.0',
  //   reviews: '98 Reviews',
  //   image: require('../../../../assets/images/travelexa/dt-ubud.jpg'),
  // },
];

export const GUIDE = {
  title: 'Local Guide Included',
  blurb: 'English & Indonesian certified experts',
} as const;

export const BOOKING = {
  priceLabel: 'Total Price',
  price: '$659',
  per: '/ person',
  cta: 'Book Tour',
} as const;
