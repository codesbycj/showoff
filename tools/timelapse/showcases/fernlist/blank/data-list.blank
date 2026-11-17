import type { FlagName } from '../components/flag-disc';
import type { GlyphName } from '../components/glyph';

/**
 * Everything fernlist says, so the components stay presentational.
 *
 * **Every array is annotated** (I7): the reveal uncomments entries one at a
 * time, so a type inferred from whichever rows happen to be live loses every
 * property that only appears on a later row — `title` and `facts` exist on the
 * front card alone.
 */
export const header = { title: 'Popular' } as const;

export const featured = {
  country: 'Belgium',
  flag: 'be' as FlagName,
  title: 'The Sounds of Nature',
  dates: '27/03 – 7/04',
  /** 3 faces shown, 22 more in the party. */
  more: '+22',
  avatars: [
    require('../../../../assets/images/fernlist/a1.jpg'),
    require('../../../../assets/images/fernlist/a2.jpg'),
    require('../../../../assets/images/fernlist/a3.jpg'),
  ],
} as const;

export type Range = { id: string; label: string; on?: boolean };

export const ranges: Range[] = [
  { id: 'r1', label: '27/03 – 7/04', on: true },
  // STEP 1.24 "7/04 – 17/04"
  // { id: 'r2', label: '7/04 – 17/04' },
  // STEP 1.25 "17/04 – 27/04"
  // { id: 'r3', label: '17/04 – 27/04' },
];

export type Fact = { id: string; label: string; glyph: GlyphName };

export type Trip = {
  id: string;
  country: string;
  flag: FlagName;
  image: number;
  /**
   * How deep in the stack this card sits. Carried in the data rather than read
   * off the array index, so a card keeps its place while the reveal is still
   * filling the deck (I7).
   */
  layer: number;
  /** The card on top. The two behind it show a strip of their own top. */
  front?: boolean;
  /** The front card alone carries a headline and its facts. */
  title?: string;
  facts?: Fact[];
};

/**
 * Back to front: the last entry is the card on top.
 *
 * The board labels this card AUSTRIA over the title "Heart of Norway's
 * Majestic Forests" — the flag is corrected to Norway so the card agrees with
 * itself (I1), and the two it covers take the other countries.
 */
export const deck: Trip[] = [
  {
    id: 'austria',
    country: 'Austria',
    flag: 'at',
    layer: 0,
    image: require('../../../../assets/images/fernlist/f3.jpg'),
  },
  // STEP 1.27 sweden
  // {
  //   id: 'sweden',
  //   country: 'Sweden',
  //   flag: 'se',
  //   layer: 1,
  //   image: require('../../../../assets/images/fernlist/f2.jpg'),
  // },
  // STEP 1.28 "10 days"
  // {
  //   id: 'norway',
  //   country: 'Norway',
  //   flag: 'no',
  //   layer: 2,
  //   front: true,
  //   image: require('../../../../assets/images/fernlist/f1.jpg'),
  //   title: "Heart of Norway's\nMajestic Forests",
  //   facts: [
  //     { id: 'days', label: '10 days', glyph: 'days' },
  //     { id: 'distance', label: '10 km', glyph: 'distance' },
  //     { id: 'party', label: '8/10', glyph: 'party' },
  //   ],
  // },
];
