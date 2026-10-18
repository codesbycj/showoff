/** Everything the work screen says, kept out of the components. */

export const header = {
  title: 'Welcome, Salung',
  searchPlaceholder: 'Search project, task, event...',
} as const;

export const banner = {
  title: 'See your\nperformance',
  cta: 'Check now',
  gain: '+3.45%',
  /**
   * The performance block, as a grid of filled and empty cells. Hand-set
   * rather than random, because a reveal re-renders this on every step and a
   * random chart would reshuffle itself in front of the camera.
   */
  cells: [
    [0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1],
    [0, 0, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1],
    [1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
} as const;

export const sections = {
  projects: 'Projects',
  tasks: "Today's tasks",
  more: 'See all',
} as const;

export const projects = [
  {
    key: 'rates',
    chart: 'line',
    title: 'Decision making',
    meta: 'Analysing drop-off rates and metrics.',
    progress: 0.08,
    figure: '8%',
  },
  {
    key: 'peppers',
    chart: 'icons',
    title: 'Decision making',
    meta: 'Wing peppers parsley, Bianca green.',
    progress: 0.34,
    figure: '34%',
  },
] as const;

/** The line chart's own figures, printed where the reference prints them. */
export const lineFigures = [
  { key: 'a', label: '30%', x: 0.08, y: 0.12 },
  { key: 'b', label: '12%', x: 0.46, y: 0.02 },
  { key: 'c', label: '32%', x: 0.76, y: 0.2 },
] as const;

export const tasks = [
  {
    key: 'website',
    title: 'Website design development',
    state: 'Upcoming',
    when: 'Today: 10:15am',
    faces: [0, 1, 2],
  },
  {
    key: 'reviews',
    title: 'Client reviews and feedback',
    state: 'Complete',
    when: 'Today: 14:40pm',
    faces: [3, 4, 5],
  },
  {
    key: 'handover',
    title: 'Engineering handover notes',
    state: 'In progress',
    when: 'Today: 16:00pm',
    faces: [1, 5, 2],
  },
] as const;

export const dock = [
  { key: 'home', icon: 'home' },
  { key: 'stats', icon: 'chart' },
  { key: 'chat', icon: 'chat' },
  { key: 'me', icon: 'user' },
] as const;

export const selectedDock = 'home';
