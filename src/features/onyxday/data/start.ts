/**
 * Everything today says, so the components stay presentational.
 *
 * **The week strip is computed from the date, not typed.** The reference
 * heads the screen "November 13, 2021" and then lays out "10 Mon ... 16 Sun"
 * with 13 marked Thursday. In November 2021 the 13th was a Saturday and the
 * 10th a Wednesday, so every label in the strip is wrong. Here one `Date`
 * drives the heading, the seven columns and which one is lit — and 13
 * November 2025 really is a Thursday.
 *
 * **The times are different from each other.** The reference prints "9.00 AM"
 * on all four entries, which is not a day's plan. These run through the
 * morning, in the format a clock uses.
 */

export const today = new Date(2025, 10, 13);

export const copy = {
  title: 'Today',
} as const;

export const avatar = require('../../../../assets/images/onyxday/face-1.jpg');

export const faces = [
  require('../../../../assets/images/onyxday/face-2.jpg'),
  require('../../../../assets/images/onyxday/face-3.jpg'),
  require('../../../../assets/images/onyxday/face-4.jpg'),
];

/** Monday of the week `today` falls in, then the seven days after it. */
export const week = (() => {
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return {
      key: d.toISOString().slice(0, 10),
      num: d.getDate(),
      name: d.toLocaleDateString('en-US', { weekday: 'short' }),
      on: d.getDate() === today.getDate(),
    };
  });
})();

export const dateLabel = today.toLocaleDateString('en-US', {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
});

export const entries = [
  {
    id: 'e1',
    title: 'Meeting',
    at: '9:00 AM',
    body: 'Discuss team task for the day',
    featured: true,
  },
  {
    id: 'e2',
    title: 'Icon set',
    at: '10:30 AM',
    body: 'Edit icons for team task for next week',
    featured: false,
  },
  {
    id: 'e3',
    title: 'Prototype',
    at: '1:15 PM',
    body: 'Make and send prototype to the client',
    featured: false,
  },
  {
    id: 'e4',
    title: 'Check asset',
    at: '3:40 PM',
    body: 'Start checking assets for the handover',
    featured: false,
  },
] as const;

export const tabs = ['home', 'docs', 'add', 'alerts', 'profile'] as const;
