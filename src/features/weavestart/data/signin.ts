import { wv } from '../theme';

/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * The pills carry their own angle and offset. They are a *composition* rather
 * than a list — the reference throws them down at angles and lets them
 * overlap — so the arrangement belongs in the data where it can be nudged,
 * not in the component where it would be a stack of magic numbers.
 *
 * `x` is a fraction of the page width and `y` a fraction of the cluster's own
 * height, so the throw keeps its shape on any phone.
 */
export const brand = {
  name: 'fitplan',
  label: 'fitplan',
  from: 'left' as const,
  x: 0.3,
  y: 0.03,
  angle: -8,
};

/**
 * The throw.
 *
 * `from` is which edge the pill hangs off. Every pill used to be placed by a
 * `left` fraction, which bunched them down the left edge and let a long label
 * on a right-hand pill run off the screen - a pill is as wide as its words and
 * nothing knows that in advance. Alternating the side down an even vertical
 * rhythm is what makes it read as a scatter rather than a list.
 */
export const tags = [
  {
    key: 'shopping',
    label: 'Shopping',
    color: wv.tags.shopping,
    from: 'left' as const,
    x: 0.03,
    y: 0.22,
    angle: -7,
  },
  {
    key: 'birthday',
    label: 'Birthday',
    color: wv.tags.birthday,
    from: 'right' as const,
    x: 0.02,
    y: 0.36,
    angle: 9,
  },
  {
    key: 'meeting',
    label: 'Meeting',
    color: wv.tags.meeting,
    from: 'left' as const,
    x: 0.08,
    y: 0.5,
    angle: -3,
  },
  {
    key: 'holiday',
    label: 'Holiday',
    color: wv.tags.holiday,
    from: 'right' as const,
    x: 0.06,
    y: 0.65,
    angle: 5,
  },
  {
    key: 'todo',
    label: 'To do List',
    color: wv.tags.todo,
    from: 'left' as const,
    x: 0.01,
    y: 0.8,
    angle: -5,
  },
];

export const copy = {
  headline: ['Weave Your', 'Time, Design', 'Your Destiny.'],
  google: 'Continue with Google',
  apple: 'Continue with Apple',
  footLead: "Don't have an account?",
  footLink: 'Create Account',
} as const;
