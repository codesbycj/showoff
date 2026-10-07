import type { IconName } from '../components/icon';
import { ll } from '../theme';

/** Everything the Saved Resources screen says. */
export const SAVED = {
  title: 'Saved Resources',
  searchPlaceholder: 'Search your saved books, notes...',

  textbooksTitle: 'Recent Textbooks',
  textbooksAction: 'See All',

  notesTitle: 'Saved Notes & Summaries',
  notesCount: '3 items',

  quizzesTitle: 'Bookmarked Quizzes',
  quizzesAction: 'History',
} as const;

export type Filter = { key: string; label: string; icon?: IconName };

export const FILTERS: Filter[] = [
  // STEP 3.07 everything at once
  // { key: 'all', label: 'All Saved' },
  // STEP 3.08 just the books
  // { key: 'textbooks', label: 'Textbooks', icon: 'textbooks' },
  // STEP 3.09 just the notes
  // { key: 'notes', label: 'Notes', icon: 'notes' },
  // STEP 3.10 just the drills
  // { key: 'practice', label: 'Practice', icon: 'practice' },
  // STEP 3.11 and one that runs off the edge
  // { key: 'videos', label: 'Videos', icon: 'videos' },
];

export type Textbook = {
  key: string;
  /** The spine label on the cover, and the volume under it. */
  code: string;
  volume: string;
  badge: string;
  title: string;
  subtitle: string;
  progressLabel: string;
  pageLabel: string;
  /** 0–1, driving the bar's width. */
  progress: number;
  coverFrom: string;
  coverTo: string;
  coverInk: string;
  badgeTint: string;
  badgeInk: string;
  barColor: string;
};

export const TEXTBOOKS: Textbook[] = [
  // STEP 3.17 the biology one
  // {
  //   key: 'bio',
  //   code: 'BIO',
  //   volume: 'VOL. 2',
  //   badge: 'Grade 12',
  //   title: 'Advanced Biology',
  //   subtitle: 'Cells & Genetics',
  //   progressLabel: '68% completed',
  //   pageLabel: 'p. 142/320',
  //   progress: 0.68,
  //   coverFrom: '#d1fae5',
  //   coverTo: '#e4f4d6',
  //   coverInk: '#065f46',
  //   badgeTint: '#ecfdf5',
  //   badgeInk: '#047857',
  //   barColor: ll.limeDark,
  // },
  // STEP 3.18 and the calculus one
  // {
  //   key: 'calc',
  //   code: 'MATH',
  //   volume: 'CALC II',
  //   badge: 'College Prep',
  //   title: 'Calculus & Geometry',
  //   subtitle: 'Derivatives & Series',
  //   progressLabel: '34% completed',
  //   pageLabel: 'p. 88/260',
  //   progress: 0.34,
  //   coverFrom: '#e0e7ff',
  //   coverTo: '#f3e8ff',
  //   coverInk: '#4338ca',
  //   badgeTint: '#eef2ff',
  //   badgeInk: '#4338ca',
  //   barColor: '#6366f1',
  // },
];

export type Note = {
  key: string;
  icon: IconName;
  tag: string;
  time: string;
  title: string;
  meta: string;
  tint: string;
  ink: string;
  tagTint: string;
  tagInk: string;
};

export const NOTES: Note[] = [
  // STEP 3.22 chemistry
  // {
  //   key: 'chem',
  //   icon: 'chemistry',
  //   tag: 'Chemistry',
  //   time: '2h ago',
  //   title: 'Organic Chemistry Reactions',
  //   meta: '24 flashcards • 92% mastery',
  //   tint: '#fffbeb',
  //   ink: '#b45309',
  //   tagTint: '#fef3c7',
  //   tagInk: '#92400e',
  // },
  // STEP 3.23 maths
  // {
  //   key: 'math',
  //   icon: 'math',
  //   tag: 'Mathematics',
  //   time: 'Yesterday',
  //   title: 'Theorems & Formulas Sheet',
  //   meta: 'PDF Summary • 12 pages',
  //   tint: '#eff6ff',
  //   ink: '#1d4ed8',
  //   tagTint: '#dbeafe',
  //   tagInk: '#1e40af',
  // },
  // STEP 3.24 and english
  // {
  //   key: 'lit',
  //   icon: 'penLine',
  //   tag: 'Literature',
  //   time: '3 days ago',
  //   title: 'AP English Essay Frameworks',
  //   meta: '15 high-scoring study notes',
  //   tint: '#fff1f2',
  //   ink: '#be123c',
  //   tagTint: '#ffe4e6',
  //   tagInk: '#9f1239',
  // },
];

export const QUIZ = {
  title: 'Cell Division & Mitosis Quiz',
  meta: '20 questions • Medium difficulty',
  cta: 'Practice',
} as const;
