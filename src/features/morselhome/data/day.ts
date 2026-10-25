/**
 * Everything the home screen says, so the components stay presentational.
 *
 * The name and every figure are invented. The face is a free-licensed
 * photograph, credited in `assets/images/morselhome/CREDITS.md`.
 *
 * **The progress is computed.** The reference prints "80%" beside "1350
 * Calories" and "1120 Kcal" elsewhere on the same screen, which are three
 * numbers that do not describe each other. Here the target is 1,400, today is
 * 1,120, and the percentage is what that division gives.
 */

const face = require('../../../../assets/images/morselhome/face-1.jpg');

export const me = { greeting: 'Hello', name: 'Mr. David', src: face } as const;

const target = 1400;
const today = 1120;

export const progress = {
  tag: 'Your progress',
  pct: Math.round((today / target) * 100) + '%',
  date: '15 January 2023',
  target: target.toLocaleString('en-GB'),
  targetUnit: 'Calories',
} as const;

export const weight = {
  tag: 'Current weight',
  value: '70.5',
  unit: 'Kg',
  change: '3 Kg (-3.8%)',
} as const;

export const calories = {
  tag: "Today's calories",
  value: today.toLocaleString('en-GB'),
  unit: 'Kcal',
  change: '+4.6%',
} as const;

export const meal = {
  tag: 'Breakfast',
  kcal: '260 Kcal',
  when: 'Today',
  macros: [
    { id: 'p', label: 'Proteins', value: '58.6' },
    { id: 'c', label: 'Carbs', value: '48.8' },
    { id: 'f', label: 'Fats', value: '20.3' },
    { id: 'r', label: 'RDC', value: '16%' },
  ],
} as const;

export const dock = ['home', 'flame', 'clock'] as const;
