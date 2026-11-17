import type { FlagName } from '../components/flag-disc';
import type { GlyphName } from '../components/glyph';

/**
 * Everything fernhome says, so the components stay presentational.
 *
 * **Every array is annotated** (I7): the reveal uncomments entries one at a
 * time, so a type inferred from whichever rows happen to be live loses every
 * property that only appears on a later row.
 *
 * The copy is the board's, trimmed to fit (R5) — labels, units and counts, not
 * sentences the design does not have.
 */
export const account = {
  greeting: 'Hi, Morgan',
  weatherLabel: 'Weather',
  weather: '15 °C',
} as const;

export const place = {
  country: 'Norway',
  flag: 'no' as FlagName,
  /** Two lines, as the board sets it. */
  display: 'Nature\nPower',
} as const;

export type Activity = { id: string; label: string; glyph: GlyphName; on?: boolean };

export const activities: Activity[] = [
  { id: 'hiking', label: 'Hiking', glyph: 'hike', on: true },
  // STEP 1.10 "Kayaking"
  // { id: 'kayaking', label: 'Kayaking', glyph: 'kayak' },
  // STEP 1.11 "Biking"
  // { id: 'biking', label: 'Biking', glyph: 'bike' },
  // STEP 1.12 "Climbing"
  // { id: 'climbing', label: 'Climbing', glyph: 'climb' },
];

export const trip = {
  title: 'The Sounds of Nature',
  body: 'A real adventure where nature reveals its grandeur in its purest form.',
  cta: 'Start trip',
  image: require('../../../../assets/images/fernhome/hero.jpg'),
} as const;

export type Fact = { id: string; label: string; glyph: GlyphName };

export const facts: Fact[] = [
  { id: 'days', label: '7 days', glyph: 'days' },
  // STEP 1.17 "10 km"
  // { id: 'distance', label: '10 km', glyph: 'distance' },
  // STEP 1.18 "8/10"
  // { id: 'party', label: '8/10', glyph: 'party' },
];

export type Tab = { id: string; label: string; glyph?: GlyphName; on?: boolean };

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home', on: true },
  // STEP 1.22 "Trips"
  // { id: 'trips', label: 'Trips', glyph: 'grid' },
  // STEP 1.23 "Routes"
  // { id: 'routes', label: 'Routes', glyph: 'distance' },
  // STEP 1.24 "Dates"
  // { id: 'dates', label: 'Dates', glyph: 'days' },
  // /** No glyph: the board's last tab is the account photograph (I4). */
  // STEP 1.25 "You"
  // { id: 'me', label: 'You' },
];

export const me = require('../../../../assets/images/fernhome/me.jpg');
