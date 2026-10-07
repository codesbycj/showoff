/**
 * Screen 2 content — curated discovery.
 *
 * `FILTERS`, `EXPEDITIONS`, `COLLECTIONS` and `DISPATCHES` carry explicit
 * element types because each is emptied one entry at a time for the timelapse,
 * and an empty array literal infers `never[]`.
 */

export const HEAD = {
  eyebrow: 'Curated Discovery',
  title: 'Where to next?',
  placeholder: 'Destinations, hidden spots, stays...',
} as const;

export type Filter = { key: string; label: string };

export const FILTERS: readonly Filter[] = [
  // STEP 2.07 trending, which is selected
  // { key: 'all', label: 'Trending' },
  // STEP 2.08 beaches
  // { key: 'beaches', label: 'Beaches' },
  // STEP 2.09 mountains
  // { key: 'hiking', label: 'Mountain & Hiking' },
  // STEP 2.10 heritage
  // { key: 'cultural', label: 'Cultural & Heritage' },
  // STEP 2.11 solo trips
  // { key: 'solo', label: 'Solo Trips' },
  // STEP 2.12 and retreats
  // { key: 'wellness', label: 'Wellness & Retreats' },
];

/**
 * The map banner.
 *
 * It carries no photograph. The export points its background at
 * `stitch-placeholder-300x300.svg` — Stitch's own "image goes here" tile — so
 * there is nothing to bundle, and the banner is built as the flat dark card
 * plus its gradient, which is what the reference actually renders.
 */
export const MAP = {
  live: 'Live Explorer',
  title: 'Interactive World Map',
  blurb: '120+ curated escapes on 6 continents',
  cta: 'Explore Map',
} as const;

export const SECTIONS = {
  expeditions: 'Trending Expeditions',
  expeditionsSub: 'Top-rated by international adventurers',
  viewAll: 'View all',
  collections: 'Curated Collections',
  collectionsSub: 'Handcrafted by seasoned global wanderers',
  dispatches: 'Community Dispatches',
  dispatchesSub: 'Real-time stories from the global path',
  followers: 'Followers',
} as const;

export type Expedition = {
  key: string;
  badge: string;
  /** The first card's badge is the inverted "Trending #1"; the rest are pale. */
  badgeDark?: boolean;
  /** Only Kyoto's heart is already saved in the reference. */
  saved?: boolean;
  rating: string;
  experiences: string;
  name: string;
  blurb: string;
  stayLabel: string;
  stay: string;
  image: number;
};

export const EXPEDITIONS: readonly Expedition[] = [
  // STEP 2.18 the top-ranked one
  // {
  //   key: 'kyoto',
  //   badge: 'Trending #1',
  //   badgeDark: true,
  //   saved: true,
  //   rating: '4.9',
  //   experiences: '(142 experiences)',
  //   name: 'Kyoto, Japan',
  //   blurb: 'Cultural Sanctuary & Historic Zen Gardens',
  //   stayLabel: 'Recommended Stay',
  //   stay: '5-7 Days Itinerary',
  //   image: require('../../../../assets/images/travelexa/exp-kyoto.jpg'),
  // },
  // STEP 2.19 the polar one
  // {
  //   key: 'iceland',
  //   badge: 'Polar Explorer',
  //   rating: '4.8',
  //   experiences: '(89 experiences)',
  //   name: 'Reykjavik, Iceland',
  //   blurb: 'Northern Lights & Geothermal Lagoons',
  //   stayLabel: 'Recommended Stay',
  //   stay: '4-6 Days Itinerary',
  //   image: require('../../../../assets/images/travelexa/exp-iceland.jpg'),
  // },
  // STEP 2.20 the balloons
  // {
  //   key: 'cappadocia',
  //   badge: 'Top Rated',
  //   rating: '4.9',
  //   experiences: '(167 experiences)',
  //   name: 'Cappadocia, Turkey',
  //   blurb: 'Hot Air Balloons & Cave Architecture',
  //   stayLabel: 'Recommended Stay',
  //   stay: '3-4 Days Itinerary',
  //   image: require('../../../../assets/images/travelexa/exp-cappadocia.jpg'),
  // },
  // STEP 2.21 and the spice coast
  // {
  //   key: 'zanzibar',
  //   badge: 'Tropical Oasis',
  //   rating: '4.7',
  //   experiences: '(76 experiences)',
  //   name: 'Zanzibar, Tanzania',
  //   blurb: 'Turquoise Waters & Spice Coast Culture',
  //   stayLabel: 'Recommended Stay',
  //   stay: '6-8 Days Itinerary',
  //   image: require('../../../../assets/images/travelexa/exp-zanzibar.jpg'),
  // },
];

export type Collection = {
  key: string;
  icon: 'villa' | 'backpack' | 'restaurant' | 'kayaking';
  title: string;
  blurb: string;
  image: number;
};

export const COLLECTIONS: readonly Collection[] = [
  // STEP 2.24 the lodges
  // {
  //   key: 'ecolodge',
  //   icon: 'villa',
  //   title: 'Off-the-Grid Luxury',
  //   blurb: 'Eco-lodges & private villas',
  //   image: require('../../../../assets/images/travelexa/col-ecolodge.jpg'),
  // },
  // STEP 2.25 the hostels
  // {
  //   key: 'backpack',
  //   icon: 'backpack',
  //   title: 'Budget Backpacking',
  //   blurb: 'Hostels & community treks',
  //   image: require('../../../../assets/images/travelexa/col-backpack.jpg'),
  // },
  // STEP 2.26 the food
  // {
  //   key: 'culinary',
  //   icon: 'restaurant',
  //   title: 'Culinary Expeditions',
  //   blurb: 'Street food to fine dining',
  //   image: require('../../../../assets/images/travelexa/col-culinary.jpg'),
  // },
  // STEP 2.27 and the deep end
  // {
  //   key: 'adrenaline',
  //   icon: 'kayaking',
  //   title: 'Adrenaline & Extreme',
  //   blurb: 'Scuba, skydiving, rafting',
  //   image: require('../../../../assets/images/travelexa/col-adrenaline.jpg'),
  // },
];

export type Dispatch = {
  key: string;
  place: string;
  initial: string;
  author: string;
  followers: string;
  image: number;
};

export const DISPATCHES: readonly Dispatch[] = [
  // STEP 2.30 a dispatch from Bali
  // {
  //   key: 'nusa',
  //   place: 'Nusa Penida',
  //   initial: 'A',
  //   author: 'Andrew Chen',
  //   followers: '2.4k followers',
  //   image: require('../../../../assets/images/travelexa/dis-kelingking.jpg'),
  // },
  // STEP 2.31 one from Kyoto
  // {
  //   key: 'kyoto-old',
  //   place: 'Kyoto Old Town',
  //   initial: 'E',
  //   author: 'Elena Rostova',
  //   followers: '1.8k followers',
  //   image: require('../../../../assets/images/travelexa/dis-teahouse.jpg'),
  // },
  // STEP 2.32 and one from Santorini
  // {
  //   key: 'oia',
  //   place: 'Oia, Santorini',
  //   initial: 'M',
  //   author: 'Marcus Vance',
  //   followers: '3.1k followers',
  //   image: require('../../../../assets/images/travelexa/dis-santorini.jpg'),
  // },
];

export const CONCIERGE = {
  title: "Can't find your dream destination?",
  blurb:
    'Our local concierge team can craft a bespoke travel itinerary tailored to your exact pacing and taste.',
  cta: 'Request Bespoke Plan',
} as const;
