import type { ImageSourcePropType } from 'react-native';

/**
 * Everything axisprofile says, so the components stay presentational.
 *
 * **One scale, read by every number on it.** The board puts a residual risk
 * score of 5 beside an inherent risk score of 20 on the same card, and then
 * grades the risk itself "Very High 5" on a bar that runs 1 to 5. Three
 * scales, none of them stated. Here both scores are on the 1-5 scale the bar
 * uses, so the picture and the figures agree (R9 / I1).
 *
 * **The description is trimmed to 104 characters.** The board's runs past 180
 * and is cut off mid-word by its own frame; a run of body copy over 110 is a
 * COPY failure (R5).
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 */
export const header = { badge: '8', display: 'Function:\nCybersecurity' };

export type Tab = { id: string; label: string; count?: string; on?: boolean };

export const tabs: Tab[] = [
  { id: 'profile', label: 'Risk profile', on: true },
  // STEP 1.06 "Key indicators"
  // { id: 'indicators', label: 'Key indicators', count: '2' },
  // STEP 1.07 "Tasks"
  // { id: 'tasks', label: 'Tasks', count: '5' },
];

export type Cell = {
  id: string;
  label: string;
  value: string;
  tint?: 'pink' | 'lavender';
  dot?: 'magenta' | 'indigo';
};

export const cells: Cell[] = [
  { id: 'source', label: 'Risk source', value: 'General' },
  // STEP 1.15 "Residual risk score"
  // { id: 'residual', label: 'Residual risk score', value: '2 of 5', tint: 'pink', dot: 'magenta' },
  // STEP 1.16 "Inherent risk score"
  // {
  //   id: 'inherent',
  //   label: 'Inherent risk score',
  //   value: '5 of 5',
  //   tint: 'lavender',
  //   dot: 'indigo',
  // },
  // STEP 1.17 "Risk methodology"
  // { id: 'method', label: 'Risk methodology', value: 'Enterprise risk management' },
];

export type Face = { id: string; image: ImageSourcePropType };

export type Group = { id: string; label: string; faces: Face[]; more: string };

export const groups: Group[] = [
  {
    id: 'owners',
    label: 'Owners',
    faces: [
      { id: 'o1', image: require('../../../../assets/images/axisprofile/o1.jpg') },
      { id: 'o2', image: require('../../../../assets/images/axisprofile/o2.jpg') },
    ],
    more: '+1',
  },
  // STEP 1.19 "Managers"
  // {
  //   id: 'managers',
  //   label: 'Managers',
  //   faces: [
  //     { id: 'm1', image: require('../../../../assets/images/axisprofile/m1.jpg') },
  //     { id: 'm2', image: require('../../../../assets/images/axisprofile/m2.jpg') },
  //   ],
  //   more: '+6',
  // },
  // STEP 1.20 "Stakeholders"
  // {
  //   id: 'stakeholders',
  //   label: 'Stakeholders',
  //   faces: [
  //     { id: 's1', image: require('../../../../assets/images/axisprofile/s1.jpg') },
  //     { id: 's2', image: require('../../../../assets/images/axisprofile/s2.jpg') },
  //   ],
  //   more: '+4',
  // },
];

export const description = {
  label: 'Description',
  /** 104 characters. */
  body: 'The cybersecurity team protects the organisation against unauthorised access and data breaches.',
};
