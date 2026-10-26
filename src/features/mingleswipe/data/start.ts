/**
 * Everything the profile screen says.
 *
 * **The place is a place.** The reference reads "USA, California" — a state
 * and the country it is in, which is not how anyone says where they live.
 *
 * **The name does not imply a gender.** The portrait comes from a fixed pool,
 * so a gendered name pinned to whichever face lands first says something
 * about a real person that the data has no business saying. The bio is
 * written the same way.
 */

export const copy = {
  liked: 'They liked you',
  place: 'Oakland, California',
  name: 'Noa',
  bioLabel: 'BIO',
  bio: 'Hey there! I shoot for a living, mostly live music. Happiest at a festival with a camera and bad coffee.',
} as const;

export const hero = require('../../../../assets/images/mingleswipe/hero.jpg');
export const avatar = require('../../../../assets/images/mingleswipe/face-1.jpg');

export const age = 27;
export const likes = 5;

export const interests = [
  { id: 'music', label: 'Music' },
  { id: 'cinema', label: 'Cinema' },
  { id: 'sport', label: 'Sport' },
] as const;
