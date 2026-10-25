/**
 * Everything the home screen says, so the components stay presentational.
 *
 * The brand, the balance and every payment are invented. The face is a
 * free-licensed photograph, credited in `assets/images/tilthome/CREDITS.md` —
 * a face is a photograph and never a coloured initial.
 */

const face1 = require('../../../../assets/images/tilthome/face-1.jpg');
const face2 = require('../../../../assets/images/tilthome/face-2.jpg');
const face3 = require('../../../../assets/images/tilthome/face-3.jpg');

export const me = face1;

export const copy = {
  brand: 'tilt',
  display: ['it pays to', 'use tilt'],
  balanceLabel: 'Your balance',
  currency: 'USD',
  seeAll: 'See all payments',
  recent: 'Recent',
} as const;

export const balance = { major: '$3,198', minor: '.20' } as const;

export const tiles = [
  { id: 'send', label: ['Send', 'money'], tone: 'violet' },
  { id: 'request', label: ['Request', 'money'], tone: 'lime' },
] as const;

/**
 * What the balance card's "See all payments" is actually about. The reference
 * promises this list and then crops the phone above it.
 */
export const payments = [
  { id: 'p1', who: 'Maya Alvarez', note: 'Rent, March', amount: '-$840.00', src: face2, out: true },
  {
    id: 'p2',
    who: 'Studio Invoice',
    note: 'Paid in full',
    amount: '+$1,250.00',
    src: face3,
    out: false,
  },
  {
    id: 'p3',
    who: 'Ola Bergström',
    note: 'Split dinner',
    amount: '-$36.40',
    src: face2,
    out: true,
  },
] as const;

export const dock = ['home', 'money', 'bell', 'settings'] as const;
