/**
 * The content deck: every figure, order, customer and promotion.
 *
 * All invented (rule 5). Mylora is not a shop, nobody here has bought
 * anything, and no figure on this screen was ever taken.
 */
import type { IconName } from '@/components/Icon';
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

export const store = {
  name: 'Mylora',
  user: { name: 'Sarah Johnson', role: 'Store Manager', face: face1 },
  welcome: "Welcome back! Here's what's happening with your store today.",
};

/* ---------- the quick actions ------------------------------------------------ */

export interface QuickAction {
  id: string;
  title: string;
  sub: string;
  tint: string;
  icon: IconName;
}

export const QUICK: QuickAction[] = [
  {
    id: 'discount',
    title: 'Create Discount Code',
    sub: 'Set up percentage or fixed amount discounts',
    tint: 'var(--color-quick-discount)',
    icon: 'percent',
  },
  {
    id: 'email',
    title: 'Email Campaign',
    sub: 'Send newsletters and promotional emails',
    tint: 'var(--color-quick-email)',
    icon: 'mail',
  },
  {
    id: 'banner',
    title: 'Announcement Banner',
    sub: 'Display site-wide promotional messages',
    tint: 'var(--color-quick-banner)',
    icon: 'flag',
  },
  {
    id: 'bundle',
    title: 'Bundle Offers',
    sub: 'Create product bundles with special pricing',
    tint: 'var(--color-quick-bundle)',
    icon: 'gift',
  },
];

/* ---------- the figures --------------------------------------------------------- */

export interface Stat {
  id: string;
  label: string;
  value: string;
  delta: number;
  note: string;
}

export const STATS: Stat[] = [
  { id: 'sales', label: 'Total Sales', value: '$54,890', delta: 12.5, note: 'This month' },
  { id: 'orders', label: 'Orders', value: '1,429', delta: 8.2, note: 'This month' },
  { id: 'aov', label: 'Average Order Value', value: '$38.42', delta: 3.1, note: 'This month' },
  { id: 'returning', label: 'Returning Customers', value: '68%', delta: 2.4, note: 'This month' },
  { id: 'abandon', label: 'Cart Abandonment', value: '23.8%', delta: -1.6, note: 'This month' },
  { id: 'views', label: 'Product Views', value: '45,210', delta: 15.3, note: 'This month' },
];

/* ---------- sales analytics ------------------------------------------------------ */

export const SPANS = [
  { id: 'daily', label: 'Daily' },
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
] as const;

export type SpanId = (typeof SPANS)[number]['id'];

export interface Bar {
  label: string;
  full: string;
  value: number;
}

const bars = (labels: string[], values: number[], prefix = ''): Bar[] =>
  labels.map((label, i) => ({ label, full: prefix + label, value: values[i] }));

export const SALES: Record<SpanId, Bar[]> = {
  daily: bars(
    ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    [1240, 1680, 1420, 2100, 2460, 3180, 2040],
  ),
  weekly: bars(['W1', 'W2', 'W3', 'W4', 'W5'], [9800, 12_400, 10_900, 14_600, 7190], 'Week '),
  monthly: bars(
    ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    [4100, 5600, 4800, 8200, 6300, 5100, 2600, 8600, 7100, 9400, 7600, 3200],
  ),
};

/* ---------- customers -------------------------------------------------------------- */

export interface Customer {
  id: string;
  name: string;
  face: string;
  orders: number;
  spend: number;
  segment: 'VIP' | 'Returning' | 'New';
  joined: string;
  lastOrder: string;
}

