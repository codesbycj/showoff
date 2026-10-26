/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout. The reference's own figures do not hold: Net
 * Profit/Loss reads IDR 3.150.000 against revenue of 12.450.000 less expenses
 * of 9.300.000, which is right — but its tax split reads 80.4% / 11.6% / 8.0%,
 * which is 100%, over a single table row of IDR 1.000.000 against a payable of
 * 1.800.000. The split is computed from the lines here.
 */
import { rng } from '@/data/rng';

export const ACCOUNT = {
  workspace: 'Tokonya Denis',
  plan: 'Free Plan · 2 Members',
  holder: 'Denisujatmiko',
  email: 'denisujatmiko21@tallora.id',
  edited: 'Edited 23m ago',
  range: '1 August 2026 - 31 August 2026',
};

/* ------------------------------------------------------------------ month */

export interface Month {
  id: string;
  label: string;
  scale: number;
}

export const MONTHS: Month[] = [
  { id: 'aug', label: 'August', scale: 1 },
  { id: 'jul', label: 'July', scale: 0.88 },
  { id: 'jun', label: 'June', scale: 0.79 },
];

export const REVENUE = 12_450_000;
export const EXPENSES = 9_300_000;

/** Net is revenue less expenses, always. Never a third literal. */
export const netOf = (scale: number) => Math.round((REVENUE - EXPENSES) * scale);

/* -------------------------------------------------------------- cash flow */

export type Direction = 'inflow' | 'outflow';

/*
 * Top to bottom, as the reference prints them: the latest band is the first
 * row. Written the other way round the grid reads upside down against the
 * picture.
 */
export const BANDS = ['12-16h', '8-12h', '4-8h', '0-4h'];
export const DAYS = Array.from({ length: 31 }, (_, i) => String(i + 1));

/**
 * A band-by-day grid of money moved, seeded so it is the same every reload.
 *
 * Outflow is drawn from a different stream, so the two directions are
 * genuinely different grids rather than one grid relabelled.
 */
export function cashflow(direction: Direction, monthId: string): number[][] {
  const scale = MONTHS.find((m) => m.id === monthId)?.scale ?? 1;
  const next = rng((direction === 'inflow' ? 3191 : 5273) + monthId.length * 17);
  return BANDS.map((_, b) =>
    DAYS.map((_, d) => {
      /* Weekday-heavy, with the working bands busiest. */
      const weekday = d % 7 < 5 ? 1 : 0.35;
      const bandWeight = [0.7, 1, 0.9, 0.3][b];
      return Math.round(next() * 320_000 * weekday * bandWeight * scale);
    }),
  );
}

export const flowTotal = (grid: number[][]) =>
  grid.reduce((t, row) => t + row.reduce((s, v) => s + v, 0), 0);

/** The four swatches under the legend, from the grid's own range. */
export function flowLegend(grid: number[][]) {
  const max = Math.max(...grid.flat(), 1);
  return [1, 2, 3, 4].map((i) => Math.round((max * i) / 4));
}

/* -------------------------------------------------------- accounts overview */

export interface Ledger {
  id: string;
  label: string;
  amount: number;
  tone: 'accent' | 'amber';
  note: string;
}

export const LEDGERS: Ledger[] = [
  {
    id: 'payable',
    label: 'Accounts Payable',
    amount: 1_800_000,
    tone: 'accent',
    note: 'Owed to suppliers',
  },
  {
    id: 'receivable',
    label: 'Accounts Receivable',
    amount: 2_500_000,
    tone: 'amber',
    note: 'Owed by customers',
  },
];

/* ----------------------------------------------------------- tax liabilities */

export type TaxStatus = 'Not Paid' | 'Scheduled' | 'Paid';

export interface Tax {
  id: string;
  label: string;
  amount: number;
  due: string;
  stamp: number;
  status: TaxStatus;
  token: string;
}

export const TAXES: Tax[] = [
  {
    id: 'vat',
    label: 'Value Added Tax',
    amount: 1_000_000,
    due: 'Sep 15',
    stamp: 20260915,
    status: 'Not Paid',
    token: '--color-tax-vat',
  },
  {
    id: 'income',
    label: 'Employee Income Tax',
    amount: 144_000,
    due: 'Sep 10',
    stamp: 20260910,
    status: 'Scheduled',
    token: '--color-tax-income',
  },
  {
    id: 'services',
    label: 'Tax on Services',
    amount: 99_000,
    due: 'Sep 20',
    stamp: 20260920,
    status: 'Not Paid',
    token: '--color-tax-services',
  },
  {
    id: 'import',
    label: 'Import Duty',
    amount: 62_000,
    due: 'Sep 28',
    stamp: 20260928,
    status: 'Paid',
    token: '--color-tax-vat',
  },
  {
    id: 'stamp',
    label: 'Stamp Duty',
    amount: 18_000,
    due: 'Oct 02',
    stamp: 20261002,
    status: 'Scheduled',
    token: '--color-tax-income',
  },
  {
    id: 'local',
    label: 'Local Levy',
    amount: 41_000,
    due: 'Oct 08',
    stamp: 20261008,
    status: 'Not Paid',
    token: '--color-tax-services',
  },
];

export const taxTotal = () => TAXES.reduce((t, x) => t + x.amount, 0);

/** The stacked bar's shares, computed from the lines so they sum to 100. */
export function taxShares() {
  const total = taxTotal() || 1;
  return TAXES.slice(0, 3).map((t) => ({
    id: t.id,
    label: t.label,
    token: t.token,
    pct: Math.round((t.amount / total) * 1000) / 10,
  }));
}

/* ------------------------------------------------------ financial statements */

export interface StatementLine {
  id: string;
  label: string;
  group: 'Revenue' | 'Cost of sales' | 'Operating' | 'Other';
  amount: number;
}

export const STATEMENT: StatementLine[] = [
  { id: 's1', label: 'Product sales', group: 'Revenue', amount: 9_820_000 },
  { id: 's2', label: 'Service income', group: 'Revenue', amount: 2_180_000 },
  { id: 's3', label: 'Other income', group: 'Revenue', amount: 450_000 },
  { id: 's4', label: 'Materials', group: 'Cost of sales', amount: -3_940_000 },
  { id: 's5', label: 'Freight', group: 'Cost of sales', amount: -860_000 },
  { id: 's6', label: 'Packaging', group: 'Cost of sales', amount: -410_000 },
  { id: 's7', label: 'Salaries', group: 'Operating', amount: -2_480_000 },
  { id: 's8', label: 'Rent', group: 'Operating', amount: -720_000 },
  { id: 's9', label: 'Utilities', group: 'Operating', amount: -310_000 },
  { id: 's10', label: 'Software', group: 'Operating', amount: -268_000 },
  { id: 's11', label: 'Marketing', group: 'Operating', amount: -192_000 },
  { id: 's12', label: 'Bank charges', group: 'Other', amount: -84_000 },
  { id: 's13', label: 'Interest', group: 'Other', amount: -36_000 },
];

export const STATEMENT_GROUPS = ['Revenue', 'Cost of sales', 'Operating', 'Other'] as const;

export const groupTotal = (g: string) =>
  STATEMENT.filter((l) => l.group === g).reduce((s, l) => s + l.amount, 0);

/** Twelve months of a statement group, seeded. */
export function groupTrail(g: string): number[] {
  const next = rng(g.length * 991 + g.charCodeAt(0));
  const base = Math.abs(groupTotal(g)) / 12;
  return Array.from({ length: 12 }, () => Math.round(base * (0.55 + next() * 1.1)));
}
