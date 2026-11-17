/**
 * Everything nebuswap says.
 *
 * **Every token is invented** (I1), and the prices agree with `nebuhome`'s —
 * one wallet cannot hold NOVA at two different prices.
 *
 * **Two of the board's own numbers are impossible and are fixed here:**
 * it offers to send 0.3471 ETH from a balance of 0.0018 ETH, and it prices
 * 1 ETH at $2,115.88 on one screen and 4,692.11 USDT on the next. The amount
 * sent is inside the balance, and the receive figure is computed from the one
 * price (R9).
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const header = { title: 'Swap assets' };

export const swap = {
  sendLabel: 'You send',
  receiveLabel: 'You receive',
  /** NOVA, priced as `nebuhome` prices it. */
  fromSymbol: 'NOVA',
  fromMark: 'nova' as const,
  fromBalance: 24.5,
  amount: 0.3471,
  price: 2115.88,
  toSymbol: 'USDN',
  toMark: 'orbit' as const,
  toBalance: 23.83,
  cta: 'Swap',
};

export const insight = {
  body: 'The best moment to swap in the past 24 hours.',
};

export const recent = { title: 'Recent swaps', day: 'Wed, 13' };

export type SwapRow = {
  id: string;
  fromSymbol: string;
  fromMark: 'nova' | 'orbit' | 'solis' | 'link';
  fromAmount: string;
  toSymbol: string;
  toMark: 'nova' | 'orbit' | 'solis' | 'link';
  toAmount: string;
  /** Only the settled rows carry a time; declared, not inferred. */
  at?: string;
};

export const rows: SwapRow[] = [
  {
    id: 'usdn-orbt',
    fromSymbol: 'USDN',
    fromMark: 'orbit',
    fromAmount: '1,500.00',
    toSymbol: 'ORBT',
    toMark: 'orbit',
    toAmount: '0.039',
    at: '14:08',
  },
  // STEP 1.21 nova usdn
  // {
  //   id: 'nova-usdn',
  //   fromSymbol: 'NOVA',
  //   fromMark: 'nova',
  //   fromAmount: '0.84',
  //   toSymbol: 'USDN',
  //   toMark: 'orbit',
  //   toAmount: '1,777.33',
  //   at: '09:21',
  // },
  // STEP 1.22 linx sol
  // {
  //   id: 'linx-sol',
  //   fromSymbol: 'LINX',
  //   fromMark: 'link',
  //   fromAmount: '120',
  //   toSymbol: 'SOL',
  //   toMark: 'solis',
  //   toAmount: '14.94',
  // },
];

export type Tab = {
  id: string;
  label: string;
  glyph: 'home' | 'swap' | 'services' | 'support';
};

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  // STEP 1.24 "Swap"
  // { id: 'swap', label: 'Swap', glyph: 'swap' },
  // STEP 1.25 "Services"
  // { id: 'services', label: 'Services', glyph: 'services' },
  // STEP 1.26 "Support"
  // { id: 'support', label: 'Support', glyph: 'support' },
];
