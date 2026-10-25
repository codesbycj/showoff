/**
 * Everything the categories screen says, so the components stay
 * presentational.
 *
 * The brand, the bike names and every figure are invented. The bicycles are
 * free-licensed photographs, credited in
 * `assets/images/spokecats/CREDITS.md` — a bicycle is out of drawing range,
 * however small it ends up on a card.
 */

const copper = require('../../../../assets/images/spokecats/bike-copper.jpg');
const dark = require('../../../../assets/images/spokecats/bike-dark.jpg');
const face = require('../../../../assets/images/spokecats/face-1.jpg');

export const me = { name: 'Mario Dandi', plan: 'Premium Account', src: face } as const;

export const copy = {
  title: 'Categories',
  swipe: 'Swipe to book',
} as const;

export const chips = [
  { id: 'all', label: 'All', on: true },
  { id: 'sport', label: 'Sport bikes', on: false },
  { id: 'hiking', label: 'Hiking bikes', on: false },
  { id: 'city', label: 'City bikes', on: false },
] as const;

export const bikes = [
  {
    id: 'b1',
    name: 'Copper B23',
    usage: '23h 16m',
    battery: '59%',
    src: copper,
  },
  {
    id: 'b2',
    name: 'Woosah 781',
    usage: '14h 38m',
    battery: '82%',
    src: dark,
  },
] as const;
