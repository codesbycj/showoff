/**
 * Everything the project home says, so the components stay presentational.
 *
 * **"Decission" is spelled Decisions here**, "All Task" is "All tasks", and
 * "Hey Marimar !" loses the space before its exclamation mark. A design shot is not an authority on
 * spelling (AGENTS.md, "Fix the reference's mistakes").
 *
 * **The task list and the project cards share their copy on purpose.** The
 * first project's description *is* the first task, which is what makes the
 * two blocks read as one board rather than two unrelated lists — the
 * reference does this too, and it is the best idea on the screen.
 */

export const copy = {
  greeting: 'Hey Marimar!',
  display: ["Let's find your", 'best project!'],
  search: 'Search',
  projects: 'Project',
  allTasks: 'All tasks',
  tasks: 'Tasks',
  viewAll: 'View all',
} as const;

export const avatar = require('../../../../assets/images/onyxhome/face-1.jpg');

export const projects = [
  {
    id: 'p1',
    title: 'Game Design',
    body: 'Create menu in dashboard & make user flow',
    tone: 'dark',
    mark: 'joystick',
  },
  {
    id: 'p2',
    title: 'Decisions',
    body: 'Edit icons for team task for next week',
    tone: 'blue',
    mark: 'pie',
  },
  {
    id: 'p3',
    title: 'Handover',
    body: 'Write the build notes and hand the files over',
    tone: 'plain',
    mark: 'box',
  },
] as const;

export const tasks = [
  { id: 't1', body: 'Create menu in dashboard & make user flow', done: true },
  { id: 't2', body: 'Make and send prototype to the client', done: false },
  { id: 't3', body: 'Edit icons for team task for next week', done: false },
] as const;

export const tabs = ['home', 'docs', 'add', 'alerts', 'profile'] as const;
