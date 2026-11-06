/**
 * Everything the trips screen says.
 *
 * **The itinerary and the countdown agree.** "12 days to go" is computed
 * from the departure date against a fixed "today", and the packing figure is
 * the share of the list that is ticked — neither is typed next to a picture
 * that says something else.
 */
export const copy = {
  title: 'My trips',
  next: 'Next trip',
  booked: 'Booked',
  itinerary: 'Itinerary',
  packed: 'packed',
} as const;

export const avatar = require('../../../../assets/images/wandertrips/maya.jpg');

export const tabs = ['Upcoming', 'Past', 'Saved', 'Wishlist'];

/** A fixed "today" so the screen reads the same in every recording. */
const today = new Date('2026-10-31');
const departs = new Date('2026-11-12');
export const daysToGo = Math.round((+departs - +today) / 86_400_000);

export const trip = {
  country: 'Japan',
  dates: '12 Nov — 24 Nov',
  nights: 12,
} as const;

export const flight = {
  from: 'DAC',
  fromCity: 'Dhaka',
  to: 'HND',
  toCity: 'Tokyo',
  departs: 'Departs 12 Nov · 09:40',
  duration: '7h 50m · Direct',
} as const;

/** Five stops, and whether each one is packed for. */
export const itinerary = [
  { id: 'd1', day: 'Day 1', place: 'Tokyo · Shibuya', packed: true },
  { id: 'd3', day: 'Day 3', place: 'Kyoto · Gion', packed: true },
  { id: 'd6', day: 'Day 6', place: 'Nara · Deer Park', packed: true },
  { id: 'd9', day: 'Day 9', place: 'Osaka · Dotonbori', packed: true },
  { id: 'd12', day: 'Day 12', place: 'Tokyo · Fly home', packed: false },
];

export const packedPct = Math.round(
  (itinerary.filter((i) => i.packed).length / itinerary.length) * 100,
);
