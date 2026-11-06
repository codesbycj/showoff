/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference's pill bar reads Dashboard · Speaking · Progress · Courses.
 * Three are built; Speaking stays and is inert, along with two destinations a
 * language app cannot be without and the picture has no room for — **Review**,
 * the spaced-repetition queue that is most of a learner's day, and
 * **Community**, where the friends board on the dashboard leads.
 *
 * Inert means inert: dimmed, `aria-disabled`, skipped by the keyboard,
 * not-allowed under the pointer, and a click does nothing.
 */
export type TabId = 'dashboard' | 'courses' | 'progress' | 'speaking' | 'review' | 'community';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'dashboard', label: 'Dashboard', live: true },
  { id: 'speaking', label: 'Speaking', live: false },
  { id: 'progress', label: 'Progress', live: true },
  { id: 'courses', label: 'Courses', live: true },
  { id: 'review', label: 'Review', live: false },
  { id: 'community', label: 'Community', live: false },
];
