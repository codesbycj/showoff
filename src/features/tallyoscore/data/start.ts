/**
 * Everything the score screen says and counts.
 *
 * **The verdict is computed, not typed.** "above average" is `score`
 * against `average`; change either and the sentence changes with it. A
 * headline that reads "above average" beside a figure below the average is
 * the one thing this screen cannot do.
 *
 * **Growth is the difference between this period and the last**, and the
 * best result is the tasks that actually got done — both of them arithmetic
 * rather than copy.
 *
 * "Weeekly" is corrected to "Weekly". The name is gender-neutral: the
 * portraits come from a fixed pool, so a gendered name pinned to whichever
 * face lands first says something about a real person that the data has no
 * business saying.
 */

export const copy = {
  eyebrow: 'Statistics',
  helloBefore: 'Hello ',
  name: 'Robin',
  sentenceMiddle: ' your overall score is ',
  growthLabel: 'Growth: ',
  bestLabel: 'Best Result: ',
  tasksWord: ' Tasks',
  sharedBefore: 'Statistics shared to ',
  sharedAfter: ' friend',
  weekly: 'Weekly',
  monthly: 'Monthly',
  progress: 'Your progress',
  doingWell: 'You are doing well',
  needsWork: 'Keep at it',
} as const;

export const avatar = require('../../../../assets/images/tallyoscore/face-1.jpg');
export const friendAvatar = require('../../../../assets/images/tallyoscore/face-2.jpg');

export const score = 78;
export const lastScore = 63;
export const average = 64;

export const verdict = score >= average ? 'above average' : 'below average';
export const growth = score - lastScore;
export const doingWell = score >= average;

export const tasksDone = 5;
export const tasksTotal = 8;

export const friends = 1;

/**
 * What the toggle actually switches between.
 *
 * The reference's control has two halves and nothing behind them. Giving it
 * two real series costs one array each and makes the control worth pressing;
 * the card needs the middle anyway, and a progress card with nothing in its
 * middle is the "dead space" defect in miniature.
 *
 * Both are shares of the period's target, so the bars and the headline
 * percentage are the same kind of number.
 */
export const series = {
  weekly: [
    { label: 'M', share: 0.62 },
    { label: 'T', share: 0.48 },
    { label: 'W', share: 0.81 },
    { label: 'T', share: 0.55 },
    { label: 'F', share: 0.93 },
    { label: 'S', share: 0.34 },
    { label: 'S', share: 0.78 },
  ],
  monthly: [
    { label: 'W1', share: 0.54 },
    { label: 'W2', share: 0.69 },
    { label: 'W3', share: 0.46 },
    { label: 'W4', share: 0.78 },
  ],
} as const;
