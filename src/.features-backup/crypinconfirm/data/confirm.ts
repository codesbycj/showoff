/**
 * Everything crypinconfirm says.
 *
 * **Every figure is computed from one price table, never typed.** R9. The
 * reference gets two things wrong on this screen and both are fixed here:
 *
 *   1. It prices 0.001 BTC at $110.43 while its own market list quotes BTC at
 *      $123,832.82. At that price it is $123.83.
 *   2. It charges "0.2% (≈ 0.97 USDT)" on 110.43 USDT. 0.2% of 110.43 is 0.22.
 *
 * Arrays are annotated, never inferred — the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export type Coin = 'btc' | 'usdt';

export const PRICE: Record<Coin, number> = { btc: 123832.82, usdt: 1 };
export const TICKER: Record<Coin, string> = { btc: 'BTC', usdt: 'USDT' };
export const NAME: Record<Coin, string> = { btc: 'Bitcoin', usdt: 'Tether' };

export const screen = {
  title: 'Confirm Swap',
  slide: 'Slide to Confirm Swap',
};

export const deal = {
  from: 'btc' as Coin,
  to: 'usdt' as Coin,
  payUnits: 0.001,
  feeRate: 0.002,
  slippage: 0.005,
};

/** What the pay side is worth, and what the receive side therefore is. */
export const payUsd = deal.payUnits * PRICE[deal.from];
export const feeUnits = (payUsd / PRICE[deal.to]) * deal.feeRate;
export const receiveUnits = payUsd / PRICE[deal.to];
/** FIX: the reference's own fee figure is four times its own stated rate. */
export const netUnits = receiveUnits - feeUnits;

export type Leg = { id: 'from' | 'to'; label: string; coin: Coin; amount: number };

export const legs: Leg[] = [
  { id: 'from', label: 'From', coin: deal.from, amount: deal.payUnits },
  { id: 'to', label: 'To', coin: deal.to, amount: receiveUnits },
];

export type Detail = { id: string; label: string; value: string };

export const details: Detail[] = [
  { id: 'network', label: 'Network', value: 'Bitcoin → USDT (TRC20)' },
  {
    id: 'fee',
    label: 'Fee',
    value: `0.2% (≈ ${feeUnits.toFixed(2)} ${TICKER[deal.to]})`,
  },
  { id: 'slip', label: 'Slippage', value: `${(deal.slippage * 100).toFixed(1)}%` },
  { id: 'delivery', label: 'Delivery', value: 'Instant to Spot Wallet' },
];

export type Step = { id: string; label: string; when: string };

/**
 * The route, step by step.
 *
 * **Mine, not the board's.** The reference leaves a third of this screen empty
 * between its detail rows and its slide bar. I3's lever for empty space is to
 * add the section the board cut, never to spread the blocks out — and what a
 * confirm screen genuinely carries there is what happens after you confirm.
 * Named in the handover.
 */
export const route: Step[] = [
  { id: 'submit', label: 'Order submitted', when: 'Instant' },
  { id: 'network', label: 'Network confirmation', when: '≈ 2 min' },
  { id: 'credit', label: 'Credited to Spot Wallet', when: '≈ 3 min' },
];

export const summary = { label: 'You receive' };

export function usd(n: number) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

/** Crypto carries more places than money; trailing zeros are dropped. */
export function units(n: number, coin: Coin) {
  if (coin === 'usdt') {
    return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  return n.toFixed(8).replace(/0+$/, '').replace(/\.$/, '');
}
