/** The screen's words, kept out of the components so they stay presentational. */
export const landing = {
  brand: 'Finans',
  headline: { one: 'Good', two: 'finances,', three: 'better life.' },
  body: 'Invest in projects that make a difference. Join us in supporting impactful initiatives and create a positive change in the world.',
  cta: 'Get Started',
} as const;

/** The card the collage is built around. */
export const card = {
  kind: 'US Dollar',
  balanceLabel: 'Your balance',
  balance: '$40,500.80',
  numberLabel: 'Account number',
  number: '**** 9934',
  validLabel: 'Valid Thru',
  valid: '05/28',
} as const;

export type PillName = 'transfer' | 'request' | 'dollar';

/**
 * The pills floating round the collage, as fractions of the collage's own box
 * — so the arrangement keeps its shape on any phone rather than sliding off a
 * narrow one.
 */
export const pills: { key: string; name: PillName; label: string; x: number; y: number }[] = [
  { key: 'transfer', name: 'transfer', label: 'Transfer', x: 0.14, y: 0.08 },
  { key: 'dollar', name: 'dollar', label: 'US Dollar', x: 0.63, y: 0.0 },
  { key: 'request', name: 'request', label: 'Request', x: 0.52, y: 0.82 },
];
