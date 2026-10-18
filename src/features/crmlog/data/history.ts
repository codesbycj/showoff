import { cl } from '../theme';

/**
 * The screen's content, kept out of the components so they stay presentational.
 *
 * One correction to the reference, deliberately: its cards read "Oportunity".
 * A design shot is not an authority on its own spelling (AGENTS.md, "Three
 * kinds of reference").
 *
 * The three faces on every card are free-licensed portraits, bundled and
 * credited in `assets/images/crmlog/CREDITS.md` — the same three colleagues as
 * on the other screens of the board.
 */

export const header = { one: 'Interaction', two: 'History' } as const;

export const entries = [
  {
    key: 'royal',
    date: 'Oct 4',
    one: 'Royal Package',
    two: 'Opportunity',
    amount: '11,250$',
    color: cl.cards[0],
  },
  {
    key: 'silver',
    date: 'Oct 11',
    one: 'Silver Package',
    two: 'Opportunity',
    amount: '4,160$',
    color: cl.cards[1],
  },
  {
    key: 'absolute',
    date: 'Oct 12',
    one: 'Absolute',
    two: 'Success Deal',
    amount: '2,100$',
    color: cl.cards[2],
  },
  {
    key: 'third',
    date: 'Oct 16',
    one: 'Third Deal.',
    two: 'Most Useful',
    amount: '980$',
    color: cl.cards[3],
  },
  {
    key: 'annual',
    date: 'Oct 21',
    one: 'Annual Retainer',
    two: 'Renewal',
    amount: '7,400$',
    color: cl.cards[4],
  },
] as const;

export const faces = [
  { key: 'a', face: 0 },
  { key: 'b', face: 1 },
  { key: 'c', face: 2 },
] as const;
