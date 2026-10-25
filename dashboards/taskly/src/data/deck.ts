/**
 * The content deck: every project, task, message, meeting and note.
 *
 * All invented (rule 5). Taskly is not a product, Milesto is not a team, and
 * nobody here is in a scrum at ten — which is what lets the build use
 * free-licensed photographs of real people for the avatars without the page
 * being able to pass as anyone's live workspace.
 */
import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

export const FACES = [face1, face2, face3, face4, face5, face6];

export const workspace = {
  brand: 'Taskly',
  team: 'Milesto Team',
  visibility: 'Private',
  user: { name: 'Brenda', full: 'Brenda Oyelowo', face: face1 },
  members: [face2, face3, face4],
  extra: 6,
  updated: 'Sep 5, 2025 — 10:50 AM',
};

/* ---------- projects ------------------------------------------------------ */

export interface Project {
  id: string;
  name: string;
  badge: string;
  /** The breadcrumb's middle segment. */
  group: string;
}

export const PROJECTS: Project[] = [
  { id: 'taskly', name: 'Taskly - Saas Dashboard', badge: 'Pro member', group: 'Ongoing Projects' },
  { id: 'neura', name: 'Neura Mobile Responsive', badge: 'Beta', group: 'Ongoing Projects' },
];

/* ---------- the board ----------------------------------------------------- */

export type ColumnId = 'todo' | 'progress' | 'review' | 'done';

export const COLUMNS: { id: ColumnId; label: string }[] = [
  { id: 'todo', label: 'To Do' },
  { id: 'progress', label: 'In Progress' },
  { id: 'review', label: 'Under Review' },
  { id: 'done', label: 'Completed' },
];

export type Priority = 'Urgent' | 'Low Priority' | 'Normal';

export interface Task {
  id: string;
  projectId: string;
  column: ColumnId;
  priority: Priority;
  due: string;
  title: string;
  summary: string;
  assignees: string[];
  extra: number;
  comments: number;
  links: number;
  /** [done, total] on the checklist. */
  checks: [number, number];
}

export const TASKS: Task[] = [
  {
    id: 'sidebar',
    projectId: 'taskly',
    column: 'todo',
    priority: 'Urgent',
    due: 'Due Sep 14',
    title: 'Revamp Sidebar',
    summary: 'Redesign navigation with better spacing for easier access.',
    assignees: [face2, face3, face4],
    extra: 2,
    comments: 10,
    links: 2,
    checks: [0, 2],
  },
  {
    id: 'onboarding',
    projectId: 'taskly',
    column: 'todo',
    priority: 'Low Priority',
    due: 'Due Sep 26',
    title: 'Onboarding Flow',
    summary: 'Simplify first-time user journey and reduce unnecessary setup steps.',
    assignees: [face5, face6, face2],
    extra: 3,
    comments: 7,
    links: 3,
    checks: [0, 7],
  },
  {
    id: 'tokens',
    projectId: 'taskly',
    column: 'progress',
    priority: 'Normal',
    due: 'Due Sep 18',
    title: 'Colour Token Pass',
    summary: 'One scale for every tint, and nothing hard-coded in a component.',
    assignees: [face3, face5],
    extra: 1,
    comments: 4,
    links: 1,
    checks: [3, 6],
  },
  {
    id: 'charts',
    projectId: 'taskly',
    column: 'progress',
    priority: 'Urgent',
    due: 'Due Sep 16',
    title: 'Chart Components',
    summary: 'Bars, donut and sparkline drawn from the data rather than traced.',
    assignees: [face4, face6],
    extra: 0,
    comments: 12,
    links: 4,
    checks: [2, 5],
  },
  {
    id: 'empty',
    projectId: 'taskly',
    column: 'review',
    priority: 'Normal',
    due: 'Due Sep 12',
    title: 'Empty States',
    summary: 'Every list says what to do when it has nothing in it.',
    assignees: [face2, face5],
    extra: 0,
    comments: 3,
    links: 0,
    checks: [4, 4],
  },
  {
    id: 'a11y',
    projectId: 'taskly',
    column: 'review',
    priority: 'Urgent',
    due: 'Due Sep 15',
    title: 'Contrast Audit',
    summary: 'Measure every text node against its own ground, not by eye.',
    assignees: [face3, face4, face6],
    extra: 1,
    comments: 9,
    links: 2,
    checks: [5, 8],
  },
  {
    id: 'focus',
    projectId: 'taskly',
    column: 'done',
    priority: 'Normal',
    due: 'Sep 4',
    title: 'Focus Rings',
    summary: 'One visible ring for the whole app, on every interactive control.',
    assignees: [face5],
    extra: 0,
    comments: 2,
    links: 1,
    checks: [3, 3],
  },
  {
    id: 'grid',
    projectId: 'taskly',
    column: 'done',
    priority: 'Low Priority',
    due: 'Sep 2',
    title: 'Shell Grid',
    summary: 'A fixed shell with inner scroll regions, so the page never scrolls.',
    assignees: [face2, face6],
    extra: 2,
    comments: 6,
    links: 3,
    checks: [5, 5],
  },
  {
    id: 'nav',
    projectId: 'neura',
    column: 'todo',
    priority: 'Urgent',
    due: 'Due Sep 19',
    title: 'Breakpoint Audit',
    summary: 'The rail collapses to a bar under 900, and nothing reflows twice.',
    assignees: [face4, face3],
    extra: 1,
    comments: 5,
    links: 2,
    checks: [1, 4],
  },
  {
    id: 'touch',
    projectId: 'neura',
    column: 'progress',
    priority: 'Normal',
    due: 'Due Sep 22',
    title: 'Touch Targets',
    summary: 'Nothing under 44px on a phone, including the inline text links.',
    assignees: [face6, face2, face5],
    extra: 0,
    comments: 8,
    links: 1,
    checks: [2, 9],
  },
  {
    id: 'motion',
    projectId: 'neura',
    column: 'review',
    priority: 'Low Priority',
    due: 'Due Sep 25',
    title: 'Reduced Motion',
    summary: 'Entrances do not play, and what is left is still usable.',
    assignees: [face3],
    extra: 0,
    comments: 2,
    links: 0,
    checks: [3, 3],
  },
  {
    id: 'export',
    projectId: 'neura',
    column: 'done',
    priority: 'Normal',
    due: 'Aug 29',
    title: 'Asset Export',
    summary: 'Every icon one grid, one stroke width, one file.',
    assignees: [face5, face4],
    extra: 1,
    comments: 4,
    links: 2,
    checks: [6, 6],
  },
];

