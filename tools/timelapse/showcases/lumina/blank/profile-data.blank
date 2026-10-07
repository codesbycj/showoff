import type { IconName } from '../components/icon';
import { ll } from '../theme';

/** Everything the profile screen says. */
export const PROFILE = {
  title: 'Profile',
  name: 'Helping Hand',
  level: 'Level 5 Learner',
  tagline: 'Keep learning, keep growing!',

  promo: {
    title: 'Unlock Study Pro',
    body: 'Upgrade your learning with unlimited access to premium perks.',
    cta: '+  Upgrade to Pro',
  },
} as const;

export type Stat = {
  key: string;
  icon: IconName;
  value: string;
  label: string;
  tint: string;
  ink: string;
};

/** The two cards beside the avatar. */
export const TOP_STATS: Stat[] = [
  // STEP 4.07 hours at the desk
  // {
  //   key: 'hours',
  //   icon: 'clock',
  //   value: '187h',
  //   label: 'Study Hours',
  //   tint: '#f1edfc',
  //   ink: ll.violet.ink,
  // },
  // STEP 4.08 quizzes taken
  // {
  //   key: 'quizzes',
  //   icon: 'trophy',
  //   value: '670',
  //   label: 'Quiz Count',
  //   tint: '#e8faed',
  //   ink: ll.emerald.ink,
  // },
];

/**
 * The three-up card below them. `suffix` is the streak's " Days", which the
 * reference sets smaller and lighter on the same line as the number.
 */
export const KEY_STATS: (Stat & { suffix?: string })[] = [
  // STEP 4.10 points earned
  // {
  //   key: 'xp',
  //   icon: 'gem',
  //   value: '175',
  //   label: 'XP Points',
  //   tint: '#f4effe',
  //   ink: ll.violet.ink,
  // },
  // STEP 4.11 books opened
  // {
  //   key: 'quiz',
  //   icon: 'library',
  //   value: '99',
  //   label: 'Quizzes',
  //   tint: '#eaf6ff',
  //   ink: ll.sky.ink,
  // },
  // STEP 4.12 days in a row
  // {
  //   key: 'streak',
  //   icon: 'flame',
  //   value: '05',
  //   suffix: ' Days',
  //   label: 'Streak',
  //   tint: '#fff2eb',
  //   ink: ll.orange.ink,
  // },
];

export type MenuItem = {
  key: string;
  icon: IconName;
  title: string;
  subtitle: string;
  tint: string;
  ink: string;
  route: '/lumina/saved' | '/lumina/chat';
};

export const MENU: MenuItem[] = [
  // STEP 4.18 what they saved
  // {
  //   key: 'saved',
  //   icon: 'bookmark',
  //   title: 'Saved Resources',
  //   subtitle: 'Your bookmarked notes & lessons',
  //   tint: '#f2eefd',
  //   ink: ll.violet.ink,
  //   route: '/lumina/saved',
  // },
  // STEP 4.19 and what they practised
  // {
  //   key: 'history',
  //   icon: 'history',
  //   title: 'Practice History',
  //   subtitle: 'Track your completed exercises',
  //   tint: '#e8faed',
  //   ink: ll.emerald.ink,
  //   route: '/lumina/chat',
  // },
];
