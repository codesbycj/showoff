import type { IconName } from '@/components/Icon';

/**
 * The sidebar, and which of it is real.
 *
 * Rule 1: exactly three are built; the other seven stay in the menu and stay
 * inactive.
 *
 * Dashboard, Orders and Customers are the three. Dashboard because it is the
 * screen that was dropped. Orders because every headline figure on it — sales,
 * order count, average order value — is an aggregate of the order table and
 * there is nowhere else to see a row. Customers because the entire right-hand
 * column of the dashboard is customer summaries with no page behind them.
 * Products and Categories would have been a third table of the same shape.
 */
export type TabId =
  | 'dashboard'
  | 'orders'
  | 'products'
  | 'categories'
  | 'customers'
  | 'reviews'
  | 'discounts'
  | 'analytics'
  | 'marketing'
  | 'settings';

export interface Tab {
  id: TabId;
  label: string;
  icon: IconName;
  /** Built, and switchable. Exactly three of these. */
  live: boolean;
  count?: number;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', icon: 'grid', live: true },
  { id: 'orders', label: 'Orders', icon: 'bag', live: true, count: 24 },
  { id: 'products', label: 'Products', icon: 'box', live: false },
  { id: 'categories', label: 'Categories', icon: 'tags', live: false },
  { id: 'customers', label: 'Customers', icon: 'users', live: true, count: 32 },
  { id: 'reviews', label: 'Reviews', icon: 'star', live: false, count: 14 },
  { id: 'discounts', label: 'Discounts', icon: 'percent', live: false },
  { id: 'analytics', label: 'Analytics', icon: 'chart', live: false },
  { id: 'marketing', label: 'Marketing', icon: 'megaphone', live: false },
  { id: 'settings', label: 'Settings', icon: 'settings', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
export const labelOf = (id: TabId) => TABS.find((t) => t.id === id)?.label ?? '';
