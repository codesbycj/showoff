/**
 * Everything the sign-in screen says, so the components stay presentational.
 *
 * The reference puts the *same* place on all eight of its tags — "Kigali Ranch
 * / #Most Visited." eight times, which is a designer's placeholder rather than
 * a decision. Seven distinct places here instead: the throw is meant to read
 * as a country's worth of somewhere to go, and eight copies of one name reads
 * as a bug the moment anybody looks twice (AGENTS.md: fix the reference's
 * mistakes and say so).
 *
 * The places are invented. So is the brand.
 */

const kivu = require('../../../../assets/images/tembeastart/kivu.jpg');
const lodge = require('../../../../assets/images/tembeastart/lodge.jpg');
const plains = require('../../../../assets/images/tembeastart/plains.jpg');
const reserve = require('../../../../assets/images/tembeastart/reserve.jpg');
const ridge = require('../../../../assets/images/tembeastart/ridge.jpg');
const tents = require('../../../../assets/images/tembeastart/tents.jpg');
const village = require('../../../../assets/images/tembeastart/village.jpg');

export const copy = {
  display: [
    { text: 'Your journey', tone: 'ink' },
    { text: 'starts', tone: 'ink' },
    { text: 'now.', tone: 'deep' },
  ],
  foot: 'Already have an account?',
  footLink: 'Log in',
} as const;

/**
 * The tags, in the order they are thrown down. `lane` is which of the four
 * rows a tag belongs to and `shift` is how far along that row it starts, as a
 * share of the row — so the cluster stays a throw rather than a list, and
 * still reflows at other widths.
 */
export const tags = [
  { place: 'Mirama Lodge', note: '#Most visited', src: lodge, lane: 0, shift: 0.0, tone: 'plain' },
  { place: 'Rugezi Crater', note: '#Top rated', src: ridge, lane: 0, shift: 0.52, tone: 'mint' },
  { place: 'Nyandu Camp', note: '#New this week', src: tents, lane: 1, shift: 0.14, tone: 'plain' },
  { place: 'Kivu Ridge', note: '#Weekend pick', src: kivu, lane: 1, shift: 0.62, tone: 'plain' },
  {
    place: 'Akagera Plains',
    note: '#Most photographed',
    src: plains,
    lane: 2,
    shift: 0.04,
    tone: 'plain',
  },
  {
    place: 'Mukura Reserve',
    note: '#Hidden gem',
    src: reserve,
    lane: 2,
    shift: 0.47,
    tone: 'pink',
  },
  { place: 'Gishwati Hills', note: '#Trending', src: village, lane: 3, shift: 0.22, tone: 'plain' },
] as const;

/**
 * The three ways in, in the reference's order: the one that asks for nothing
 * first, then the two that ask for an account.
 */
export const buttons = [
  { id: 'guest', label: 'Continue As Guest', tone: 'raise' },
  { id: 'apple', label: 'Continue with Apple', tone: 'green' },
  { id: 'google', label: 'Continue with Google', tone: 'raise' },
] as const;
