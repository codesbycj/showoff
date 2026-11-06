/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference's sidebar lists eleven destinations across three groups, all
 * of them flat and none of them current. Three are built; Schedule, Reports,
 * Clients and Settings stay and are genuinely inert — dimmed, `aria-disabled`,
 * skipped by the keyboard, not-allowed under the pointer, and a click does
 * nothing. The other four were cut rather than left as decoration.
 */
export type TabId = 'board' | 'tasks' | 'team' | 'schedule' | 'reports' | 'clients' | 'settings';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
  group: 'work' | 'records';
}

export const TABS: Tab[] = [
  { id: 'board', label: 'Board', live: true, group: 'work' },
  { id: 'tasks', label: 'All tasks', live: true, group: 'work' },
  { id: 'schedule', label: 'Schedule', live: false, group: 'work' },
  { id: 'reports', label: 'Reports', live: false, group: 'work' },
  { id: 'team', label: 'Team', live: true, group: 'records' },
  { id: 'clients', label: 'Clients', live: false, group: 'records' },
  { id: 'settings', label: 'Settings', live: false, group: 'records' },
];

export const GROUPS: { id: Tab['group']; label: string }[] = [
  { id: 'work', label: 'Work' },
  { id: 'records', label: 'Records' },
];
