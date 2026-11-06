/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the product, the team, every project and every
 * recording. **The reference's own content had to go**: its video list names
 * the National Hospital for Neurology and Neurosurgery and a Leica M530 OH6
 * surgical microscope, and a real institution and a real instrument over
 * invented figures is the one thing this series must not produce (rule 8).
 *
 * **One recording list and one week feed all three tabs.** The home screen's
 * figures, the recordings library and the team board all read `RECORDINGS`,
 * `WEEK` and `MEMBERS`. Change one recording's length and the week's hours,
 * the split, the member's own total and the library all move together.
 */
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

export const WORKSPACE = {
  name: 'Hivora',
  team: 'Northline Product',
  /** The clock everything reads. Frozen, so a take repeats. */
  today: '2023-05-17',
  month: 'May 2023',
  weekday: 'Wednesday',
};

/* ------------------------------------------------------------------ members */

export type Role = 'Design' | 'Engineering' | 'Research' | 'Product';

export interface Member {
  id: string;
  name: string;
  role: Role;
  face: string;
  /** Where they are right now — the one thing a team board is opened for. */
  state: 'in a call' | 'focusing' | 'available' | 'away';
  /** Hours of calls, focus and async this week, which sum to their total. */
  calls: number;
  focus: number;
  async: number;
}

export const MEMBERS: Member[] = [
  {
    id: 'm1',
    name: 'Sophia Brown',
    role: 'Design',
    face: face2,
    state: 'in a call',
    calls: 6.5,
    focus: 14,
    async: 3.5,
  },
  {
    id: 'm2',
    name: 'Alex Johnson',
    role: 'Engineering',
    face: face3,
    state: 'focusing',
    calls: 3,
    focus: 21,
    async: 2.5,
  },
  {
    id: 'm3',
    name: 'Daniel Turner',
    role: 'Engineering',
    face: face6,
    state: 'available',
    calls: 4.5,
    focus: 18,
    async: 4,
  },
  {
    id: 'm4',
    name: 'Priya Raghunathan',
    role: 'Research',
    face: face4,
    state: 'in a call',
    calls: 8,
    focus: 11,
    async: 5.5,
  },
  {
    id: 'm5',
    name: 'Marco Oliveira',
    role: 'Product',
    face: face5,
    state: 'away',
    calls: 9.5,
    focus: 8,
    async: 6,
  },
  {
    id: 'm6',
    name: 'Jordan Campbell',
    role: 'Design',
    face: face1,
    state: 'available',
    calls: 5,
    focus: 16,
    async: 3,
  },
];

export const memberOf = (id: string) => MEMBERS.find((m) => m.id === id) ?? MEMBERS[0];

export const STATE_TONE: Record<Member['state'], 'accent' | 'positive' | 'warn' | 'quiet'> = {
  'in a call': 'accent',
  focusing: 'warn',
  available: 'positive',
  away: 'quiet',
};

export const memberHours = (m: Member) => m.calls + m.focus + m.async;

export const ROLES: Role[] = ['Design', 'Engineering', 'Research', 'Product'];

/* ------------------------------------------------------------------- the week */

/**
 * How the team's week divides. The reference's "Data · 10,4h" uses a decimal
 * comma in an English interface and never says what the three bars are shares
 * of; these three sum to the figure above them.
 */
export const SPLIT = [
  { id: 'calls', label: 'Calls', token: '--color-calls' },
  { id: 'focus', label: 'Focus', token: '--color-focus' },
  { id: 'async', label: 'Async', token: '--color-async' },
] as const;

export type SplitId = (typeof SPLIT)[number]['id'];

export const teamHours = (k: SplitId) => MEMBERS.reduce((t, m) => t + m[k], 0);

export const totalHours = () => SPLIT.reduce((t, s) => t + teamHours(s.id), 0);

export const shareOf = (k: SplitId) => (teamHours(k) / totalHours()) * 100;

/** Hours in a day, two decimals of an hour rather than a decimal comma. */
export const asHours = (h: number) =>
  `${Math.floor(h)}h ${String(Math.round((h % 1) * 60)).padStart(2, '0')}m`;

export interface WeekDay {
  day: string;
  date: number;
  calls: number;
  focus: number;
  async: number;
}

export const WEEK: WeekDay[] = [
  { day: 'Mon', date: 15, calls: 7.5, focus: 14, async: 4 },
  { day: 'Tue', date: 16, calls: 6, focus: 17, async: 5 },
  { day: 'Wed', date: 17, calls: 9, focus: 12, async: 4.5 },
  { day: 'Thu', date: 18, calls: 5.5, focus: 19, async: 3.5 },
  { day: 'Fri', date: 19, calls: 4, focus: 20, async: 4 },
  { day: 'Sat', date: 20, calls: 0, focus: 3, async: 1 },
];

export const dayTotal = (d: WeekDay) => d.calls + d.focus + d.async;

