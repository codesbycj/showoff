/**
 * The nav, and which of it is real (rule 1).
 *
 * Three groups, as the reference draws them: MAIN MENU, OTHER and ACCOUNT.
 * Three of the eleven are built; the other eight stay in the sidebar and stay
 * inert, including the one carrying a count badge.
 *
 * The reference spells two of its own entries wrong — "Housewest" for
 * Houseware and "Perfomance" for Performance, with "Setings" at the foot.
 * They are corrected here (rule 2: fix the reference's mistakes, and say so).
 */
export type TabId =
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'customers'
  | 'chat'
  | 'email'
  | 'analytics'
  | 'integration'
  | 'performance'
  | 'account'
  | 'members';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
  group: 'main' | 'other' | 'account';
  count?: number;
  info?: boolean;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', live: true, group: 'main' },
  { id: 'products', label: 'Products', live: true, group: 'main' },
  { id: 'orders', label: 'Order', live: true, group: 'main' },
  { id: 'customers', label: 'Customers', live: false, group: 'main' },
  { id: 'chat', label: 'Chat', live: false, group: 'main', count: 22 },
  { id: 'email', label: 'Email', live: false, group: 'other' },
  { id: 'analytics', label: 'Analytics', live: false, group: 'other' },
  { id: 'integration', label: 'Integration', live: false, group: 'other' },
  { id: 'performance', label: 'Performance', live: false, group: 'other' },
  { id: 'account', label: 'Account', live: false, group: 'account', info: true },
  { id: 'members', label: 'Members', live: false, group: 'account' },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
