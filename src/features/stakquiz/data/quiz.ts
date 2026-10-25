/**
 * Everything the quiz screen says, so the components stay presentational.
 *
 * The brand, the question and the shares are invented. The faces are
 * free-licensed photographs, credited in
 * `assets/images/stakquiz/CREDITS.md`.
 *
 * **The shares add up.** 62 + 24 + 11 + 3 is 100, and each answer's count is
 * that share of the same 19,400 people. A design shot can print 99%, 1% and
 * 0% beside three answers and nobody checks; an app that did would be telling
 * you something false about what other people said.
 */

const f1 = require('../../../../assets/images/stakquiz/face-1.jpg');
const f2 = require('../../../../assets/images/stakquiz/face-2.jpg');
const f3 = require('../../../../assets/images/stakquiz/face-3.jpg');
const f4 = require('../../../../assets/images/stakquiz/face-4.jpg');
const f5 = require('../../../../assets/images/stakquiz/face-5.jpg');
const f6 = require('../../../../assets/images/stakquiz/face-6.jpg');

export const copy = {
  title: 'Investing Quiz',
  question: ['HOW MUCH', 'DO YOU NEED', 'TO START?'],
} as const;

export const progress = { done: 3, total: 6 } as const;

export const answers = [
  {
    id: 'a1',
    label: 'As little as $1',
    share: '62%',
    count: '+12,028',
    faces: [f1, f2, f3, f4],
    picked: true,
  },
  { id: 'a2', label: '$100', share: '24%', count: '+4,656', faces: [f5, f6, f2], picked: false },
  { id: 'a3', label: '$1,000', share: '11%', count: '+2,134', faces: [f3, f4], picked: false },
  { id: 'a4', label: 'More than $10,000', share: '3%', count: '+582', faces: [f6], picked: false },
] as const;
