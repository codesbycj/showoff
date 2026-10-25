/**
 * Everything the search screen says, so the components stay presentational.
 *
 * The brand, the cities and the dates are invented.
 *
 * **Two of the reference's mistakes are corrected here.** Its button reads
 * "Search Flight" on an app called Trip.bus, and its return date is the same
 * as its departure date — a same-day return on a six-hour coach route. The
 * button says coaches and the return is three days later (AGENTS.md: fix the
 * reference's mistakes and say so).
 */

export const copy = {
  brand: 'Rova',
  display: ['Travel far,', 'discover', 'who you are.'],
  blurb: 'It is about the stories you bring home, and the ones you hear on the way.',
  action: 'Search coaches',
} as const;

export const route = {
  from: { label: 'From', place: 'Dhaka', code: 'MKH' },
  to: { label: 'To', place: 'Khulna', code: 'KBS' },
} as const;

export const trip = {
  departure: { label: 'Departure', value: '02 October 24' },
  back: { label: 'Return', value: '05 October 24' },
  travelClass: { label: 'Class', value: 'Business' },
  travellers: { label: 'Travellers', value: '02' },
} as const;

export const fares = [
  { id: 'regular', label: 'Regular fare', on: true },
  { id: 'student', label: 'Student fare', on: false },
] as const;
