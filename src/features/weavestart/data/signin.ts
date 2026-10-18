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
export const brand = { name: 'fitplan', x: 0.42, y: 0.02, angle: -8 } as const;

export const tags = [
  { key: 'shopping', label: 'Shopping', color: wv.tags.shopping, x: 0.02, y: 0.26, angle: -7 },
  { key: 'birthday', label: 'Birthday', color: wv.tags.birthday, x: 0.52, y: 0.33, angle: 9 },
  { key: 'meeting', label: 'Meeting', color: wv.tags.meeting, x: 0.0, y: 0.58, angle: 0 },
  { key: 'holiday', label: 'Holiday', color: wv.tags.holiday, x: 0.0, y: 0.86, angle: -4 },
  { key: 'todo', label: 'To do List', color: wv.tags.todo, x: 0.42, y: 0.86, angle: 3 },
] as const;

export const copy = {
  headline: ['Weave Your', 'Time, Design', 'Your Destiny.'],
  google: 'Continue with Google',
  apple: 'Continue with Apple',
  footLead: "Don't have an account?",
  footLink: 'Create Account',
} as const;