export const CUSTOMERS: Customer[] = [
  {
    id: 'c1',
    name: 'Alice Johnson',
    face: face2,
    orders: 23,
    spend: 2340,
    segment: 'VIP',
    joined: 'Mar 2024',
    lastOrder: '2 days ago',
  },
  {
    id: 'c2',
    name: 'Robert Smith',
    face: face3,
    orders: 18,
    spend: 1980,
    segment: 'VIP',
    joined: 'Jun 2024',
    lastOrder: '4 days ago',
  },
  {
    id: 'c3',
    name: 'Maria Garcia',
    face: face4,
    orders: 15,
    spend: 1850,
    segment: 'VIP',
    joined: 'Jan 2025',
    lastOrder: '1 week ago',
  },
  {
    id: 'c4',
    name: 'Tom Okafor',
    face: face5,
    orders: 12,
    spend: 1410,
    segment: 'Returning',
    joined: 'Feb 2025',
    lastOrder: '3 days ago',
  },
  {
    id: 'c5',
    name: 'Hana Suzuki',
    face: face6,
    orders: 11,
    spend: 1280,
    segment: 'Returning',
    joined: 'Apr 2025',
    lastOrder: '5 days ago',
  },
  {
    id: 'c6',
    name: 'Niall Brady',
    face: face2,
    orders: 9,
    spend: 1120,
    segment: 'Returning',
    joined: 'May 2025',
    lastOrder: '2 weeks ago',
  },
  {
    id: 'c7',
    name: 'Farida Nasr',
    face: face3,
    orders: 7,
    spend: 860,
    segment: 'Returning',
    joined: 'Jun 2025',
    lastOrder: '9 days ago',
  },
  {
    id: 'c8',
    name: 'Luca Bianchi',
    face: face4,
    orders: 4,
    spend: 520,
    segment: 'New',
    joined: 'Sep 2025',
    lastOrder: '1 day ago',
  },
  {
    id: 'c9',
    name: 'Priya Shah',
    face: face5,
    orders: 3,
    spend: 410,
    segment: 'New',
    joined: 'Sep 2025',
    lastOrder: '6 days ago',
  },
  {
    id: 'c10',
    name: 'Ethan Wells',
    face: face6,
    orders: 2,
    spend: 240,
    segment: 'New',
    joined: 'Oct 2025',
    lastOrder: '12 hours ago',
  },
  {
    id: 'c11',
    name: 'Yara Haddad',
    face: face2,
    orders: 2,
    spend: 190,
    segment: 'New',
    joined: 'Oct 2025',
    lastOrder: '3 hours ago',
  },
  {
    id: 'c12',
    name: 'Marcus Bell',
    face: face3,
    orders: 1,
    spend: 95,
    segment: 'New',
    joined: 'Oct 2025',
    lastOrder: '1 hour ago',
  },
  {
    id: 'c13',
    name: 'Ingrid Sollner',
    face: face4,
    orders: 19,
    spend: 2110,
    segment: 'VIP',
    joined: 'Nov 2023',
    lastOrder: '6 days ago',
  },
  {
    id: 'c14',
    name: 'Dele Adeyemi',
    face: face5,
    orders: 14,
    spend: 1620,
    segment: 'Returning',
    joined: 'Aug 2024',
    lastOrder: '8 days ago',
  },
  {
    id: 'c15',
    name: 'Clara Mendez',
    face: face6,
    orders: 8,
    spend: 980,
    segment: 'Returning',
    joined: 'Jan 2025',
    lastOrder: '11 days ago',
  },
  {
    id: 'c16',
    name: 'Owen Castleton',
    face: face2,
    orders: 6,
    spend: 740,
    segment: 'Returning',
    joined: 'Mar 2025',
    lastOrder: '2 weeks ago',
  },
  {
    id: 'c17',
    name: 'Sanne de Vries',
    face: face3,
    orders: 3,
    spend: 360,
    segment: 'New',
    joined: 'Sep 2025',
    lastOrder: '4 days ago',
  },
  {
    id: 'c18',
    name: 'Hugo Pereira',
    face: face4,
    orders: 1,
    spend: 120,
    segment: 'New',
    joined: 'Oct 2025',
    lastOrder: '30 minutes ago',
  },
];

export const INSIGHTS = {
  newThisWeek: 15,
  vipActive: 12,
  totalAllTime: 2847,
  retention: 60,
  retentionDelta: 2.4,
};

/* ---------- promotions --------------------------------------------------------------- */

export interface Promotion {
  id: string;
  title: string;
  kind: string;
  detail: string;
  state: 'Active' | 'Running' | 'Scheduled';
}

export const PROMOTIONS: Promotion[] = [
  { id: 'p1', title: 'Holiday Sale', kind: 'Discount Code', detail: '234 used', state: 'Active' },
  {
    id: 'p2',
    title: 'New Customer Welcome',
    kind: 'Email Campaign',
    detail: '89% open rate',
    state: 'Running',
  },
  {
    id: 'p3',
    title: 'Bundle & Save',
    kind: 'Bundle Offer',
    detail: 'starts 1 Nov',
    state: 'Scheduled',
  },
];

/* ---------- orders ---------------------------------------------------------------------- */

export type OrderState = 'Fulfilled' | 'Processing' | 'Packed' | 'Refunded';

export interface Order {
  id: string;
  customer: string;
  face: string;
  items: number;
  total: number;
  state: OrderState;
  placed: string;
  channel: 'Online' | 'Marketplace' | 'In store';
}

const CHANNELS: Order['channel'][] = ['Online', 'Marketplace', 'In store'];
const ORDER_STATES: OrderState[] = ['Fulfilled', 'Processing', 'Packed', 'Fulfilled', 'Refunded'];

/** Twenty orders, seeded, so the table is the same on every reload. */
export const ORDERS: Order[] = (() => {
  const next = rng(90_413);
  return Array.from({ length: 20 }, (_, i) => {
    const customer = CUSTOMERS[i % CUSTOMERS.length];
    return {
      id: '#MY-' + (4820 - i),
      customer: customer.name,
      face: customer.face,
      items: 1 + Math.floor(next() * 6),
      total: Math.round((18 + next() * 180) * 100) / 100,
      state: ORDER_STATES[i % ORDER_STATES.length],
      placed: 1 + Math.floor(i / 2) + ' Oct 2025',
      channel: CHANNELS[Math.floor(next() * CHANNELS.length)],
    };
  });
})();
