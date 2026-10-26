/**
 * The nav, and which of it is real (rule 1).
 *
 * Three groups, as the reference draws them: GENERAL, MASTER and SUPPORT.
 * Three of the nine are built; the other six stay in the sidebar and stay
 * inert, including the two carrying count badges.
 */
export type TabId =
  | 'home'
  | 'inbox'
  | 'statements'
  | 'accounts'
  | 'metrics'
  | 'budgeting'
  | 'tax'
  | 'settings'
  | 'help';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
  group: 'general' | 'master' | 'support';
  count?: number;
}

export const TABS: Tab[] = [
  { id: 'home', label: 'Home', live: true, group: 'general' },
  { id: 'inbox', label: 'Inbox', live: false, group: 'general', count: 12 },
  { id: 'statements', label: 'Financial Statements', live: true, group: 'master' },
  { id: 'accounts', label: 'Accounts Management', live: false, group: 'master' },
  { id: 'metrics', label: 'Key Metrics', live: false, group: 'master' },
  { id: 'budgeting', label: 'Budgeting & Forecasting', live: false, group: 'master' },
  { id: 'tax', label: 'Tax & Compliance', live: true, group: 'master', count: 3 },
  { id: 'settings', label: 'Settings', live: false, group: 'support' },
  { id: 'help', label: 'Help & centre', live: false, group: 'support' },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
