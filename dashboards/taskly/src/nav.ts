import type { IconName } from '@/components/Icon';

/**
 * The menu, and which of it is real.
 *
 * Rule 1: exactly three are built; the rest stay in the menu and stay inactive.
 *
 * Dashboard, Task Overview and Calendar are the three. Dashboard because it is
 * the screen that was dropped. Task Overview because the board on the dashboard
 * only ever shows one column at a time and the whole point of a task tool is
 * seeing the rest. Calendar because the dashboard's month chip is the only
 * place dates appear and there is nowhere to act on them. Team Members and
 * Report Summary would both have been another list of the same people.
 */
export type TabId = 'dashboard' | 'tasks' | 'calendar' | 'team' | 'report' | 'settings';

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
  { id: 'tasks', label: 'Task Overview', icon: 'tasks', live: true, count: 4 },
  { id: 'calendar', label: 'Calendar', icon: 'calendar', live: true, count: 2 },
  { id: 'team', label: 'Team Members', icon: 'team', live: false },
  { id: 'report', label: 'Report Summary', icon: 'report', live: false, count: 5 },
  { id: 'settings', label: 'Settings', icon: 'settings', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
export const labelOf = (id: TabId) => TABS.find((t) => t.id === id)?.label ?? '';
