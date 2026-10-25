/**
 * Everything the send screen says, so the components stay presentational.
 *
 * The brand, the people, the amounts and every card are invented. The faces
 * are free-licensed photographs, credited in
 * `assets/images/tiltsend/CREDITS.md`.
 *
 * **No card scheme's mark appears here.** The reference prints VISA on two of
 * its cards and Mastercard's two discs on a third. Those are other companies'
 * trademarks and a page branded as somebody else's app may not carry them
 * (AGENTS.md, "The brand marks are the exception, and they are replaced"), so
 * the cards carry an invented scheme instead.
 */

const face1 = require('../../../../assets/images/tiltsend/face-1.jpg');
const face2 = require('../../../../assets/images/tiltsend/face-2.jpg');
const face3 = require('../../../../assets/images/tiltsend/face-3.jpg');
const face4 = require('../../../../assets/images/tiltsend/face-4.jpg');
const face5 = require('../../../../assets/images/tiltsend/face-5.jpg');

export const me = face5;

export const copy = {
  brand: 'tilt',
  title: 'Send money',
  balanceLabel: 'Current balance',
  balance: '$3,198.20',
} as const;

export const amount = { major: '$200', minor: '.00' } as const;

export const people = [
  { id: 'p1', name: 'Patrick', src: face1, picked: true },
  { id: 'p2', name: 'Sandy', src: face2, picked: false },
  { id: 'p3', name: 'Dewi', src: face3, picked: false },
  { id: 'p4', name: 'Pearl', src: face4, picked: false },
] as const;

/**
 * The cards, front to back. Only the first shows its details; the rest are a
 * strip of colour under it, which is how a real wallet stacks.
 *
 * Every card carries the same keys, with the hidden ones empty, so the array
 * is one shape rather than a union — otherwise reading `expiry` on the front
 * card means narrowing the type at every use for no gain.
 */
export const cards = [
  {
    id: 'c1',
    pan: '•••• •••• •••• 1989',
    expiry: 'Exp. 07/26',
    cvv: 'CVV: 123',
    holder: 'Mr Edwin Hale',
    tone: 'violet',
  },
  { id: 'c2', pan: '•••• •••• •••• 6789', expiry: '', cvv: '', holder: '', tone: 'coral' },
  { id: 'c3', pan: '•••• •••• •••• 2345', expiry: '', cvv: '', holder: '', tone: 'lime' },
] as const;

export const dock = ['home', 'money', 'bell', 'settings'] as const;
