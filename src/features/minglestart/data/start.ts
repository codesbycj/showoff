/**
 * Everything the welcome screen says.
 *
 * The brand is invented. The display sentence is split so the brand can be
 * set in a reversed-out box inside the running line, which is the one piece
 * of typography the reference is really about.
 *
 * **The constellation is positions, not pixels.** Each face carries its ring
 * (0..1 of the stage's radius) and an angle in degrees, so the arrangement
 * holds its shape at any screen size instead of being a set of offsets
 * measured off one phone.
 */

export const copy = {
  brand: 'Mingle',
  reg: '®',
  sentenceAfter: ' is an easy and fast way to get acquainted!',
  lede: 'Only real and trusted people, convenient search and matching that pays attention.',
  button: 'Get started',
} as const;

export const faces = [
  {
    id: 'f0',
    size: 0.3,
    ring: 0,
    angle: 0,
    photo: require('../../../../assets/images/minglestart/face-1.jpg'),
  },
  {
    id: 'f1',
    size: 0.14,
    ring: 0.74,
    angle: 198,
    photo: require('../../../../assets/images/minglestart/face-2.jpg'),
  },
  {
    id: 'f2',
    size: 0.16,
    ring: 0.78,
    angle: 330,
    photo: require('../../../../assets/images/minglestart/face-3.jpg'),
  },
  {
    id: 'f3',
    size: 0.13,
    ring: 0.44,
    angle: 22,
    photo: require('../../../../assets/images/minglestart/face-4.jpg'),
  },
  {
    id: 'f4',
    size: 0.11,
    ring: 0.9,
    angle: 118,
    photo: require('../../../../assets/images/minglestart/face-5.jpg'),
  },
] as const;

/** The faint rings behind them, as a share of the stage's radius. */
export const rings = [0.46, 0.78, 1] as const;
