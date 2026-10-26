/**
 * The nav, and which of it is real (rule 1).
 *
 * This design carries its nav twice: five labelled pills across the header and
 * an icon rail down the left edge. They are the same five destinations, so the
 * rail mirrors the header rather than being a second, unexplained set of
 * places — and an entry that is inert is inert in both, which is the only way
 * two nav strips can stay honest.
 */
export type TabId = 'dashboard' | 'reports' | 'documents' | 'history' | 'contacts';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', live: true },
  { id: 'reports', label: 'Reports', live: true },
  { id: 'documents', label: 'Documents', live: false },
  { id: 'history', label: 'History', live: true },
  { id: 'contacts', label: 'Contacts', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
