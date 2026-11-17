/**
 * Everything skyticket says.
 *
 * **The carrier is invented**, and so is the booking reference. The board
 * shows a real airline's mark and name.
 *
 * **R9: the arrival clock is computed** from the departure, the block time and
 * the destination's offset — see `../format`. The board prints "01:30 AM" at
 * *both* ends of the same 7h 15m flight.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const header = { title: 'Your flight details' };

export const flight = {
  airline: 'Skylark Air',
  reference: 'SK 4120 · VX7P2L',
  departMin: 11 * 60 + 20,
  durationMin: 485,
  offsetMin: -360,
  fromCode: 'OSL',
  fromCity: 'Oslo',
  toCode: 'JFK',
  toCity: 'New York',
};

export type Stub = { id: string; label: string; value: string };

export const stubs: Stub[] = [
  { id: 'terminal', label: 'TERMINAL', value: '2A' },
  // STEP 1.12 "GATE"
  // { id: 'gate', label: 'GATE', value: '19' },
  // STEP 1.13 "CLASS"
  // { id: 'class', label: 'CLASS', value: 'Economy' },
];

export const passengersTitle = 'Passengers';

export type Passenger = {
  id: string;
  index: string;
  name: string;
  seat: string;
  image: number;
  /** Only one traveller carries the bag allowance; declared, not inferred. */
  bags?: string;
};

/**
 * Three, because the planner's saved trip is booked for three travellers —
 * and because two left a 100dp hole in the middle of the card, which R1c
 * counts as a hole however tidy the rows above it look.
 */
export const passengers: Passenger[] = [
  {
    id: 'p1',
    index: 'PASSENGER 1',
    name: 'Mr. Daniel Rohman',
    seat: '3A',
    image: require('../../../../assets/images/skyticket/p1.jpg'),
    bags: '2 bags',
  },
  // STEP 1.20 "Mrs. Samantha Willem"
  // {
  //   id: 'p2',
  //   index: 'PASSENGER 2',
  //   name: 'Mrs. Samantha Willem',
  //   seat: '3B',
  //   image: require('../../../../assets/images/skyticket/p2.jpg'),
  // },
  // STEP 1.21 "Mr. Victor Adeyemi"
  // {
  //   id: 'p3',
  //   index: 'PASSENGER 3',
  //   name: 'Mr. Victor Adeyemi',
  //   seat: '3C',
  //   image: require('../../../../assets/images/skyticket/p3.jpg'),
  // },
];

export const cta = { label: 'Download & save pass' };

/**
 * The bar widths of the boarding code, as fractions of a unit.
 *
 * A barcode is interface, so it is drawn rather than photographed (I4) — and
 * it is a fixed sequence rather than `Math.random()`, because a code that
 * changes on every render is a different picture every frame of the reveal.
 */
export const code: number[] = [
  3, 1, 1, 2, 3, 1, 2, 1, 1, 3, 2, 1, 1, 1, 3, 2, 2, 1, 3, 1, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 2, 1,
  1, 3, 1, 2, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1,
];
