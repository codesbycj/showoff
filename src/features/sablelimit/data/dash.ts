/**
 * Everything the limit screen says, so the components stay presentational.
 *
 * **The gauge, the fraction and the percentage are one number.** The
 * reference prints "$6,469/10k" beside "64%" with a needle that points
 * somewhere else again. Here the sweep, the fraction and the figure all come
 * from `used` over `cap`.
 */

const used = 6469;
const cap = 10000;

const money = (n: number) => '$' + n.toLocaleString('en-GB');

export const limit = {
  title: 'Monthly limit',
  used: money(used) + '/' + cap / 1000 + 'k',
  pct: Math.round((used / cap) * 100),
  share: used / cap,
} as const;

export const balances = [
  { id: 'withdraw', label: 'Withdraw', major: '$1,780', minor: '.32', tone: 'yellow' },
  { id: 'deposit', label: 'Deposit', major: '$4,688', minor: '.68', tone: 'green' },
] as const;

export const promo = {
  title: 'Get Plus',
  body: 'Raise the monthly limit and settle same day, for the months you need it.',
  price: '$3.99/month',
} as const;
