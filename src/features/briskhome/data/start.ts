/**
 * Everything the overview says and counts, so the components stay
 * presentational.
 *
 * **The spelling is corrected.** The reference writes "High Priorty"; a
 * design shot is not an authority on spelling (AGENTS.md, "Fix the
 * reference's mistakes").
 *
 * **"Today you have 5 tasks" is counted, not typed.** It reads `tasks.length`
 * — the one line on a dashboard most likely to go stale, and the easiest to
 * derive.
 *
 * **"+ 2 people" is counted too**, from a card's `people` minus the faces it
 * shows.
 */

export const copy = {
  name: 'Debra Clark',
  displayLines: [
    [
      { text: 'Overview ', weight: 'bold' },
      { text: 'of', weight: 'light' },
    ],
    [
      { text: 'your ', weight: 'light' },
      { text: 'activities', weight: 'bold' },
    ],
  ],
  details: 'Details',
  productivity: ['Week', 'Productivity'],
  promo: {
    brand: 'SmartTasker',
    lines: ['Upgrade', 'to Premium'],
    price: '$15/m',
    off: '-20%',
    foot: 'All the features of the service',
  },
} as const;

export const avatar = require('../../../../assets/images/briskhome/face-1.jpg');

export const stack = [
  require('../../../../assets/images/briskhome/face-2.jpg'),
  require('../../../../assets/images/briskhome/face-3.jpg'),
  require('../../../../assets/images/briskhome/face-4.jpg'),
];

export const filters = ['All', 'Meetings', 'Researches', 'Design', 'Admin'] as const;

export const tasks = [
  { id: 'k1', title: 'Wallet App Design' },
  { id: 'k2', title: 'Onboarding copy' },
  { id: 'k3', title: 'Design review' },
  { id: 'k4', title: 'Handover notes' },
  { id: 'k5', title: 'Weekly standup' },
] as const;

/**
 * Two cards, not one. The reference shows a single card and then a band of
 * empty page under it; one card stretched to fill that band leaves two voids
 * inside itself instead. A second card is content rather than air.
 */
export const cards = [
  {
    id: 'c1',
    tags: ['High Priority', '2 days left'],
    title: 'Wallet App Design',
    sub: 'Creating wireframes for login flow',
    people: 5,
  },
  {
    id: 'c2',
    tags: ['Research', '5 days left'],
    title: 'Onboarding copy',
    sub: 'Rewriting the first-run screens',
    people: 7,
  },
] as const;

/** Hours logged, by weekday. Two of them are the week's best and run lime. */
export const week = [
  { key: 'M', hours: 4.5 },
  { key: 'T', hours: 7.25 },
  { key: 'W', hours: 5.75 },
  { key: 'T2', hours: 6.5 },
  { key: 'F', hours: 3.25 },
] as const;

export const tabs = ['Home', 'Schedule', 'Teams', 'Profile'] as const;

export const taskCount = tasks.length;

/** How many people are on a card beyond the faces it shows. */
export const extraPeople = (people: number) => people - stack.length;