export const tasksFor = (projectId: string, column: ColumnId) =>
  TASKS.filter((t) => t.projectId === projectId && t.column === column);

export const countFor = (projectId: string, column: ColumnId) => tasksFor(projectId, column).length;

/* ---------- the calendar -------------------------------------------------- */

export const CALENDAR = {
  month: 'Sep',
  year: 2025,
  /** 1 Sep 2025 is a Monday; the grid starts on Sunday. */
  startOffset: 1,
  days: 30,
  /** Days with something due, tinted as the reference tints them. */
  marks: {
    1: 'pink',
    12: 'accent',
    16: 'outline',
    25: 'amber',
    26: 'amber',
    27: 'amber',
  } as Record<number, 'pink' | 'accent' | 'outline' | 'amber'>,
};

/* ---------- the meeting --------------------------------------------------- */

export const MEETING = {
  title: 'Daily Scrum',
  date: 'Sep 12',
  time: '10:00 - 10:15',
  host: { name: 'Michie Alvarez', face: face3 },
  attendees: [face2, face4, face5],
};

/* ---------- the chat ------------------------------------------------------ */

export interface Message {
  id: string;
  from: string;
  face: string;
  text: string;
  at: string;
  mine: boolean;
  /** A drawn glyph after the text, where the reference uses an emoji. */
  glyph?: 'wave' | 'thumb';
}

export const MESSAGES: Message[] = [
  {
    id: 'm1',
    from: 'Michie',
    face: face3,
    text: 'Morning Team',
    at: '07:00',
    mine: false,
    glyph: 'wave',
  },
  {
    id: 'm2',
    from: 'Michie',
    face: face3,
    text: 'Today we will have a scrum meeting at 10 am.',
    at: '07:01',
    mine: false,
  },
  {
    id: 'm3',
    from: 'Brenda',
    face: face1,
    text: 'Okay Michie',
    at: '07:03',
    mine: true,
    glyph: 'thumb',
  },
];

/* ---------- the timer and the note ---------------------------------------- */

export const TIMER = { label: 'Timer', startSeconds: 20 * 60 + 10 };

export const NOTE = {
  title: 'Revamp Sidebar & Update before Sep 14',
  when: 'Today',
};
