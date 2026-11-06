/**
 * Everything the home screen says.
 *
 * The price, the rating and the place are the same strings the stay showcase
 * uses, so the two screens of this app agree with each other.
 */
export const copy = {
  hello: 'Hello,',
  name: 'Maya Rahman',
  miles: 'Miles 2,340',
  placeholder: 'Where to next?',
  trending: 'Trending stays',
  priceUnit: '/ night',
  stayMeta: '2 guests · 3 nights',
  cta: 'Explore deals',
} as const;

export const avatar = require('../../../../assets/images/wanderhome/maya.jpg');

export const tiles = [
  {
    id: 'beach',
    label: 'Beaches',
    photo: require('../../../../assets/images/wanderhome/beaches.jpg'),
  },
  {
    id: 'town',
    label: 'Old towns',
    photo: require('../../../../assets/images/wanderhome/towns.jpg'),
  },
  {
    id: 'fjord',
    label: 'Fjords',
    photo: require('../../../../assets/images/wanderhome/fjords.jpg'),
  },
];

export const stay = {
  name: 'Lakeside Cabin',
  place: 'Hallstatt, Austria',
  rating: '4.9',
  price: '$184',
  photo: require('../../../../assets/images/wanderhome/cabin.jpg'),
};

/** Four stays in the carousel; the second is the one showing. */
export const pages = 4;
export const page = 1;
