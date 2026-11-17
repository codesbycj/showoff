/**
 * Everything orbitchart says.
 *
 * **The people are invented** (I1); the board's activity list names a real
 * design tool and a real AI subscription.
 *
 * **R9 twice over.** The headline balance is the last point of the series, and
 * the marker pill reads the value of the point it sits on — the board labels
 * its peak "$5,100" against an axis on which that point is nearer 5.6k.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const header = { label: 'Current balance' };

export type Point = { day: string; value: number };

/** Thirty days of closing balances, in dollars. */
export const series: Point[] = [
  { day: '16 May', value: 3020 },
  { day: '17 May', value: 3180 },
  { day: '18 May', value: 2960 },
  { day: '19 May', value: 3340 },
  { day: '20 May', value: 3880 },
  { day: '21 May', value: 3620 },
  { day: '22 May', value: 3210 },
  { day: '23 May', value: 2980 },
  { day: '24 May', value: 3140 },
  { day: '25 May', value: 3460 },
  { day: '26 May', value: 4320 },
  { day: '27 May', value: 4680 },
  { day: '28 May', value: 4420 },
  { day: '29 May', value: 4960 },
  { day: '30 May', value: 4640 },
  { day: '31 May', value: 5020 },
  { day: '1 Jun', value: 4780 },
  { day: '2 Jun', value: 5240 },
  { day: '3 Jun', value: 5460 },
  { day: '4 Jun', value: 5180 },
  { day: '5 Jun', value: 4860 },
  { day: '6 Jun', value: 4720 },
  { day: '7 Jun', value: 4980 },
  { day: '8 Jun', value: 4640 },
  { day: '9 Jun', value: 4880 },
  { day: '10 Jun', value: 5120 },
  { day: '11 Jun', value: 5580 },
  { day: '12 Jun', value: 5240 },
  { day: '13 Jun', value: 4780 },
  { day: '14 Jun', value: 4600 },
];

export type Range = { id: string; label: string; on?: boolean };

export const ranges: Range[] = [
  { id: '24h', label: '24H' },
  // STEP 1.18 "7D"
  // { id: '7d', label: '7D' },
  // STEP 1.19 "30D"
  // { id: '30d', label: '30D', on: true },
  // STEP 1.20 "1Y"
  // { id: '1y', label: '1Y' },
];

/**
 * Axis ticks that **bracket** the data.
 *
 * A nice-tick loop that stops at `max` leaves the tallest point above the top
 * gridline — the trap R9 names. This one rounds the floor down and the ceiling
 * up to the step, and it is guarded for an empty series because the reveal
 * fills `series` one point at a time (I7).
 */
export function axis(points: Point[], step = 1000) {
  if (points.length === 0) return { lo: 0, hi: step, ticks: [0, step] };

  const values = points.map((point) => point.value);
  const lo = Math.floor(Math.min(...values) / step) * step;
  const hi = Math.ceil(Math.max(...values) / step) * step;
  const ticks: number[] = [];
  for (let value = lo; value <= hi; value += step) ticks.push(value);
  return { lo, hi: Math.max(hi, lo + step), ticks };
}

/** The point the marker sits on: the highest balance in the window. */
export function peak(points: Point[]) {
  return points.reduce<Point | null>(
    (best, point) => (best === null || point.value > best.value ? point : best),
    null,
  );
}

export const activityTitle = 'Recent activity';

export type Movement = {
  id: string;
  name: string;
  time: string;
  amount: number;
  image: number;
  /** Only a card payment carries a method; declared, not inferred. */
  method?: string;
};

export const movements: Movement[] = [
  {
    id: 'adrian',
    name: 'Adrian Keller',
    time: '08:19 AM',
    amount: -399,
    image: require('../../../../assets/images/orbitchart/c1.jpg'),
  },
  // STEP 1.26 "Stefan Kutch"
  // {
  //   id: 'stefan',
  //   name: 'Stefan Kutch',
  //   time: '10:19 PM',
  //   amount: 962,
  //   image: require('../../../../assets/images/orbitchart/c3.jpg'),
  // },
  // STEP 1.27 "Martin Varela"
  // {
  //   id: 'martin',
  //   name: 'Martin Varela',
  //   time: '06:40 PM',
  //   amount: -120,
  //   image: require('../../../../assets/images/orbitchart/c2.jpg'),
  //   method: 'Card',
  // },
  // STEP 1.28 "Sophie Varela"
  // {
  //   id: 'sophie',
  //   name: 'Sophie Varela',
  //   time: '04:12 PM',
  //   amount: 340,
  //   image: require('../../../../assets/images/orbitchart/c4.jpg'),
  // },
];
