/**
 * Everything on screen, bundled and deterministic (rule 5).
 *
 * Invented throughout — the product, the learner, the courses and everyone on
 * the friends board. The reference names no brand at all, so **Parlexa** is
 * added rather than replaced (rule 8).
 *
 * **One course list and one week of minutes feed all three tabs.** The
 * dashboard's chart, the homework bars, the progress tab's skill breakdown and
 * the course catalogue all read `COURSES`, `WEEK` and `TASKS`. Change one
 * day's minutes and the chart, the weekly total, the goal ring and the streak
 * all move together.
 */
import face1 from '@/assets/img/face-1.jpg';
import face2 from '@/assets/img/face-2.jpg';
import face3 from '@/assets/img/face-3.jpg';
import face4 from '@/assets/img/face-4.jpg';
import face5 from '@/assets/img/face-5.jpg';
import face6 from '@/assets/img/face-6.jpg';

export const LEARNER = {
  name: 'Mira Vasquez',
  face: face1,
  language: 'English',
  level: 'B1 · Intermediate',
  /** The clock the whole build reads. Frozen, so a take repeats. */
  today: 'Saturday, 17 May 2025',
  /** Minutes a day the learner has committed to. */
  dailyGoal: 30,
  streak: 23,
  /** The best streak so far, which is what makes the current one mean anything. */
  bestStreak: 41,
};

/* ---------------------------------------------------------------- the week */

/**
 * Minutes spent each day, split three ways. The reference's chart has three
 * series and an axis reading 0% / 40% / 80% / 100% — three unequal steps. This
 * one is in minutes, which is what a learner actually tracks, and the ticks
 * come from the data.
 */
export interface Day {
  day: string;
  theory: number;
  practice: number;
  lexicon: number;
}

export const WEEK: Day[] = [
  { day: 'Sun', theory: 8, practice: 14, lexicon: 6 },
  { day: 'Mon', theory: 12, practice: 9, lexicon: 11 },
  { day: 'Tue', theory: 6, practice: 18, lexicon: 9 },
  { day: 'Wed', theory: 14, practice: 11, lexicon: 7 },
  { day: 'Thu', theory: 9, practice: 21, lexicon: 12 },
  { day: 'Fri', theory: 11, practice: 16, lexicon: 14 },
  { day: 'Sat', theory: 7, practice: 12, lexicon: 8 },
];

/** The four weeks before this one, for the monthly window on the same chart. */
export const MONTH: Day[] = [
  { day: 'Week 1', theory: 54, practice: 78, lexicon: 41 },
  { day: 'Week 2', theory: 61, practice: 84, lexicon: 55 },
  { day: 'Week 3', theory: 48, practice: 92, lexicon: 62 },
  { day: 'Week 4', theory: 67, practice: 101, lexicon: 67 },
];

export const SERIES = [
  { id: 'theory', label: 'Theory', token: '--color-theory' },
  { id: 'practice', label: 'Practice', token: '--color-practice' },
  { id: 'lexicon', label: 'Lexicon', token: '--color-lexicon' },
] as const;

export type SeriesId = (typeof SERIES)[number]['id'];

export const RANGES = [
  { id: 'weekly', label: 'Weekly' },
  { id: 'monthly', label: 'Monthly' },
];

export const rangeData = (id: string) => (id === 'monthly' ? MONTH : WEEK);

export const totalOf = (d: Day) => d.theory + d.practice + d.lexicon;

export const weekMinutes = () => WEEK.reduce((t, d) => t + totalOf(d), 0);

/** Today is the last day in the week, which is what the goal ring measures. */
export const todayMinutes = () => totalOf(WEEK[WEEK.length - 1]);

export const goalProgress = () => (todayMinutes() / LEARNER.dailyGoal) * 100;

/** The best day of the week, named — the reference's tooltip says only "+12". */
export const bestDay = () => WEEK.slice().sort((a, b) => totalOf(b) - totalOf(a))[0];

/* ------------------------------------------------------------------ courses */

export type Tint = 'lavender' | 'blue' | 'green' | 'pink';
export type Level = 'A2' | 'B1' | 'B2' | 'C1';

export interface Lesson {
  id: string;
  title: string;
  minutes: number;
  kind: 'theory' | 'practice' | 'lexicon';
  done: boolean;
}

export interface Course {
  id: string;
  title: string;
  blurb: string;
  tint: Tint;
  level: Level;
  /** Consistent throughout, unlike the reference's "27 Apr 2025 / 30Apr 2025". */
  starts: string;
  enrolled: boolean;
  classmates: string[];
  lessons: Lesson[];
}

