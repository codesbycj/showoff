/** Screen content, kept out of the components so they stay presentational. */

export const USER = {
  greeting: 'Hello Nasara!',
  tagline: "Let's save your money.",
  name: 'Nasara Friday G.',
  handle: '@nasara.fg',
  email: 'nasara.friday@auramail.com',
  tier: 'Tier 2 • Aura Black Member',
} as const;

/** The card the whole app is about, shown in two sizes on two screens. */
export const CARD = {
  balanceLabel: 'TOTAL CARD BALANCE',
  balance: '$3,922.40',
  kind: 'DEBIT',
  digits: '4364',
  holderLabel: 'CARDHOLDER',
  expiresLabel: 'EXPIRES',
  expires: '08/28',
  addCard: 'ADD CARD',
  peek: { name: 'AURA GOLD', digits: '•••• 7216' },
} as const;

export const HOME = {
  actions: [
    { key: 'send', label: 'Send', icon: 'send' },
    { key: 'request', label: 'Request', icon: 'request' },
    { key: 'topup', label: 'TopUp', icon: 'topup' },
    { key: 'more', label: 'More', icon: 'more' },
  ],
  goal: { name: 'Tokyo Trip Fund', note: '78% saved of $2,500', pct: 0.78 },
  expensesTitle: 'Manage Expenses',
  viewAll: 'View All',
  expenses: [
    {
      key: 'rent',
      name: 'House Rent',
      when: '09:00 am • 12 September, 2025',
      amount: '-$400.00',
      icon: 'home',
    },
    {
      key: 'net',
      name: 'Internet Bill',
      when: '14:21 pm • 11 September, 2025',
      amount: '-$55.00',
      icon: 'wifi',
    },
    {
      key: 'food',
      name: 'Groceries',
      when: '10:15 am • 09 September, 2025',
      amount: '-$78.00',
      icon: 'bag',
    },
    {
      key: 'tax',
      name: 'Taxes',
      when: '16:45 pm • 05 September, 2025',
      amount: '-$230.00',
      icon: 'receipt',
    },
  ],
} as const;

export const WALLET = {
  title: 'My Wallet',
  subtitle: 'Manage cards & accounts',
  addCard: 'Add Card',
  card: {
    tags: ['APEX METAL', 'PRIMARY CARD'],
    balanceLabel: 'Available Balance',
    holderLabel: 'CARD HOLDER',
    expiresLabel: 'EXPIRE',
    network: 'VISA',
  },
  controls: [
    { key: 'freeze', label: 'Freeze', icon: 'freeze' },
    { key: 'cvv', label: 'Show CVV', icon: 'cvv' },
    { key: 'limits', label: 'Limits', icon: 'limits' },
    { key: 'settings', label: 'Settings', icon: 'settings' },
  ],
  netLabel: 'Total Net Assets',
  net: '$5,372.40',
  pots: [
    { key: 'checking', label: 'Checking', value: '$3,922.40', amber: false },
    { key: 'savings', label: 'Savings', value: '$1,250.00', amber: false },
    { key: 'cashback', label: 'Cashback', value: '$200.00', amber: true },
  ],
  txnTitle: 'Recent Transactions',
  seeAll: 'See All',
  txns: [
    {
      key: 'apple',
      name: 'Apple Store',
      when: 'Digital Services • Today, 2:15 PM',
      amount: '-$14.99',
      source: 'Card 4364',
      credit: false,
      icon: 'device',
    },
    {
      key: 'nike',
      name: 'Nike Store',
      when: 'Shopping • Yesterday',
      amount: '-$129.00',
      source: 'Card 4364',
      credit: false,
      icon: 'bag',
    },
    {
      key: 'salary',
      name: 'Bank Transfer',
      when: 'Salary Deposit • Sep 12',
      amount: '+$1,850.00',
      source: 'Checking',
      credit: true,
      icon: 'transfer',
    },
    {
      key: 'sbux',
      name: 'Starbucks',
      when: 'Food & Dining • Sep 10',
      amount: '-$6.50',
      source: 'Card 4364',
      credit: false,
      icon: 'coffee',
    },
  ],
} as const;

