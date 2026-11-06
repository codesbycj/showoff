/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference's rail carries six glyphs and no labels. Three are built; the
 * rest stay and are inert — muted, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing.
 */
export type TabId = 'shipments' | 'build' | 'tracking' | 'reports' | 'clients' | 'settings';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'shipments', label: 'Shipments', live: true },
  { id: 'build', label: 'New shipment', live: true },
  { id: 'tracking', label: 'Tracking', live: true },
  { id: 'reports', label: 'Reports', live: false },
  { id: 'clients', label: 'Clients', live: false },
  { id: 'settings', label: 'Settings', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

export const TITLES: Record<TabId, string> = {
  shipments: 'Shipments',
  build: 'New shipment',
  tracking: 'Tracking',
  reports: 'Reports',
  clients: 'Clients',
  settings: 'Settings',
};
