import type { FaceKind } from '../components/mood-faces';

/**
 * The onboarding screen's content and its sticker cluster.
 *
 * The cluster is a free arrangement, not a grid: seven characters absolutely
 * placed inside a 360x400 box with individual rotations, deliberately
 * overlapping and hanging a few dp off each edge. `left: -8` on the capsule and
 * `top: -4` on the swirl are the export's own values — the design wants them
 * breaking the box — so they are carried across rather than tidied to zero.
 *
 * Each character is anchored the way the export anchors it: some from the top
 * edge, some from the bottom, some from the right. Converting them all to one
 * corner would look identical at 360 wide and drift at any other width.
 */
export type Sticker = {
  /** Doubles as the character's identity and the face it draws. */
  key: FaceKind;
  width: number;
  height: number;
  /** Degrees. React Native rotates about the element's centre, which is what
   *  these want — each is a whole sticker tilted in place. */
  rotate: number;
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  /** The bolt sits over its neighbours. */
  z?: number;
  /** What the feedback pill says once this character is tapped. */
  label: string;
  /** The pill's leading dot for that mood. */
  dot: string;
};

/** The cluster's drawing box. `mx-auto` centres it in the page margin. */
export const CLUSTER = { width: 360, height: 400 } as const;

export const STICKERS: readonly Sticker[] = [
  // STEP 1.07 the mint smiler
  // {
  //   key: 'happy',
  //   width: 114,
  //   height: 114,
  //   rotate: -4,
  //   top: 8,
  //   left: 12,
  //   label: 'Radiant & Optimistic',
  //   dot: '#10b981',
  // },
  // STEP 1.08 the lilac swirl
  // {
  //   key: 'curious',
  //   width: 124,
  //   height: 124,
  //   rotate: 5,
  //   top: -4,
  //   right: 8,
  //   label: 'Creative & Playful',
  //   dot: '#a855f7',
  // },
  // STEP 1.09 the peach capsule
  // {
  //   key: 'tender',
  //   width: 98,
  //   height: 126,
  //   rotate: -2,
  //   top: 118,
  //   left: -8,
  //   label: 'Quiet & Contemplative',
  //   dot: '#fb7185',
  // },
  // STEP 1.10 the lightning bolt
  // {
  //   key: 'energized',
  //   width: 108,
  //   height: 138,
  //   rotate: 3,
  //   top: 102,
  //   left: 106,
  //   z: 10,
  //   label: 'High Voltage & Ready',
  //   dot: '#fbbf24',
  // },
  // STEP 1.11 the sage grump
  // {
  //   key: 'grumpy',
  //   width: 116,
  //   height: 116,
  //   rotate: -3,
  //   top: 114,
  //   right: 8,
  //   label: 'Working Through Frustration',
  //   dot: '#0f766e',
  // },
  // STEP 1.12 the sleeping aqua
  // {
  //   key: 'sleepy',
  //   width: 116,
  //   height: 116,
  //   rotate: 4,
  //   bottom: 8,
  //   left: 16,
  //   label: 'Low Energy · Needs Rest',
  //   dot: '#2dd4bf',
  // },
  // STEP 1.13 the coral triangle
  // {
  //   key: 'squint',
  //   width: 114,
  //   height: 114,
  //   rotate: -1,
  //   bottom: 4,
  //   right: 20,
  //   label: 'Excited & A Bit Shy',
  //   dot: '#f43f5e',
  // },
];

export const ONBOARDING = {
  title: 'Not Sure About Your Mood?',
  pill: 'Let Us Help!',
  /** The pill's resting copy, before any character is tapped. */
  hint: 'Tap any character to reflect',
  hintDot: '#006d3e',
  cta: 'Get Started',
  footnote: 'Free 3-minute emotional pulse check · No sign-up needed',
} as const;
