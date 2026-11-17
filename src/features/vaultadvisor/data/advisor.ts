/**
 * Everything vaultadvisor says, so the components stay presentational.
 *
 * **The board's typo is corrected** and listed in the handover (I1): "Trusted
 * by 3k+ clients wordwide" is worldwide.
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 */
export const brand = { wordmark: 'Vaultix' };

export const advisor = {
  name: 'Elena Voss',
  role: 'Wealth strategist',
  place: 'Berlin, Germany',
  trust: 'Trusted by 3k+ clients worldwide',
  image: require('../../../../assets/images/vaultadvisor/advisor.jpg'),
};

export type Credential = { id: string; label: string; value: string };

/** The board ends on one line and leaves the rest of the frame empty; these
 *  are the rows it crops, which is the sanctioned fix for a short screen
 *  (I3). */
export const credentials: Credential[] = [
  { id: 'aum', label: 'Under advice', value: '$410M' },
  // STEP 1.13 "With Vaultix"
  // { id: 'years', label: 'With Vaultix', value: '11 yrs' },
  // STEP 1.14 "Focus"
  // { id: 'focus', label: 'Focus', value: 'Private' },
  // STEP 1.15 "Speaks"
  // { id: 'tongues', label: 'Speaks', value: 'DE / EN' },
];
