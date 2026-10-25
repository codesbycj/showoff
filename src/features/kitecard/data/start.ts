/**
 * Everything the card screen says and counts, so the components stay
 * presentational.
 *
 * **The cardholder and the merchants are invented.** The reference embosses a
 * real-looking person's full name on the card and names two real companies in
 * the rows beneath it. A showcase does not get to put a person's name on a
 * bank card or a company's mark on a charge, so these are made up and their
 * marks are drawn shapes.
 *
 * **The card number masks its last four, not its first.** The reference shows
 * "*567" after four masked groups, which is the right end — kept.
 *
 * **The dates are real.** "Sun 02, 2026" names no month and may not be a
 * Sunday; 2 August 2026 is one.
 */

export const copy = {
  newCard: 'New Card',
  balanceLabel: 'Available Balance',
  reveal: 'Show card details',
  history: 'Transaction History',
  seeAll: 'See all',
  state: 'Successful',
} as const;

/** In pennies, so nothing is ever a float. */
export const balance = 1089060;

export const card = {
  holder: 'AMARA OKAFOR',
  pan: '•••• •••• •••• 4567',
} as const;

export const actions = [
  { id: 'add', label: 'Add' },
  { id: 'withdraw', label: 'Withdraw', primary: true },
  { id: 'more', label: 'More' },
] as const;

export const tabs = [
  { id: 'home', label: 'Home' },
  { id: 'cards', label: 'Cards' },
  { id: 'stats', label: 'Stats' },
  { id: 'profile', label: 'Profile' },
] as const;

export const charges = [
  { id: 'c1', name: 'Lumen Music', on: 'Sun, 2 Aug 2026', amount: -109000, mark: 'play' },
  { id: 'c2', name: 'Pinecast Plus', on: 'Sat, 1 Aug 2026', amount: -69000, mark: 'wave' },
  { id: 'c3', name: 'Halo Cloud', on: 'Fri, 31 Jul 2026', amount: -24500, mark: 'cloud' },
] as const;

export const money = (pennies: number) =>
  '$' +
  (Math.abs(pennies) / 100).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
