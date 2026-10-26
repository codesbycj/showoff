/**
 * Everything the task list says and counts, so the components stay
 * presentational.
 *
 * **The filter counts are counted.** The reference shows "All (24)",
 * "In Progress (6)" and "Completed (12)", which do not add up — 6 and 12 is
 * 18, not 24. Here every count is derived from `tasks`, so the chips and the
 * list cannot disagree.
 *
 * **The spelling and the dates are corrected.** The reference writes "Steet
 * Structure", "Electrical Rough-IN" and "Level2", and dates one task in 2026
 * among a list of 2025 ones.
 */

export const copy = {
  title: 'Tasks',
  all: 'All',
  inProgress: 'In Progress',
  completed: 'Completed',
  sortBy: 'Sort by: Due Date',
} as const;

export const faces = [
  require('../../../../assets/images/masontasks/face-1.jpg'),
  require('../../../../assets/images/masontasks/face-2.jpg'),
  require('../../../../assets/images/masontasks/face-3.jpg'),
  require('../../../../assets/images/masontasks/face-4.jpg'),
];

export const tasks = [
  {
    id: 'k1',
    title: 'Concrete pouring',
    where: 'Level 3 · Zone B',
    state: 'In progress',
    due: 'May 5, 2025 · 9:00 AM',
    crew: 4,
    progress: 0.6,
    mark: 'pour',
  },
  {
    id: 'k2',
    title: 'Steel structure',
    where: 'Level 2 · Zone A',
    state: 'Completed',
    due: 'Apr 30, 2025 · 10:00 AM',
    crew: 5,
    progress: 1,
    mark: 'frame',
  },
  {
    id: 'k3',
    title: 'Electrical rough-in',
    where: 'Level 4 · Zone C',
    state: 'Delayed',
    due: 'May 6, 2025 · 1:00 PM',
    crew: 3,
    progress: 0.25,
    mark: 'spark',
  },
  {
    id: 'k4',
    title: 'Glazing survey',
    where: 'Level 1 · Zone A',
    state: 'In progress',
    due: 'May 9, 2025 · 8:30 AM',
    crew: 4,
    progress: 0.4,
    mark: 'frame',
  },
] as const;

export const counts = {
  all: tasks.length,
  inProgress: tasks.filter((t) => t.state === 'In progress').length,
  completed: tasks.filter((t) => t.state === 'Completed').length,
};
