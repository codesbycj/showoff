/**
 * Everything stridestart says.
 *
 * **No real place is named.** The map is built as the map idea (I4), so the
 * only words on it are the app's own — a lock state and an accuracy.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const gps = { state: 'GPS LOCKED', accuracy: '±3 M' };

export type Mode = {
  id: string;
  label: string;
  glyph: 'run' | 'ride' | 'hike' | 'gym';
  on?: boolean;
};

export const modes: Mode[] = [
  { id: 'run', label: 'RUN', glyph: 'run', on: true },
  // STEP 1.19 "RIDE"
  // { id: 'ride', label: 'RIDE', glyph: 'ride' },
  // STEP 1.20 "HIKE"
  // { id: 'hike', label: 'HIKE', glyph: 'hike' },
  // STEP 1.21 "GYM"
  // { id: 'gym', label: 'GYM', glyph: 'gym' },
];

export type Option = { id: string; label: string; value: string; glyph: 'flag' | 'wave' };

export const options: Option[] = [
  { id: 'goal', label: 'GOAL', value: 'Open run', glyph: 'flag' },
  // STEP 1.23 "AUDIO CUES"
  // { id: 'cues', label: 'AUDIO CUES', value: 'Every km', glyph: 'wave' },
];

export const cta = { label: 'START' };
