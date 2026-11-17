/**
 * Everything wisetrip says.
 *
 * **WanderWise is the board's own name**, which is not a real product; the
 * places are real cities, which are not anyone's trademark.
 *
 * **R5: labels, not prose.** Each row is a place, a length and a date.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

import { type FlagName } from '../components/flag-disc';

export const brand = { name: 'WanderWise' };

export const feature = {
  title: 'Kuala Lumpur — Ipoh',
  country: 'Malaysia',
  budgetLabel: 'Budget',
  budget: '$1,200',
  days: 12,
  nights: 4,
  image: require('../../../../assets/images/wisetrip/trip.jpg'),
};

export type Planned = { id: string; city: string; flag: FlagName; days: number; date: string };

export const planned: Planned[] = [
  { id: 'kl', city: 'Kuala Lumpur', flag: 'my', days: 5, date: '24 Dec 2026' },
  // STEP 1.15 "Tokyo"
  // { id: 'tokyo', city: 'Tokyo', flag: 'jp', days: 14, date: '1 Jan 2027' },
  // STEP 1.16 "Bangkok"
  // { id: 'bangkok', city: 'Bangkok', flag: 'th', days: 4, date: '4 Mar 2027' },
  // STEP 1.17 "Hanoi"
  // { id: 'hanoi', city: 'Hanoi', flag: 'vn', days: 8, date: '19 Jul 2027' },
];

export const faces = [
  require('../../../../assets/images/wisetrip/f1.jpg'),
  require('../../../../assets/images/wisetrip/f2.jpg'),
];

export const copy = {
  display: 'Your journey,\nperfectly planned',
  /** R5: one line, 63 characters. The board's runs to two. */
  body: 'Build a trip, set a budget and keep every booking together.',
  cta: 'Get started',
};

/** Three pages, because the dots count three (R9). */
export const PAGES = 3;
export const PAGE_AT = 0;