export const LAST_WEEK = { calls: 41.5, focus: 79, async: 22 };

export const changeOf = (k: SplitId) => ((teamHours(k) - LAST_WEEK[k]) / LAST_WEEK[k]) * 100;

/* --------------------------------------------------------------- recordings */

export type Topic = 'Design review' | 'Standup' | 'Research' | 'Workshop' | 'Demo';

export interface Recording {
  id: string;
  title: string;
  topic: Topic;
  date: string;
  /** Seconds, so a duration can be formatted rather than typed. */
  seconds: number;
  ownerId: string;
  attendees: string[];
  views: number;
  comments: number;
  /** True once this account has watched it, which drives the Unwatched lens. */
  watched: boolean;
}

export const RECORDINGS: Recording[] = [
  {
    id: 'r1',
    title: 'Onboarding flow, second pass',
    topic: 'Design review',
    date: '17 May',
    seconds: 1_484,
    ownerId: 'm1',
    attendees: ['m1', 'm2', 'm6'],
    views: 9,
    comments: 15,
    watched: false,
  },
  {
    id: 'r2',
    title: 'Search relevance: what the logs say',
    topic: 'Research',
    date: '16 May',
    seconds: 2_712,
    ownerId: 'm4',
    attendees: ['m4', 'm5', 'm2', 'm3'],
    views: 14,
    comments: 12,
    watched: false,
  },
  {
    id: 'r3',
    title: 'Billing migration, cutover plan',
    topic: 'Workshop',
    date: '16 May',
    seconds: 3_355,
    ownerId: 'm2',
    attendees: ['m2', 'm3', 'm5'],
    views: 11,
    comments: 8,
    watched: true,
  },
  {
    id: 'r4',
    title: 'Wednesday standup',
    topic: 'Standup',
    date: '17 May',
    seconds: 742,
    ownerId: 'm5',
    attendees: ['m1', 'm2', 'm3', 'm4', 'm5', 'm6'],
    views: 6,
    comments: 2,
    watched: true,
  },
  {
    id: 'r5',
    title: 'Mobile nav prototype walkthrough',
    topic: 'Demo',
    date: '15 May',
    seconds: 1_096,
    ownerId: 'm6',
    attendees: ['m6', 'm1', 'm5'],
    views: 21,
    comments: 19,
    watched: false,
  },
  {
    id: 'r6',
    title: 'Interview debrief: four small teams',
    topic: 'Research',
    date: '15 May',
    seconds: 2_168,
    ownerId: 'm4',
    attendees: ['m4', 'm1'],
    views: 8,
    comments: 6,
    watched: true,
  },
  {
    id: 'r7',
    title: 'Design system: what to cut',
    topic: 'Design review',
    date: '12 May',
    seconds: 1_921,
    ownerId: 'm1',
    attendees: ['m1', 'm6', 'm2'],
    views: 17,
    comments: 23,
    watched: false,
  },
  {
    id: 'r8',
    title: 'Release 4.2 demo',
    topic: 'Demo',
    date: '12 May',
    seconds: 1_310,
    ownerId: 'm3',
    attendees: ['m3', 'm2', 'm5', 'm4'],
    views: 26,
    comments: 11,
    watched: true,
  },
  {
    id: 'r9',
    title: 'Monday standup',
    topic: 'Standup',
    date: '15 May',
    seconds: 688,
    ownerId: 'm5',
    attendees: ['m1', 'm2', 'm3', 'm5'],
    views: 5,
    comments: 1,
    watched: true,
  },
  {
    id: 'r10',
    title: 'Pricing page, copy pass',
    topic: 'Workshop',
    date: '11 May',
    seconds: 2_455,
    ownerId: 'm5',
    attendees: ['m5', 'm1', 'm6'],
    views: 13,
    comments: 9,
    watched: false,
  },
];

export const recordingOf = (id: string) => RECORDINGS.find((r) => r.id === id) ?? RECORDINGS[0];

export const TOPICS: Topic[] = ['Design review', 'Standup', 'Research', 'Workshop', 'Demo'];

export const asClock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;

export const asMinutes = (seconds: number) => `${Math.round(seconds / 60)} min`;

export const libraryHours = () => RECORDINGS.reduce((t, r) => t + r.seconds, 0) / 3600;

export const unwatched = () => RECORDINGS.filter((r) => !r.watched).length;

/**
 * A waveform for a recording, drawn rather than photographed.
 *
 * The reference's video tiles are frames of surgical footage. A photograph of
 * a thing is out of drawing range (rule 8) and unbranded stock of an operating
 * microscope does not exist — so the subject changes rather than the medium:
 * what a workspace's recording list actually needs is how long it is and where
 * the talking happens, which is interface.
 */
