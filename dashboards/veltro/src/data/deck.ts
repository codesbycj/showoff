/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout, and the reference's own slips are corrected rather
 * than copied: it spells "Housewest" for Houseware, "Perfomance" for
 * Performance and "Setings" for Settings, and it names the same product
 * "Blid Shorts" in the card and "Biled Shorts" in the table two rows below.
 *
 * Its arithmetic does not hold either: Product overview reads $43,630 of
 * total sales over a table whose two rows come to $4,779, and the Analytics
 * card prints "-$4.5430", which is not a number. Both are derived here.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  org: 'Selviq Inc.',
  plan: 'Free Plan',
  holder: 'Jevline Kief',
};

/* -------------------------------------------------------------- products */

export type Category = 'Cosmetics' | 'Houseware' | 'Apparel';

export interface Product {
  id: string;
  name: string;
  category: Category;
  unitsSold: number;
  price: number;
  stock: number;
  target: number;
}

export const PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Bild Shorts',
    category: 'Apparel',
    unitsSold: 127,
    price: 14.88,
    stock: 120,
    target: 190,
  },
  {
    id: 'p2',
    name: 'T-Shirt Mixi',
    category: 'Apparel',
    unitsSold: 540,
    price: 5.35,
    stock: 0,
    target: 600,
  },
  {
    id: 'p3',
    name: 'Rosewater Mist',
    category: 'Cosmetics',
    unitsSold: 862,
    price: 18.4,
    stock: 240,
    target: 900,
  },
  {
    id: 'p4',
    name: 'Clay Mask Duo',
    category: 'Cosmetics',
    unitsSold: 418,
    price: 26.0,
    stock: 86,
    target: 500,
  },
  {
    id: 'p5',
    name: 'Stoneware Mug',
    category: 'Houseware',
    unitsSold: 1204,
    price: 9.5,
    stock: 410,
    target: 1100,
  },
  {
    id: 'p6',
    name: 'Linen Throw',
    category: 'Houseware',
    unitsSold: 236,
    price: 48.0,
    stock: 32,
    target: 300,
  },
  {
    id: 'p7',
    name: 'Brass Candlestick',
    category: 'Houseware',
    unitsSold: 148,
    price: 34.0,
    stock: 0,
    target: 220,
  },
  {
    id: 'p8',
    name: 'Cotton Cap',
    category: 'Apparel',
    unitsSold: 612,
    price: 12.0,
    stock: 180,
    target: 700,
  },
  {
    id: 'p9',
    name: 'Night Serum',
    category: 'Cosmetics',
    unitsSold: 329,
    price: 42.0,
    stock: 54,
    target: 420,
  },
  {
    id: 'p10',
    name: 'Glass Carafe',
    category: 'Houseware',
    unitsSold: 274,
    price: 28.5,
    stock: 96,
    target: 320,
  },
];

export const CATEGORIES: Category[] = ['Cosmetics', 'Houseware', 'Apparel'];

export const revenueOf = (p: Product) => Math.round(p.unitsSold * p.price * 100) / 100;

/** Total sales: the catalogue, summed. Never a literal. */
export const totalSales = () =>
  Math.round(PRODUCTS.reduce((t, p) => t + revenueOf(p), 0) * 100) / 100;

export const salesIn = (c: Category | 'all') =>
  Math.round(
    PRODUCTS.filter((p) => (c === 'all' ? true : p.category === c)).reduce(
      (t, p) => t + revenueOf(p),
      0,
    ) * 100,
  ) / 100;

/* ------------------------------------------------------------------ stats */

export const ACTIVE_SALES = { value: 27064, delta: 12 };
export const PRODUCT_REVENUE = { value: 16568, delta: 7 };
export const NEW_SALES = 453;

/* -------------------------------------------------------------- analytics */

export interface Span {
  id: string;
  label: string;
  ticks: string[];
  points: number;
}

