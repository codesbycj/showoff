/**
 * The content deck: every figure, product, customer and order on every pane.
 *
 * All invented (rule 5). Kovelt is not a company, nobody here has bought
 * anything, and no figure on this screen was ever taken — which is what lets
 * the build use free-licensed photographs of real people for the customer
 * avatars without the page being able to pass as anyone's live product.
 */
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

import type { Country } from '@/components/Icon';

export const FACES = [face1, face2, face3, face4, face5, face6];

export const store = {
  name: 'Kovelt Store',
  plan: 'Pro',
  visibility: 'Private',
  user: { name: 'Noah Bellingham', email: 'noah@kovelt.co', face: face1 },
  team: [face2, face3, face4],
  teamExtra: 6,
};

/* ---------- profit ------------------------------------------------------ */

export interface Bar {
  label: string;
  full: string;
  value: number;
  /** Change against the same period before it, as a percentage. */
  delta: number;
  /** The three figures the tooltip shows. */
  highest: { value: number; when: string };
  lowest: { value: number; when: string };
  average: number;
}

export interface Period {
  id: 'month' | 'quarter' | 'year';
  label: string;
  bars: Bar[];
  total: number;
  /** Absolute change against the previous span of the same length. */
  change: number;
  /** Which bar opens selected. */
  initial: number;
}

const bar = (
  label: string,
  full: string,
  value: number,
  delta: number,
  hi: number,
  hiWhen: string,
  lo: number,
  loWhen: string,
): Bar => ({
  label,
  full,
  value,
  delta,
  highest: { value: hi, when: hiWhen },
  lowest: { value: lo, when: loWhen },
  average: Math.round((hi + lo) / 2 / 10) * 10,
});

/*
 * April is the selected bar in the reference and the only filled one. The
 * month series is its seven bars with its own percentage badges; quarter and
 * year are the same business told at two other resolutions, so the period
 * control has something real to switch between.
 */
export const PERIODS: Period[] = [
  {
    id: 'month',
    label: 'Month',
    initial: 3,
    total: 110_450,
    change: 10_250,
    bars: [
      bar('Jan', 'January', 74_200, 8, 6100, '18 Jan', 1980, '2 Jan'),
      bar('Feb', 'February', 68_900, -5, 5400, '9 Feb', 1620, '26 Feb'),
      bar('Mar', 'March', 86_300, 3, 6800, '22 Mar', 2240, '7 Mar'),
      bar('Apr', 'April', 110_450, 2, 7500, '26 Apr', 2450, '15 Apr'),
      bar('May', 'May', 61_700, -10, 4900, '11 May', 1450, '29 May'),
      bar('Jun', 'June', 94_800, 5, 7100, '14 Jun', 2310, '3 Jun'),
      bar('Jul', 'July', 101_300, 3, 7300, '28 Jul', 2620, '9 Jul'),
    ],
  },
  {
    id: 'quarter',
    label: 'Quarter',
    initial: 2,
    total: 341_900,
    change: 28_400,
    bars: [
      bar('Q1', 'First quarter', 229_400, 6, 18_300, 'March', 5840, 'January'),
      bar('Q2', 'Second quarter', 266_950, 16, 21_900, 'June', 6120, 'May'),
      bar('Q3', 'Third quarter', 341_900, 9, 24_600, 'August', 7410, 'July'),
      bar('Q4', 'Fourth quarter', 298_300, -13, 22_100, 'November', 6980, 'December'),
    ],
  },
  {
    id: 'year',
    label: 'Year',
    initial: 4,
    total: 1_136_550,
    change: -42_800,
    bars: [
      bar('2021', '2021', 612_400, 12, 58_200, 'November', 18_400, 'February'),
      bar('2022', '2022', 784_900, 28, 69_800, 'December', 21_300, 'January'),
      bar('2023', '2023', 905_100, 15, 77_400, 'October', 24_900, 'February'),
      bar('2024', '2024', 1_179_350, 30, 94_600, 'December', 31_200, 'June'),
      bar('2025', '2025', 1_136_550, -4, 88_900, 'September', 29_700, 'May'),
    ],
  },
];

/* ---------- sales performance ------------------------------------------- */

export const PERFORMANCE = {
  goal: 80,
  salesNumber: 1660,
  salesDelta: 6,
  revenue: 92_120,
  revenueDelta: -2,
  toast: 'Your daily customer has increased',
};

/* ---------- products ----------------------------------------------------- */

