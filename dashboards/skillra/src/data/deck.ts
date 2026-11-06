/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the product, the learner, every instructor, course and
 * task. The reference calls itself "Quest", which is a real product name in
 * this category, so the brand is replaced rather than kept (rule 8).
 *
 * **One course list feeds all three tabs.** The home screen's figures, the
 * catalogue and the task board all read `COURSES`, `LESSONS` and `TASKS`.
 * Change one lesson's length and the course's total, the category counts, the
 * week's minutes and the continue card all move together.
 */
import { rng } from '@/data/rng';

import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

export const LEARNER = {
  name: 'Mithun Ray',
  face: face1,
  plan: 'Free plan',
  /** The clock the whole build reads. Frozen, so a take repeats. */
  today: '2024-09-15',
  month: 'September 2024',
  /** Minutes a day the learner has committed to. */
  dailyGoal: 45,
  streak: 12,
};

/* -------------------------------------------------------------- instructors */

export interface Instructor {
  id: string;
  name: string;
  face: string;
  title: string;
}

export const INSTRUCTORS: Instructor[] = [
  { id: 'i1', name: 'Blaine Conner', face: face2, title: 'Motion designer' },
  { id: 'i2', name: 'Nathan Riley', face: face3, title: 'Product designer' },
  { id: 'i3', name: 'Karyn Foley', face: face4, title: 'Type designer' },
  { id: 'i4', name: 'Craig Young', face: face5, title: 'Design director' },
  { id: 'i5', name: 'Imani Okafor', face: face6, title: 'Front-end engineer' },
];

export const instructorOf = (id: string) => INSTRUCTORS.find((i) => i.id === id) ?? INSTRUCTORS[0];

/* ----------------------------------------------------------------- the paths */

export type Track = 'UI/UX Design' | 'Illustration' | 'Typography' | 'Branding' | 'Front End';
export type Level = 'Beginner' | 'Intermediate' | 'Advanced';

export const TRACKS: Track[] = [
  'UI/UX Design',
  'Illustration',
  'Typography',
  'Branding',
  'Front End',
];

export const LEVEL_TOKEN: Record<Level, string> = {
  Beginner: '--color-beginner',
  Intermediate: '--color-intermediate',
  Advanced: '--color-advanced',
};

export const LEVELS: Level[] = ['Beginner', 'Intermediate', 'Advanced'];

/* ----------------------------------------------------------------- courses */

export interface Lesson {
  id: string;
  title: string;
  /** Seconds, so a runtime is formatted rather than typed. */
  seconds: number;
  done: boolean;
}

export interface Course {
  id: string;
  title: string;
  blurb: string;
  track: Track;
  level: Level;
  instructorId: string;
  /** Out of five, with the count beside it — the reference prints stars alone. */
  rating: number;
  ratings: number;
  enrolled: boolean;
  lessons: Lesson[];
}

