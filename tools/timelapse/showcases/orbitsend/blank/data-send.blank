/**
 * Everything orbitsend says.
 *
 * **The people are invented** (I1), and the balance is the same one
 * `orbithome` computes — one account cannot hold two different balances.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const header = { title: 'Send Money' };

export type Contact = {
  id: string;
  name: string;
  account: string;
  image: number;
  /** Exactly one contact is the one being paid; declared, not inferred. */
  on?: boolean;
};

export const contacts: Contact[] = [
  {
    id: 'adrian',
    name: 'Adrian Keller',
    account: '65 •••• •••• 331',
    image: require('../../../../assets/images/orbitsend/c1.jpg'),
  },
  // STEP 1.06 "Martin Varela"
  // {
  //   id: 'martin',
  //   name: 'Martin Varela',
  //   account: '65 •••• •••• 890',
  //   image: require('../../../../assets/images/orbitsend/c2.jpg'),
  //   on: true,
  // },
  // STEP 1.07 "Stefan Kutch"
  // {
  //   id: 'stefan',
  //   name: 'Stefan Kutch',
  //   account: '65 •••• •••• 214',
  //   image: require('../../../../assets/images/orbitsend/c3.jpg'),
  // },
  // STEP 1.08 "Sophie Varela"
  // {
  //   id: 'sophie',
  //   name: 'Sophie Varela',
  //   account: '65 •••• •••• 507',
  //   image: require('../../../../assets/images/orbitsend/c4.jpg'),
  // },
  // STEP 1.09 "Nadia Brandt"
  // {
  //   id: 'nadia',
  //   name: 'Nadia Brandt',
  //   account: '65 •••• •••• 712',
  //   image: require('../../../../assets/images/orbitsend/c5.jpg'),
  // },
];

export const send = {
  amount: 2600,
  /** The same balance `orbithome` computes from its movements. */
  balance: 24600,
  balanceLabel: 'Available balance',
  cta: 'Slide to send',
};

export type Key = { id: string; label: string; kind: 'digit' | 'dot' | 'back' };

export const keys: Key[] = [
  { id: '1', label: '1', kind: 'digit' },
  // STEP 1.19 "2"
  // { id: '2', label: '2', kind: 'digit' },
  // STEP 1.20 "3"
  // { id: '3', label: '3', kind: 'digit' },
  // STEP 1.21 "4"
  // { id: '4', label: '4', kind: 'digit' },
  // STEP 1.22 "5"
  // { id: '5', label: '5', kind: 'digit' },
  // STEP 1.23 "6"
  // { id: '6', label: '6', kind: 'digit' },
  // STEP 1.24 "7"
  // { id: '7', label: '7', kind: 'digit' },
  // STEP 1.25 "8"
  // { id: '8', label: '8', kind: 'digit' },
  // STEP 1.26 "9"
  // { id: '9', label: '9', kind: 'digit' },
  // STEP 1.27 "."
  // { id: 'dot', label: '.', kind: 'dot' },
  // STEP 1.28 "0"
  // { id: '0', label: '0', kind: 'digit' },
  // STEP 1.29 "Delete"
  // { id: 'back', label: 'Delete', kind: 'back' },
];

/**
 * Guarded for the empty case: the reveal stages `contacts` one entry at a
 * time, so the recipient card falls back to the first row and then to nothing
 * rather than indexing into an empty array (I7).
 */
export function recipient(rows: Contact[]) {
  return rows.find((row) => row.on) ?? rows[0] ?? null;
}
