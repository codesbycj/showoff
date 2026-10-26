/**
 * The nav, and which of it is real (rule 1).
 *
 * Three groups, as the reference draws them: MAIN MENU, FEATURES and GENERAL.
 * Three of the nine are built; the other six stay in the sidebar and stay
 * inert, including the two carrying count badges — the badges are part of the
 * picture, they just do not open anything.
 */
export type TabId =
  | 'dashboard'
  | 'analytics'
  | 'transactions'
  | 'invoices'
  | 'recurring'
  | 'subscriptions'
  | 'feedback'
  | 'settings'
  | 'help';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
  group: 'main' | 'features' | 'general';
  count?: number;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', live: true, group: 'main' },
  { id: 'analytics', label: 'Analytics', live: false, group: 'main', count: 20 },
  { id: 'transactions', label: 'Transactions', live: true, group: 'main' },
  { id: 'invoices', label: 'Invoices', live: false, group: 'main' },
  { id: 'recurring', label: 'Recurring', live: true, group: 'features', count: 16 },
  { id: 'subscriptions', label: 'Subscriptions', live: false, group: 'features' },
  { id: 'feedback', label: 'Feedback', live: false, group: 'features' },
  { id: 'settings', label: 'Settings', live: false, group: 'general' },
  { id: 'help', label: 'Help Desk', live: false, group: 'general' },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