const L = (
  id: string,
  title: string,
  minutes: number,
  kind: Lesson['kind'],
  done: boolean,
): Lesson => ({
  id,
  title,
  minutes,
  kind,
  done,
});

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'Speak with Confidence',
    blurb: 'Learn how to speak English clearly and confidently in everyday situations.',
    tint: 'lavender',
    level: 'B1',
    starts: '27 Apr 2025',
    enrolled: true,
    classmates: [face2, face3, face4],
    lessons: [
      L('c1l1', 'Ordering and asking for things', 12, 'practice', true),
      L('c1l2', 'Small talk that goes somewhere', 15, 'practice', true),
      L('c1l3', 'Disagreeing politely', 14, 'theory', true),
      L('c1l4', 'Telling a story in the past', 18, 'practice', false),
      L('c1l5', 'Phone calls and bad lines', 16, 'practice', false),
      L('c1l6', 'Giving an opinion you can defend', 20, 'theory', false),
    ],
  },
  {
    id: 'c2',
    title: 'Master the Basics',
    blurb: 'Build a strong foundation with essential grammar and vocabulary.',
    tint: 'blue',
    level: 'A2',
    starts: '30 Apr 2025',
    enrolled: true,
    classmates: [face5, face6],
    lessons: [
      L('c2l1', 'Present simple and present continuous', 14, 'theory', true),
      L('c2l2', 'Countable and uncountable', 12, 'theory', true),
      L('c2l3', 'The 300 words you need first', 18, 'lexicon', true),
      L('c2l4', 'Past simple, regular and not', 16, 'theory', true),
      L('c2l5', 'Asking questions three ways', 13, 'practice', false),
      L('c2l6', 'Prepositions of place and time', 15, 'theory', false),
      L('c2l7', 'Food, markets and quantities', 14, 'lexicon', false),
    ],
  },
  {
    id: 'c3',
    title: 'Sound Like a Native',
    blurb: 'Improve your pronunciation and intonation for natural speech.',
    tint: 'green',
    level: 'B2',
    starts: '15 May 2025',
    enrolled: true,
    classmates: [face2, face6],
    lessons: [
      L('c3l1', 'Where the stress falls', 16, 'theory', true),
      L('c3l2', 'Linking and swallowed sounds', 18, 'practice', false),
      L('c3l3', 'The schwa, everywhere', 14, 'theory', false),
      L('c3l4', 'Rising and falling questions', 15, 'practice', false),
      L('c3l5', 'Shadowing a native speaker', 20, 'practice', false),
    ],
  },
  {
    id: 'c4',
    title: 'Write It Down',
    blurb: 'Email, messages and short reports that read the way you meant them.',
    tint: 'pink',
    level: 'B2',
    starts: '02 Jun 2025',
    enrolled: false,
    classmates: [face3, face4, face5],
    lessons: [
      L('c4l1', 'The shape of a short email', 14, 'theory', false),
      L('c4l2', 'Formal, neutral, friendly', 16, 'theory', false),
      L('c4l3', 'Linking words that earn their place', 15, 'lexicon', false),
      L('c4l4', 'Rewriting your own first draft', 20, 'practice', false),
    ],
  },
  {
    id: 'c5',
    title: 'Listen Like You Mean It',
    blurb: 'Follow fast speech, accents and conversations with more than two people.',
    tint: 'lavender',
    level: 'C1',
    starts: '16 Jun 2025',
    enrolled: false,
    classmates: [face6, face2],
    lessons: [
      L('c5l1', 'Catching the stressed words only', 15, 'practice', false),
      L('c5l2', 'Four accents, one week', 18, 'practice', false),
      L('c5l3', 'Note-taking while listening', 16, 'theory', false),
      L('c5l4', 'Group conversations and turn-taking', 17, 'practice', false),
    ],
  },
  {
    id: 'c6',
    title: 'Work Words',
    blurb: 'Meetings, updates and the vocabulary that shows up in every office.',
    tint: 'blue',
    level: 'B1',
    starts: '30 Jun 2025',
    enrolled: false,
    classmates: [face4, face5, face3],
    lessons: [
      L('c6l1', 'Standing up in a meeting', 16, 'practice', false),
      L('c6l2', 'The 200 words of project talk', 18, 'lexicon', false),
      L('c6l3', 'Saying no to a deadline', 14, 'practice', false),
      L('c6l4', 'Numbers, dates and charts aloud', 15, 'lexicon', false),
    ],
  },
];

export const courseOf = (id: string) => COURSES.find((c) => c.id === id) ?? COURSES[0];

export const doneLessons = (c: Course) => c.lessons.filter((l) => l.done).length;
export const courseProgress = (c: Course) => (doneLessons(c) / c.lessons.length) * 100;
export const courseMinutes = (c: Course) => c.lessons.reduce((t, l) => t + l.minutes, 0);

export const LEVELS: Level[] = ['A2', 'B1', 'B2', 'C1'];

/* ----------------------------------------------------------------- homework */

