/**
 * Everything the plan screen says and counts.
 *
 * **The rail over each card is its own progress**, so a card that says "day
 * 9 of 30" cannot be drawn a third full. The reference draws three rails at
 * three arbitrary widths over three plans with no progress figure at all.
 *
 * **The day the header names is the day the rail has picked out.** The
 * reference's header and rail agree here, and this keeps them agreeing by
 * computing the header from the rail rather than typing it twice.
 *
 * Every programme name is invented; the reference names one after a real
 * person.
 */

export const copy = {
  display: 'Training Plan',
  dayWord: 'day plan',
  minutes: 'minutes',
  start: 'Start',
} as const;

export const avatar = require('../../../../assets/images/vigorplan/face-1.jpg');

export const unread = 3;

/** Every other day of the fortnight; the 16th is today. */
export const days = [
  { num: 14, name: 'mon' },
  { num: 16, name: 'wed' },
  { num: 18, name: 'fri' },
  { num: 20, name: 'sun' },
  { num: 22, name: 'tue' },
] as const;

export const todayNum = 16;

const LONG = ['', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const INDEX: Record<string, number> = {
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6,
  sun: 7,
};

/** The header's date, read off the rail so the two cannot disagree. */
const today = days.find((d) => d.num === todayNum) ?? days[0];
export const dateLine = `${LONG[INDEX[today.name]]}, March ${today.num}`;

export const plans = [
  {
    id: 'p1',
    title: 'Base for a beginner',
    metaKind: 'days' as const,
    metaValue: 30,
    done: 9,
    tone: 'blue' as const,
    photo: require('../../../../assets/images/vigorplan/plan-1.jpg'),
  },
  {
    id: 'p2',
    title: 'Low-impact mobility',
    metaKind: 'minutes' as const,
    metaValue: 27,
    done: 14,
    tone: 'purple' as const,
    photo: require('../../../../assets/images/vigorplan/plan-2.jpg'),
  },
  {
    id: 'p3',
    title: 'Strength, twice a week',
    metaKind: 'days' as const,
    metaValue: 42,
    done: 31,
    tone: 'teal' as const,
    photo: require('../../../../assets/images/vigorplan/plan-3.jpg'),
  },
] as const;

/** Each card's rail, as a share of its own total. */
export const progressOf = (p: (typeof plans)[number]) =>
  Math.min(1, p.done / (p.metaKind === 'days' ? p.metaValue : p.metaValue));
