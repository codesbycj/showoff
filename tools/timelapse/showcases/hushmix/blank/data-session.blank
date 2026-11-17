/**
 * Everything hushmix says, so the components stay presentational.
 *
 * **Every array is annotated** (I7): a reveal fills them one entry at a time,
 * and a type inferred from whichever rows happen to be uncommented loses every
 * property that only appears on a later row.
 */
export const session = {
  name: 'Sleep',
  by: 'by Alison S',
  timerLabel: 'Timer',
  timer: '40 min',
  foundationLabel: 'Foundation',
  motiveLabel: 'Motive',
  genre: 'POP - EPIC',
  track: 'Northern Sky',
  controlsLabel: 'Controls',
  relaxed: 'relaxed',
  intense: 'intense',
  cta: 'Play',
};

export type Tag = { id: string; label: string };

export const tags: Tag[] = [
  { id: 'relax', label: 'very relaxing' },
  // STEP 1.07 "pleasant"
  // { id: 'pleasant', label: 'pleasant' },
  // STEP 1.08 "deep"
  // { id: 'deep', label: 'deep' },
];

export type Pick = { id: string; label: string };

export const picks: Pick[] = [
  { id: 'relaxation', label: 'Relaxation' },
  // STEP 1.14 "Trance"
  // { id: 'trance', label: 'Trance' },
];

/** Where the controls rest, 0 at `relaxed` and 1 at `intense`. The slider
 *  reads this rather than being drawn at a guessed position (R9). */
export const intensity = 0.34;
