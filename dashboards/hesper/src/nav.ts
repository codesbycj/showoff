/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference's top bar carries five destinations. Three are built;
 * **Team** and **Company** stay in the bar and stay inert — dimmed,
 * `aria-disabled`, skipped by the keyboard, not-allowed under the pointer,
 * and a click does nothing at all.
 */
export type TabId = 'overview' | 'tasks' | 'team' | 'payments' | 'company';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'overview', label: 'Overview', live: true },
  { id: 'tasks', label: 'Task', live: true },
  { id: 'team', label: 'Team', live: false },
  { id: 'payments', label: 'Payment', live: true },
  { id: 'company', label: 'Company', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

/** The heading over each built tab. The reference prints one on Overview. */
export const TITLES: Record<TabId, string> = {
  overview: 'Company Overview',
  tasks: 'Matters in progress',
  team: 'Team',
  payments: 'Billing and payments',
  company: 'Company',
};
