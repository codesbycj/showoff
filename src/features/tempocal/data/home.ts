/**
 * Everything the home screen says, so the components stay presentational.
 *
 * The faces are photographs of real people, free-licensed, bundled — initials
 * on a coloured disc is a fallback state and not a substitute for what the
 * design has (AGENTS.md, "Faces are photographs"). They are credited in
 * `assets/images/tempohome/CREDITS.md`.
 *
 * The reference shows one task card and then crops the phone. Three here, so
 * the list behaves like a list and the screen reaches its own bottom edge —
 * see the note in `layout.ts`.
 */

const face1 = require('../../../../assets/images/tempocal/face-1.jpg');
const face2 = require('../../../../assets/images/tempocal/face-2.jpg');
const face3 = require('../../../../assets/images/tempocal/face-3.jpg');
const face4 = require('../../../../assets/images/tempocal/face-4.jpg');
const face5 = require('../../../../assets/images/tempocal/face-5.jpg');
const face6 = require('../../../../assets/images/tempocal/face-6.jpg');

export const me = face6;

export const copy = {
  month: 'February',
  section: 'Today Tasks',
  sectionLink: 'See All',
} as const;

export const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const;

/**
 * February, as data rather than as a picture of a calendar.
 *
 * `pad` is a day from the month either side, drawn hatched. `tone` is why a
 * day is marked: `done` for work finished, `today` for the one you are on,
 * `due` for the one with a deadline on it. The reference marks days in three
 * colours and never says what they mean; naming them here is the difference
 * between a calendar and a picture of one.
 */
export const month = [
  [
    { pad: true },
    { pad: true },
    { pad: true },
    { pad: true },
    { date: 1 },
    { date: 2, tone: 'done' },
    { date: 3 },
  ],
  [
    { date: 4 },
    { date: 5, tone: 'done' },
    { date: 6, tone: 'done' },
    { date: 7 },
    { date: 8, tone: 'done' },
    { date: 9 },
    { date: 10, tone: 'today' },
  ],
  [
    { date: 11, tone: 'done' },
    { date: 12 },
    { date: 13 },
    { date: 14, tone: 'done' },
    { date: 15 },
    { date: 16, tone: 'due' },
    { date: 17 },
  ],
  [
    { date: 18 },
    { date: 19 },
    { date: 20, tone: 'done' },
    { date: 21 },
    { date: 22 },
    { date: 23, tone: 'done' },
    { date: 24, tone: 'done' },
  ],
  [
    { date: 25, tone: 'today' },
    { date: 26 },
    { date: 27 },
    { date: 28, tone: 'done' },
    { date: 29 },
    { pad: true },
    { pad: true },
  ],
] as const;

/** The people on the project, and whether they are about. */
export const crew = [
  { id: 'a', src: face1, live: true },
  { id: 'b', src: face2, live: false },
  { id: 'c', src: face3, live: true },
  { id: 'd', src: face4, live: true },
  { id: 'e', src: face5, live: false },
] as const;

export const crewMore = '10+';

export const tasks = [
  {
    id: 'kit',
    title: 'Delivery App UI Kit',
    body: 'We got a project to make a delivery ui kit called Foodnow, and the first cut is due Friday.',
    faces: [face1, face2, face3, face4],
    more: '2+',
    progress: 0.65,
  },
  {
    id: 'brand',
    title: 'Foodnow Brand Sprint',
    body: 'Three routes for the wordmark, one of them quiet enough to survive a 24dp app icon.',
    faces: [face3, face5, face2],
    more: '4+',
    progress: 0.4,
  },
  {
    id: 'research',
    title: 'Courier Interviews',
    body: 'Six riders, thirty minutes each, and a note of every moment the current app made them stop.',
    faces: [face4, face1],
    more: '1+',
    progress: 0.18,
  },
] as const;

export const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'message', label: 'Message' },
  { id: 'calendar', label: 'Calendar' },
  { id: 'friends', label: 'Friends' },
] as const;
