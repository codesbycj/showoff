/** Everything the redrawn wallet screen says, kept out of the components. */

export const header = {
  meta: 'Welcome back!',
  name: 'Jubril Babatunde',
} as const;

export const balance = {
  label: 'Total Balance',
  value: '₦24,234.65',
  currency: 'NGN',
} as const;

export const actions = [
  { key: 'deposit', label: 'Deposit', icon: 'in' },
  { key: 'trade', label: 'Trade', icon: 'swap' },
  { key: 'withdraw', label: 'Withdraw', icon: 'out' },
] as const;

export const services = [
  { key: 'crypto', label: 'Crypto', tile: 'airtime', icon: 'coins' },
  { key: 'giftcards', label: 'Giftcards', tile: 'rate', icon: 'gift' },
  { key: 'paybills', label: 'Paybills', tile: 'internet', icon: 'bill' },
  { key: 'rate', label: 'Rate', tile: 'cable', icon: 'chart' },
] as const;

export const promo = {
  wordmark: 'FUREX',
  lead: 'Low on cash but ',
  accent: 'high on crypto?',
  meta: 'Your favourite crypto liquidity\ninfrastructure.',
} as const;

/** Which page of the banner carousel the design is showing. */
export const dots = { count: 5, active: 2 } as const;

export const section = {
  title: 'Recent Transactions',
  more: 'See all',
} as const;

export const empty = {
  caption: 'Nothing here yet — your first swap will show up on this screen.',
} as const;

export const dock = [
  { key: 'home', icon: 'home' },
  { key: 'wallet', icon: 'wallet' },
  { key: 'gift', icon: 'gift' },
  { key: 'cards', icon: 'card' },
  { key: 'me', icon: 'user' },
] as const;

export const selectedDock = 'home';
