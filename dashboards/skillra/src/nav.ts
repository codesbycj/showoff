/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference's rail is seven unlabelled glyphs with no current state and
 * no way to tell one from another. Three are built and named; the rest keep
 * their glyphs and are genuinely inert — dimmed, `aria-disabled`, skipped by
 * the keyboard, not-allowed under the pointer, and a click does nothing.
 */
export type TabId = 'learn' | 'courses' | 'tasks' | 'calendar' | 'messages' | 'settings';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'learn', label: 'Learn', live: true },
  { id: 'courses', label: 'Courses', live: true },
  { id: 'tasks', label: 'Tasks', live: true },
  { id: 'calendar', label: 'Calendar', live: false },
  { id: 'messages', label: 'Messages', live: false },
  { id: 'settings', label: 'Settings', live: false },
];
