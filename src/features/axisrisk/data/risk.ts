import type { ImageSourcePropType } from 'react-native';

/**
 * Everything axisrisk says, so the components stay presentational.
 *
 * **One scale, read by the bar.** The board grades this risk "Very High 5" on
 * a bar that runs 1 to 5, while the profile screen beside it puts an inherent
 * score of 20 on the same risk. Here the grade, the bar's fill and the score
 * are the same number on the same scale, so the picture agrees with the
 * figures (R9 / I1).
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 */
export const header = {
  badge: '8',
  title: 'R-143: Vendors data leak due to human error',
  scoreLabel: 'Risk score',
  assessments: 'Assessments',
};

export const score = { grade: 'Very high', value: 5, scale: 5 };

export type Fact = { id: string; label: string; value: string; live?: boolean };

export const facts: Fact[] = [
  { id: 'category', label: 'Category', value: 'Operational' },
  // STEP 1.11 "Creation date"
  // { id: 'created', label: 'Creation date', value: 'Nov 15, 2024' },
  // STEP 1.12 "Latest update"
  // { id: 'updated', label: 'Latest update', value: 'Dec 23, 2025' },
  // STEP 1.13 "Status"
  // { id: 'status', label: 'Status', value: 'In progress', live: true },
];

export type Assessor = {
  id: string;
  name: string;
  stage: string;
  tint: 'lavender' | 'pink';
  image: ImageSourcePropType;
};

export const assessors: Assessor[] = [
  {
    id: 'alex',
    name: 'Alex Johnson',
    stage: 'Treatment',
    tint: 'lavender',
    image: require('../../../../assets/images/axisrisk/a1.jpg'),
  },
  // STEP 1.27 "Casey Brown"
  // {
  //   id: 'casey',
  //   name: 'Casey Brown',
  //   stage: 'Monitoring',
  //   tint: 'pink',
  //   image: require('../../../../assets/images/axisrisk/a2.jpg'),
  // },
];

export const me = require('../../../../assets/images/axisrisk/me.jpg');
