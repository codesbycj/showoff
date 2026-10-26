/**
 * The content deck: every figure, invoice, vehicle and cost line.
 *
 * All invented (rule 5). Veloq is not a company, none of the customers on this
 * ledger exist, and no delivery on this screen was ever made.
 */
import type { MarkId } from '@/components/Icon';
import { rng } from '@/data/rng';

export const company = {
  name: 'Veloq',
  user: { name: 'Dana Whitlock', role: 'Operations lead' },
  updated: '3 min ago',
};

/* ---------- the range control --------------------------------------------- */

export const RANGES = [
  { id: 'month', label: 'Last month (Jul 20 – Aug 20)' },
  { id: 'quarter', label: 'Last quarter (May 20 – Aug 20)' },
  { id: 'year', label: 'Last year (Aug 24 – Aug 25)' },
] as const;

export type RangeId = (typeof RANGES)[number]['id'];

/* ---------- deliveries ----------------------------------------------------- */

export interface Deliveries {
  utilisation: number;
  onTime: number;
  total: number;
  totalDelta: number;
  /** Fourteen points for the little area chart. */
  trend: number[];
  /** Twenty-four ticks for the utilisation meter, 0-1 each. */
  ticks: number[];
}

const ticksFor = (seed: number, lit: number, n = 24) => {
  const next = rng(seed);
  return Array.from({ length: n }, (_, i) =>
    i < lit ? 0.72 + next() * 0.28 : 0.42 + next() * 0.2,
  );
};

const trendFor = (seed: number, n = 14, base = 60) => {
  const next = rng(seed);
  let level = base;
  return Array.from({ length: n }, () => {
    level = Math.max(18, Math.min(100, level + (next() - 0.42) * 22));
    return Math.round(level);
  });
};

export const DELIVERIES: Record<RangeId, Deliveries> = {
  month: {
    utilisation: 95.1,
    onTime: 97.9,
    total: 1352,
    totalDelta: 3.5,
    trend: trendFor(4011, 14, 58),
    ticks: ticksFor(9120, 22),
  },
  quarter: {
    utilisation: 91.4,
    onTime: 96.2,
    total: 4087,
    totalDelta: -1.8,
    trend: trendFor(7742, 14, 71),
    ticks: ticksFor(3318, 21),
  },
  year: {
    utilisation: 88.6,
    onTime: 94.8,
    total: 16_204,
    totalDelta: 9.2,
    trend: trendFor(1559, 14, 44),
    ticks: ticksFor(6601, 20),
  },
};

/* ---------- revenue and costs ---------------------------------------------- */

export interface Point {
  label: string;
  revenue: number;
  costs: number;
  profit: number;
}

/*
 * One series builder, seeded, so the three lines are related rather than three
 * unrelated squiggles: costs track revenue with a lag, and profit is the
 * difference. Changing a seed moves all three together, which is what a real
 * ledger does.
 */
function series(seed: number, n: number, labels: string[]): Point[] {
  const next = rng(seed);
  let revenue = 9000;
  let costs = 2200;
  return Array.from({ length: n }, (_, i) => {
    revenue = Math.max(7000, Math.min(11_600, revenue + (next() - 0.47) * 1500));
    costs = Math.max(1200, Math.min(3900, costs + (next() - 0.5) * 900));
    return {
      label: labels[i] ?? String(i + 1),
      revenue: Math.round(revenue),
      costs: Math.round(costs),
      profit: Math.round(revenue - costs),
    };
  });
}

const DAY_LABELS = [
  '20',
  '22',
  '24',
  '26',
  '28',
  '30',
  'Aug',
  '4',
  '6',
  '8',
  '10',
  '12',
  '14',
  '16',
  '18',
  '20',
];

export const SERIES: Record<RangeId, Point[]> = {
  month: series(2201, 16, DAY_LABELS),
  quarter: series(8814, 13, ['May', '', 'Jun', '', '', 'Jul', '', '', 'Aug', '', '', 'Sep', '']),
  year: series(5520, 12, [
    'Sep',
    'Oct',
    'Nov',
    'Dec',
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
  ]),
};

/* ---------- balance -------------------------------------------------------- */

export const BALANCE = {
  cash: 126_000,
  target: 100_000,
  /** Positive and negative months, as the reference draws them. */
  bars: [
    -18, 24, 31, -12, 44, 52, 38, -9, 61, 48, 57, 29, -14, 66, 72, 54, 81, 63, -11, 77, 88, 69, 94,
    102,
  ],
};

/* ---------- costs by category ---------------------------------------------- */

export interface CostLine {
  id: string;
  label: string;
  value: number;
  share: number;
  colour: string;
}

