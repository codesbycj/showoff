/**
 * The column set, in the reference's order.
 *
 * The first nine are what image 1 shows without scrolling; the rest are the
 * ones images 3 and 4 reach by dragging the bar at the foot. Widths are set
 * here rather than in the markup so the total (~3,400px against a 1,440px
 * viewport) stays the ~42% scrollbar thumb the reference has.
 */
import type { Campaign, Metric } from '@/data/campaigns';

/** Every field on a Campaign that renders as a metric cell. */
export type MetricKey =
  | 'results'
  | 'costPerResult'
  | 'budget'
  | 'spent'
  | 'impressions'
  | 'purchases'
  | 'ends'
  | 'attribution'
  | 'bidStrategy'
  | 'lastEdit'
  | 'quality'
  | 'engagement'
  | 'conversion'
  | 'roas'
  | 'costPerLpv'
  | 'ctrLink'
  | 'ctrAll'
  | 'lpv';

export interface Column {
  key: MetricKey;
  label: string;
  /** The small grey second line some heads carry ("Ad set", "Ad relevance..."). */
  sub?: string;
  width: number;
  align: 'left' | 'right';
  sortable: boolean;
  /** The caret that opens the per-column menu. Every data column has one. */
  menu: boolean;
  /**
   * Metrics that open a breakdown are drawn in ink with a DOTTED underline --
   * not as a blue link. `Purchase ROAS` and `Purchases conversion value` carry
   * it in ref/sharp-columns.png; `Amount spent` and both CTRs do not.
   */
  drill?: boolean;
  /** What the summary row shows under this column, and its caption. */
  summary?: (rows: Campaign[]) => Metric;
  /** How this column sorts. Absent means it does not. */
  sortBy?: (c: Campaign) => number | string;
}

const sum = (rows: Campaign[], pick: (c: Campaign) => number) =>
  rows.reduce((t, c) => t + pick(c), 0);

const naira2 = (n: number) =>
  '₦' + n.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const COLUMNS: Column[] = [
  {
    key: 'results',
    label: 'Results',
    width: 158,
    align: 'right',
    sortable: true,
    menu: true,
    drill: true,
    sortBy: (c) => c.raw.results,
    summary: (rows) => {
      const t = sum(rows, (c) => c.raw.results);
      return t
        ? { value: t.toLocaleString('en-US'), caption: 'Website Completed Registrations' }
        : { value: null };
    },
  },
  {
    key: 'costPerResult',
    label: 'Cost per result',
    width: 158,
    align: 'right',
    sortable: true,
    menu: true,
    drill: true,
    summary: () => ({ value: null }),
  },
  {
    key: 'budget',
    label: 'Budget',
    sub: 'Ad set',
    width: 150,
    align: 'right',
    sortable: true,
    menu: true,
    summary: () => ({ value: null }),
  },
  {
    key: 'spent',
    label: 'Amount spent',
    width: 138,
    align: 'right',
    sortable: true,
    menu: true,
    sortBy: (c) => c.raw.spent,
    summary: (rows) => {
      const t = sum(rows, (c) => c.raw.spent);
      return t ? { value: naira2(t), caption: 'Total spent' } : { value: null };
    },
  },
  {
    key: 'impressions',
    label: 'Impressions',
    width: 126,
    align: 'right',
    sortable: true,
    menu: true,
    sortBy: (c) => c.raw.impressions,
    summary: (rows) => {
      const t = sum(rows, (c) => c.raw.impressions);
      return t ? { value: t.toLocaleString('en-US'), caption: 'Total' } : { value: null };
    },
  },
  {
    key: 'purchases',
    label: 'Purchases',
    width: 126,
    align: 'right',
    sortable: true,
    menu: true,
    drill: true,
    summary: () => ({ value: null, caption: 'Total' }),
  },
  {
    key: 'ends',
    label: 'Ends',
    width: 112,
    align: 'left',
    sortable: true,
    menu: true,
    sortBy: (c) => c.ends.value ?? '',
    summary: () => ({ value: null }),
  },
  {
    key: 'attribution',
    label: 'Attribution setting',
    width: 156,
    align: 'left',
    sortable: false,
    menu: true,
    summary: () => ({ value: '7-day click or 1-day view', caption: 'All' }),
  },
  {
    key: 'bidStrategy',
    label: 'Bid strategy',
    sub: 'Ad set',
    width: 152,
    align: 'left',
    sortable: false,
    menu: true,
    summary: () => ({ value: null }),
  },
  {
    key: 'lastEdit',
    label: 'Last significant edit',
    width: 172,
    align: 'left',
    sortable: true,
    menu: true,
    sortBy: (c) => c.lastEdit.value ?? '',
    summary: () => ({ value: null }),
  },
  {
    key: 'quality',
    label: 'Quality ranking',
    sub: 'Ad relevance diagnostics',
    width: 146,
    align: 'left',
    sortable: true,
    menu: true,
    summary: () => ({ value: null }),
  },
  {
    key: 'engagement',
    label: 'Engagement rate ranking',
    sub: 'Ad relevance diagnostics',
    width: 152,
    align: 'left',
    sortable: true,
    menu: true,
    summary: () => ({ value: null }),
  },
  {
    key: 'conversion',
    label: 'Conversion rate ranking',
    sub: 'Ad relevance diagnostics',
    width: 152,
    align: 'left',
    sortable: true,
    menu: true,
    summary: () => ({ value: null }),
  },
  {
    key: 'roas',
    label: 'Purchase ROAS (return on ad spend)',
    width: 146,
    align: 'right',
    sortable: true,
    menu: true,
    drill: true,
    summary: () => ({ value: null, caption: 'Average' }),
  },
  {
    key: 'costPerLpv',
    label: 'Cost per landing page view',
    width: 196,
    align: 'right',
    sortable: true,
    menu: true,
    drill: true,
    summary: (rows) => {
      const spent = sum(rows, (c) => c.raw.spent);
      const views = sum(rows, (c) => c.raw.lpv);
      return views
        ? { value: naira2(spent / views), caption: 'Per Action' }
        : { value: null, caption: 'Per Action' };
    },
  },
  {
    key: 'ctrLink',
    label: 'CTR (link click-through rate)',
    width: 164,
    align: 'right',
    sortable: true,
    menu: true,
    summary: () => ({ value: '3.51%', caption: 'Per Impressions' }),
  },
  {
    key: 'ctrAll',
    label: 'CTR (all)',
    width: 116,
    align: 'right',
    sortable: true,
    menu: true,
    summary: () => ({ value: '6.65%', caption: 'Per Impressions' }),
  },
  {
    key: 'lpv',
    label: 'Landing page views',
    width: 152,
    align: 'right',
    sortable: true,
    menu: true,
    drill: true,
    sortBy: (c) => c.raw.lpv,
    summary: (rows) => {
      const t = sum(rows, (c) => c.raw.lpv);
      return t
        ? { value: t.toLocaleString('en-US'), caption: 'Total' }
        : { value: null, caption: 'Total' };
    },
  },
];

/** The frozen head of every row: checkbox, switch, name, delivery, actions. */
export const LEAD = {
  check: 46,
  switch: 86,
  name: 390,
  delivery: 170,
  actions: 200,
} as const;

export const LEAD_WIDTH = LEAD.check + LEAD.switch + LEAD.name + LEAD.delivery + LEAD.actions;
export const TABLE_WIDTH = LEAD_WIDTH + COLUMNS.reduce((t, c) => t + c.width, 0) + 48;
