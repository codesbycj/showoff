/**
 * Everything the overview says and counts, so the components stay
 * presentational.
 *
 * **The day chips are dates, not strings.** The reference types "12
 * September", "13 September", "14 Sep..." beside an "All" chip; here they are
 * generated from one `Date`, so the row cannot name a day the rest of the
 * screen does not have.
 *
 * Each project carries its own cast rather than every row showing the same
 * three faces, which is what the reference's single stack implies and what a
 * list of different projects would never actually look like.
 *
 * **The project count is counted.** The reference's "(16)" sits beside a list
 * it does not match; this one reads `projects.length`.
 *
 * **The hero's total is the two cards added up.** 23 unfulfilled + 56 team
 * does not come to the reference's 153, and a dashboard whose headline
 * figure contradicts the two tiles under it is worse than one with no
 * headline at all.
 */

export const copy = {
  greetLines: ['Good morning,', 'Alexa!'],
  create: '+  Create new task',
  overview: 'Tasks overview',
  seeAll: 'See all',
  heroLabel: 'Number of tasks performed',
  permanent: 'Permanent tasks',
  unfulfilled: 'Unfulfilled tasks',
  team: 'Team tasks',
  manage: ['Manage your', 'projects'],
} as const;

export const today = new Date(2028, 4, 15);

export const avatar = require('../../../../assets/images/focalhome/face-1.jpg');

export const stack = [
  require('../../../../assets/images/focalhome/face-2.jpg'),
  require('../../../../assets/images/focalhome/face-3.jpg'),
  require('../../../../assets/images/focalhome/face-4.jpg'),
  require('../../../../assets/images/focalhome/face-5.jpg'),
];

/** "All", then the next four days, named from one `Date`. */
export const dayChips = [
  { id: 'all', label: 'All' },
  ...Array.from({ length: 4 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      id: d.toISOString().slice(0, 10),
      label: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long' }),
    };
  }),
];

export const unfulfilled = 97;
export const teamTasks = 56;

export const projects = [
  { id: 'r1', title: 'Calls with Teammates', done: 4, total: 6, people: [0, 1, 2] },
  { id: 'r2', title: 'Design review round two', done: 2, total: 5, people: [1, 3] },
  { id: 'r3', title: 'Launch checklist', done: 7, total: 9, people: [3, 0, 2] },
] as const;

export const performed = unfulfilled + teamTasks;
export const projectCount = projects.length;