const L = (id: string, title: string, seconds: number, done: boolean): Lesson => ({
  id,
  title,
  seconds,
  done,
});

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Essentials for new designers',
    blurb: 'The vocabulary, the tools and the habits the first six months need.',
    track: 'UI/UX Design',
    level: 'Beginner',
    instructorId: 'i1',
    rating: 4.8,
    ratings: 1_284,
    enrolled: true,
    lessons: [
      L('c1l1', 'What a design file is for', 612, true),
      L('c1l2', 'Understanding keyframes', 1_155, false),
      L('c1l3', 'Spacing that holds up', 884, false),
      L('c1l4', 'Naming things so they can be found', 740, false),
      L('c1l5', 'Handing work over', 968, false),
      L('c1l6', 'Your first critique', 1_046, false),
      L('c1l7', 'Building a small system', 1_320, false),
      L('c1l8', 'What to cut before shipping', 802, false),
    ],
  },
  {
    id: 'c2',
    title: 'Introduction to UX and UI',
    blurb: 'Where research stops and interface begins, and why the line moves.',
    track: 'UI/UX Design',
    level: 'Beginner',
    instructorId: 'i2',
    rating: 4.6,
    ratings: 2_051,
    enrolled: true,
    lessons: [
      L('c2l1', 'Two words, two jobs', 548, true),
      L('c2l2', 'Interviews that are not surveys', 1_012, true),
      L('c2l3', 'From notes to a flow', 876, true),
      L('c2l4', 'The first wireframe', 934, true),
      L('c2l5', 'Testing with five people', 1_120, true),
    ],
  },
  {
    id: 'c3',
    title: 'Typography and font pairs',
    blurb: 'Choosing two faces that have an argument worth watching.',
    track: 'Typography',
    level: 'Intermediate',
    instructorId: 'i3',
    rating: 4.9,
    ratings: 863,
    enrolled: true,
    lessons: [
      L('c3l1', 'What a typeface is doing', 702, true),
      L('c3l2', 'Scale, and where it breaks', 918, true),
      L('c3l3', 'Pairing by contrast', 1_084, true),
      L('c3l4', 'Numerals and tables', 826, false),
      L('c3l5', 'Setting long text', 1_240, false),
      L('c3l6', 'Licensing, briefly', 468, false),
    ],
  },
  {
    id: 'c4',
    title: 'Branding from the inside out',
    blurb: 'A mark is the last thing you draw, not the first.',
    track: 'Branding',
    level: 'Intermediate',
    instructorId: 'i1',
    rating: 4.7,
    ratings: 1_109,
    enrolled: true,
    lessons: [
      L('c4l1', 'What a brand is not', 640, true),
      L('c4l2', 'Finding the one sentence', 892, true),
      L('c4l3', 'Colour that survives a photocopier', 1_008, true),
      L('c4l4', 'Drawing the mark', 1_312, true),
      L('c4l5', 'The system around it', 1_156, false),
      L('c4l6', 'Writing the guidelines', 980, false),
      L('c4l7', 'Rolling it out', 1_064, false),
      L('c4l8', 'When to change it', 744, false),
      L('c4l9', 'Working with a client', 1_188, false),
      L('c4l10', 'Three case studies', 1_420, false),
    ],
  },
  {
    id: 'c5',
    title: 'Front end for designers',
    blurb: 'Enough HTML, CSS and layout to argue with an engineer usefully.',
    track: 'Front End',
    level: 'Intermediate',
    instructorId: 'i5',
    rating: 4.5,
    ratings: 1_742,
    enrolled: true,
    lessons: [
      L('c5l1', 'The box, and what it does', 584, true),
      L('c5l2', 'Flex, in one sitting', 1_096, true),
      L('c5l3', 'Grid, in another', 1_164, true),
      L('c5l4', 'Type on the web', 848, true),
      L('c5l5', 'Colour, contrast and tokens', 992, true),
      L('c5l6', 'Breakpoints are not devices', 906, true),
      L('c5l7', 'Motion that means something', 1_038, false),
      L('c5l8', 'Reading someone else’s CSS', 1_210, false),
      L('c5l9', 'Shipping a small page', 1_356, false),
      L('c5l10', 'What to hand an engineer', 724, false),
      L('c5l11', 'Debugging in the browser', 1_002, false),
      L('c5l12', 'Where to go next', 466, false),
    ],
  },
  {
    id: 'c6',
    title: 'Illustration for interfaces',
    blurb: 'Drawing that explains something, at the size it will actually be seen.',
    track: 'Illustration',
    level: 'Advanced',
    instructorId: 'i3',
    rating: 4.8,
    ratings: 517,
    enrolled: false,
    lessons: [
      L('c6l1', 'Why most product illustration fails', 736, false),
      L('c6l2', 'Shape before line', 902, false),
      L('c6l3', 'A palette of five', 814, false),
      L('c6l4', 'Drawing at 24 pixels', 1_144, false),
      L('c6l5', 'Consistency across a set', 1_020, false),
      L('c6l6', 'Exporting without regret', 592, false),
    ],
  },
  {
    id: 'c7',
    title: 'Advanced interface motion',
    blurb: 'Easing, choreography, and the difference between delight and delay.',
    track: 'UI/UX Design',
    level: 'Advanced',
    instructorId: 'i1',
    rating: 4.9,
    ratings: 694,
    enrolled: false,
    lessons: [
      L('c7l1', 'What motion is for', 668, false),
      L('c7l2', 'Easing curves, read properly', 1_088, false),
      L('c7l3', 'Shared elements', 1_196, false),
      L('c7l4', 'Choreographing a list', 964, false),
      L('c7l5', 'Reduced motion is not “off”', 822, false),
      L('c7l6', 'Measuring a prototype', 1_144, false),
      L('c7l7', 'Handing motion over', 918, false),
    ],
  },
  {
    id: 'c8',
    title: 'Lettering and logotypes',
    blurb: 'Drawing letters when no typeface will do what the name needs.',
    track: 'Typography',
    level: 'Advanced',
    instructorId: 'i3',
    rating: 4.7,
    ratings: 402,
    enrolled: false,
    lessons: [
      L('c8l1', 'Letters are shapes first', 788, false),
      L('c8l2', 'Optical correction', 1_032, false),
      L('c8l3', 'Spacing by eye', 946, false),
      L('c8l4', 'From sketch to vector', 1_288, false),
      L('c8l5', 'Making it work small', 874, false),
    ],
  },
];