export type Glyph = 'buds' | 'watch' | 'charger' | 'tablet' | 'camera' | 'ssd' | 'speaker' | 'keys';

export interface Product {
  id: string;
  name: string;
  variant: string;
  category: 'Audio' | 'Wearables' | 'Power' | 'Displays' | 'Storage';
  glyph: Glyph;
  price: number;
  stock: number;
  sold: number;
  delta: number;
  rating: number;
  /** Dark tile in the Top Product card. */
  hero?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'aero',
    name: 'Pebble Buds Lite',
    variant: 'White, 20h Battery',
    category: 'Audio',
    glyph: 'buds',
    price: 55,
    stock: 412,
    sold: 10_240,
    delta: 17,
    rating: 4.8,
    hero: true,
  },
  {
    id: 'hyper',
    name: 'Vantage SSD',
    variant: '1TB, USB-C',
    category: 'Storage',
    glyph: 'ssd',
    price: 129,
    stock: 198,
    sold: 7010,
    delta: 6,
    rating: 4.6,
  },
  {
    id: 'novaear',
    name: 'Lumen Ear Pro ANC',
    variant: 'Black, 32h Battery',
    category: 'Audio',
    glyph: 'buds',
    price: 79,
    stock: 264,
    sold: 5890,
    delta: 11,
    rating: 4.7,
  },
  {
    id: 'tekwatch',
    name: 'Orbit Watch Pulse',
    variant: '44mm, Silver',
    category: 'Wearables',
    glyph: 'watch',
    price: 159,
    stock: 87,
    sold: 4320,
    delta: -3,
    rating: 4.4,
  },
  {
    id: 'fluxcharge',
    name: 'Current 65W',
    variant: 'Fast Charger',
    category: 'Power',
    glyph: 'charger',
    price: 21,
    stock: 1240,
    sold: 3980,
    delta: 9,
    rating: 4.5,
  },
  {
    id: 'novamini',
    name: 'Nova Mini 8',
    variant: '8.4", 512GB',
    category: 'Displays',
    glyph: 'tablet',
    price: 199,
    stock: 56,
    sold: 2870,
    delta: 4,
    rating: 4.9,
  },
  {
    id: 'smartcam',
    name: 'Nova SmartCam',
    variant: '2K HDR',
    category: 'Displays',
    glyph: 'camera',
    price: 71,
    stock: 143,
    sold: 2410,
    delta: -8,
    rating: 4.2,
  },
  {
    id: 'boomlite',
    name: 'Boom Lite Speaker',
    variant: '12W, Waterproof',
    category: 'Audio',
    glyph: 'speaker',
    price: 45,
    stock: 309,
    sold: 1960,
    delta: 2,
    rating: 4.3,
  },
  {
    id: 'tekkeys',
    name: 'TekKeys Slim',
    variant: 'Low-profile, Grey',
    category: 'Power',
    glyph: 'keys',
    price: 64,
    stock: 0,
    sold: 1510,
    delta: -14,
    rating: 4.1,
  },
  {
    id: 'novawatch',
    name: 'Lumen Band Go',
    variant: '38mm, Midnight',
    category: 'Wearables',
    glyph: 'watch',
    price: 89,
    stock: 22,
    sold: 1180,
    delta: 21,
    rating: 4.0,
  },
  {
    id: 'studiocam',
    name: 'Studio Cam 4K',
    variant: '4K, Tripod mount',
    category: 'Displays',
    glyph: 'camera',
    price: 149,
    stock: 74,
    sold: 960,
    delta: 5,
    rating: 4.4,
  },
  {
    id: 'hyperhub',
    name: 'HyperHub 7-in-1',
    variant: 'USB-C, 100W',
    category: 'Power',
    glyph: 'ssd',
    price: 39,
    stock: 530,
    sold: 820,
    delta: -6,
    rating: 3.9,
  },
];

/* ---------- transactions ------------------------------------------------ */

export type Status = 'Completed' | 'Cancelled' | 'Pending' | 'Refunded';

export interface Txn {
  id: string;
  productId: string;
  when: string;
  time: string;
  customer: string;
  face: string;
  price: number;
  status: Status;
  channel: 'Web' | 'App' | 'Retail';
}

