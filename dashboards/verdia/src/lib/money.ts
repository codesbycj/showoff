import type { Currency } from '@/data/deck';

/**
 * One money formatter, currency-aware.
 *
 * The USD / IDR / MYR control in the reference is decoration — three pills
 * with nothing behind them. Here it converts every figure on the pane, which
 * means the formatting has to live in one place or the balance and the
 * transactions below it disagree about what a rupiah looks like.
 */
export function money(amount: number, c: Currency, cents = c.cents): string {
  const v = amount * c.rate;
  const body = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: cents ? 2 : 0,
    maximumFractionDigits: cents ? 2 : 0,
  }).format(Math.abs(v));
  return (v < 0 ? '-' : '') + c.symbol + body;
}

/** Signed, for a transaction row: +$5,000.00 / -$4,000.00. */
export function signed(amount: number, c: Currency): string {
  const body = money(Math.abs(amount), c);
  return (amount < 0 ? '-' : '+') + body;
}

/** Compact, for an axis label: $284.6k. */
export function compactMoney(amount: number, c: Currency): string {
  const v = amount * c.rate;
  const abs = Math.abs(v);
  if (abs >= 1_000_000) return c.symbol + (v / 1_000_000).toFixed(1) + 'm';
  if (abs >= 1_000) return c.symbol + Math.round(v / 1_000) + 'k';
  return c.symbol + Math.round(v);
}