export const SPANS: Span[] = [
  {
    id: 'year',
    label: 'This year',
    ticks: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'],
    points: 8,
  },
  { id: 'half', label: 'Six months', ticks: ['MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG'], points: 6 },
  { id: 'quarter', label: 'This quarter', ticks: ['JUN', 'JUL', 'AUG'], points: 3 },
];

export interface Band {
  id: string;
  label: string;
  value: number;
  low: number;
  high: number;
  delta: number;
}

/*
 * A written-down shape with a seeded roughening on top: a plain
 * `base + random` clusters every point between 60% and 100% of the peak,
 * which renders as a flat ribbon rather than a chart.
 */
const SHAPE = [0.42, 0.58, 0.5, 0.74, 1.0, 0.66, 0.82, 0.7];

export function analytics(spanId: string): Band[] {
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[0];
  const next = rng(spanId.length * 1223 + span.points);
  const offset = SHAPE.length - span.points;
  return span.ticks.map((label, i) => {
    const f = SHAPE[offset + i] ?? 0.5;
    const value = Math.round(900 + f * 3600 + next() * 220);
    const spread = Math.round(value * (0.14 + next() * 0.1));
    return {
      id: label.toLowerCase(),
      label,
      value,
      low: value - spread,
      high: value + spread,
      delta: Math.round((f - 0.5) * 38 * 10) / 10,
    };
  });
}

export const peakOf = (bands: Band[]) =>
  bands.reduce((best, b) => (b.value > best.value ? b : best), bands[0]);

/** Net sales change and conversion, computed from the series rather than written. */
export function analyticsTotals(bands: Band[]) {
  const first = bands[0]?.value ?? 1;
  const last = bands[bands.length - 1]?.value ?? 1;
  const total = bands.reduce((s, b) => s + b.value, 0);
  return {
    net: Math.round((last - first) * 100) / 100,
    netDelta: Math.round(((last - first) / first) * 1000) / 10,
    conversion: Math.round((total / 1_000_000) * 10000) / 100,
    conversionDelta: 13,
  };
}

/* ------------------------------------------------------ sales performance */

export const PERFORMANCE = {
  pct: 17.9,
  since: 'Since yesterday',
  perDay: 1_284,
  average: 946,
};

/* ----------------------------------------------------------- hourly visits */

export const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
export const HOURS = Array.from({ length: 12 }, (_, i) => `${i * 2}:00`);

/** A day-by-hour grid of visits, seeded so it is the same every reload. */
export function visits(): number[][] {
  const next = rng(7331);
  return DAYS.map((_, d) =>
    HOURS.map((_, h) => {
      /* Two humps: late morning and early evening. */
      const shape =
        Math.exp(-((h - 5) ** 2) / 6) * 0.9 + Math.exp(-((h - 9) ** 2) / 5) * 0.7 + 0.12;
      return Math.round((shape * (0.7 + next() * 0.6) * 4200) / (1 + d * 0.08));
    }),
  );
}

export const visitTotal = (grid: number[][]) =>
  grid.reduce((t, row) => t + row.reduce((s, v) => s + v, 0), 0);

export const VISIT_DELTA = 4;

/* ---------------------------------------------------------------- periods */

export interface Period {
  id: string;
  label: string;
  /** Multiplies the catalogue's sales, so the pill is not decoration. */
  scale: number;
}

export const PERIODS: Period[] = [
  { id: 'month', label: 'This month', scale: 1 },
  { id: 'quarter', label: 'This quarter', scale: 2.9 },
  { id: 'year', label: 'This year', scale: 11.6 },
];

/* ----------------------------------------------------------------- orders */

export type OrderState = 'Fulfilled' | 'Packing' | 'Returned';

export interface Order {
  id: string;
  ref: string;
  productId: string;
  qty: number;
  placed: string;
  stamp: number;
  state: OrderState;
  channel: 'Store' | 'Marketplace' | 'Wholesale';
}

