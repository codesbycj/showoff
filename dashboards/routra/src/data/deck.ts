/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the operator, the drivers, the vehicles. **The
 * vehicle marques especially**: the reference names Volkswagen,
 * Mercedes-Benz, Volvo and MAN, and a real manufacturer's model over invented
 * payloads and invented drivers is the one thing this series must not produce
 * (rule 8). The models here are coined.
 *
 * **One driver list, and every figure derives from it.** The rail's status
 * counts, the detail header, the route cards, the day-by-category bar and the
 * working-hours chart all read the same twelve drivers and their loads.
 */
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

export const DEPOT = { name: 'Routra', site: 'Gilroy depot', shift: '06:00 – 18:00' };

/* ---------------------------------------------------------------- vehicles */

export interface Vehicle {
  id: string;
  model: string;
  kind: 'Truck' | 'Van';
  plate: string;
  /** Pounds, cubic inches and inches — the reference's own units. */
  payload: number;
  volume: number;
  length: number;
  width: number;
  servicedOn: string;
  serviceDueIn: number;
}

export const VEHICLES: Vehicle[] = [
  {
    id: 'v1',
    model: 'Tolvan Carry 3.0',
    kind: 'Van',
    plate: '6TRJ244',
    payload: 2_885,
    volume: 353_937,
    length: 117,
    width: 67,
    servicedOn: '2027-04-18',
    serviceDueIn: 1_240,
  },
  {
    id: 'v2',
    model: 'Tolvan Carry 3.0',
    kind: 'Van',
    plate: '7KPM812',
    payload: 2_885,
    volume: 353_937,
    length: 117,
    width: 67,
    servicedOn: '2027-05-02',
    serviceDueIn: 880,
  },
  {
    id: 'v3',
    model: 'Orelle Cargo 9',
    kind: 'Van',
    plate: '4BND571',
    payload: 3_310,
    volume: 402_118,
    length: 126,
    width: 71,
    servicedOn: '2027-03-11',
    serviceDueIn: 410,
  },
  {
    id: 'v4',
    model: 'Orelle Cargo 9',
    kind: 'Van',
    plate: '9XLV336',
    payload: 3_310,
    volume: 402_118,
    length: 126,
    width: 71,
    servicedOn: '2027-05-21',
    serviceDueIn: 1_604,
  },
  {
    id: 'v5',
    model: 'Harlo T-300',
    kind: 'Truck',
    plate: '2FQW905',
    payload: 14_600,
    volume: 1_842_000,
    length: 288,
    width: 96,
    servicedOn: '2027-02-27',
    serviceDueIn: 160,
  },
  {
    id: 'v6',
    model: 'Harlo T-300',
    kind: 'Truck',
    plate: '8GDR417',
    payload: 14_600,
    volume: 1_842_000,
    length: 288,
    width: 96,
    servicedOn: '2027-04-30',
    serviceDueIn: 1_020,
  },
  {
    id: 'v7',
    model: 'Modrin 7.5t',
    kind: 'Truck',
    plate: '3HSE268',
    payload: 9_920,
    volume: 1_204_000,
    length: 240,
    width: 94,
    servicedOn: '2027-01-19',
    serviceDueIn: 0,
  },
  {
    id: 'v8',
    model: 'Modrin 7.5t',
    kind: 'Truck',
    plate: '5CZA730',
    payload: 9_920,
    volume: 1_204_000,
    length: 240,
    width: 94,
    servicedOn: '2027-05-14',
    serviceDueIn: 1_480,
  },
];

export const vehicleOf = (id: string) => VEHICLES.find((v) => v.id === id) ?? VEHICLES[0];

/* ----------------------------------------------------------------- drivers */

export type DriverState = 'way' | 'unloading' | 'loading' | 'waiting';

export const STATE_LABEL: Record<DriverState, string> = {
  way: 'On the way',
  unloading: 'Unloading',
  loading: 'Loading',
  waiting: 'Waiting',
};

export const STATE_TOKEN: Record<DriverState, string> = {
  way: '--color-state-way',
  unloading: '--color-state-unloading',
  loading: '--color-state-loading',
  waiting: '--color-state-waiting',
};

/**
 * Which state colours carry ink type rather than white.
 *
 * Measured, not guessed: the amber is 2.36:1 under white and the light blue
 * 2.43:1, while both clear 5:1 under ink. The other two are the opposite way
 * round. probe.js found six failures the first time this was built with only
 * the amber listed.
 */
export const STATE_ON_INK: DriverState[] = ['loading', 'unloading'];

export interface Driver {
  id: string;
  name: string;
  badge: string;
  face: string;
  vehicleId: string;
  state: DriverState;
  favourite: boolean;
  phone: string;
  startedAt: string;
}

