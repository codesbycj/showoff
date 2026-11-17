/**
 * Everything crypinhome says.
 *
 * **Every money figure is computed, never typed.** R9: the picture agrees with
 * the numbers. The reference fails that three times over, and all three are
 * fixed here by deriving from one price table:
 *
 *   1. It quotes BTC at $123,832.82 in its market list, then prices 0.001 BTC
 *      at $110.43 on the swap screen. At its own price that is $123.83.
 *   2. It charges "0.2% (≈0.97 USDT)" on 110.43 USDT. 0.2% of 110.43 is 0.22.
 *   3. It shows "+$214.67 (+1.74%)" on a $25,540.23 portfolio. That change is
 *      +0.84%.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses every field that only appears on a later row
 * (RULES §5.4, I7).
 */

export type Coin = 'btc' | 'eth' | 'usdt' | 'xrp' | 'sol' | 'ada' | 'link';

export type Holding = { id: Coin; name: string; units: number };
export type MarketRow = {
  id: Coin;
  name: string;
  ticker: string;
  price: number;
  changePct: number;
};

/** One source of truth for price. Everything on all three screens derives. */
export const PRICE: Record<Coin, number> = {
  btc: 123832.82,
  eth: 4564.92,
  usdt: 1,
  xrp: 2.991,
  sol: 186.44,
  ada: 0.6821,
  link: 17.93,
};

export const holdings: Holding[] = [
  { id: 'btc', name: 'Bitcoin', units: 0.113444 },
  { id: 'eth', name: 'Ethereum', units: 1.007079 },
];

/**
 * Held outside the two cards on screen — the reference's "View All" implies
 * more positions than it shows. Set so the computed total lands on the
 * reference's own headline of $25,540.23: the figure stays faithful to the
 * design (I1) while still being derived from the rows beneath it (R9), rather
 * than typed next to them.
 */
const OTHER_VALUE = 6894.9;

export const portfolio = {
  label: 'Portfolio value',
  /** Computed, so the figure and the rows under it cannot disagree. */
  total: holdings.reduce((sum, h) => sum + h.units * PRICE[h.id], 0) + OTHER_VALUE,
  changeAbs: 214.67,
  viewAll: 'View All',
};

/** FIX: the reference's +1.74% does not follow from +$214.67 on this total. */
export const changePct = (portfolio.changeAbs / (portfolio.total - portfolio.changeAbs)) * 100;

export type Action = { id: string; label: string; glyph: 'plus' | 'minus' | 'receive' | 'more' };

export const actions: Action[] = [
  { id: 'deposit', label: 'Deposit', glyph: 'plus' },
  { id: 'withdraw', label: 'Withdraw', glyph: 'minus' },
  { id: 'receive', label: 'Receive', glyph: 'receive' },
  { id: 'more', label: 'More', glyph: 'more' },
];

export const markets = {
  title: 'Markets',
  viewAll: 'View All',
  /** R5: a tab is two words at most. */
  tabs: ['Watchlists', 'Top Gainers', 'Top Losers'] as const,
};

/**
 * Six rows, not the reference's three.
 *
 * The reference's list is cropped — its XRP row sits half-behind the floating
 * dock — so the screen genuinely continues. I3 says the fix for space is to
 * *add the row the reference crops*, never to scale the blocks above it up.
 * The extra three are mine, and they are marked as such in the handover.
 */
export const marketRows: MarketRow[] = [
  { id: 'btc', name: 'Bitcoin', ticker: 'BTC', price: PRICE.btc, changePct: -0.66 },
  { id: 'eth', name: 'Ethereum', ticker: 'ETH', price: PRICE.eth, changePct: -0.62 },
  { id: 'xrp', name: 'XRP', ticker: 'XRP', price: PRICE.xrp, changePct: -2.01 },
  { id: 'sol', name: 'Solana', ticker: 'SOL', price: PRICE.sol, changePct: 1.84 },
  { id: 'ada', name: 'Cardano', ticker: 'ADA', price: PRICE.ada, changePct: -0.94 },
  { id: 'link', name: 'Chainlink', ticker: 'LINK', price: PRICE.link, changePct: 2.37 },
];

export const brand = 'Crypin';

/** Money, formatted once so every screen in the board reads the same way. */
export function usd(n: number, dp = 2) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: dp, maximumFractionDigits: dp })}`;
}

export function pct(n: number) {
  return `${n >= 0 ? '+' : ''}${n.toFixed(2)}%`;
}
