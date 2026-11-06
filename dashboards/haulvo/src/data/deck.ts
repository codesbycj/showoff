/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the operator, the clients, the drivers and **the
 * truck marques**: the reference names a Volvo FMX 460, and a real
 * manufacturer over invented cargo and invented drivers is the one thing this
 * series must not produce (rule 8).
 *
 * **One shipment list, and every figure derives from it.** The board's
 * counts, the builder's totals, the tracking progress and the client rows all
 * read `SHIPMENTS` and the loads inside them.
 */
import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';

export const OPERATOR = { name: 'Haulvo', desk: 'Springfield desk', today: '2027-05-12' };

/* ------------------------------------------------------------------ people */

export interface Driver {
  id: string;
  name: string;
  face: string;
  phone: string;
  email: string;
  licence: string;
}

export const DRIVERS: Driver[] = [
  {
    id: 'dr1',
    name: 'Artem Bezrukov',
    face: face1,
    phone: '+1 217 555 0116',
    email: 'artem@haulvo.co',
    licence: 'CE · ADR',
  },
  {
    id: 'dr2',
    name: 'Marguerite Oyelaran',
    face: face2,
    phone: '+1 217 555 0124',
    email: 'marguerite@haulvo.co',
    licence: 'CE',
  },
  {
    id: 'dr3',
    name: 'Tomas Lindqvist',
    face: face3,
    phone: '+1 217 555 0137',
    email: 'tomas@haulvo.co',
    licence: 'CE · HIAB',
  },
  {
    id: 'dr4',
    name: 'Nadia Haddad',
    face: face4,
    phone: '+1 217 555 0159',
    email: 'nadia@haulvo.co',
    licence: 'C1 · ADR',
  },
];

export const driverOf = (id: string) => DRIVERS.find((d) => d.id === id) ?? DRIVERS[0];

export interface Truck {
  id: string;
  model: string;
  number: string;
  kind: string;
  trailer: string;
  capacity: number;
}

export const TRUCKS: Truck[] = [
  {
    id: 'tr1',
    model: 'Modrin FX 460',
    number: 'XL 43543',
    kind: 'Flatbed',
    trailer: 'TN 34-33-1',
    capacity: 24_000,
  },
  {
    id: 'tr2',
    model: 'Harlo T-300',
    number: 'XL 51128',
    kind: 'Box',
    trailer: 'TN 36-11-4',
    capacity: 18_500,
  },
  {
    id: 'tr3',
    model: 'Orelle Haul 18',
    number: 'XL 62207',
    kind: 'Curtain',
    trailer: 'TN 41-08-9',
    capacity: 21_000,
  },
  {
    id: 'tr4',
    model: 'Modrin FX 460',
    number: 'XL 70914',
    kind: 'Reefer',
    trailer: 'TN 44-26-2',
    capacity: 22_400,
  },
];

export const truckOf = (id: string) => TRUCKS.find((t) => t.id === id) ?? TRUCKS[0];

export interface Client {
  id: string;
  name: string;
  contact: string;
  phone: string;
}

export const CLIENTS: Client[] = [
  { id: 'c1', name: 'Ava Thompson', contact: 'Brackwell Civil', phone: '+1 217 555 0142' },
  { id: 'c2', name: 'Lucas Nelson', contact: 'Tessaly Retail', phone: '+1 217 555 0178' },
  { id: 'c3', name: 'Imani Reyes', contact: 'Larkfield Dairy', phone: '+1 217 555 0203' },
  { id: 'c4', name: 'Teodor Blum', contact: 'Oreholt Robotics', phone: '+1 217 555 0241' },
];

export const clientOf = (id: string) => CLIENTS.find((c) => c.id === id) ?? CLIENTS[0];

/* ---------------------------------------------------------------- shipments */

export type LegKind = 'Delivery' | 'Pick-Up' | 'Transfer';
export type ShipmentState = 'draft' | 'booked' | 'in transit' | 'delivered';

export const LEGS: LegKind[] = ['Delivery', 'Pick-Up', 'Transfer'];

export const LEG_TOKEN: Record<LegKind, string> = {
  Delivery: '--color-status-delivery',
  'Pick-Up': '--color-status-pickup',
  Transfer: '--color-status-transfer',
};