export const COSTS: CostLine[] = [
  { id: 'fuel', label: 'Fuel', value: 89_200, share: 35, colour: 'var(--color-cat-fuel)' },
  {
    id: 'salaries',
    label: 'Driver salaries',
    value: 63_700,
    share: 25,
    colour: 'var(--color-cat-salaries)',
  },
  {
    id: 'maintenance',
    label: 'Vehicle maintenance',
    value: 38_200,
    share: 15,
    colour: 'var(--color-cat-maintenance)',
  },
  {
    id: 'warehousing',
    label: 'Warehousing',
    value: 25_500,
    share: 10,
    colour: 'var(--color-cat-warehousing)',
  },
  {
    id: 'insurance',
    label: 'Insurance',
    value: 17_800,
    share: 7,
    colour: 'var(--color-cat-insurance)',
  },
  {
    id: 'tech',
    label: 'Tech & software',
    value: 12_700,
    share: 5,
    colour: 'var(--color-cat-tech)',
  },
];

/* ---------- invoices -------------------------------------------------------- */

export type InvoiceState = 'Paid' | 'Resent request' | 'Unpaid';

export interface Invoice {
  id: string;
  company: string;
  mark: MarkId;
  tint: string;
  issued: string;
  contact: string;
  value: number;
  state: InvoiceState;
}

export const INVOICES: Invoice[] = [
  {
    id: 'v1',
    company: 'BlueHorizon Ltd.',
    mark: 'ring',
    tint: '#1f2937',
    issued: '08/17/25',
    contact: 'accounts@bluehorizonltd.com',
    value: 2100,
    state: 'Unpaid',
  },
  {
    id: 'v2',
    company: 'NexaCorp',
    mark: 'wedge',
    tint: '#0f766e',
    issued: '08/17/25',
    contact: 'payments@nexacorp.com',
    value: 1100,
    state: 'Unpaid',
  },
  {
    id: 'v3',
    company: 'StarFreight Co.',
    mark: 'cross',
    tint: '#2563eb',
    issued: '08/16/25',
    contact: 'info@starfreight@com',
    value: 1500,
    state: 'Unpaid',
  },
  {
    id: 'v4',
    company: 'Movers',
    mark: 'arrow',
    tint: '#ca8a04',
    issued: '08/16/25',
    contact: 'invoices@movers.com',
    value: 1030,
    state: 'Resent request',
  },
  {
    id: 'v5',
    company: 'Arvox Solutions',
    mark: 'hex',
    tint: '#4b5563',
    issued: '08/16/25',
    contact: 'payments@arvox.com',
    value: 2800,
    state: 'Unpaid',
  },
  {
    id: 'v6',
    company: 'Keystone Transport',
    mark: 'bars',
    tint: '#7c3aed',
    issued: '08/16/25',
    contact: 'invoices@keystonetr.com',
    value: 1200,
    state: 'Paid',
  },
  {
    id: 'v7',
    company: 'Kestrel Freight',
    mark: 'chevron',
    tint: '#be123c',
    issued: '08/16/25',
    contact: 'info@kestrelf.com',
    value: 1400,
    state: 'Unpaid',
  },
  {
    id: 'v8',
    company: 'SwiftLogix',
    mark: 'dot',
    tint: '#0891b2',
    issued: '08/15/25',
    contact: 'accounts@swiftlogix.com',
    value: 1600,
    state: 'Resent request',
  },
  {
    id: 'v9',
    company: 'GlobalTrade Inc.',
    mark: 'ring',
    tint: '#0ea5e9',
    issued: '08/15/25',
    contact: 'accounts@globaltrade.com',
    value: 2300,
    state: 'Paid',
  },
  {
    id: 'v10',
    company: 'PathBlaze Inc.',
    mark: 'cross',
    tint: '#111827',
    issued: '08/15/25',
    contact: 'invoices@pathblaze.com',
    value: 1510,
    state: 'Unpaid',
  },
  {
    id: 'v11',
    company: 'Northwind Haulage',
    mark: 'wedge',
    tint: '#15803d',
    issued: '08/14/25',
    contact: 'ap@northwindhaulage.com',
    value: 3400,
    state: 'Paid',
  },
  {
    id: 'v12',
    company: 'Orbit Distribution',
    mark: 'hex',
    tint: '#9333ea',
    issued: '08/14/25',
    contact: 'finance@orbitdist.com',
    value: 980,
    state: 'Resent request',
  },
  {
    id: 'v13',
    company: 'Cinder & Co',
    mark: 'bars',
    tint: '#b45309',
    issued: '08/13/25',
    contact: 'billing@cinderco.com',
    value: 2650,
    state: 'Paid',
  },
  {
    id: 'v14',
    company: 'Vale Logistics',
    mark: 'arrow',
    tint: '#0369a1',
    issued: '08/13/25',
    contact: 'accounts@valelogistics.com',
    value: 1870,
    state: 'Unpaid',
  },
  {
    id: 'v15',
    company: 'Harrow Freightways',
    mark: 'chevron',
    tint: '#4d7c0f',
    issued: '08/12/25',
    contact: 'invoices@harrowfw.com',
    value: 1240,
    state: 'Paid',
  },
  {
    id: 'v16',
    company: 'Mera Shipping',
    mark: 'dot',
    tint: '#be185d',
    issued: '08/12/25',
    contact: 'ap@merashipping.com',
    value: 3120,
    state: 'Paid',
  },
  {
    id: 'v17',
    company: 'Thorne Carriers',
    mark: 'hex',
    tint: '#334155',
    issued: '08/12/25',
    contact: 'billing@thornecarriers.com',
    value: 2240,
    state: 'Unpaid',
  },
  {
    id: 'v18',
    company: 'Linden Bulk',
    mark: 'bars',
    tint: '#047857',
    issued: '08/11/25',
    contact: 'accounts@lindenbulk.com',
    value: 1760,
    state: 'Unpaid',
  },
  {
    id: 'v19',
    company: 'Quayside Ltd.',
    mark: 'wedge',
    tint: '#1d4ed8',
    issued: '08/11/25',
    contact: 'ap@quayside.com',
    value: 3010,
    state: 'Unpaid',
  },
  {
    id: 'v20',
    company: 'Fenwick Freight',
    mark: 'arrow',
    tint: '#9a3412',
    issued: '08/10/25',
    contact: 'invoices@fenwickf.com',
    value: 1390,
    state: 'Unpaid',
  },
  {
    id: 'v21',
    company: 'Dunmore Supply',
    mark: 'cross',
    tint: '#065f46',
    issued: '08/10/25',
    contact: 'finance@dunmore.com',
    value: 2480,
    state: 'Resent request',
  },
  {
    id: 'v22',
    company: 'Avonlea Group',
    mark: 'ring',
    tint: '#7e22ce',
    issued: '08/09/25',
    contact: 'ap@avonleagroup.com',
    value: 4150,
    state: 'Paid',
  },
];

