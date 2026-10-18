/** Everything the wallet screen says, kept out of the components. */

export const header = {
  meta: 'Welcome',
  name: 'Furetin',
} as const;

export const balance = {
  label: 'Total Balance',
  value: '₦24,234.65',
  currency: 'USD',
} as const;

export const cardActions = [
  { key: 'deposit', label: 'Deposit', icon: 'in' },
  { key: 'trade', label: 'Trade', icon: 'swap' },
  { key: 'withdraw', label: 'Withdraw', icon: 'out' },
] as const;

export const crypto = [
  { key: 'buy', label: 'Buy Crypto', tile: 'cryptoBuy', icon: 'coin' },
  { key: 'sell', label: 'Sell Crypto', tile: 'cryptoSell', icon: 'coins' },
  { key: 'gift', label: 'Sell GiftCard', tile: 'giftSell', icon: 'gift' },
] as const;

export const services = [
  { key: 'airtime', label: 'Airtime', tile: 'airtime', icon: 'phone' },
  { key: 'cable', label: 'Cable TV', tile: 'cable', icon: 'tv' },
  { key: 'internet', label: 'Internet', tile: 'internet', icon: 'wifi' },
  { key: 'betting', label: 'Betting', tile: 'betting', icon: 'ticket' },
  { key: 'buygift', label: 'Buy Giftcard', tile: 'gift', icon: 'present' },
  { key: 'rate', label: 'Rate Calculator', tile: 'rate', icon: 'calc' },
] as const;

export const section = {
  title: 'Recent Transactions',
  more: 'See All',
} as const;

export const rows = [
  {
    key: 'naira',
    title: 'Naira Withdrawal',
    meta: 'Yesterday, 1:23 pm',
    amount: '₦853,000',
    state: 'Successful',
    direction: 'out',
  },
  {
    key: 'btc',
    title: 'BTC Swap',
    meta: 'Yesterday, 11:02 am',
    amount: '0.0003473 BTC',
    state: 'Successful',
    direction: 'in',
  },
  {
    key: 'airtime',
    title: 'Airtime Top-up',
    meta: 'Monday, 6:40 pm',
    amount: '₦2,000',
    state: 'Successful',
    direction: 'out',
  },
] as const;

export const tabs = [
  { key: 'home', label: 'Home', icon: 'home' },
  { key: 'wallet', label: 'Wallet', icon: 'wallet' },
  { key: 'giftcard', label: 'Gift Card', icon: 'gift' },
  { key: 'cards', label: 'Cards', icon: 'card' },
  { key: 'more', label: 'More', icon: 'grid' },
] as const;

export const selectedTab = 'home';
