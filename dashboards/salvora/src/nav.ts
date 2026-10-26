/**
 * The nav, and which of it is real (rule 1).
 *
 * Two groups, as the reference draws them: MENU and GENERAL. Three of the
 * eight are built; the other five stay in the sidebar and stay inert,
 * including the one carrying a count badge — the badge is part of the picture,
 * it just does not open anything.
 */
export type TabId =
  | 'overview'
  | 'statistics'
  | 'customers'
  | 'product'
  | 'messages'
  | 'transactions'
  | 'settings'
  | 'security';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
  group: 'menu' | 'general';
  expandable?: boolean;
  count?: number;
}

export const TABS: Tab[] = [
  { id: 'overview', label: 'Overview', live: true, group: 'menu' },
  { id: 'statistics', label: 'Statistics', live: false, group: 'menu' },
  { id: 'customers', label: 'Customers', live: true, group: 'menu' },
  { id: 'product', label: 'Product', live: false, group: 'menu', expandable: true },
  { id: 'messages', label: 'Messages', live: false, group: 'menu', count: 23 },
  { id: 'transactions', label: 'Transactions', live: true, group: 'menu' },
  { id: 'settings', label: 'Settings', live: false, group: 'general' },
  { id: 'security', label: 'Security', live: false, group: 'general' },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
