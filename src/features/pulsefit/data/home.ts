/**
 * Everything the home screen says, so the components stay presentational.
 *
 * The strings are the export's own, down to the plain hyphen in the calorie
 * range — the markup writes `456 - 512 kcal`, and the render only looks like
 * it carries an en dash because Plus Jakarta Sans draws a long hyphen.
 */
import type { ImageSourcePropType } from 'react-native';

import type { SymbolName } from '../symbols';

export const HOME = {
  brand: 'PulseFit',
  title: 'Home',
  greeting: 'Good morning!',
  name: 'Sajibur Rahman',
  avatar: require('../../../../assets/images/pulsefit/avatar.jpg') as ImageSourcePropType,

  hero: {
    badge: 'Daily intake',
    title: 'Your Weekly Progress',
    subtitle: '86% streak achieved!',
    /** The ring reads 6 of 7, which is the 86% the subtitle quotes. */
    value: '6',
    unit: 'days',
    /** `stroke-dasharray 251.2` against `stroke-dashoffset 38` — 84.9%. */
    progress: 0.849,
  },

  month: 'August 2025',
  mealsTitle: "Today's Meals",
  seeAll: 'See all',
} as const;

export type Metric = {
  key: string;
  /** Two lines, because the card sets them as two `leading-tight` spans. */
  label: readonly [string, string];
  value: string;
  unit: string;
  tone: 'orange' | 'blue';
};

export const METRICS: readonly Metric[] = [
  { key: 'steps', label: ['Step to', 'walk'], value: '5,500', unit: 'steps', tone: 'orange' },
  { key: 'water', label: ['Drink', 'Water'], value: '12', unit: 'glass', tone: 'blue' },
];

export type Day = { key: string; letter: string; date: string };

export const WEEK: readonly Day[] = [
  { key: 'sun', letter: 'S', date: '07' },
  { key: 'mon', letter: 'M', date: '08' },
  { key: 'tue', letter: 'T', date: '09' },
  { key: 'wed', letter: 'W', date: '10' },
  { key: 'thu', letter: 'T', date: '11' },
  { key: 'fri', letter: 'F', date: '12' },
  { key: 'sat', letter: 'S', date: '13' },
];

export const TODAY = 'wed';

export type Meal = {
  key: string;
  name: string;
  kcal: string;
  thumbs: readonly ImageSourcePropType[];
};

export const MEALS: readonly Meal[] = [
  {
    key: 'breakfast',
    name: 'Breakfast',
    kcal: '456 - 512 kcal',
    thumbs: [
      require('../../../../assets/images/pulsefit/bf-toast.jpg') as ImageSourcePropType,
      require('../../../../assets/images/pulsefit/bf-bowl.jpg') as ImageSourcePropType,
    ],
  },
  {
    key: 'lunch',
    name: 'Lunch time',
    kcal: '456 - 512 kcal',
    thumbs: [
      require('../../../../assets/images/pulsefit/ln-steak.jpg') as ImageSourcePropType,
      require('../../../../assets/images/pulsefit/ln-salad.jpg') as ImageSourcePropType,
    ],
  },
];

export type Tab = { key: string; label: string; icon: SymbolName };

export const TABS: readonly Tab[] = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'progress', label: 'Progress', icon: 'insights' },
  { key: 'scan', label: 'Scan', icon: 'add' },
  { key: 'rewards', label: 'Rewards', icon: 'militaryTech' },
  { key: 'menu', label: 'Menu', icon: 'widgets' },
];
