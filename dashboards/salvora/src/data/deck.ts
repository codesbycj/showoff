/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout. The reference's transaction list is a games console, a
 * phone and a coffee chain — three real marks over made-up order ids in a
 * made-up store, which is the one thing this series must not ship (rule 8).
 * The catalogue here is this store's own goods.
 *
 * Its arithmetic does not hold either: "Net Income $193.000" is repeated as
 * the Revenue card's headline over twelve months of bars that are nothing
 * like it, and Total View Performance labels 16% / 23% / 68%, which is 107%.
 * Both are derived here.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  holder: 'Fandawu Punx',
  email: 'fandawu@salvora.store',
  role: 'Sales Admin',
  store: 'Dravelo',
};

export const RANGE = 'January 2024 — May 2024';

/* ------------------------------------------------------------------ pulse */

export const PULSE = {
  date: 'Feb 12th, 2024',
  headline: 'Sales revenue increased 40% in 1 week',
  delta: 40,
};

/* --------------------------------------------------------------- products */

export type MarkId = 'tee' | 'console' | 'hoodie' | 'phone' | 'bag' | 'coffee' | 'cap' | 'shoe';

export interface Product {
  id: string;
  name: string;
  mark: MarkId;
  price: number;
  stock: number;
  sold: number;
}

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Premium T-Shirt', mark: 'tee', price: 38, stock: 120, sold: 462 },
  { id: 'p2', name: 'Vantor Console', mark: 'console', price: 499, stock: 14, sold: 88 },
  { id: 'p3', name: 'Hoodie Gombrong', mark: 'hoodie', price: 72, stock: 64, sold: 311 },
  { id: 'p4', name: 'Nimbus 15 Pro', mark: 'phone', price: 1099, stock: 9, sold: 57 },
  { id: 'p5', name: 'Lotse Carryall', mark: 'bag', price: 128, stock: 41, sold: 204 },
  { id: 'p6', name: 'Harbourhouse Roast', mark: 'coffee', price: 18, stock: 300, sold: 1180 },
  { id: 'p7', name: 'Tinek Debstar Tee', mark: 'tee', price: 42, stock: 96, sold: 388 },
  { id: 'p8', name: 'Field Cap', mark: 'cap', price: 26, stock: 150, sold: 512 },
  { id: 'p9', name: 'Trail Runner', mark: 'shoe', price: 145, stock: 32, sold: 176 },
];

/* ------------------------------------------------------------ transactions */

export type Status = 'Completed' | 'Pending' | 'Refunded';

export interface Txn {
  id: string;
  ref: string;
  productId: string;
  qty: number;
  date: string;
  stamp: number;
  status: Status;
  customerId: string;
}

/*
 * Written out rather than generated: the reference's list is specific — the
 * same date on every row, an opaque order reference, a status chip — and a
 * generated one loses exactly that.
 */
