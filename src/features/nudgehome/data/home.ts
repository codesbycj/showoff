/**
 * Everything the task screen says.
 *
 * **Two of the reference's defects are fixed.** Its second task reads
 * "12:30 AM → 14:45 AM", which is a 12-hour clock and a 24-hour clock in one
 * line; and its "To do anytime" card repeats the task directly above it word
 * for word. The times are one clock here and the anytime task is a different
 * task.
 *
 * **The habit labels are shorter than the reference's.** Its own middle card
 * reads "VEGETA..." — the label does not fit the card it is on, in the design
 * shot itself. R2 says a clipped string is a defect at any zoom, so they are
 * cut to fit: Shelter, Veg run, Exercise.
 *
 * The streak, the day strip and the "n of m" count all read from the same
 * arrays, so none of them can disagree with the list.
 */
export const copy = {
  hello: 'Hey, ',
  name: 'Tobi',
  planned: 'Planned',
  anytime: 'To do anytime',
  new: 'New',
  startNow: 'Start now',
  reschedule: 'Reschedule',
} as const;

export const streak = 10;

export const habits = [
  {
    id: 'shelter',
    label: 'Shelter',
    icon: 'paw' as const,
    photo: require('../../../../assets/images/nudgehome/shelter.jpg'),
  },
  {
    id: 'veg',
    label: 'Veg run',
    icon: 'basket' as const,
    photo: require('../../../../assets/images/nudgehome/veg.jpg'),
  },
  {
    id: 'exercise',
    label: 'Exercise',
    icon: 'run' as const,
    photo: require('../../../../assets/images/nudgehome/exercise.jpg'),
  },
];

/** Seven days, the ones before today ticked and today picked out. */
export const days = [
  { id: 'd16', num: 16, letter: 'S', done: true },
  { id: 'd17', num: 17, letter: 'M', done: true },
  { id: 'd18', num: 18, letter: 'T', done: true },
  { id: 'd19', num: 19, letter: 'W', today: true },
  { id: 'd20', num: 20, letter: 'T' },
  { id: 'd21', num: 21, letter: 'F' },
  { id: 'd22', num: 22, letter: 'S' },
];

export const tasks = [
  {
    id: 't1',
    n: 1,
    tint: 'purple' as const,
    title: 'Do some grocery shopping with the dog',
    time: '9:00 AM → 11:00 AM',
    chip: 'Starts in 30 mins',
    link: true,
  },
  {
    id: 't2',
    n: 2,
    tint: 'blue' as const,
    title: 'Send out 100 cold emails to startups',
    time: '12:30 PM → 2:45 PM',
  },
];

export const anytime = {
  title: 'Draft the week’s newsletter',
  length: '30m',
};

export const tabs = [
  { id: 'home', label: 'Today', icon: 'ghost' as const },
  { id: 'cal', label: 'Calendar', icon: 'calendar' as const },
  { id: 'add', label: 'New task', icon: 'plus' as const },
  { id: 'move', label: 'Habits', icon: 'run' as const },
  { id: 'me', label: 'Profile', icon: 'person' as const },
];