export interface Stop {
  at: string;
  place: string;
  address: string;
  done: boolean;
}

export interface Load {
  id: string;
  kind: LegKind;
  clientId: string;
  /** Pounds, and the pallet count the yard loads by. */
  weight: number;
  pallets: number;
  stops: [Stop, Stop];
}

export interface Shipment {
  id: string;
  reference: string;
  state: ShipmentState;
  truckId: string;
  driverId: string;
  startAt: string;
  endPlace: string;
  endAddress: string;
  note: string;
  loads: Load[];
}

export const SHIPMENTS: Shipment[] = [
  {
    id: 'sh1',
    reference: 'SHP-24091',
    state: 'draft',
    truckId: 'tr1',
    driverId: 'dr1',
    startAt: '2027-05-12 08:30',
    endPlace: 'Mountain View, IL',
    endAddress: '321 Maple Lane',
    note: 'Before loading, inspect the cargo for visible damage or discrepancies. Note anything you find and tell the desk.',
    loads: [
      {
        id: 'ld1',
        kind: 'Delivery',
        clientId: 'c1',
        weight: 8_400,
        pallets: 14,
        stops: [
          { at: '2027-05-06 08:00', place: 'Anytown, IL', address: '123 Main St', done: true },
          { at: '2027-05-12 12:00', place: 'Springfield, IL', address: '456 Elm Ave', done: false },
        ],
      },
      {
        id: 'ld2',
        kind: 'Pick-Up',
        clientId: 'c2',
        weight: 5_200,
        pallets: 9,
        stops: [
          { at: '2027-05-08 10:00', place: 'Pleasantville, IL', address: '789 Oak Dr', done: true },
          { at: '2027-05-10 18:00', place: 'Greenville, IL', address: '987 Maple Rd', done: false },
        ],
      },
      {
        id: 'ld3',
        kind: 'Transfer',
        clientId: 'c3',
        weight: 3_600,
        pallets: 6,
        stops: [
          { at: '2027-05-10 18:00', place: 'Lakeside, IL', address: '456 Tanager Dr', done: false },
          {
            at: '2027-05-12 15:00',
            place: 'Mountain View, IL',
            address: '321 Maple Lane',
            done: false,
          },
        ],
      },
    ],
  },
  {
    id: 'sh2',
    reference: 'SHP-24088',
    state: 'in transit',
    truckId: 'tr2',
    driverId: 'dr2',
    startAt: '2027-05-11 06:15',
    endPlace: 'Rockford, IL',
    endAddress: '14 Hale St',
    note: 'Reefer set to 4°C. Call the desk if the trailer alarms.',
    loads: [
      {
        id: 'ld4',
        kind: 'Delivery',
        clientId: 'c3',
        weight: 11_200,
        pallets: 18,
        stops: [
          { at: '2027-05-11 06:15', place: 'Springfield, IL', address: 'Dock 3', done: true },
          { at: '2027-05-12 11:30', place: 'Rockford, IL', address: '14 Hale St', done: false },
        ],
      },
      {
        id: 'ld5',
        kind: 'Pick-Up',
        clientId: 'c4',
        weight: 4_100,
        pallets: 7,
        stops: [
          {
            at: '2027-05-11 14:40',
            place: 'Bloomington, IL',
            address: '220 Veterans Pkwy',
            done: true,
          },
          { at: '2027-05-12 09:00', place: 'Rockford, IL', address: '14 Hale St', done: false },
        ],
      },
    ],
  },
  {
    id: 'sh3',
    reference: 'SHP-24084',
    state: 'in transit',
    truckId: 'tr3',
    driverId: 'dr3',
    startAt: '2027-05-11 13:00',
    endPlace: 'Peoria, IL',
    endAddress: '802 Knoxville Ave',
    note: 'Curtain side — strap every pallet twice.',
    loads: [
      {
        id: 'ld6',
        kind: 'Delivery',
        clientId: 'c2',
        weight: 9_800,
        pallets: 16,
        stops: [
          { at: '2027-05-11 13:00', place: 'Springfield, IL', address: 'Dock 1', done: true },
          {
            at: '2027-05-12 16:20',
            place: 'Peoria, IL',
            address: '802 Knoxville Ave',
            done: false,
          },
        ],
      },
    ],
  },
  {
    id: 'sh4',
    reference: 'SHP-24079',
    state: 'booked',
    truckId: 'tr4',
    driverId: 'dr4',
    startAt: '2027-05-13 07:00',
    endPlace: 'Champaign, IL',
    endAddress: '55 Neil St',
    note: 'Client will meet the driver at the gate.',
    loads: [
      {
        id: 'ld7',
        kind: 'Delivery',
        clientId: 'c1',
        weight: 6_400,
        pallets: 11,
        stops: [
          { at: '2027-05-13 07:00', place: 'Springfield, IL', address: 'Dock 2', done: false },
          { at: '2027-05-13 12:10', place: 'Champaign, IL', address: '55 Neil St', done: false },
        ],
      },
      {
        id: 'ld8',
        kind: 'Transfer',
        clientId: 'c4',
        weight: 2_900,
        pallets: 5,
        stops: [
          { at: '2027-05-13 13:30', place: 'Champaign, IL', address: '55 Neil St', done: false },
          { at: '2027-05-13 17:45', place: 'Decatur, IL', address: '101 Water St', done: false },
        ],
      },
    ],
  },
  {
    id: 'sh5',
    reference: 'SHP-24071',
    state: 'delivered',
    truckId: 'tr1',
    driverId: 'dr1',
    startAt: '2027-05-08 06:00',
    endPlace: 'Springfield, IL',
    endAddress: 'Dock 3',
    note: 'Signed for by the yard foreman.',
    loads: [
      {
        id: 'ld9',
        kind: 'Delivery',
        clientId: 'c3',
        weight: 12_600,
        pallets: 20,
        stops: [
          { at: '2027-05-08 06:00', place: 'Quincy, IL', address: '9 Maine St', done: true },
          { at: '2027-05-09 15:30', place: 'Springfield, IL', address: 'Dock 3', done: true },
        ],
      },
    ],
  },
  {
    id: 'sh6',
    reference: 'SHP-24065',
    state: 'delivered',
    truckId: 'tr2',
    driverId: 'dr2',
    startAt: '2027-05-06 09:20',
    endPlace: 'Springfield, IL',
    endAddress: 'Dock 1',
    note: 'Two pallets refused; returned to the yard.',
    loads: [
      {
        id: 'ld10',
        kind: 'Pick-Up',
        clientId: 'c2',
        weight: 7_300,
        pallets: 12,
        stops: [
          { at: '2027-05-06 09:20', place: 'Joliet, IL', address: '77 Jefferson St', done: true },
          { at: '2027-05-07 14:05', place: 'Springfield, IL', address: 'Dock 1', done: true },
        ],
      },
    ],
  },
];

