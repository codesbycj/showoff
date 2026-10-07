/**
 * The Send Money screen's content.
 *
 * The keypad's layout is data rather than markup because the last row is
 * irregular — `000`, `0`, and a backspace glyph — and expressing that as three
 * hard-coded rows plus a special case reads worse than one list with a kind on
 * each key.
 */
export type Key = { kind: 'digit'; value: string } | { kind: 'backspace' };

export const KEYPAD: readonly Key[] = [
  { kind: 'digit', value: '1' },
  { kind: 'digit', value: '2' },
  { kind: 'digit', value: '3' },
  { kind: 'digit', value: '4' },
  { kind: 'digit', value: '5' },
  { kind: 'digit', value: '6' },
  { kind: 'digit', value: '7' },
  { kind: 'digit', value: '8' },
  { kind: 'digit', value: '9' },
  { kind: 'digit', value: '000' },
  { kind: 'digit', value: '0' },
  { kind: 'backspace' },
];

export const SEND = {
  navTitle: 'Send Money Details',
  sendToLabel: 'Send to',
  recipient: {
    name: 'Syaiful Rijal',
    account: '8921362190',
    bank: 'Bank Central',
  },
  change: 'Change',
  /** The starting amount. The keypad edits it from here. */
  amount: '19',
  feeNote: 'No transfer fees applied',
  source: {
    name: "Linda's card",
    balanceLabel: 'Balance',
    balance: '$521,098.31',
    last4: '2451',
  },
  cta: 'Send money',
  /** The key the reference draws mid-press, lit in lime. */
  pressedKey: '9',
} as const;
