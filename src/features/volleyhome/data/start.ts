/**
 * Everything the home screen says and counts.
 *
 * **The joined figure and the date agree with the event screen's.** The
 * reference's hero card says "15 MAR" and its event screen says "19 March
 * 2026" for the same tournament; both read from one date here.
 *
 * **"12/16 joined" is a pair of numbers, not a string**, so the bar on the
 * event screen and the caption here cannot drift apart.
 */

export const copy = {
  brand: 'Volley',
  welcome: 'Hi, Welcome Back!',
  level: 'INTERMEDIATE',
  joinNow: 'Join Now',
  book: 'Book a Court Now',
  bookNote: 'Courts free today from 09:00',
  bookBtn: 'Book',
  upcoming: 'Upcoming Events',
  seeAll: 'See all',
  joined: ' joined',
} as const;

export const avatar1 = require('../../../../assets/images/volleyhome/face-1.jpg');
export const avatar2 = require('../../../../assets/images/volleyhome/face-2.jpg');
export const avatar3 = require('../../../../assets/images/volleyhome/face-3.jpg');
export const avatar4 = require('../../../../assets/images/volleyhome/face-4.jpg');

export const hero = {
  photo: require('../../../../assets/images/volleyhome/hero.jpg'),
  title: 'Yeollin Open',
  place: 'Amstelveen',
  time: '09:00 - 17:00',
  day: 15,
  month: 'MAR',
  joined: 12,
  capacity: 16,
};

export const tiles = [
  { id: 'location', label: 'Location' },
  { id: 'event', label: 'Event' },
  { id: 'sparring', label: 'Sparring' },
  { id: 'community', label: 'Community' },
] as const;

export const events = [
  {
    id: 'e1',
    name: 'Yeollin Open',
    level: 'Intermediate',
    photo: require('../../../../assets/images/volleyhome/event-1.jpg'),
  },
  {
    id: 'e2',
    name: 'Amsterdam Classic',
    level: 'Advanced',
    photo: require('../../../../assets/images/volleyhome/event-2.jpg'),
  },
] as const;
