import type { IconName } from '@/components/Icon';

/**
 * The nav, and which of it is real.
 *
 * Rule 1: exactly three are built; the rest stay in the bar and stay inactive.
 *
 * Overview, Activity and Manage are the three. Overview because it is the
 * screen that was dropped. Activity because the five rows on the Overview are a
 * sample of a ledger with nowhere else to read it. Manage because the wallets,
 * the cards and the spending limit are all shown on the Overview as summaries
 * with no page behind them. Program, Account and Reports would each have been
 * another view of the same money.
 */
export type TabId = 'overview' | 'activity' | 'manage' | 'program' | 'account' | 'reports';

export interface Tab {
  id: TabId;
  label: string;
  /** Built, and switchable. Exactly three of these. */
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'overview', label: 'Overview', live: true },
  { id: 'activity', label: 'Activity', live: true },
  { id: 'manage', label: 'Manage', live: true },
  { id: 'program', label: 'Program', live: false },
  { id: 'account', label: 'Account', live: false },
  { id: 'reports', label: 'Reports', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

/**
 * The left rail.
 *
 * It is a second presentation of the *same* destinations, not a second nav with
 * its own rules: three of its icons carry the three live tabs and stay in step
 * with the bar above, and the rest are inert in exactly the way the bar's
 * inactive entries are. A rail that navigated somewhere the top nav could not
 * would be two navigations disagreeing on one screen.
 */
export interface RailItem {
  id: string;
  label: string;
  icon: IconName;
  /** The tab this icon opens, when it opens one. */
  tab?: TabId;
  foot?: boolean;
}

export const RAIL: RailItem[] = [
  { id: 'r-overview', label: 'Overview', icon: 'grid', tab: 'overview' },
  { id: 'r-calendar', label: 'Schedule', icon: 'calendar' },
  { id: 'r-mail', label: 'Messages', icon: 'mail' },
  { id: 'r-activity', label: 'Activity', icon: 'doc', tab: 'activity' },
  { id: 'r-people', label: 'Beneficiaries', icon: 'users' },
  { id: 'r-manage', label: 'Manage', icon: 'layers', tab: 'manage' },
  { id: 'r-settings', label: 'Settings', icon: 'settings' },
  { id: 'r-help', label: 'Help', icon: 'help', foot: true },
  { id: 'r-logout', label: 'Log out', icon: 'logout', foot: true },
];
