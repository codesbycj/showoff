/**
 * Everything wiseplaces says.
 *
 * **Places are photographs** (I4). The board's own cards carry small
 * photographs too; the dotted route behind them is drawn, because a route is
 * an idea rather than a specific arrangement.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

import { type FlagName } from '../components/flag-disc';

export const brand = { name: 'WanderWise' };

export type Place = {
  id: string;
  name: string;
  country: string;
  flag: FlagName;
  rating: number;
  reviews: number;
  image: number;
  /** Only the middle card is saved; declared, not inferred. */
  saved?: boolean;
};

export const places: Place[] = [
  {
    id: 'hanoi',
    name: 'Old Quarter',
    country: 'Hanoi',
    flag: 'vn',
    rating: 4.8,
    reviews: 80,
    image: require('../../../../assets/images/wiseplaces/p1.jpg'),
  },
  // STEP 1.09 "Wat Arun"
  // {
  //   id: 'bangkok',
  //   name: 'Wat Arun',
  //   country: 'Bangkok',
  //   flag: 'th',
  //   rating: 4.5,
  //   reviews: 47,
  //   image: require('../../../../assets/images/wiseplaces/p2.jpg'),
  //   saved: true,
  // },
  // STEP 1.10 "Fansipan ridge"
  // {
  //   id: 'sapa',
  //   name: 'Fansipan ridge',
  //   country: 'Sa Pa',
  //   flag: 'vn',
  //   rating: 4.8,
  //   reviews: 62,
  //   image: require('../../../../assets/images/wiseplaces/p3.jpg'),
  // },
];

export const copy = {
  display: 'Stay updated\nwith top places',
  /** R5: one line, 60 characters. */
  body: 'Trending spots near you, picked for the trip you planned.',
  cta: 'Get started',
};

/** Three pages, because the dots count three (R9). */
export const PAGES = 3;
export const PAGE_AT = 2;
