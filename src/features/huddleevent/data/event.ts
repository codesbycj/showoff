/**
 * Everything the event screen says.
 *
 * **The About copy is cut from two paragraphs to one.** The reference runs
 * about 230 characters over two blocks, the second of which its own floating
 * button then covers — so half of it was never readable in the design shot
 * either. What is left says what the evening is and what to bring.
 *
 * **"0 spots left" does not sit beside a "Join waitlist" button by accident
 * here.** The reference shows both, with the button lying across the line
 * that explains them. They are laid out as a pair instead: the button says
 * what you can do, the line beside it says why it is a waitlist.
 */
export const copy = {
  title: 'Golden Hour Acoustic Session',
  chips: [
    { id: 'state', label: 'Upcoming' },
    { id: 'kind', label: 'Music' },
  ],
  when: 'Tonight, 7:00 PM – 9:30 PM',
  whenNote: 'Doors open at 6:45 PM for drinks & seating',
  where: 'The Broadview Canopy, NY',
  whereNote: 'Brooklyn, NY · Exact coordinates sent after booking',
  about: 'About the Hangout',
  body: 'An unplugged rooftop set as the sun goes down, with local singer-songwriters playing covers and their own.',
  going: '14 going',
  left: '2 spots left',
  price: 'Free',
  priceNote: 'no ticket needed',
  cta: 'Join waitlist',
} as const;

export const hero = require('../../../../assets/images/huddleevent/hero.jpg');

export const faces = [
  require('../../../../assets/images/huddleevent/face1.jpg'),
  require('../../../../assets/images/huddleevent/face2.jpg'),
  require('../../../../assets/images/huddleevent/face3.jpg'),
];
