/**
 * The top nav, and which of it is real.
 *
 * Rule 1: exactly three are built; the rest stay in the bar and stay inactive.
 *
 * Dashboard, Financials and Fleet are the three. Dashboard because it is the
 * screen that was dropped. Financials because the revenue chart and the cost
 * breakdown on it are summaries with no page behind them. Fleet because
 * "fleet utilisation 95.1%" is the first figure on the dashboard and there is
 * nowhere to see what it is a percentage of. Customers, Reports, Insights and
 * Employees would each have been another table of the same ledger.
 */
export type TabId =
  'dashboard' | 'financials' | 'customers' | 'fleet' | 'reports' | 'insights' | 'employees';

export interface Tab {
  id: TabId;
  label: string;
  /** Built, and switchable. Exactly three of these. */
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', live: true },
  { id: 'financials', label: 'Financials', live: true },
  { id: 'customers', label: 'Customers', live: false },
  { id: 'fleet', label: 'Fleet', live: true },
  { id: 'reports', label: 'Reports', live: false },
  { id: 'insights', label: 'Insights', live: false },
  { id: 'employees', label: 'Employees', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
