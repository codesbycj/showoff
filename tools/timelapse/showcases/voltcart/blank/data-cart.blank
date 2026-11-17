/**
 * Everything voltcart says.
 *
 * **Every product is invented** (I1); the board's cart holds a named console
 * and a named game.
 *
 * **R9: the totals are computed** from the lines that are selected, so the
 * button cannot promise a number the list contradicts.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const header = { title: 'Cart' };

export const address = { value: '92 High Street, London' };

export const controls = { selectAll: 'Select all', checkout: 'Checkout' };

export type Line = {
  id: string;
  title: string;
  maker: string;
  variant: string;
  price: number;
  qty: number;
  image: number;
  /** An unticked line is excluded from the total; declared, not inferred. */
  selected?: boolean;
};

/**
 * Four lines, not the board's two. Two left 102dp of empty canvas between the
 * list and the summary — an R1 GAP FAIL, and I3 says the fix is the row the
 * board cropped, never a spacer. The fourth is unticked, which is also what
 * makes the computed subtotal worth computing.
 */
export const lines: Line[] = [
  {
    id: 'arc',
    title: 'Voltline Arc Studio Headphones',
    maker: 'Voltline Audio',
    variant: 'Graphite',
    price: 169,
    qty: 1,
    image: require('../../../../assets/images/voltcart/c1.jpg'),
    selected: true,
  },
  // STEP 1.12 "Voltline Field Watch, 42mm"
  // {
  //   id: 'watch',
  //   title: 'Voltline Field Watch, 42mm',
  //   maker: 'Voltline',
  //   variant: 'Black strap',
  //   price: 149,
  //   qty: 1,
  //   image: require('../../../../assets/images/voltcart/c2.jpg'),
  //   selected: true,
  // },
  // STEP 1.13 "Voltline Pulse Buds, Graphite"
  // {
  //   id: 'buds',
  //   title: 'Voltline Pulse Buds, Graphite',
  //   maker: 'Voltline Audio',
  //   variant: 'With charge case',
  //   price: 69,
  //   qty: 2,
  //   image: require('../../../../assets/images/voltcart/c3.jpg'),
  //   selected: true,
  // },
  // STEP 1.14 "Voltline Studio 14, Silver"
  // {
  //   id: 'studio',
  //   title: 'Voltline Studio 14, Silver',
  //   maker: 'Voltline',
  //   variant: '16 GB · 512 GB',
  //   price: 899,
  //   qty: 1,
  //   image: require('../../../../assets/images/voltcart/c4.jpg'),
  // },
];

export const DELIVERY = 0;

/**
 * Guarded for the empty case: the reveal stages `lines` one entry at a time,
 * so `reduce` carries an initial value rather than relying on a first row (I7).
 */
export function cartTotal(rows: Line[]) {
  return rows.reduce((sum, row) => (row.selected ? sum + row.price * row.qty : sum), 0);
}

export function cartCount(rows: Line[]) {
  return rows.reduce((sum, row) => (row.selected ? sum + row.qty : sum), 0);
}