export const TXNS: Txn[] = [
  {
    id: 't1',
    ref: 'OJWEJS7ISNC',
    productId: 'p1',
    qty: 480,
    date: 'Jul 12th 2024',
    stamp: 20240712,
    status: 'Completed',
    customerId: 'c1',
  },
  {
    id: 't2',
    ref: 'KD82MWQ0PLA',
    productId: 'p2',
    qty: 38,
    date: 'Jul 12th 2024',
    stamp: 20240712,
    status: 'Pending',
    customerId: 'c2',
  },
  {
    id: 't3',
    ref: 'ZX41VBNR7TE',
    productId: 'p3',
    qty: 210,
    date: 'Jul 11th 2024',
    stamp: 20240711,
    status: 'Pending',
    customerId: 'c3',
  },
  {
    id: 't4',
    ref: 'QM93HYTE2OS',
    productId: 'p4',
    qty: 24,
    date: 'Jul 11th 2024',
    stamp: 20240711,
    status: 'Completed',
    customerId: 'c4',
  },
  {
    id: 't5',
    ref: 'LP57ADFG9UK',
    productId: 'p5',
    qty: 145,
    date: 'Jul 10th 2024',
    stamp: 20240710,
    status: 'Completed',
    customerId: 'c5',
  },
  {
    id: 't6',
    ref: 'RT26CXZV4IM',
    productId: 'p6',
    qty: 1250,
    date: 'Jul 10th 2024',
    stamp: 20240710,
    status: 'Completed',
    customerId: 'c6',
  },
  {
    id: 't7',
    ref: 'BN78QWER1OP',
    productId: 'p7',
    qty: 360,
    date: 'Jul 9th 2024',
    stamp: 20240709,
    status: 'Completed',
    customerId: 'c1',
  },
  {
    id: 't8',
    ref: 'VC35TYUI8AS',
    productId: 'p8',
    qty: 640,
    date: 'Jul 9th 2024',
    stamp: 20240709,
    status: 'Refunded',
    customerId: 'c3',
  },
  {
    id: 't9',
    ref: 'GH90ZXCV6DF',
    productId: 'p9',
    qty: 118,
    date: 'Jul 8th 2024',
    stamp: 20240708,
    status: 'Completed',
    customerId: 'c2',
  },
  {
    id: 't10',
    ref: 'JK12POIU3LK',
    productId: 'p1',
    qty: 520,
    date: 'Jul 8th 2024',
    stamp: 20240708,
    status: 'Pending',
    customerId: 'c5',
  },
  {
    id: 't11',
    ref: 'WE64MNBV5QA',
    productId: 'p6',
    qty: 1900,
    date: 'Jul 7th 2024',
    stamp: 20240707,
    status: 'Completed',
    customerId: 'c4',
  },
  {
    id: 't12',
    ref: 'YU38LKJH7ZX',
    productId: 'p3',
    qty: 180,
    date: 'Jul 7th 2024',
    stamp: 20240707,
    status: 'Refunded',
    customerId: 'c6',
  },
  {
    id: 't13',
    ref: 'OP51ASDF2CV',
    productId: 'p5',
    qty: 96,
    date: 'Jul 6th 2024',
    stamp: 20240706,
    status: 'Completed',
    customerId: 'c1',
  },
  {
    id: 't14',
    ref: 'IU83QAZX9WS',
    productId: 'p8',
    qty: 720,
    date: 'Jul 6th 2024',
    stamp: 20240706,
    status: 'Completed',
    customerId: 'c3',
  },
  {
    id: 't15',
    ref: 'TR47EDCR4FV',
    productId: 'p7',
    qty: 290,
    date: 'Jul 5th 2024',
    stamp: 20240705,
    status: 'Pending',
    customerId: 'c2',
  },
  {
    id: 't16',
    ref: 'MN29WSXD6GB',
    productId: 'p2',
    qty: 26,
    date: 'Jul 5th 2024',
    stamp: 20240705,
    status: 'Completed',
    customerId: 'c5',
  },
  {
    id: 't17',
    ref: 'AS19QWZX8PL',
    productId: 'p6',
    qty: 860,
    date: 'Jul 4th 2024',
    stamp: 20240704,
    status: 'Completed',
    customerId: 'c1',
  },
  {
    id: 't18',
    ref: 'DF73RTYU2MN',
    productId: 'p4',
    qty: 16,
    date: 'Jul 4th 2024',
    stamp: 20240704,
    status: 'Completed',
    customerId: 'c2',
  },
  {
    id: 't19',
    ref: 'GH46YUIO5BV',
    productId: 'p9',
    qty: 74,
    date: 'Jul 3rd 2024',
    stamp: 20240703,
    status: 'Pending',
    customerId: 'c3',
  },
  {
    id: 't20',
    ref: 'JK82IOPA7CX',
    productId: 'p1',
    qty: 310,
    date: 'Jul 3rd 2024',
    stamp: 20240703,
    status: 'Completed',
    customerId: 'c4',
  },
  {
    id: 't21',
    ref: 'LZ35PASD9VB',
    productId: 'p3',
    qty: 240,
    date: 'Jul 2nd 2024',
    stamp: 20240702,
    status: 'Completed',
    customerId: 'c5',
  },
  {
    id: 't22',
    ref: 'XC91SDFG4NM',
    productId: 'p8',
    qty: 520,
    date: 'Jul 2nd 2024',
    stamp: 20240702,
    status: 'Completed',
    customerId: 'c6',
  },
  {
    id: 't23',
    ref: 'VB58DFGH6QW',
    productId: 'p5',
    qty: 118,
    date: 'Jul 1st 2024',
    stamp: 20240701,
    status: 'Refunded',
    customerId: 'c1',
  },
  {
    id: 't24',
    ref: 'NM24FGHJ1ER',
    productId: 'p7',
    qty: 405,
    date: 'Jul 1st 2024',
    stamp: 20240701,
    status: 'Completed',
    customerId: 'c2',
  },
  {
    id: 't25',
    ref: 'QW67GHJK3TY',
    productId: 'p2',
    qty: 31,
    date: 'Jun 30th 2024',
    stamp: 20240630,
    status: 'Completed',
    customerId: 'c3',
  },
  {
    id: 't26',
    ref: 'ER13HJKL5UI',
    productId: 'p6',
    qty: 1420,
    date: 'Jun 30th 2024',
    stamp: 20240630,
    status: 'Completed',
    customerId: 'c4',
  },
  {
    id: 't27',
    ref: 'TY89JKLZ7OP',
    productId: 'p9',
    qty: 96,
    date: 'Jun 29th 2024',
    stamp: 20240629,
    status: 'Pending',
    customerId: 'c5',
  },
  {
    id: 't28',
    ref: 'UI45KLZX9AS',
    productId: 'p1',
    qty: 260,
    date: 'Jun 29th 2024',
    stamp: 20240629,
    status: 'Completed',
    customerId: 'c6',
  },
  {
    id: 't29',
    ref: 'OP72LZXC2DF',
    productId: 'p8',
    qty: 380,
    date: 'Jun 28th 2024',
    stamp: 20240628,
    status: 'Completed',
    customerId: 'c1',
  },
  {
    id: 't30',
    ref: 'AS38ZXCV4GH',
    productId: 'p3',
    qty: 165,
    date: 'Jun 28th 2024',
    stamp: 20240628,
    status: 'Refunded',
    customerId: 'c2',
  },
];

