/**
 * Everything kilnitem says.
 *
 * **The maker and the piece are invented** (I1): the board names four real
 * houses and prints one of their marks on the object itself.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES SS5.4, I7).
 */

export const piece = {
  maker: 'Studio Fen',
  /** Named for what the photograph shows, and priced to match the same row
   *  in the grid on `kilnfind` - a detail page that renames its own object is
   *  the mistake that shipped a dog's face under "Green Tea" once already. */
  name: 'Morning Mug',
  price: 72,
  cta: 'Buy',
  /** A state, not a sentence (R5). */
  ship: 'Ships in 5 days',
  image: require('../../../../assets/images/kilnitem/hero.jpg'),
  /** R5: 106 characters, one run. The board's trails off mid-sentence. */
  body: 'Wheel-thrown in stoneware and finished in a wood-ash glaze, so no two pieces leave the kiln alike.',
};

export type Frame = { id: string; label: string; image: number; on?: boolean };

export const frames: Frame[] = [
  {
    id: 'f1',
    label: 'In use',
    image: require('../../../../assets/images/kilnitem/t1.jpg'),
    on: true,
  },
  // STEP 1.07 "Stacked"
  // { id: 'f2', label: 'Stacked', image: require('../../../../assets/images/kilnitem/t2.jpg') },
  // STEP 1.08 "Set"
  // { id: 'f3', label: 'Set', image: require('../../../../assets/images/kilnitem/t3.jpg') },
  // STEP 1.09 "At the wheel"
  // { id: 'f4', label: 'At the wheel', image: require('../../../../assets/images/kilnitem/t4.jpg') },
];

/** One money format, applied once (R9). */
export function money(value: number) {
  return '€' + value.toLocaleString('en-GB');
}
