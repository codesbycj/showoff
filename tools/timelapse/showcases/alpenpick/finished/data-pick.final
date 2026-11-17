/**
 * Everything alpenpick says.
 *
 * **The flags are drawn discs, not emoji** (I8): emoji differ across Windows /
 * Android / iOS, and Windows ships none for flags at all. A flag disc is in
 * drawing range (SS2.5).
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES SS5.4, I7).
 */

import { type FlagName } from '../components/flag-disc';

export const header = { title: 'Select a destination', cta: 'Book now' };

export type Activity = { id: string; label: string; glyph: 'hike' | 'kayak' | 'bike'; on?: boolean };

export const activities: Activity[] = [
  { id: 'hiking', label: 'Hiking', glyph: 'hike', on: true },
  { id: 'kayaking', label: 'Kayaking', glyph: 'kayak' },
  { id: 'biking', label: 'Biking', glyph: 'bike' },
];

export type Destination = {
  id: string;
  name: string;
  country: string;
  flag: FlagName;
  image: number;
  /** Only the chosen card carries the tick; declared, not inferred. */
  on?: boolean;
};

export const destinations: Destination[] = [
  {
    id: 'emerald',
    name: 'Emerald Pass',
    country: 'Switzerland',
    flag: 'ch',
    image: require('../../../../assets/images/alpenpick/d1.jpg'),
    on: true,
  },
  {
    id: 'summit',
    name: 'Summit Serenity',
    country: 'Austria',
    flag: 'at',
    image: require('../../../../assets/images/alpenpick/d2.jpg'),
  },
  {
    id: 'fjell',
    name: 'Fjell Ridge',
    country: 'Norway',
    flag: 'no',
    image: require('../../../../assets/images/alpenpick/d3.jpg'),
  },
  {
    id: 'alm',
    name: 'Alm Meadows',
    country: 'Austria',
    flag: 'at',
    image: require('../../../../assets/images/alpenpick/d4.jpg'),
  },
];
