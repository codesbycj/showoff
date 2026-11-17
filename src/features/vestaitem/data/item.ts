/**
 * Everything vestaitem says.
 *
 * **Prices are stored as numbers and formatted once** (R9), and the pager's dot
 * count is `gallery.length` rather than a number typed beside it — the board's
 * own pagers do not always match the rails they sit under.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const screen = { title: 'Details', sizeTitle: 'Select Size', sizeChart: 'Size Chart' };

export const product = {
  name: 'Casual Hoodie Black',
  category: 'Outerwear Men',
  price: 68,
  hero: require('../../../../assets/images/vestaitem/hero.jpg'),
  /**
   * R5: one run of body copy, under 110 characters, and it says what the
   * product *is*. The board's own paragraph runs to 183 and trails into a
   * "Learn More" mid-sentence.
   */
  blurb: 'Heavyweight brushed cotton, boxy fit, double-stitched hood.',
  more: 'Learn More',
};

export type Shot = { id: string; photo: number };

/** The thumbnail rail. The hero is the selected one, so it is in the list. */
export const gallery: Shot[] = [
  { id: 's1', photo: require('../../../../assets/images/vestaitem/t1.jpg') },
  // STEP 1.07 s2
  // { id: 's2', photo: require('../../../../assets/images/vestaitem/t2.jpg') },
  // STEP 1.08 s3
  // { id: 's3', photo: require('../../../../assets/images/vestaitem/t3.jpg') },
  // STEP 1.09 s4
  // { id: 's4', photo: require('../../../../assets/images/vestaitem/t4.jpg') },
  // STEP 1.10 s5
  // { id: 's5', photo: require('../../../../assets/images/vestaitem/t5.jpg') },
];

/** Which shot the hero is showing. The pager reads off this. */
export const activeShot = 2;

export type Size = { id: string; label: string; stock: number };

/**
 * Sizes, each with stock.
 *
 * **The stock figure is mine.** The board draws six identical chips and gives
 * no reason why one is chosen — a real size picker knows what is left, and the
 * sold-out state is what makes the row read as an app rather than a picture of
 * one (I1's "improve it where it is obviously better").
 */
export const sizes: Size[] = [
  { id: 's', label: 'S', stock: 4 },
  // STEP 1.21 "M"
  // { id: 'm', label: 'M', stock: 11 },
  // STEP 1.22 "L"
  // { id: 'l', label: 'L', stock: 7 },
  // STEP 1.23 "XL"
  // { id: 'xl', label: 'XL', stock: 2 },
  // STEP 1.24 "XXL"
  // { id: 'xxl', label: 'XXL', stock: 0 },
  // STEP 1.25 "XXXL"
  // { id: 'xxxl', label: 'XXXL', stock: 5 },
];

export const cart = { label: 'Add To Cart' };

/**
 * The delivery line.
 *
 * **Mine, not the board's.** The board ends on its button with a band of empty
 * canvas above it. I3's lever is the row the board cut, and what a product page
 * genuinely carries there is when the thing arrives and what it costs to send.
 */
export const delivery = { label: 'Free delivery', when: 'Tue 18 Nov' };

/** Money, formatted once so every figure on the board reads the same way. */
export function usd(n: number) {
  return `$${n.toFixed(2)}`;
}
