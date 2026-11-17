/**
 * Everything lumistart says.
 *
 * **The card is a fictional product of a fictional scheme.** The board poses a
 * Mastercard mark on its 3D render; a rebuild that ships a real payment
 * network's logo is impersonation, so the mark here is a contactless wave and
 * the scheme is Lumi's own. Named in the handover.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const brand = { name: 'Lumi' };

export const card = {
  label: 'Available Balance',
  balance: 10000,
  /** Only the last group is shown; the rest are dots, as a real card app does. */
  last4: '8635',
  validFrom: '10/25',
  validThru: '10/30',
  holderLabel: 'Card Holder',
  holder: 'A. Okonkwo',
};

/**
 * The headline.
 *
 * Three lines, as the board sets them — R5: the data file carries what the
 * screen says, and what it says is what the reference says.
 */
export const headline = ['Effortless', 'Insights Into Your', 'Daily Spending'];

/**
 * The body copy.
 *
 * **Trimmed to 97 characters.** The board's own run is 114, over R5's ceiling
 * of 110 for a single run of body copy, and it repeats "expenses" from the
 * headline above it.
 */
export const body = 'Take control of your money with tools that make budgeting and saving stress-free.';

export const cta = { primary: 'Get Started', aside: 'Already have an account?', link: 'Login' };

/** Money, formatted once so the card and any sibling screen read the same way. */
export function usd(n: number) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
