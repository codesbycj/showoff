import type { IconName } from '@/components/Icon';

/**
 * The sidebar, and which of it is real.
 *
 * Rule 1: exactly three tabs are built; the rest stay in the menu and stay
 * inactive. The reference's sidebar has ten items in two groups and that is
 * part of the design — cutting it to three would be a different sidebar.
 *
 * Dashboard, Products and Orders & Invoices are the three. Dashboard because
 * it is the screen that was dropped. Products and Orders & Invoices because
 * they are the two the dashboard itself keeps pointing at — every figure on it
 * is either a product or an order — and because they are the two with a real
 * catalogue and a real ledger behind them. Sales Analytics and Customer
 * Insights would both have been another page of the same charts.
 */
export type TabId =
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'analytics'
  | 'customers'
  | 'reports'
  | 'settings'
  | 'team'
  | 'help'
  | 'logout';

export interface Tab {
  id: TabId;
  label: string;
  icon: IconName;
  group: 'menu' | 'others';
  /** Built, and switchable. Exactly three of these. */
  live: boolean;
  count?: number;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid', group: 'menu', live: true },
  { id: 'products', label: 'Products', icon: 'box', group: 'menu', live: true, count: 4 },
  {
    id: 'orders',
    label: 'Orders & Invoices',
    icon: 'receipt',
    group: 'menu',
    live: true,
    count: 8,
  },
  { id: 'analytics', label: 'Sales Analytics', icon: 'chart', group: 'menu', live: false },
  { id: 'customers', label: 'Customer Insights', icon: 'users', group: 'menu', live: false },
  { id: 'reports', label: 'Reports', icon: 'report', group: 'menu', live: false, count: 2 },
  { id: 'settings', label: 'Settings', icon: 'settings', group: 'others', live: false },
  { id: 'team', label: 'Team Members', icon: 'team', group: 'others', live: false, count: 3 },
  { id: 'help', label: 'Help Center', icon: 'help', group: 'others', live: false },
  { id: 'logout', label: 'Logout', icon: 'logout', group: 'others', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
export const labelOf = (id: TabId) => TABS.find((t) => t.id === id)?.label ?? '';