export const TRANSACTIONS: Txn[] = [
  {
    id: 'KV-98421',
    productId: 'novaear',
    when: '19 Nov 2025',
    time: '10:32',
    customer: 'Ethan Clarke',
    face: face2,
    price: 79,
    status: 'Completed',
    channel: 'Web',
  },
  {
    id: 'KV-98422',
    productId: 'tekwatch',
    when: '19 Nov 2025',
    time: '11:05',
    customer: 'Ava Mitchell',
    face: face3,
    price: 159,
    status: 'Cancelled',
    channel: 'App',
  },
  {
    id: 'KV-98423',
    productId: 'aero',
    when: '19 Nov 2025',
    time: '11:44',
    customer: 'Liam Parker',
    face: face4,
    price: 55,
    status: 'Pending',
    channel: 'Web',
  },
  {
    id: 'KV-98424',
    productId: 'fluxcharge',
    when: '19 Nov 2025',
    time: '12:10',
    customer: 'Sophia Hayes',
    face: face5,
    price: 21,
    status: 'Completed',
    channel: 'Retail',
  },
  {
    id: 'KV-98425',
    productId: 'novamini',
    when: '19 Nov 2025',
    time: '12:40',
    customer: 'Noah Bennett',
    face: face6,
    price: 199,
    status: 'Completed',
    channel: 'Web',
  },
  {
    id: 'KV-98426',
    productId: 'smartcam',
    when: '19 Nov 2025',
    time: '13:15',
    customer: 'Chloe Turner',
    face: face2,
    price: 71,
    status: 'Completed',
    channel: 'App',
  },
  {
    id: 'KV-98427',
    productId: 'hyper',
    when: '19 Nov 2025',
    time: '13:52',
    customer: 'Mason Reid',
    face: face3,
    price: 129,
    status: 'Refunded',
    channel: 'Web',
  },
  {
    id: 'KV-98428',
    productId: 'boomlite',
    when: '19 Nov 2025',
    time: '14:20',
    customer: 'Isla Fraser',
    face: face4,
    price: 45,
    status: 'Completed',
    channel: 'Retail',
  },
  {
    id: 'KV-98429',
    productId: 'novawatch',
    when: '19 Nov 2025',
    time: '14:58',
    customer: 'Jack Whitlow',
    face: face5,
    price: 89,
    status: 'Pending',
    channel: 'App',
  },
  {
    id: 'KV-98430',
    productId: 'tekkeys',
    when: '19 Nov 2025',
    time: '15:31',
    customer: 'Mia Donnelly',
    face: face6,
    price: 64,
    status: 'Completed',
    channel: 'Web',
  },
  {
    id: 'KV-98431',
    productId: 'aero',
    when: '19 Nov 2025',
    time: '15:58',
    customer: 'Oscar Vance',
    face: face2,
    price: 55,
    status: 'Completed',
    channel: 'Web',
  },
  {
    id: 'KV-98432',
    productId: 'hyper',
    when: '19 Nov 2025',
    time: '16:24',
    customer: 'Freya Lang',
    face: face3,
    price: 129,
    status: 'Completed',
    channel: 'App',
  },
  {
    id: 'KV-98433',
    productId: 'aero',
    when: '19 Nov 2025',
    time: '16:47',
    customer: 'Dev Raman',
    face: face4,
    price: 55,
    status: 'Pending',
    channel: 'Retail',
  },
  {
    id: 'KV-98434',
    productId: 'novamini',
    when: '19 Nov 2025',
    time: '17:03',
    customer: 'Harriet Boyle',
    face: face5,
    price: 199,
    status: 'Completed',
    channel: 'Web',
  },
  {
    id: 'KV-98435',
    productId: 'novaear',
    when: '19 Nov 2025',
    time: '17:29',
    customer: 'Theo Marsden',
    face: face6,
    price: 79,
    status: 'Cancelled',
    channel: 'App',
  },
  {
    id: 'KV-98436',
    productId: 'tekwatch',
    when: '19 Nov 2025',
    time: '17:51',
    customer: 'Priya Nandi',
    face: face2,
    price: 159,
    status: 'Completed',
    channel: 'Web',
  },
  {
    id: 'KV-98437',
    productId: 'fluxcharge',
    when: '19 Nov 2025',
    time: '18:12',
    customer: 'Callum Reeve',
    face: face3,
    price: 21,
    status: 'Completed',
    channel: 'Retail',
  },
  {
    id: 'KV-98438',
    productId: 'studiocam',
    when: '19 Nov 2025',
    time: '18:40',
    customer: 'Wren Ashby',
    face: face4,
    price: 149,
    status: 'Pending',
    channel: 'Web',
  },
];