export const courseOf = (id: string) => COURSES.find((c) => c.id === id) ?? COURSES[0];

export const doneLessons = (c: Course) => c.lessons.filter((l) => l.done).length;
export const courseProgress = (c: Course) => (doneLessons(c) / c.lessons.length) * 100;
export const courseSeconds = (c: Course) => c.lessons.reduce((t, l) => t + l.seconds, 0);

export const asClock = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.round(seconds % 60)).padStart(2, '0')}`;

export const asHours = (seconds: number) => {
  const m = Math.round(seconds / 60);
  return m >= 60 ? `${Math.floor(m / 60)}h ${String(m % 60).padStart(2, '0')}m` : `${m}m`;
};

/** The next unfinished lesson of the course furthest along but not done. */
export const continueCourse = () =>
  COURSES.filter((c) => c.enrolled && courseProgress(c) < 100).sort(
    (a, b) => courseProgress(b) - courseProgress(a),
  )[0] ?? COURSES[0];

export const nextLesson = (c: Course) => c.lessons.find((l) => !l.done) ?? c.lessons[0];

/**
 * Counts per track, which the reference prints as "2/8 watched" with no
 * statement of what the eight are. These are lessons finished over lessons
 * enrolled in, per track, and both halves come from the same list.
 */
export const trackCounts = (track: Track) => {
  const mine = COURSES.filter((c) => c.track === track && c.enrolled);
  const lessons = mine.flatMap((c) => c.lessons);
  return {
    done: lessons.filter((l) => l.done).length,
    total: lessons.length,
    courses: mine.length,
  };
};

/* -------------------------------------------------------------- the listening */

/**
 * The audio the reference puts at the top: a lesson playing, with a waveform.
 * Drawn, not photographed — a waveform is interface.
 */
export const NOW_PLAYING = {
  courseId: 'c1',
  lessonId: 'c1l2',
  /** Seconds in. The reference prints 02:35 with no total beside it. */
  at: 155,
};

export function waveform(id: string, bars = 64): number[] {
  const next = rng(id.length * 6421 + bars);
  const out: number[] = [];
  let v = 0.5;
  for (let i = 0; i < bars; i += 1) {
    v = Math.min(1, Math.max(0.14, v + (next() - 0.5) * 0.6));
    out.push(v);
  }
  return out;
}

/* --------------------------------------------------------------- the calendar */

export interface Day {
  day: string;
  date: number;
  /** Minutes watched, so the week strip means something when it is picked. */
  minutes: number;
}

export const WEEK: Day[] = [
  { day: 'Mon', date: 12, minutes: 52 },
  { day: 'Tue', date: 13, minutes: 38 },
  { day: 'Wed', date: 14, minutes: 0 },
  { day: 'Thu', date: 15, minutes: 61 },
  { day: 'Fri', date: 16, minutes: 44 },
  { day: 'Sat', date: 17, minutes: 27 },
  { day: 'Sun', date: 18, minutes: 49 },
];

export const weekMinutes = () => WEEK.reduce((t, d) => t + d.minutes, 0);

export const todayMinutes = () => WEEK.find((d) => d.date === 15)?.minutes ?? 0;

export interface Session {
  id: string;
  title: string;
  /** Both in 24-hour, unlike the reference's "12:00 - 01:30". */
  from: string;
  to: string;
  track: Track;
  withId: string;
  date: number;
}

export const SESSIONS: Session[] = [
  {
    id: 's1',
    title: 'Live critique',
    from: '12:00',
    to: '13:30',
    track: 'UI/UX Design',
    withId: 'i1',
    date: 15,
  },
  {
    id: 's2',
    title: 'Office hours',
    from: '16:00',
    to: '16:45',
    track: 'Front End',
    withId: 'i5',
    date: 15,
  },
  {
    id: 's3',
    title: 'Lettering workshop',
    from: '10:00',
    to: '12:00',
    track: 'Typography',
    withId: 'i3',
    date: 16,
  },
  {
    id: 's4',
    title: 'Portfolio review',
    from: '14:30',
    to: '15:30',
    track: 'Branding',
    withId: 'i1',
    date: 17,
  },
  {
    id: 's5',
    title: 'Research clinic',
    from: '11:00',
    to: '12:00',
    track: 'UI/UX Design',
    withId: 'i2',
    date: 18,
  },
];

export const sessionsOn = (date: number) => SESSIONS.filter((s) => s.date === date);

/* -------------------------------------------------------------------- tasks */

export type TaskState = 'to do' | 'in progress' | 'done';

export interface Task {
  id: string;
  title: string;
  body: string;
  track: Track;
  state: TaskState;
  /** Minutes logged against minutes budgeted — the reference states only the
      first, beside a month-long date range. */
  logged: number;
  budget: number;
  from: string;
  to: string;
  courseId?: string;
}

export const TASKS: Task[] = [
  {
    id: 't1',
    title: 'Creativity in logo design',
    body: 'Three marks for the same invented coffee roaster, each from a different starting idea. Take one to final.',
    track: 'Branding',
    state: 'in progress',
    logged: 800,
    budget: 1_200,
    from: '23 Sep',
    to: '23 Oct',
    courseId: 'c4',
  },
  {
    id: 't2',
    title: 'UX research write-up',
    body: 'Five interviews, one page. What was asked, what came back, and the two things worth changing.',
    track: 'UI/UX Design',
    state: 'in progress',
    logged: 738,
    budget: 900,
    from: '28 Sep',
    to: '20 Oct',
    courseId: 'c2',
  },
  {
    id: 't3',
    title: 'Pair two faces for a long read',
    body: 'A display face and a text face that can hold three thousand words without tiring anyone.',
    track: 'Typography',
    state: 'to do',
    logged: 0,
    budget: 480,
    from: '02 Oct',
    to: '16 Oct',
    courseId: 'c3',
  },
  {
    id: 't4',
    title: 'Rebuild a landing page in CSS',
    body: 'Grid, two breakpoints, no framework. It has to hold at 320 and at 1440.',
    track: 'Front End',
    state: 'to do',
    logged: 0,
    budget: 720,
    from: '04 Oct',
    to: '25 Oct',
    courseId: 'c5',
  },
  {
    id: 't5',
    title: 'Spacing audit of an old file',
    body: 'Take last term’s project and put every gap on a four-point scale. Note what breaks.',
    track: 'UI/UX Design',
    state: 'done',
    logged: 420,
    budget: 360,
    from: '09 Sep',
    to: '20 Sep',
    courseId: 'c1',
  },
  {
    id: 't6',
    title: 'Icon set at 24 pixels',
    body: 'Twelve glyphs on one grid at one stroke width, drawn at the size they will be used.',
    track: 'Illustration',
    state: 'done',
    logged: 540,
    budget: 600,
    from: '02 Sep',
    to: '18 Sep',
    courseId: 'c6',
  },
  {
    id: 't7',
    title: 'Redraw a mark at three sizes',
    body: 'The same logo at 16, 64 and 512 pixels. Each one is a different drawing, and all three have to be the same mark.',
    track: 'Branding',
    state: 'to do',
    logged: 0,
    budget: 540,
    from: '07 Oct',
    to: '28 Oct',
    courseId: 'c4',
  },
  {
    id: 't8',
    title: 'Storyboard one transition',
    body: 'Six frames of a card opening into a page. Name the easing on each and say what it is for.',
    track: 'UI/UX Design',
    state: 'in progress',
    logged: 186,
    budget: 420,
    from: '30 Sep',
    to: '14 Oct',
    courseId: 'c7',
  },
  {
    id: 't9',
    title: 'Interview three people about a tool they hate',
    body: 'Fifteen minutes each. The complaint is never the problem; find the problem.',
    track: 'UI/UX Design',
    state: 'done',
    logged: 312,
    budget: 300,
    from: '26 Aug',
    to: '11 Sep',
    courseId: 'c2',
  },
];

export const TASK_STATES: TaskState[] = ['to do', 'in progress', 'done'];

export const TASK_TONE: Record<TaskState, 'quiet' | 'accent' | 'positive'> = {
  'to do': 'quiet',
  'in progress': 'accent',
  done: 'positive',
};

export const taskProgress = (t: Task) => Math.min(100, (t.logged / t.budget) * 100);

export const countTasks = (state: TaskState) => TASKS.filter((t) => t.state === state).length;

export const loggedMinutes = () => TASKS.reduce((t, x) => t + x.logged, 0);
