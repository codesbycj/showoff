/**
 * Everything the connect screen says, so the components stay presentational.
 *
 * The brand, the sources and every figure are invented. The face is a
 * free-licensed photograph, credited in `assets/images/voltdata/CREDITS.md`.
 *
 * **The three figures are one calculation.** 86 hours a month at the blended
 * rate the team actually bills, against what the same work costs bought in,
 * and the hours the channel gives back. A design shot can put three unrelated
 * numbers under one heading called "ROI Calculation"; an app doing that is
 * telling you a sum that was never done.
 */

const face = require('../../../../assets/images/voltdata/face-1.jpg');

export const me = face;

export const copy = {
  connect: 'Connect Data',
  roi: 'ROI Calculation',
  chat: 'Chat',
} as const;

/** The places the numbers come from. Invented, and drawn. */
export const sources = [
  { id: 's1', mark: 'flake', tint: '#49B9F0' },
  { id: 's2', mark: 'orbit', tint: '#3D7BF7' },
  { id: 's3', mark: 'bars', tint: '#5C8BEF' },
] as const;

export const results = [
  {
    id: 'r1',
    figure: '86h',
    caption: 'Time spent on ad hoc requests',
    tone: 'acid',
    mark: 'clock',
  },
  {
    id: 'r2',
    figure: '$196k',
    caption: 'Money spent on ad hoc requests',
    tone: 'card',
    mark: 'wallet',
  },
  {
    id: 'r3',
    figure: '23h',
    caption: 'Time saved every month by the channel',
    tone: 'slab',
    mark: 'clock',
  },
] as const;

export const dock = ['grid', 'store', 'board'] as const;
