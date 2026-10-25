/**
 * Everything the categories screen says, so the components stay
 * presentational.
 *
 * The brand, the bike names and every figure are invented. The bicycles are
 * free-licensed photographs, credited in
 * `assets/images/spokecats/CREDITS.md` — a bicycle is out of drawing range,
 * however small it ends up on a card.
 */

const copper = require('../../../../assets/images/spokebike/bike-hero.jpg');
const face = require('../../../../assets/images/spokebike/face-1.jpg');

export const me = { name: 'Mario Dandi', plan: 'Premium Account', src: face } as const;

export const copy = {
  swipe: 'Swipe to book',
} as const;

export const bike = {
  name: 'Kenai 21W',
  blurb: 'A hardtail built for gravel and bad weather, with a rack that takes a week of shopping.',
  charge: 62,
  src: copper,
} as const;

export const tiles = [
  { id: 't1', label: 'Usage time', value: '23h 16m', tone: 'lime' },
  { id: 't2', label: 'Distance', value: '146km', tone: 'dark' },
] as const;