/* ---------- markets ------------------------------------------------------ */

export interface Market {
  id: Country;
  label: string;
  revenue: number;
  share: number;
}

export const MARKETS: Market[] = [
  { id: 'id', label: 'Indonesia', revenue: 62_100, share: 40 },
  { id: 'de', label: 'Germany', revenue: 24_500, share: 25 },
  { id: 'it', label: 'Italy', revenue: 15_500, share: 10 },
  { id: 'fr', label: 'France', revenue: 11_200, share: 15 },
  { id: 'jp', label: 'Japan', revenue: 8400, share: 10 },
];

/* ---------- orders and invoices ------------------------------------------ */

export type InvoiceState = 'Paid' | 'Awaiting' | 'Overdue' | 'Draft';

export interface Invoice {
  id: string;
  customer: string;
  face: string;
  issued: string;
  due: string;
  items: number;
  total: number;
  state: InvoiceState;
  method: 'Card' | 'Transfer' | 'Wallet';
}

export const INVOICES: Invoice[] = [
  {
    id: 'INV-2041',
    customer: 'Ethan Clarke',
    face: face2,
    issued: '19 Nov 2025',
    due: '03 Dec 2025',
    items: 3,
    total: 253,
    state: 'Paid',
    method: 'Card',
  },
  {
    id: 'INV-2042',
    customer: 'Ava Mitchell',
    face: face3,
    issued: '19 Nov 2025',
    due: '03 Dec 2025',
    items: 1,
    total: 159,
    state: 'Overdue',
    method: 'Transfer',
  },
  {
    id: 'INV-2043',
    customer: 'Liam Parker',
    face: face4,
    issued: '18 Nov 2025',
    due: '02 Dec 2025',
    items: 2,
    total: 110,
    state: 'Awaiting',
    method: 'Wallet',
  },
  {
    id: 'INV-2044',
    customer: 'Sophia Hayes',
    face: face5,
    issued: '18 Nov 2025',
    due: '02 Dec 2025',
    items: 5,
    total: 318,
    state: 'Paid',
    method: 'Card',
  },
  {
    id: 'INV-2045',
    customer: 'Noah Bennett',
    face: face6,
    issued: '17 Nov 2025',
    due: '01 Dec 2025',
    items: 1,
    total: 199,
    state: 'Paid',
    method: 'Card',
  },
  {
    id: 'INV-2046',
    customer: 'Chloe Turner',
    face: face2,
    issued: '17 Nov 2025',
    due: '01 Dec 2025',
    items: 4,
    total: 284,
    state: 'Draft',
    method: 'Transfer',
  },
  {
    id: 'INV-2047',
    customer: 'Mason Reid',
    face: face3,
    issued: '16 Nov 2025',
    due: '30 Nov 2025',
    items: 2,
    total: 258,
    state: 'Overdue',
    method: 'Wallet',
  },
  {
    id: 'INV-2048',
    customer: 'Isla Fraser',
    face: face4,
    issued: '16 Nov 2025',
    due: '30 Nov 2025',
    items: 1,
    total: 45,
    state: 'Paid',
    method: 'Card',
  },
  {
    id: 'INV-2049',
    customer: 'Jack Whitlow',
    face: face5,
    issued: '15 Nov 2025',
    due: '29 Nov 2025',
    items: 3,
    total: 233,
    state: 'Awaiting',
    method: 'Card',
  },
  {
    id: 'INV-2050',
    customer: 'Mia Donnelly',
    face: face6,
    issued: '15 Nov 2025',
    due: '29 Nov 2025',
    items: 2,
    total: 128,
    state: 'Paid',
    method: 'Transfer',
  },
];

/* ---------- derived ------------------------------------------------------ */

const hash = (s: string) => {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
};

/**
 * Units sold per day over a fortnight, for the sparkline on a product.
 *
 * Seeded off the product's id, so every product has its own shape and that
 * shape is the same on every reload — the chart measured in one session is the
 * chart filmed in another.
 */
export function salesSeries(id: string, days = 14): number[] {
  const next = rng(hash(id));
  let level = 20 + next() * 40;
  return Array.from({ length: days }, () => {
    level = Math.max(4, Math.min(90, level + (next() - 0.46) * 26));
    return Math.round(level);
  });
}

export const productById = (id: string) => PRODUCTS.find((p) => p.id === id) ?? PRODUCTS[0];
