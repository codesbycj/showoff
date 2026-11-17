/**
 * The deck. Bundled and deterministic -- no network, no Math.random, so the
 * table measured is the table filmed.
 *
 * The shape is the reference's: three unpublished drafts at the top carrying
 * the draft tint, one campaign stopped on a payment error, one switched off
 * with real spend behind it. The account is a Naira account, as the
 * reference's own budget column (N4,97...) shows.
 *
 * The names and figures are invented. The reference is a screen recording of
 * somebody's live ad account, and its account name is theirs.
 */

export type Tone = 'draft' | 'error' | 'off' | 'active';

/** A metric cell: a figure, and the small caption naming what it counts. */
export interface Metric {
  value: string | null;
  caption?: string;
}

export interface Campaign {
  id: string;
  name: string;
  /** The Off/On switch. Drives `delivery` -- turning a row off says "Off". */
  on: boolean;
  /** Unpublished. These are the rows the reference tints green. */
  draft: boolean;
  delivery: { label: string; tone: Tone };
  results: Metric;
  costPerResult: Metric;
  budget: Metric;
  spent: Metric;
  impressions: Metric;
  purchases: Metric;
  ends: Metric;
  attribution: Metric;
  bidStrategy: Metric;
  lastEdit: Metric;
  quality: Metric;
  engagement: Metric;
  conversion: Metric;
  roas: Metric;
  costPerLpv: Metric;
  ctrLink: Metric;
  ctrAll: Metric;
  lpv: Metric;
  /** Raw figures, so the summary row is computed rather than typed. */
  raw: { spent: number; impressions: number; lpv: number; results: number };
}

const NONE: Metric = { value: null };
const ONGOING: Metric = { value: 'Ongoing' };
const WINDOW: Metric = { value: '7-day click or 1-day view', caption: 'All' };

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'c-1',
    name: 'October sales',
    on: true,
    draft: true,
    delivery: { label: 'In draft', tone: 'draft' },
    results: NONE,
    costPerResult: NONE,
    budget: { value: 'Using ad set budget' },
    spent: NONE,
    impressions: NONE,
    purchases: NONE,
    ends: ONGOING,
    attribution: WINDOW,
    bidStrategy: { value: 'Highest volume', caption: 'Value' },
    lastEdit: NONE,
    quality: NONE,
    engagement: NONE,
    conversion: NONE,
    roas: NONE,
    costPerLpv: NONE,
    ctrLink: NONE,
    ctrAll: NONE,
    lpv: NONE,
    raw: { spent: 0, impressions: 0, lpv: 0, results: 0 },
  },
  {
    id: 'c-2',
    name: 'WhatsApp ads for a fashion business',
    on: true,
    draft: true,
    delivery: { label: 'In draft', tone: 'draft' },
    results: NONE,
    costPerResult: NONE,
    budget: { value: 'Using ad set budget' },
    spent: NONE,
    impressions: NONE,
    purchases: NONE,
    ends: ONGOING,
    attribution: WINDOW,
    bidStrategy: { value: 'Highest volume', caption: 'Value' },
    lastEdit: NONE,
    quality: NONE,
    engagement: NONE,
    conversion: NONE,
    roas: NONE,
    costPerLpv: NONE,
    ctrLink: NONE,
    ctrAll: NONE,
    lpv: NONE,
    raw: { spent: 0, impressions: 0, lpv: 0, results: 0 },
  },
  {
    id: 'c-3',
    name: 'New Engagement Campaign',
    on: true,
    draft: true,
    delivery: { label: 'In draft', tone: 'draft' },
    results: NONE,
    costPerResult: NONE,
    budget: { value: 'Using ad set budget' },
    spent: NONE,
    impressions: NONE,
    purchases: NONE,
    ends: ONGOING,
    attribution: WINDOW,
    bidStrategy: { value: 'Highest volume', caption: 'Value' },
    lastEdit: NONE,
    quality: NONE,
    engagement: NONE,
    conversion: NONE,
    roas: NONE,
    costPerLpv: NONE,
    ctrLink: NONE,
    ctrAll: NONE,
    lpv: NONE,
    raw: { spent: 0, impressions: 0, lpv: 0, results: 0 },
  },
  {
    id: 'c-4',
    name: 'Landing Page - Car Inverter Sales',
    on: true,
    draft: false,
    delivery: { label: 'Payment error', tone: 'error' },
    results: { value: null, caption: 'Website Completed Registrations' },
    costPerResult: { value: null, caption: 'Per Complete Registration' },
    budget: { value: 'Using ad set budget' },
    spent: { value: '₦0.00' },
    impressions: NONE,
    purchases: NONE,
    ends: ONGOING,
    attribution: WINDOW,
    bidStrategy: { value: 'Highest volume', caption: 'Value' },
    lastEdit: { value: 'Aug 18, 2026, 4:12 PM', caption: '18 days ago' },
    quality: NONE,
    engagement: NONE,
    conversion: NONE,
    roas: NONE,
    costPerLpv: NONE,
    ctrLink: NONE,
    ctrAll: NONE,
    lpv: NONE,
    raw: { spent: 0, impressions: 0, lpv: 0, results: 0 },
  },
  {
    id: 'c-5',
    name: 'WhatsApp Sales - Car Inverter',
    on: false,
    draft: false,
    delivery: { label: 'Off', tone: 'off' },
    results: { value: null, caption: 'Messaging Conversations' },
    costPerResult: { value: null, caption: 'Per Messaging Conversation' },
    budget: { value: '₦4,975.00', caption: 'Daily' },
    spent: { value: '₦59,830.20' },
    impressions: { value: '8,214' },
    purchases: NONE,
    ends: ONGOING,
    attribution: WINDOW,
    bidStrategy: { value: 'Highest volume', caption: 'Value' },
    lastEdit: { value: 'Aug 18, 2026, 4:12 PM', caption: '18 days ago' },
    quality: NONE,
    engagement: NONE,
    conversion: NONE,
    roas: NONE,
    costPerLpv: { value: '₦2,940.00' },
    ctrLink: { value: '3.53%' },
    ctrAll: { value: '6.61%' },
    lpv: { value: '265' },
    raw: { spent: 59830.2, impressions: 8214, lpv: 265, results: 0 },
  },
];

export const naira = (n: number) =>
  '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
