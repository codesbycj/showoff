/**
 * The nav, and which of it is real (rule 1).
 *
 * This design's nav has **four** entries, not the five or six most dashboards
 * carry, so three live leaves exactly one inert rather than the usual two.
 * Cutting it to three, or inventing a fifth to make the arithmetic tidier,
 * would both be a different design from the one in the picture.
 */
export type TabId = 'overview' | 'wealth' | 'cards' | 'tools';

export interface Tab {
  id: TabId;
  label: string;
  /** Built, and switchable. */
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'overview', label: 'Overview', live: true },
  { id: 'wealth', label: 'Wealth', live: true },
  { id: 'cards', label: 'Cards', live: true },
  { id: 'tools', label: 'Tools', live: false },
];

export const LIVE_TABS = TABS.filter((t) => t.live);
