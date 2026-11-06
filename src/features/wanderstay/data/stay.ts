/**
 * Everything the stay screen says.
 *
 * The name, the place, the rating and the price are the home screen's own
 * strings, so the two showcases of this app cannot disagree about the cabin
 * they are both showing.
 *
 * **"Read more" is a real control here.** The reference truncates the
 * description with an ellipsis and a bold "Read more" that does nothing; the
 * sentence is short enough to finish, and the control expands it.
 */
export const copy = {
  name: 'Lakeside Cabin',
  rating: '4.9',
  reviews: '(2.1k)',
  kind: 'Cabin in Hallstatt, Austria',
  short: 'Wake up to mist over the lake, then warm up in a private sauna.',
  more: 'Three rooms, a wood stove and a jetty of your own, twenty minutes from the village.',
  readMore: 'Read more',
  readLess: 'Read less',
  price: '$184',
  priceUnit: '/ night',
  dates: '12–15 Nov · 2 guests',
  cta: 'Book now',
} as const;

export const hero = require('../../../../assets/images/wanderstay/hero.jpg');

export const thumbs = [
  require('../../../../assets/images/wanderstay/thumb1.jpg'),
  require('../../../../assets/images/wanderstay/thumb2.jpg'),
  require('../../../../assets/images/wanderstay/thumb3.jpg'),
];

/** How many more photographs there are behind the last thumbnail. */
export const morePhotos = 8;

export const amenities = [
  { id: 'wifi', label: 'Wi-Fi', icon: 'wifi' as const },
  { id: 'beds', label: '2 beds', icon: 'bed' as const },
  { id: 'sauna', label: 'Sauna', icon: 'flame' as const },
  { id: 'view', label: 'Lake view', icon: 'peak' as const },
];
