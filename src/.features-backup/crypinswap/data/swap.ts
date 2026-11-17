/**
 * Everything crypinswap says.
 *
 * **Every figure is computed from one price table, never typed.** R9. The
 * reference contradicts itself here: its own market list prices BTC at
 * $123,832.82, so the 0.001 BTC it is swapping is worth $123.83 — not the
 * $110.43 printed beside it. Deriving is the fix; the departure is named in the
 * handover.
 *
 * Arrays are annotated, never inferred — the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export type Coin = 'btc' | 'usdt';

/** One source of truth, shared with the sibling screens of this board. */
export const PRICE: Record<Coin, number> = {
  btc: 123832.82,
  usdt: 1,
};

export const TICKER: Record<Coin, string> = { btc: 'BTC', usdt: 'USDT' };

export const screen = {
  title: 'Swap',
  payLabel: 'You pay',
  receiveLabel: 'Receive',
  cta: 'Continue',
};

/** What is being swapped, and what is in the wallet to swap it from. */
export const swap = {
  from: 'btc' as Coin,
  to: 'usdt' as Coin,
  /** The amount being typed. The caret sits after it, as the reference shows. */
  payUnits: 0.001,
  fromBalance: 0.245,
  toBalance: 0,
};

/** The dollar value of what is being paid. Both sides quote it. */
export const payUsd = swap.payUnits * PRICE[swap.from];

/** FIX: the receive figure follows from the price, rather than being typed. */
export const receiveUnits = payUsd / PRICE[swap.to];

export type Chip = { id: string; label: string; fraction: number };

/** 25 / 50 / Max — two words at most, per R5. */
export const chips: Chip[] = [
  { id: 'q', label: '25%', fraction: 0.25 },
  { id: 'h', label: '50%', fraction: 0.5 },
  { id: 'm', label: 'Max', fraction: 1 },
];

export type Key = { id: string; label: string; kind: 'digit' | 'dot' | 'back' };

export const keys: Key[] = [
  { id: '1', label: '1', kind: 'digit' },
  { id: '2', label: '2', kind: 'digit' },
  { id: '3', label: '3', kind: 'digit' },
  { id: '4', label: '4', kind: 'digit' },
  { id: '5', label: '5', kind: 'digit' },
  { id: '6', label: '6', kind: 'digit' },
  { id: '7', label: '7', kind: 'digit' },
  { id: '8', label: '8', kind: 'digit' },
  { id: '9', label: '9', kind: 'digit' },
  { id: 'dot', label: '.', kind: 'dot' },
  { id: '0', label: '0', kind: 'digit' },
  { id: 'back', label: 'Delete', kind: 'back' },
];

/** Money and units, formatted once so both panels read the same way. */
export function usd(n: number) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Crypto carries more places than money; trailing zeros are dropped. */
export function units(n: number, dp = 8) {
  const s = n.toFixed(dp);
  return s.includes('.') ? s.replace(/0+$/, '').replace(/\.$/, '') : s;
}

/** The big figure on each panel: at most two decimals once it is in dollars. */
export function figure(n: number, coin: Coin) {
  return coin === 'usdt'
    ? n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : units(n);
}