export const DRIVERS: Driver[] = [
  {
    id: 'd1',
    name: 'Nolan Dokidis',
    badge: '236-542-091',
    face: face1,
    vehicleId: 'v5',
    state: 'way',
    favourite: true,
    phone: '+1 408 555 0112',
    startedAt: '06:10',
  },
  {
    id: 'd2',
    name: 'Ahmad Mango',
    badge: '236-542-094',
    face: face2,
    vehicleId: 'v1',
    state: 'loading',
    favourite: true,
    phone: '+1 408 555 0145',
    startedAt: '06:00',
  },
  {
    id: 'd3',
    name: 'James Lubin',
    badge: '236-542-097',
    face: face3,
    vehicleId: 'v1',
    state: 'way',
    favourite: true,
    phone: '+1 408 555 0178',
    startedAt: '05:50',
  },
  {
    id: 'd4',
    name: 'Talan Dorwart',
    badge: '236-542-102',
    face: face4,
    vehicleId: 'v7',
    state: 'waiting',
    favourite: true,
    phone: '+1 408 555 0190',
    startedAt: '06:25',
  },
  {
    id: 'd5',
    name: 'Jakob Vetrovs',
    badge: '236-542-108',
    face: face5,
    vehicleId: 'v6',
    state: 'way',
    favourite: false,
    phone: '+1 408 555 0203',
    startedAt: '05:40',
  },
  {
    id: 'd6',
    name: 'Zain Vetrovs',
    badge: '236-542-111',
    face: face6,
    vehicleId: 'v7',
    state: 'waiting',
    favourite: false,
    phone: '+1 408 555 0221',
    startedAt: '06:35',
  },
  {
    id: 'd7',
    name: 'Jaylon Madsen',
    badge: '236-542-115',
    face: face1,
    vehicleId: 'v5',
    state: 'way',
    favourite: false,
    phone: '+1 408 555 0244',
    startedAt: '06:05',
  },
  {
    id: 'd8',
    name: 'Gustavo Torff',
    badge: '236-542-119',
    face: face2,
    vehicleId: 'v8',
    state: 'unloading',
    favourite: false,
    phone: '+1 408 555 0266',
    startedAt: '05:55',
  },
  {
    id: 'd9',
    name: 'Marcus Dokidis',
    badge: '236-542-124',
    face: face3,
    vehicleId: 'v8',
    state: 'way',
    favourite: false,
    phone: '+1 408 555 0288',
    startedAt: '06:15',
  },
  {
    id: 'd10',
    name: 'Tiana Westervelt',
    badge: '236-542-128',
    face: face4,
    vehicleId: 'v2',
    state: 'loading',
    favourite: false,
    phone: '+1 408 555 0301',
    startedAt: '06:20',
  },
  {
    id: 'd11',
    name: 'Zain Korsgaard',
    badge: '236-542-133',
    face: face5,
    vehicleId: 'v3',
    state: 'way',
    favourite: false,
    phone: '+1 408 555 0324',
    startedAt: '06:02',
  },
  {
    id: 'd12',
    name: 'Wilson Dokidis',
    badge: '236-542-137',
    face: face6,
    vehicleId: 'v4',
    state: 'unloading',
    favourite: false,
    phone: '+1 408 555 0347',
    startedAt: '05:45',
  },
];

export const driverOf = (id: string) => DRIVERS.find((d) => d.id === id) ?? DRIVERS[0];

export const countState = (s: DriverState) => DRIVERS.filter((d) => d.state === s).length;

export const trucks = () => DRIVERS.filter((d) => vehicleOf(d.vehicleId).kind === 'Truck');
export const vans = () => DRIVERS.filter((d) => vehicleOf(d.vehicleId).kind === 'Van');

/* ------------------------------------------------------------------ routes */

export interface Stop {
  at: string;
  place: string;
  address: string;
  done: boolean;
}

export interface Route {
  id: string;
  driverId: string;
  packages: number;
  /** Miles, minutes, pounds and cubic inches. */
  distance: number;
  minutesLeft: number;
  weight: number;
  volume: number;
  state: 'now' | 'done' | 'planned';
  stops: Stop[];
}