/**
 * The daily tasks. **Every percentage is a count over a count**, so the bar
 * and the sentence beside it cannot disagree — the reference prints "Learn 10
 * new words today" at 57%, which is five and seven tenths of a word.
 */
export interface Task {
  id: string;
  what: string;
  unit: string;
  done: number;
  target: number;
  kind: SeriesId;
}

export const TASKS: Task[] = [
  { id: 't1', what: 'Learn new words', unit: 'words', done: 6, target: 10, kind: 'lexicon' },
  { id: 't2', what: 'Grammar task', unit: 'tasks', done: 1, target: 2, kind: 'theory' },
  {
    id: 't3',
    what: 'Watch a video, answer questions',
    unit: 'questions',
    done: 1,
    target: 3,
    kind: 'practice',
  },
  {
    id: 't4',
    what: 'Write sentences with new vocab',
    unit: 'sentences',
    done: 3,
    target: 3,
    kind: 'practice',
  },
  {
    id: 't5',
    what: 'Record yourself reading aloud',
    unit: 'minutes',
    done: 2,
    target: 5,
    kind: 'practice',
  },
];

export const taskProgress = (t: Task) => (t.done / t.target) * 100;

export const tasksDone = () => TASKS.filter((t) => t.done >= t.target).length;

/* ------------------------------------------------------------------ friends */

export interface Friend {
  id: string;
  name: string;
  face: string;
  /** Days in a row, words known, lessons finished — the three chips. */
  streak: number;
  words: number;
  lessons: number;
  score: number;
  /** True for the learner, who is missing from the reference's own board. */
  me?: boolean;
}

export const FRIENDS: Friend[] = [
  {
    id: 'f1',
    name: 'Anna Morgan',
    face: face2,
    streak: 25,
    words: 832,
    lessons: 48,
    score: 10_568,
  },
  {
    id: 'f2',
    name: 'Jake Thompson',
    face: face3,
    streak: 23,
    words: 779,
    lessons: 39,
    score: 10_234,
  },
  {
    id: 'f0',
    name: LEARNER.name,
    face: face1,
    streak: LEARNER.streak,
    words: 744,
    lessons: 36,
    score: 10_112,
    me: true,
  },
  {
    id: 'f3',
    name: 'Sofia Bennett',
    face: face4,
    streak: 20,
    words: 742,
    lessons: 33,
    score: 9_892,
  },
  {
    id: 'f4',
    name: 'Emily Carter',
    face: face5,
    streak: 17,
    words: 643,
    lessons: 28,
    score: 9_322,
  },
  {
    id: 'f5',
    name: 'Diego Marchetti',
    face: face6,
    streak: 12,
    words: 588,
    lessons: 24,
    score: 8_741,
  },
];

export const ranked = () => FRIENDS.slice().sort((a, b) => b.score - a.score);

export const myRank = () => ranked().findIndex((f) => f.me) + 1;

/* ----------------------------------------------------------------- progress */

export interface Skill {
  id: string;
  label: string;
  /** Percent of the level's criteria met, from the lessons finished in it. */
  value: number;
  /** Where this learner was a month ago, so the bar has a baseline. */
  wasValue: number;
}

export const SKILLS: Skill[] = [
  { id: 'speaking', label: 'Speaking', value: 64, wasValue: 51 },
  { id: 'listening', label: 'Listening', value: 71, wasValue: 62 },
  { id: 'reading', label: 'Reading', value: 78, wasValue: 74 },
  { id: 'writing', label: 'Writing', value: 52, wasValue: 46 },
  { id: 'grammar', label: 'Grammar', value: 68, wasValue: 55 },
  { id: 'vocabulary', label: 'Vocabulary', value: 74, wasValue: 60 },
];

/**
 * The vocabulary queue, in the four states every spaced-repetition system
 * uses. The reference counts "832 words" and never says what knowing one
 * means; these four are what a review schedule is actually made of.
 */
export const VOCAB = [
  { id: 'new', label: 'New', count: 128, note: 'seen once or not at all' },
  { id: 'learning', label: 'Learning', count: 216, note: 'inside the first week' },
  { id: 'known', label: 'Known', count: 302, note: 'recalled after a month' },
  { id: 'mastered', label: 'Mastered', count: 98, note: 'recalled after six months' },
];

export const vocabTotal = () => VOCAB.reduce((t, v) => t + v.count, 0);

export const dueToday = 34;

/**
 * The last twenty-eight days, as minutes. A streak is a claim about a calendar
 * and this is the calendar: each day either met the goal or did not.
 */
export const CALENDAR: number[] = [
  22, 31, 0, 34, 28, 36, 41, 33, 0, 29, 38, 30, 44, 35, 31, 33, 39, 30, 42, 36, 32, 37, 30, 45, 34,
  31, 38, 27,
];

export const metGoal = (minutes: number) => minutes >= LEARNER.dailyGoal;

export const daysMet = () => CALENDAR.filter(metGoal).length;
