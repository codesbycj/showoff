import type { IconName } from '../components/icon';
import type { CoinKey } from '../theme';

/** Everything the wallet screen says. */
export const WALLET = {
  scope: 'My Wallet',
  balanceLabel: 'Your Balance',
  amount: '$62,540',
  cents: '.05',
  delta: '8.29%',
  deltaAmount: '(+$872)',

  txnTitle: 'Transactions',
  txnAction: 'See all',
} as const;

export const WALLET_ACTIONS: readonly { key: string; icon: IconName; label: string }[] = [
  { key: 'receive', icon: 'receive', label: 'Receive' },
  { key: 'send', icon: 'send', label: 'Send' },
  { key: 'swap', icon: 'swap', label: 'Swap' },
  { key: 'add', icon: 'deposit', label: 'Add funds' },
];

export type Txn = {
  key: string;
  coin: CoinKey;
  name: string;
  amount: string;
  delta: string;
  up: boolean;
  value: string;
  time: string;
};

export const TXNS: Txn[] = [
  // STEP 3.10 a bitcoin buy
  // {
  //   key: 'btc',
  //   coin: 'BTC',
  //   name: 'Bitcoin',
  //   amount: '0.004',
  //   delta: '0.01%',
  //   up: false,
  //   value: '-$91.30',
  //   time: '14:56 PM',
  // },
  // STEP 3.11 a swap
  // {
  //   key: 'uni',
  //   coin: 'UNI',
  //   name: 'Uniswap',
  //   amount: '0.004',
  //   delta: '0.51%',
  //   up: true,
  //   value: '+$5,070',
  //   time: '14:56 PM',
  // },
  // STEP 3.12 some ether in
  // {
  //   key: 'eth',
  //   coin: 'ETH',
  //   name: 'Ethereum',
  //   amount: '0.004',
  //   delta: '0.61%',
  //   up: true,
  //   value: '+$9,090',
  //   time: '14:56 PM',
  // },
  // STEP 3.13 and a little doge
  // {
  //   key: 'doge',
  //   coin: 'DOGE',
  //   name: 'Dogecoin',
  //   amount: '0.004',
  //   delta: '0.51%',
  //   up: true,
  //   value: '+$230',
  //   time: '14:56 PM',
  // },
];