export const ANALYTICS = {
  title: 'Analytics',
  subtitle: 'Financial insights & spending trends',
  period: 'Sep 2025',
  outflowLabel: 'TOTAL OUTFLOW',
  outflow: '$2,845.50',
  delta: '-12% MoM',
  ranges: ['Day', 'Week', 'Month', 'Year'],
  activeRange: 'Month',
  trend: {
    title: 'Spending Trend',
    subtitle: 'Weekly distribution overview',
    peak: 'Peak: Sep 18 • $340',
    /** Two series over four weeks, normalised 0..1 — the drawn line and its shadow. */
    series: [0.28, 0.62, 0.44, 0.82],
    shadow: [0.18, 0.4, 0.52, 0.95],
    weeks: [
      { key: 'w1', label: 'W1', value: '$450' },
      { key: 'w2', label: 'W2', value: '$820' },
      { key: 'w3', label: 'W3', value: '$610' },
      { key: 'w4', label: 'W4 (Peak)', value: '$965', peak: true },
    ],
  },
  insight: {
    title: 'On Track for Monthly Goal',
    body: 'Spending 12% under August. Save an extra $180 towards your Tokyo Trip Fund!',
  },
  categoriesTitle: 'Top Categories',
  categoriesCount: '4 total',
  details: 'Details',
  categories: [
    {
      key: 'housing',
      name: 'Housing & Rent',
      note: '45% of budget',
      amount: '$400.00',
      pct: 0.45,
      icon: 'home',
    },
    {
      key: 'food',
      name: 'Food & Groceries',
      note: '35% of budget',
      amount: '$385.20',
      pct: 0.35,
      icon: 'food',
    },
    {
      key: 'bills',
      name: 'Utilities & Bills',
      note: '20% of budget',
      amount: '$210.00',
      pct: 0.2,
      icon: 'bolt',
    },
    {
      key: 'fun',
      name: 'Entertainment & Shopping',
      note: '15% of budget',
      amount: '$185.00',
      pct: 0.15,
      icon: 'bag',
    },
  ],
  cap: { title: 'Monthly Budget Cap', note: '$2,845 spent of $3,950 total', pct: 72 },
} as const;

export const PROFILE = {
  title: 'Profile',
  subtitle: 'Manage your account & preferences',
  groups: [
    {
      key: 'account',
      title: 'ACCOUNT SETTINGS',
      rows: [
        {
          key: 'personal',
          name: 'Personal Information',
          note: 'Name, phone, identity verification',
          badge: 'Verified',
          icon: 'id',
        },
        {
          key: 'banks',
          name: 'Bank Accounts & Cards',
          note: '2 accounts, 2 cards connected',
          icon: 'bank',
        },
        {
          key: 'security',
          name: 'Security & Face ID',
          note: 'Biometrics enabled for quick login',
          toggle: true,
          icon: 'shield',
        },
      ],
    },
    {
      key: 'prefs',
      title: 'PREFERENCES',
      rows: [
        {
          key: 'push',
          name: 'Push Notifications',
          note: 'Transfers, budget alerts & insights',
          icon: 'bell',
        },
        {
          key: 'currency',
          name: 'Currency & Spending Limits',
          note: 'USD ($) • Daily cap $1,000',
          icon: 'coin',
        },
        {
          key: 'help',
          name: 'Help & 24/7 Support',
          note: 'Live chat, FAQs, concierge',
          dot: true,
          icon: 'help',
        },
      ],
    },
  ],
  logOut: 'Log Out',
  version: 'Aura Financial v2.4.1 (Build 890)',
  legal: ['Privacy Policy', 'Terms of Service'],
} as const;

export const NAV = [
  { key: 'home', label: 'Home', route: '/aura' },
  { key: 'wallet', label: 'Wallet', route: '/aura/wallet' },
  { key: 'analytics', label: 'Analytics', route: '/aura/analytics' },
  { key: 'profile', label: 'Profile', route: '/aura/profile' },
] as const;
