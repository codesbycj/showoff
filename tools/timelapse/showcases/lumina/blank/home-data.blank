import type { IconName } from '../components/icon';
import { ll } from '../theme';

/** Everything the home dashboard says, so its components stay presentational. */
export const HOME = {
  greeting: 'Hello,',
  name: 'Tommy!',

  /** The hero runs over two lines, the second one set extra-bold. */
  headlineTop: 'Need help',
  headlineBottom: 'studying today?',

  askPlaceholder: 'Ask a Question',

  promo: {
    title: 'Unlock Study Pro',
    body: 'Upgrade your learning with unlimited access to premium perks.',
    cta: '+ Upgrade to Pro',
  },

  tasksTitle: "Today's Tasks",
  tasksAction: 'View All',
} as const;

export type Tool = {
  key: string;
  icon: IconName;
  label: string;
  /** The mint-filled card is the one currently selected. */
  selected?: boolean;
  tint: string;
  ink: string;
};

export const TOOLS: Tool[] = [
  // STEP 1.15 solve some maths
  // {
  //   key: 'math',
  //   icon: 'calculator',
  //   label: 'Math Solver',
  //   tint: ll.violet.tint,
  //   ink: ll.violet.ink,
  // },
  // STEP 1.16 the one they are on
  // {
  //   key: 'answer',
  //   icon: 'commentDots',
  //   label: 'Give Answer',
  //   selected: true,
  //   tint: 'rgba(255,255,255,0.7)',
  //   ink: '#1f6b47',
  // },
  // STEP 1.17 and the books
  // {
  //   key: 'books',
  //   icon: 'library',
  //   label: 'Textbooks',
  //   tint: ll.sky.tint,
  //   ink: ll.sky.ink,
  // },
];

export type Task = {
  key: string;
  icon: IconName;
  title: string;
  subtitle: string;
  tint: string;
  ink: string;
};

export const TASKS: Task[] = [
  // STEP 1.24 something to watch
  // {
  //   key: 'video',
  //   icon: 'play',
  //   title: 'Video Lessons',
  //   subtitle: 'Learn with expert-guided tutorials',
  //   tint: ll.mintSoft,
  //   ink: '#177d4a',
  // },
  // STEP 1.25 and something to read
  // {
  //   key: 'tips',
  //   icon: 'lightbulb',
  //   title: 'AI Study Tips',
  //   subtitle: 'Personalized daily recap',
  //   tint: ll.violet.tint,
  //   ink: ll.violet.ink,
  // },
];

/**
 * The dock. The bar reports which key was pressed and the screen decides where
 * it leads, so adding a destination is a line in a screen rather than a change
 * here.
 *
 * `as const` rather than an annotation: expo-router types `router.push` against
 * the literal route strings, and a `string` field here widens them away.
 */
export const TABS = [
  { key: 'home', icon: 'home', label: 'Home', route: '/lumina' },
  { key: 'chat', icon: 'chat', label: 'Chat', route: '/lumina/chat' },
  { key: 'library', icon: 'library', label: 'Library', route: '/lumina/saved' },
  { key: 'profile', icon: 'profile', label: 'Profile', route: '/lumina/profile' },
] as const;

export type TabKey = (typeof TABS)[number]['key'];