export const ROUTES: Route[] = [
  {
    id: '107-591',
    driverId: 'd3',
    packages: 138,
    distance: 0.62,
    minutesLeft: 10,
    weight: 2_160,
    volume: 3_357,
    state: 'now',
    stops: [
      { at: '08:00', place: 'Gilroy depot', address: '2972 Westheimer Rd', done: true },
      { at: '09:40', place: 'Santa Ana', address: '270 Rucker Ave', done: true },
      { at: '11:15', place: 'Anytown, NY', address: '123 Main St', done: false },
    ],
  },
  {
    id: '109-270',
    driverId: 'd3',
    packages: 107,
    distance: 14.4,
    minutesLeft: 0,
    weight: 1_980,
    volume: 3_104,
    state: 'done',
    stops: [
      { at: '12/10 07:30', place: 'Gilroy depot', address: '8900 Murray Ave', done: true },
      { at: '12/10 10:05', place: 'Gilroy, CA', address: '168 W 10th St', done: true },
    ],
  },
  {
    id: '112-791',
    driverId: 'd3',
    packages: 86,
    distance: 9.8,
    minutesLeft: 0,
    weight: 1_460,
    volume: 2_412,
    state: 'done',
    stops: [
      { at: '12/09 07:10', place: 'Gilroy depot', address: '230 Mayock Rd', done: true },
      { at: '12/09 09:45', place: 'Gilroy, CA', address: '8225 Arroyo Cir', done: true },
    ],
  },
  {
    id: '128-612',
    driverId: 'd3',
    packages: 129,
    distance: 11.2,
    minutesLeft: 0,
    weight: 2_040,
    volume: 3_188,
    state: 'done',
    stops: [
      { at: '12/08 06:50', place: 'Gilroy depot', address: '6215 Engle Rd', done: true },
      { at: '12/08 09:20', place: 'Gilroy, CA', address: '905 N Maple Ln', done: true },
    ],
  },
  {
    id: '131-044',
    driverId: 'd1',
    packages: 212,
    distance: 42.6,
    minutesLeft: 95,
    weight: 11_400,
    volume: 1_102_000,
    state: 'now',
    stops: [
      { at: '06:30', place: 'Gilroy depot', address: 'Bay 4', done: true },
      { at: '10:10', place: 'Salinas, CA', address: '44 Abbott St', done: false },
      { at: '13:00', place: 'Monterey, CA', address: '12 Cannery Row', done: false },
    ],
  },
  {
    id: '134-208',
    driverId: 'd5',
    packages: 184,
    distance: 28.1,
    minutesLeft: 40,
    weight: 9_800,
    volume: 940_000,
    state: 'now',
    stops: [
      { at: '06:00', place: 'Gilroy depot', address: 'Bay 2', done: true },
      { at: '09:25', place: 'Hollister, CA', address: '701 San Benito St', done: false },
    ],
  },
  {
    id: '140-517',
    driverId: 'd11',
    packages: 96,
    distance: 18.4,
    minutesLeft: 0,
    weight: 2_740,
    volume: 4_120,
    state: 'planned',
    stops: [
      { at: '13:30', place: 'Gilroy depot', address: 'Bay 7', done: false },
      { at: '15:10', place: 'Morgan Hill, CA', address: '18 Monterey Rd', done: false },
    ],
  },
  {
    id: '142-883',
    driverId: 'd8',
    packages: 143,
    distance: 22.7,
    minutesLeft: 0,
    weight: 7_200,
    volume: 880_000,
    state: 'planned',
    stops: [
      { at: '14:00', place: 'Gilroy depot', address: 'Bay 1', done: false },
      { at: '16:40', place: 'San Jose, CA', address: '88 S Market St', done: false },
    ],
  },
];

export const routesFor = (driverId: string) => ROUTES.filter((r) => r.driverId === driverId);
export const activeRoute = (driverId: string) =>
  ROUTES.find((r) => r.driverId === driverId && r.state === 'now');

export const packagesToday = () =>
  ROUTES.filter((r) => r.state !== 'planned').reduce((t, r) => t + r.packages, 0);

/* -------------------------------------------------------------- statistics */

export interface Slice {
  state: DriverState;
  minutes: number;
}

/**
 * How a driver's day splits, seeded per driver and **summed to a real shift**
 * rather than to a tidy 100%: the reference prints 39.7 / 28.3 / 17.4 / 14.6
 * with no total, which is a pie chart pretending to be a day.
 */
export function dayFor(driverId: string): Slice[] {
  const next = rng(driverId.length * 877 + driverId.charCodeAt(1));
  const base: Record<DriverState, number> = {
    way: 190 + Math.round(next() * 60),
    unloading: 120 + Math.round(next() * 40),
    loading: 85 + Math.round(next() * 30),
    waiting: 55 + Math.round(next() * 40),
  };
  return (Object.keys(base) as DriverState[]).map((state) => ({ state, minutes: base[state] }));
}

export const dayTotal = (slices: Slice[]) => slices.reduce((t, s) => t + s.minutes, 0);

export const asHours = (minutes: number) =>
  `${Math.floor(minutes / 60)} hr ${String(minutes % 60).padStart(2, '0')} min`;

export const WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

/** Working time per day against the rolling average, for the bar pair. */
export function weekFor(driverId: string): { day: string; worked: number; average: number }[] {
  const next = rng(driverId.length * 433 + driverId.charCodeAt(2));
  const average = 8 * 60 + 30;
  return WEEK.map((day) => ({
    day,
    worked: Math.round(average * (0.62 + next() * 0.62)),
    average,
  }));
}