export const ORDERS: Order[] = [
  {
    id: 'o1',
    ref: 'VLT-4821',
    productId: 'p3',
    qty: 24,
    placed: '12 Jun',
    stamp: 20260612,
    state: 'Fulfilled',
    channel: 'Store',
  },
  {
    id: 'o2',
    ref: 'VLT-4820',
    productId: 'p5',
    qty: 60,
    placed: '12 Jun',
    stamp: 20260612,
    state: 'Packing',
    channel: 'Wholesale',
  },
  {
    id: 'o3',
    ref: 'VLT-4819',
    productId: 'p1',
    qty: 8,
    placed: '11 Jun',
    stamp: 20260611,
    state: 'Fulfilled',
    channel: 'Marketplace',
  },
  {
    id: 'o4',
    ref: 'VLT-4818',
    productId: 'p9',
    qty: 12,
    placed: '11 Jun',
    stamp: 20260611,
    state: 'Returned',
    channel: 'Store',
  },
  {
    id: 'o5',
    ref: 'VLT-4817',
    productId: 'p8',
    qty: 40,
    placed: '10 Jun',
    stamp: 20260610,
    state: 'Fulfilled',
    channel: 'Wholesale',
  },
  {
    id: 'o6',
    ref: 'VLT-4816',
    productId: 'p6',
    qty: 6,
    placed: '10 Jun',
    stamp: 20260610,
    state: 'Packing',
    channel: 'Store',
  },
  {
    id: 'o7',
    ref: 'VLT-4815',
    productId: 'p2',
    qty: 90,
    placed: '09 Jun',
    stamp: 20260609,
    state: 'Fulfilled',
    channel: 'Marketplace',
  },
  {
    id: 'o8',
    ref: 'VLT-4814',
    productId: 'p10',
    qty: 18,
    placed: '09 Jun',
    stamp: 20260609,
    state: 'Fulfilled',
    channel: 'Store',
  },
  {
    id: 'o9',
    ref: 'VLT-4813',
    productId: 'p4',
    qty: 22,
    placed: '08 Jun',
    stamp: 20260608,
    state: 'Returned',
    channel: 'Marketplace',
  },
  {
    id: 'o10',
    ref: 'VLT-4812',
    productId: 'p7',
    qty: 14,
    placed: '08 Jun',
    stamp: 20260608,
    state: 'Packing',
    channel: 'Wholesale',
  },
  {
    id: 'o11',
    ref: 'VLT-4811',
    productId: 'p3',
    qty: 36,
    placed: '07 Jun',
    stamp: 20260607,
    state: 'Fulfilled',
    channel: 'Store',
  },
  {
    id: 'o12',
    ref: 'VLT-4810',
    productId: 'p5',
    qty: 120,
    placed: '07 Jun',
    stamp: 20260607,
    state: 'Fulfilled',
    channel: 'Wholesale',
  },
  {
    id: 'o13',
    ref: 'VLT-4809',
    productId: 'p1',
    qty: 10,
    placed: '06 Jun',
    stamp: 20260606,
    state: 'Packing',
    channel: 'Store',
  },
  {
    id: 'o14',
    ref: 'VLT-4808',
    productId: 'p8',
    qty: 28,
    placed: '06 Jun',
    stamp: 20260606,
    state: 'Fulfilled',
    channel: 'Marketplace',
  },
  {
    id: 'o15',
    ref: 'VLT-4807',
    productId: 'p9',
    qty: 9,
    placed: '05 Jun',
    stamp: 20260605,
    state: 'Fulfilled',
    channel: 'Store',
  },
  {
    id: 'o16',
    ref: 'VLT-4806',
    productId: 'p6',
    qty: 4,
    placed: '05 Jun',
    stamp: 20260605,
    state: 'Returned',
    channel: 'Marketplace',
  },
];

export const orderProduct = (o: Order) => PRODUCTS.find((p) => p.id === o.productId)!;
export const orderValue = (o: Order) => Math.round(orderProduct(o).price * o.qty * 100) / 100;

export const CHANNELS = ['Store', 'Marketplace', 'Wholesale'] as const;