export function waveform(id: string, bars = 56): number[] {
  const next = rng(id.length * 7919 + recordingOf(id).seconds);
  const out: number[] = [];
  let v = 0.5;
  for (let i = 0; i < bars; i += 1) {
    v = Math.min(1, Math.max(0.12, v + (next() - 0.5) * 0.55));
    out.push(v);
  }
  return out;
}

/* -------------------------------------------------------------- the projects */

export interface Project {
  id: string;
  name: string;
  state: 'complete' | 'in progress' | 'blocked';
  done: number;
  total: number;
  leadId: string;
  due: string;
}

export const PROJECTS: Project[] = [
  {
    id: 'p1',
    name: 'Onboarding rewrite',
    state: 'in progress',
    done: 14,
    total: 21,
    leadId: 'm1',
    due: '26 May',
  },
  {
    id: 'p2',
    name: 'Billing migration',
    state: 'in progress',
    done: 9,
    total: 18,
    leadId: 'm2',
    due: '02 Jun',
  },
  {
    id: 'p3',
    name: 'Search relevance',
    state: 'blocked',
    done: 5,
    total: 16,
    leadId: 'm4',
    due: '09 Jun',
  },
  {
    id: 'p4',
    name: 'Design system 2.0',
    state: 'in progress',
    done: 11,
    total: 14,
    leadId: 'm6',
    due: '23 May',
  },
  {
    id: 'p5',
    name: 'Mobile navigation',
    state: 'complete',
    done: 12,
    total: 12,
    leadId: 'm6',
    due: '12 May',
  },
  {
    id: 'p6',
    name: 'Release 4.2',
    state: 'complete',
    done: 17,
    total: 17,
    leadId: 'm3',
    due: '12 May',
  },
  {
    id: 'p7',
    name: 'Pricing page',
    state: 'in progress',
    done: 6,
    total: 10,
    leadId: 'm5',
    due: '31 May',
  },
];

export const projectProgress = (p: Project) => (p.done / p.total) * 100;

export const countState = (state: Project['state']) =>
  PROJECTS.filter((p) => p.state === state).length;

export const tasksDone = () => PROJECTS.reduce((t, p) => t + p.done, 0);
export const tasksTotal = () => PROJECTS.reduce((t, p) => t + p.total, 0);

export const PROJECT_TONE: Record<Project['state'], 'positive' | 'accent' | 'danger'> = {
  complete: 'positive',
  'in progress': 'accent',
  blocked: 'danger',
};

/* ----------------------------------------------------------------- the meeting */

/**
 * The call in progress. The reference floats a dark pill reading
 * "Breakthrough Brainstorm · 12:45 pm" with a close button and no way to join
 * it, which is the one thing that pill is for.
 */
export const LIVE_CALL = {
  title: 'Onboarding flow, third pass',
  startedAt: '12:45',
  room: 'Studio 2',
  attendees: ['m1', 'm2', 'm6'],
  minutesIn: 18,
};

/* --------------------------------------------------------------- notifications */

export type NoticeKind = 'invite' | 'comment' | 'viewing' | 'mention';

export interface Notice {
  id: string;
  kind: NoticeKind;
  memberId: string;
  body: string;
  recordingId?: string;
  ago: string;
}

export const NOTICES: Notice[] = [
  {
    id: 'n1',
    kind: 'invite',
    memberId: 'm6',
    body: 'invited you to “Personal development strategies”',
    ago: '30 min ago',
  },
  {
    id: 'n2',
    kind: 'comment',
    memberId: 'm1',
    body: 'left a comment at 14:02',
    recordingId: 'r1',
    ago: '1 hour ago',
  },
  {
    id: 'n3',
    kind: 'viewing',
    memberId: 'm3',
    body: 'watched your recording',
    recordingId: 'r5',
    ago: '3 hours ago',
  },
  {
    id: 'n4',
    kind: 'mention',
    memberId: 'm4',
    body: 'mentioned you in a comment',
    recordingId: 'r2',
    ago: '5 hours ago',
  },
  {
    id: 'n5',
    kind: 'comment',
    memberId: 'm5',
    body: 'replied to your comment',
    recordingId: 'r7',
    ago: '1 day ago',
  },
  {
    id: 'n6',
    kind: 'viewing',
    memberId: 'm2',
    body: 'watched your recording',
    recordingId: 'r7',
    ago: '1 day ago',
  },
  {
    id: 'n7',
    kind: 'invite',
    memberId: 'm5',
    body: 'invited you to “Pricing page, second pass”',
    ago: '2 days ago',
  },
];

export const NOTICE_LENSES = [
  { id: 'all', label: 'Overview' },
  { id: 'shared', label: 'Shared' },
  { id: 'comments', label: 'Comments' },
];

export const noticesFor = (lens: string) =>
  lens === 'comments'
    ? NOTICES.filter((n) => n.kind === 'comment' || n.kind === 'mention')
    : lens === 'shared'
      ? NOTICES.filter((n) => n.kind === 'invite' || n.kind === 'viewing')
      : NOTICES;
