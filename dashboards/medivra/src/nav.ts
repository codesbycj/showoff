/**
 * The nav, and which of it is real (rule 1).
 *
 * The reference's bar reads Dashboard · Patients · Doctors · Schedules. Three
 * are built; the rest stay and are inert — muted, `aria-disabled`, skipped by
 * the keyboard, not-allowed under the pointer, and a click does nothing.
 *
 * Two destinations are added that the reference has no room for and a ward
 * cannot run without: **Medications**, because administering them is most of a
 * nursing shift, and **Reports**, because the ward's own figures have to leave
 * the screen. Both are inert, and naming them is more honest than a nav that
 * implies this is everything.
 */
export type TabId = 'shift' | 'patients' | 'assignments' | 'doctors' | 'medications' | 'reports';

export interface Tab {
  id: TabId;
  label: string;
  live: boolean;
}

export const TABS: Tab[] = [
  { id: 'shift', label: 'Dashboard', live: true },
  { id: 'patients', label: 'Patients', live: true },
  { id: 'assignments', label: 'Assignments', live: true },
  { id: 'doctors', label: 'Doctors', live: false },
  { id: 'medications', label: 'Medications', live: false },
  { id: 'reports', label: 'Reports', live: false },
];
