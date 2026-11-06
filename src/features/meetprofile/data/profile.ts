/**
 * Everything the profile says.
 *
 * The five interests are the reference's own, each with a drawn glyph
 * instead of the board's emoji — emoji differ across Windows, Android and
 * iOS and the web harness cannot check what Android draws.
 */
export const copy = {
  name: 'Roselyn Archer',
  place: 'Paris, France',
  interests: 'Interests',
  cta: 'Send a message',
} as const;

export const avatar = require('../../../../assets/images/meetprofile/roselyn.jpg');

export const stats = [
  { id: 'followers', label: 'Followers', value: '1,130' },
  { id: 'mutuals', label: 'Mutuals', value: '6' },
  { id: 'age', label: 'Age', value: '27' },
];

export const interests = [
  { id: 'movies', label: 'Movies', icon: 'film' as const },
  { id: 'cooking', label: 'Cooking', icon: 'pan' as const },
  { id: 'reading', label: 'Reading', icon: 'book' as const },
  { id: 'fitness', label: 'Fitness', icon: 'dumbbell' as const },
  { id: 'travel', label: 'Travel', icon: 'plane' as const },
];

export const photos = [
  require('../../../../assets/images/meetprofile/m1.jpg'),
  require('../../../../assets/images/meetprofile/m2.jpg'),
  require('../../../../assets/images/meetprofile/m3.jpg'),
];