export const shipmentOf = (id: string) => SHIPMENTS.find((s) => s.id === id) ?? SHIPMENTS[0];

export const weightOf = (s: Shipment) => s.loads.reduce((t, l) => t + l.weight, 0);
export const palletsOf = (s: Shipment) => s.loads.reduce((t, l) => t + l.pallets, 0);

/** Every stop in order, which is what the route panel lists. */
export const stopsOf = (s: Shipment): Stop[] =>
  s.loads
    .flatMap((l) => l.stops)
    .slice()
    .sort((a, b) => a.at.localeCompare(b.at));

export const progressOf = (s: Shipment) => {
  const stops = stopsOf(s);
  return (stops.filter((x) => x.done).length / Math.max(1, stops.length)) * 100;
};

/** How full the truck is — the check a planner makes before submitting. */
export const utilisation = (s: Shipment) => (weightOf(s) / truckOf(s.truckId).capacity) * 100;

export const countState = (state: ShipmentState) =>
  SHIPMENTS.filter((s) => s.state === state).length;

export const STATES: ShipmentState[] = ['draft', 'booked', 'in transit', 'delivered'];

export const STATE_TONE: Record<ShipmentState, 'quiet' | 'accent' | 'warn' | 'positive'> = {
  draft: 'quiet',
  booked: 'warn',
  'in transit': 'accent',
  delivered: 'positive',
};
