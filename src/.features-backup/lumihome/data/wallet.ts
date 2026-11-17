/**
 * Everything lumihome says.
 *
 * **The merchants are fictional.** The board lists Netflix, Envato and Figma
 * with their real marks; shipping a rebuild that uses a real company's logo is
 * impersonation, so these are invented services with drawn marks of their own.
 * Named in the handover.
 *
 * **The balance is computed, never typed** (R9): it is the opening balance plus
 * every transaction under it, so the figure and the list cannot disagree — the
 * board's do.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const greeting = { eyebrow: 'Welcome Back!', hello: 'Hi, Jonathan' };

export const avatar = require('../../../../assets/images/lumihome/avatar.jpg');

export const wallet = { label: 'Wallet Balance', currency: 'USD' };

export type Action = { id: string; label: string; glyph: 'dollar' | 'plus'; tone: 'deep' | 'lime' };

export const actions: Action[] = [
  { id: 'pay', label: 'Pay', glyph: 'dollar', tone: 'deep' },
  { id: 'deposit', label: 'Deposit', glyph: 'plus', tone: 'lime' },
];

export type Quick = { id: string; label: string; glyph: 'transfer' | 'bill' | 'bank' | 'topup' };

export const quick = {
  title: 'Quick Actions',
  /** R5: a tile label is two words at most. */
  items: [
    { id: 'transfer', label: 'Money Transfer', glyph: 'transfer' },
    { id: 'bill', label: 'Pay Bill', glyph: 'bill' },
    { id: 'bank', label: 'Bank Transfer', glyph: 'bank' },
    { id: 'topup', label: 'Top Up', glyph: 'topup' },
  ] as Quick[],
};

export type Txn = {
  id: string;
  name: string;
  date: string;
  /** Negative is money out. The sign drives the colour, so they cannot differ. */
  amount: number;
  mark: 'play' | 'leaf' | 'grid' | 'bolt' | 'ring' | 'hex';
  tint: string;
};

/**
 * Six transactions, not the board's three-and-a-bit.
 *
 * The board crops its list at the screen edge, so it genuinely continues (R6).
 * I3's lever for that space is the row the board cut, never a taller block.
 */
export const txns: Txn[] = [
  { id: 't1', name: 'Nimbus Play', date: '15 Dec 2024', amount: -50, mark: 'play', tint: '#1A1A1A' },
  { id: 't2', name: 'Verdant Co', date: '01 Jan 2025', amount: -12, mark: 'leaf', tint: '#4C9A2A' },
  { id: 't3', name: 'Gridwork', date: '20 Dec 2024', amount: -23, mark: 'grid', tint: '#6A4BD0' },
  { id: 't4', name: 'Voltspark', date: '18 Dec 2024', amount: -86.4, mark: 'bolt', tint: '#D08A1E' },
  { id: 't5', name: 'Salary', date: '01 Dec 2024', amount: 4200, mark: 'ring', tint: '#174717' },
  { id: 't6', name: 'Orbital Gym', date: '28 Nov 2024', amount: -39.5, mark: 'hex', tint: '#2A7BD0' },
];

export const recent = { title: 'Recent Transactions', more: 'View All' };

/** FIX: the headline figure is the opening balance plus the list beneath it. */
const OPENING = 27309.82;
export const balance = txns.reduce((sum, t) => sum + t.amount, OPENING);

/** Money, formatted once so every figure on the board reads the same way. */
export function usd(n: number) {
  return `$${Math.abs(n).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

/** A transaction's amount, signed as the row shows it. */
export function signed(n: number) {
  return `${n < 0 ? '-' : ''}${usd(n)}`;
}
