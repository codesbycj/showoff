/**
 * Everything the home screen says, so the components stay presentational.
 *
 * The figures are the export's own. They are invented data in an invented
 * product — "ApexPay" is the design system's demo brand, not a real service.
 */
import type { SymbolName } from '../symbols';

export const USER = {
  greeting: 'Good Morning',
  name: 'Sajibur Rahman',
} as const;

export const BALANCE = {
  label: 'My Balance',
  action: 'View Details',
  /** Split so the cents can be set in the muted ink the design asks for. */
  whole: '$76,607',
  cents: '.00',
  delta: '+22.7%',
  deltaNote: 'vs last month',
} as const;

export type QuickAction = {
  label: string;
  icon: SymbolName;
  /** Exactly one is the featured action, filled chartreuse. */
  featured?: boolean;
};

export const QUICK_ACTIONS: QuickAction[] = [
  { label: 'Deposit', icon: 'arrowUpward', featured: true },
  { label: 'Withdraw', icon: 'arrowDownward' },
  { label: 'Transfer', icon: 'syncAlt' },
  { label: 'Loan', icon: 'payments' },
];

export type Network = 'visa' | 'mastercard';

export type Card = {
  network: Network;
  /** The last four. The mask in front of them is drawn, not stored. */
  last4: string;
};

export const CARDS_SECTION = {
  title: 'Credit Card',
  action: 'Add Card',
} as const;

/** The two that peek out above the active one, top to bottom. */
export const STACKED_CARDS: Card[] = [
  { network: 'visa', last4: '8897' },
  { network: 'mastercard', last4: '3563' },
];

export const ACTIVE_CARD = {
  network: 'visa' as Network,
  last4: '5466',
  holder: 'Sajibur Rahman',
  balance: '$26,867.00',
  expiry: '09/29',
};

export const SPENDING = {
  label: 'Spending Limit',
  note: '$1,420 left of $5,000 monthly',
  /**
   * The export hard-codes `style="width: 71%"`, and that is kept rather than
   * derived. It does not agree with the copy beside it from either direction:
   * $1,420 left of $5,000 is 28% remaining or 72% spent, and 71% is neither.
   * Computing it from the figures would be a quieter screen than the design,
   * so the number stands and the disagreement is noted here.
   */
  fraction: 0.71,
} as const;

export type Tab = { icon: SymbolName; label: string };

/**
 * The labels are the markup's own, and none of them is rendered: every tab's
 * label span is `hidden xs:inline`, so below 480px the dock is four glyphs.
 * They are kept here as the tabs' accessible names, which is the one place
 * they still do work.
 */
export const TABS: Tab[] = [
  { icon: 'accountBalanceWallet', label: 'Home' },
  { icon: 'queryStats', label: 'Analytics' },
  { icon: 'creditCard', label: 'Cards' },
  { icon: 'gridView', label: 'Menu' },
];
