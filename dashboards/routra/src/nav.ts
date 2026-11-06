/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference's nav is an icon rail down the left with eight glyphs and no
 * labels. Three are built; the rest stay and are inert — muted,
 * `aria-disabled`, skipped by the keyboard, not-allowed under the pointer,
 * and a click does nothing.
 */
export type TabId =
  'fleet' | 'routes' | 'vehicles' | 'map' | 'depot' | 'messages' | 'inbox' | 'alerts';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'fleet', label: 'Fleet', live: true },
  { id: 'map', label: 'Live map', live: false },
  { id: 'routes', label: 'Routes', live: true },
  { id: 'vehicles', label: 'Vehicles', live: true },
  { id: 'depot', label: 'Depot', live: false },
  { id: 'messages', label: 'Messages', live: false },
  { id: 'inbox', label: 'Paperwork', live: false },
  { id: 'alerts', label: 'Alerts', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);

export const TITLES: Record<TabId, string> = {
  fleet: 'Fleet',
  routes: 'Routes',
  vehicles: 'Vehicles',
  map: 'Live map',
  depot: 'Depot',
  messages: 'Messages',
  inbox: 'Paperwork',
  alerts: 'Alerts',
};
