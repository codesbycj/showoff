import type { IconName } from '@/components/Icon';

/**
 * The icon rail, and which of it is real.
 *
 * Rule 1: exactly three are built; the rest stay in the rail and stay inactive.
 * The reference's rail is seven icons and a logout, with no labels at all —
 * every entry here carries an `aria-label` and a tooltip, which the board could
 * not show and a keyboard user cannot do without.
 *
 * Overview, Transactions and Invoices are the three. Overview because it is the
 * screen that was dropped; Transactions because every figure on the Overview is
 * an aggregate of it and there is nowhere else to see the rows; Invoices
 * because the Overview card explicitly points at it ("View all invoices").
 * Analytics would have been the Revenue chart again on its own page.
 */
export type TabId =
  | 'overview'
  | 'transactions'
  | 'analytics'
  | 'invoices'
  | 'scheduled'
  | 'apps'
  | 'settings'
  | 'logout';

export interface Tab {
  id: TabId;
  label: string;
  icon: IconName;
  /** Built, and switchable. Exactly three of these. */
  live: boolean;
  /** Pinned to the foot of the rail. */
  foot?: boolean;
}

export const TABS: Tab[] = [
  { id: 'overview', label: 'Overview', icon: 'home', live: true },
  { id: 'transactions', label: 'Transactions', icon: 'list', live: true },
  { id: 'analytics', label: 'Analytics', icon: 'pulse', live: false },
  { id: 'invoices', label: 'Invoices', icon: 'doc', live: true },
  { id: 'scheduled', label: 'Scheduled', icon: 'timer', live: false },
  { id: 'apps', label: 'Connected apps', icon: 'apps', live: false },
  { id: 'settings', label: 'Settings', icon: 'settings', live: false },
  { id: 'logout', label: 'Log out', icon: 'logout', live: false, foot: true },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
export const labelOf = (id: TabId) => TABS.find((t) => t.id === id)?.label ?? '';
