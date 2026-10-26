/**
 * Everything the boards screen says and counts.
 *
 * **Every gauge's fill is its own figure.** The reference draws five capsules
 * filled to roughly the same height over five unrelated numbers — 1230, 61.4,
 * 27.5, 43.8 and 32% — so the row says nothing. Here each has a target and
 * the fill is `value / target`, which is the only thing a row of gauges is
 * for: comparing at a glance.
 *
 * **The headline is grammatical.** The reference reads "your boards looks so
 * good".
 *
 * **The name is gender-neutral.** The portraits come from a fixed pool, so
 * pinning a gendered name to whichever face lands first says something about
 * a real person that the data has no business saying.
 */

export const copy = {
  greet: 'Hello, Robin!',
  headline: 'Robin, your boards are looking good',
  calories: 'Calories',
  kcal: 'Kcal',
  water: 'Water',
  share: 'You can share your board with your friends',
} as const;

export const avatar = require('../../../../assets/images/nibbleboards/face-1.jpg');

export const friends = [
  { id: 'f1', name: 'Nico', photo: require('../../../../assets/images/nibbleboards/face-2.jpg') },
  { id: 'f2', name: 'Shea', photo: require('../../../../assets/images/nibbleboards/face-3.jpg') },
] as const;

export const burned = 520;
export const burnTarget = 800;
export const burnShare = Math.min(1, burned / burnTarget);

/** Glasses drunk on each day of the week, out of eight. */
export const waterDays = [
  { letter: 'M', glasses: 6 },
  { letter: 'T', glasses: 7 },
  { letter: 'W', glasses: 5 },
  { letter: 'T', glasses: 8 },
  { letter: 'F', glasses: 4 },
  { letter: 'S', glasses: 7 },
  { letter: 'S', glasses: 6 },
] as const;

export const waterTarget = 8;

/**
 * The five gauges. `share` is what fills the capsule, so the picture and the
 * figure are one number.
 */
export const gauges = [
  { id: 'cal', name: 'Cal', value: '1230', share: 1230 / 2100 },
  { id: 'prot', name: 'Prot', value: '61.4', share: 61.4 / 90 },
  { id: 'carb', name: 'Carb', value: '27.5', share: 27.5 / 180 },
  { id: 'fats', name: 'Fats', value: '43.8', share: 43.8 / 60 },
  { id: 'rdc', name: 'RDC', value: '32%', share: 0.32 },
] as const;
