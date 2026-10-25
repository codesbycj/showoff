/**
 * Everything the deposit screen says, so the components stay presentational.
 *
 * The faces are free-licensed photographs, credited in
 * `assets/images/sabledepo/CREDITS.md`.
 *
 * **Money in and money out are told apart by more than colour.** Each row
 * carries a badge whose arrow points the way the money went, as well as the
 * sign on the amount — the reference uses a green disc for both directions
 * and only the arrow inside it differs, which is the right idea done once
 * instead of twice.
 */

const f1 = require('../../../../assets/images/sabledepo/face-1.jpg');
const f2 = require('../../../../assets/images/sabledepo/face-2.jpg');
const f3 = require('../../../../assets/images/sabledepo/face-3.jpg');
const f4 = require('../../../../assets/images/sabledepo/face-4.jpg');

export const copy = {
  title: 'Deposit',
  transactions: 'Transactions',
  seeAll: 'See all',
  month: 'October',
} as const;

export const who = { name: 'Robert Brown', card: '•••• 4527', src: f4 } as const;

export const tiles = [
  { id: 'qr', label: 'Qr code', tone: 'yellow' },
  { id: 'link', label: 'Share link', tone: 'green' },
] as const;

export const rows = [
  {
    id: 'r1',
    name: 'Michael Davis',
    when: 'October 5, 2023',
    amount: '+$220.00',
    in: true,
    src: f1,
  },
  {
    id: 'r2',
    name: 'Richard Taylor',
    when: 'October 3, 2023',
    amount: '-$8.00',
    in: false,
    src: f2,
  },
  {
    id: 'r3',
    name: 'Thomas Harris',
    when: 'October 2, 2023',
    amount: '+$10.00',
    in: true,
    src: f3,
  },
  // The reference shows three rows and then 90dp of empty sheet above the
  // bottom edge. A list is only a list if it runs past the frame, so there
  // are seven and the last of them is cut by it.
  {
    id: 'r4',
    name: 'Dana Whitfield',
    when: 'October 1, 2023',
    amount: '-$46.90',
    in: false,
    src: f2,
  },
] as const;
