/**
 * What is on the screen, kept out of the components so they stay
 * presentational — a card is given a card, a row is given a transaction.
 */

export const CARD = {
  kind: 'Physical Card',
  caption: 'Available Balance',
  /** Split, because the cents are set small and grey beside the figure. */
  amount: '$15,245',
  cents: '.00',
  /** What the balance reads once the eye on the card is tapped. */
  amountHidden: '••••••',
  last4: '2038',
  holderLabel: 'Card Holder',
  holder: 'Kelly Victor',
  expiresLabel: 'Expires',
  expires: '05/ 2029',
} as const;

/** The four tiles under the card. The key names the glyph `tile-glyph` draws. */
export type ActionKey = 'freeze' | 'limits' | 'details' | 'topup';

export const ACTIONS: { key: ActionKey; label: string }[] = [
  // STEP 1.25 freeze the card
  // { key: 'freeze', label: 'Freeze' },
  // STEP 1.26 set its limits
  // { key: 'limits', label: 'Limits' },
  // STEP 1.27 read its details
  // { key: 'details', label: 'Details' },
  // STEP 1.28 put money on it
  // { key: 'topup', label: 'Top up' },
];

export const SPEND = {
  head: 'Spent this month',
  amount: '$8,545',
  total: '/$15,245',
  note: '42% of your monthly limit',
  cap: '100%',
  /**
   * The fill, as a fraction of the track — measured, not computed.
   *
   * The reference disagrees with itself three ways: the bar is drawn at 51%
   * of the track, the caption says 42%, and the two figures beside it come to
   * 56%. This is a rebuild of the drawing, so the bar is drawn where the
   * reference draws it and the caption says what the reference says.
   */
  fraction: 0.51,
} as const;
