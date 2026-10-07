import type { SymbolName } from '../symbols';
import { mp } from '../theme';

/**
 * The check-in screen's content.
 *
 * The five moods are genuinely parametric in the export: `selectMood()` swaps
 * three SVG path strings and a fill, and the hero face redraws. That structure
 * is kept rather than flattened into five hand-drawn faces, because it is what
 * makes the hero and the chip badge the same drawing at two sizes.
 *
 * The badges are the one place this deviates from the export, and deliberately.
 * It ships `U+263A`, `U+26A1` and `U+2639` as literal text in a `<span>`, which
 * is an emoji or dingbat resolved by whatever font the device happens to have
 * for that codepoint — not the same font on Windows, Android and iOS, missing
 * outright in places, and invisible to a web harness that renders on one of
 * them. So the two faces are drawn from the mood's own paths and the bolt comes
 * from the icon set. `~` and `!` stay as text: both are plain ASCII and Plus
 * Jakarta Sans carries them.
 */

export type MoodBadge =
  { kind: 'face' } | { kind: 'icon'; name: SymbolName } | { kind: 'text'; ch: string };

export type CheckinMood = {
  key: string;
  /** The chip's caption. */
  label: string;
  /** The name the hero's pill shows when this mood is active. */
  title: string;
  /** The hero circle's fill, and the chip badge's well. */
  fill: string;
  /** Paths in the face's own 80-unit box. */
  eyeL: string;
  eyeR: string;
  mouth: string;
  badge: MoodBadge;
};

export const MOODS: readonly CheckinMood[] = [
  {
    key: 'happy',
    label: 'Joyful',
    title: 'Calm & Joyful',
    fill: mp.secondaryFixed,
    eyeL: 'M24 33c3-3 8-3 11 0',
    eyeR: 'M45 33c3-3 8-3 11 0',
    mouth: 'M28 47c4 6 18 6 24 0',
    badge: { kind: 'face' },
  },
  {
    key: 'energetic',
    label: 'Amped',
    title: 'Fired Up',
    fill: mp.secondaryFixedDim,
    eyeL: 'M25 31l6 5m-6 0l6-5',
    eyeR: 'M49 31l6 5m-6 0l6-5',
    mouth: 'M27 45h26',
    badge: { kind: 'icon', name: 'bolt' },
  },
  {
    key: 'sleepy',
    label: 'Sleepy',
    title: 'Tired & Slow',
    fill: mp.tertiaryFixed,
    eyeL: 'M24 35h10',
    eyeR: 'M46 35h10',
    mouth: 'M32 50h16',
    badge: { kind: 'text', ch: '~' },
  },
  {
    key: 'anxious',
    label: 'Stress',
    title: 'Overwhelmed',
    fill: mp.errorContainer,
    eyeL: 'M27 34a3 3 0 1 0 0.1 0',
    eyeR: 'M53 34a3 3 0 1 0 0.1 0',
    mouth: 'M28 50c3-3 6 3 9 0s6 3 9 0s6 3 6 0',
    badge: { kind: 'text', ch: '!' },
  },
  {
    key: 'low',
    label: 'Down',
    title: 'Gloomy & Heavy',
    fill: '#e4e1e6',
    eyeL: 'M24 35c3 2 8 2 11 0',
    eyeR: 'M45 35c3 2 8 2 11 0',
    mouth: 'M28 52c4-6 18-6 24 0',
    badge: { kind: 'face' },
  },
];

export const CHECKIN = {
  title: 'Log Mood Check In',
  heroEyebrow: 'Primary Feeling',

  intensityLabel: 'Feeling Intensity',
  /** The slider's value, and its range. `Level 7` is derived, not stored twice. */
  intensity: 7,
  intensityMin: 1,
  intensityMax: 10,
  intensityScale: ['1 Subtle Wave', '5 Balanced', '10 Deeply Felt'],

  triggersTitle: 'What impacted you?',
  triggersHint: 'Tap all that apply',

  journalTitle: 'Quick Journal',
  dictate: 'Dictate',
  journalBody: 'Morning sun and a brisk walk brought clarity before work started.',
  attachment: 'morning_sun.jpg attached',

  cta: 'Complete Check-In',
} as const;

export type Trigger = { key: string; label: string; icon: SymbolName; on?: boolean };

/**
 * The nine context chips, in the export's order.
 *
 * Two arrive selected. That is content, not state the screen invents — the
 * reference shows `Deep Work` and `Warm Sun` filled, and they are what make the
 * wrap break where it does.
 */
export const TRIGGERS: readonly Trigger[] = [
  // STEP 3.07 deep sleep
  // { key: 'sleep', label: 'Deep Sleep', icon: 'bedtime' },
  // STEP 3.08 deep work
  // { key: 'work', label: 'Deep Work', icon: 'laptopMac', on: true },
  // STEP 3.09 warm sun
  // { key: 'weather', label: 'Warm Sun', icon: 'sunny', on: true },
  // STEP 3.10 friends
  // { key: 'friends', label: 'Friends', icon: 'groups' },
  // STEP 3.11 family
  // { key: 'family', label: 'Family', icon: 'familyRestroom' },
  // STEP 3.12 exercise
  // { key: 'exercise', label: 'Exercise', icon: 'fitnessCenter' },
  // STEP 3.13 clean food
  // { key: 'nutrition', label: 'Clean Food', icon: 'restaurant' },
  // STEP 3.14 therapy
  // { key: 'therapy', label: 'Therapy', icon: 'psychology' },
  // STEP 3.15 hobbies
  // { key: 'hobbies', label: 'Hobbies', icon: 'palette' },
];

/** The energy tile's five bars, in dp — the export gives these as fixed heights. */
export const ENERGY = {
  title: 'Energy',
  bars: [12, 24, 32, 40, 48],
  stat: 'High',
  delta: '+18%',
} as const;

export const REST = {
  title: 'Rest Score',
  hours: '8',
  hoursUnit: 'hrs',
  minutes: '15',
  minutesUnit: 'm',
  note: 'Deep & Rested',
} as const;
