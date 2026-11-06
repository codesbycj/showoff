/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference's rail is eight unlabelled glyphs with no current state and
 * no way to tell one from another. Three are built and named; the rest stay,
 * keep their glyphs, and are genuinely inert — dimmed, `aria-disabled`,
 * skipped by the keyboard, not-allowed under the pointer, and a click does
 * nothing.
 */
export type TabId = 'home' | 'recordings' | 'team' | 'calendar' | 'files' | 'settings';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'home', label: 'Home', live: true },
  { id: 'recordings', label: 'Recordings', live: true },
  { id: 'team', label: 'Team', live: true },
  { id: 'calendar', label: 'Calendar', live: false },
  { id: 'files', label: 'Files', live: false },
  { id: 'settings', label: 'Settings', live: false },
];