/*
 * The quantities are wholesale, not retail.
 *
 * Written at two and three units each, the ledger summed to $2,921 of net
 * income directly under a revenue chart reading $168,697 — the same figure
 * told at two different scales on one screen. A store admin's order book is
 * stockists ordering by the carton, so that is what these are.
 */
export const productOf = (t: Txn) => PRODUCTS.find((p) => p.id === t.productId)!;
export const txnTotal = (t: Txn) => productOf(t).price * t.qty;

/* ---------------------------------------------------------------- revenue */

export interface MonthRevenue {
  id: string;
  label: string;
  income: number;
  expenses: number;
}

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/*
 * A written-down shape with a seeded roughening on top, so the bars differ
 * enough to read as a chart. `base + random` clusters them all between 60%
 * and 100% of the tallest, which renders as twelve identical blocks.
 */
const INCOME_SHAPE = [0.52, 0.68, 0.46, 0.88, 0.6, 1.0, 0.72, 0.5, 0.82, 0.64, 0.9, 0.76];
const COST_SHAPE = [0.34, 0.42, 0.3, 0.55, 0.38, 0.6, 0.46, 0.33, 0.52, 0.4, 0.57, 0.48];

export interface Span {
  id: string;
  label: string;
  months: number;
}

export const SPANS: Span[] = [
  { id: 'half', label: '6 months', months: 6 },
  { id: 'year', label: '12 months', months: 12 },
  { id: 'quarter', label: '3 months', months: 3 },
];

export function revenue(spanId: string): MonthRevenue[] {
  const span = SPANS.find((s) => s.id === spanId) ?? SPANS[0];
  const next = rng(spanId.length * 1811 + span.months);
  return MONTHS.slice(0, span.months).map((label, i) => ({
    id: label.toLowerCase(),
    label,
    income: Math.round(9000 + INCOME_SHAPE[i] * 26000 + next() * 2200),
    expenses: Math.round(5000 + COST_SHAPE[i] * 15000 + next() * 1800),
  }));
}

/* ----------------------------------------------------------- sales report */

export interface ReportBar {
  id: string;
  label: string;
  value: number;
}

export const REPORT: ReportBar[] = [
  { id: 'launched', label: 'Product Launched', value: 233 },
  { id: 'ongoing', label: 'Ongoing Product', value: 23 },
  { id: 'sold', label: 'Product Sold', value: 452 },
];

/* -------------------------------------------------- total view performance */

export interface Segment {
  id: string;
  label: string;
  value: number;
  token: string;
}

/**
 * The reference labels its ring 16% / 23% / 68%, which is 107%. These are
 * counts, and the shares are computed from them — so they add up by
 * construction and the ring cannot disagree with its own legend.
 */
export const PERFORMANCE: Segment[] = [
  { id: 'views', label: 'View Count', value: 384000, token: '--color-seg-views' },
  { id: 'percent', label: 'Percentage', value: 129000, token: '--color-seg-percent' },
  { id: 'sales', label: 'Sales', value: 52000, token: '--color-seg-sales' },
];

export const perfTotal = () => PERFORMANCE.reduce((t, s) => t + s.value, 0);

/* -------------------------------------------------------------- customers */

export interface Customer {
  id: string;
  name: string;
  handle: string;
  face: number;
  since: string;
  tier: 'New' | 'Returning' | 'VIP';
}

export const CUSTOMERS: Customer[] = [
  { id: 'c1', name: 'Imani Reyes', handle: '@imanir', face: 0, since: 'Mar 2023', tier: 'VIP' },
  {
    id: 'c2',
    name: 'Teodor Blum',
    handle: '@tblum',
    face: 1,
    since: 'Nov 2023',
    tier: 'Returning',
  },
  { id: 'c3', name: 'Soraya Khan', handle: '@soraya.k', face: 2, since: 'Jan 2024', tier: 'New' },
  {
    id: 'c4',
    name: 'Marcus Enfield',
    handle: '@menfield',
    face: 3,
    since: 'Jun 2022',
    tier: 'VIP',
  },
  { id: 'c5', name: 'Noor Hadid', handle: '@noorh', face: 4, since: 'Apr 2024', tier: 'New' },
  {
    id: 'c6',
    name: 'Elena Marchetti',
    handle: '@elenam',
    face: 5,
    since: 'Sep 2023',
    tier: 'Returning',
  },
];

export const customerSpend = (id: string) =>
  TXNS.filter((t) => t.customerId === id && t.status !== 'Refunded').reduce(
    (s, t) => s + txnTotal(t),
    0,
  );

export const customerOrders = (id: string) => TXNS.filter((t) => t.customerId === id).length;

/** Twelve weeks of a customer's spend, seeded. */
export function customerTrail(id: string): number[] {
  const next = rng(id.length * 521 + id.charCodeAt(id.length - 1) * 7);
  const spend = Math.max(60, customerSpend(id));
  return Array.from({ length: 12 }, () => Math.round((spend / 12) * (0.35 + next() * 1.5)));
}
