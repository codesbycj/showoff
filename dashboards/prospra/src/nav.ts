/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference's top bar carries five: Dashboard · Leads · Workflows ·
 * Sales · Reports. Three are built; **Workflows** and **Reports** stay in the
 * bar and stay inert — muted, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing.
 */
export type TabId = 'dashboard' | 'leads' | 'workflows' | 'sales' | 'reports';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', live: true },
  { id: 'leads', label: 'Leads', live: true },
  { id: 'workflows', label: 'Workflows', live: false },
  { id: 'sales', label: 'Sales', live: true },
  { id: 'reports', label: 'Reports', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

export const TITLES: Record<TabId, string> = {
  dashboard: 'Revenue dashboard',
  leads: 'Leads',
  workflows: 'Workflows',
  sales: 'Sales pipeline',
  reports: 'Reports',
};

export const SUBTITLES: Record<TabId, string> = {
  dashboard: 'Where the quarter stands, and what is in the way',
  leads: 'Everyone in the funnel, how qualified, and who owns them',
  workflows: '',
  sales: 'Every open deal by stage, weighted against its probability',
  reports: '',
};