export const invoiceTotals = () => {
  const by = (state: InvoiceState) =>
    INVOICES.filter((i) => i.state === state).reduce((t, i) => t + i.value, 0);
  const total = INVOICES.reduce((t, i) => t + i.value, 0);
  return {
    total,
    paid: by('Paid'),
    resent: by('Resent request'),
    unpaid: by('Unpaid'),
  };
};

/* ---------- the fleet ------------------------------------------------------- */

export type VehicleState = 'On route' | 'Loading' | 'Idle' | 'Maintenance';

export interface Vehicle {
  id: string;
  reg: string;
  type: 'Box van' | 'Artic' | 'Rigid' | 'Van';
  driver: string;
  depot: string;
  state: VehicleState;
  /** Per cent of the month it has been earning. */
  utilisation: number;
  /** Thousands of miles this month. */
  miles: number;
  nextService: string;
}

const DRIVERS = [
  'Marek Dolan',
  'Aiyana Price',
  'Tom Reddick',
  'Siobhan Ellis',
  'Oleg Bartos',
  'Nadia Fahey',
  'Callum Ware',
  'Rhea Mathew',
  'Jonas Lind',
  'Bea Okafor',
  'Sam Trevelyan',
  'Yara Haddad',
  'Piotr Nowak',
  'Esme Fairclough',
  'Kwame Boateng',
  'Lena Virtanen',
  'Darius Volkov',
  'Mina Castellan',
];

const DEPOTS = ['Leeds', 'Bristol', 'Glasgow', 'Dover'];
const STATES: VehicleState[] = ['On route', 'Loading', 'Idle', 'Maintenance'];
const TYPES: Vehicle['type'][] = ['Box van', 'Artic', 'Rigid', 'Van'];

/** Twelve vehicles, seeded so the fleet is the same on every reload. */
export const FLEET: Vehicle[] = (() => {
  const next = rng(77_341);
  return DRIVERS.map((driver, i) => ({
    id: 'veh-' + (i + 1),
    reg: 'SY' + (12 + i) + ' ' + String.fromCharCode(65 + i) + 'KT',
    type: TYPES[i % TYPES.length],
    driver,
    depot: DEPOTS[i % DEPOTS.length],
    // Round-robin rather than random: a purely seeded draw left Maintenance
    // with no vehicles in it, so one of the four filters had nothing to show
    // and the beat that exercises it proved nothing.
    state: STATES[i % STATES.length],
    utilisation: Math.round(62 + next() * 36),
    miles: Math.round((2 + next() * 7) * 10) / 10,
    nextService: ['12 Sep', '19 Sep', '26 Sep', '03 Oct', '10 Oct'][Math.floor(next() * 5)],
  }));
})();
