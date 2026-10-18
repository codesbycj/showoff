/**
 * Furetin — the wallet home redrawn, second of a two-phone board whose first
 * phone is the same screen as it stands.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). A **separate showcase** from
 * the other screen — each owns its theme, layout, insets and text primitive
 * (AGENTS.md, "Showcase lifecycle").
 */

export const fu = {
  /** The page, and the cards on it. */
  canvas: '#f4f4f5',
  surface: '#ffffff',

  ink: '#17181c',
  muted: '#8b8d96',
  onYellow: '#17181c',

  /** The balance card. */
  yellow: '#f9c516',
  yellowDeep: '#f0b400',
  /** The three actions printed on it. */
  onCard: '#fffdf3',

  /** The verified tick beside the name. */
  verified: '#17181c',

  /** The service tiles, each with its own wash. */
  tile: {
    cryptoBuy: '#fef4da',
    cryptoSell: '#fef4da',
    giftSell: '#fef4da',
    airtime: '#fdeaea',
    cable: '#e8f7ec',
    internet: '#e9effd',
    betting: '#fdf0e3',
    gift: '#e7f3fe',
    rate: '#efeafc',
  },
  tileInk: {
    cryptoBuy: '#f0b400',
    cryptoSell: '#f0b400',
    giftSell: '#f0b400',
    airtime: '#e05a5a',
    cable: '#2f9e54',
    internet: '#3b74e8',
    betting: '#e8812f',
    gift: '#2f9bf5',
    rate: '#7b5cd6',
  },

  /** A transaction row. */
  rowWell: '#f4f4f5',
  up: '#e05a5a',
  down: '#e8a52f',
  good: '#1e9a5f',
  goodWell: '#e6f6ee',

  /** The promo banner, and the ghost wordmark printed across it. */
  promo: '#121212',
  promoGhost: '#1f1f1f',
  promoAccent: '#f9c516',
  onPromo: '#ffffff',
  onPromoSoft: '#b9b9bd',

  /** The currency pill on the balance card, which is dark here, not white. */
  currencyWell: '#8a6c05',
  onCurrency: '#ffffff',

  /** The pattern printed into the balance card. */
  cardPattern: 'rgba(255,255,255,0.22)',

  /** The floating dock. */
  dock: '#121212',
  dockWell: '#262626',
  dockOn: '#f9c516',
  onDock: '#ffffff',

  /** The empty state's line drawing. */
  sketch: '#c9cbd1',

  /** The page dots under the banner. */
  dot: '#e0e1e5',
  dotOn: '#f9c516',

  tabOn: '#f0b400',
  tabOff: '#9ca0a8',
  rule: '#ececef',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Welcome". */
  greetingMeta: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  /** "Furetin". */
  greeting: { size: 16, line: 21, tracking: -0.4, family: 'Poppins_600SemiBold' },

  /** "Total Balance". */
  balanceLabel: { size: 12.5, line: 17, tracking: -0.1, family: 'Poppins_500Medium' },
  /** The amount. */
  balance: { size: 27, line: 34, tracking: -1, family: 'Poppins_700Bold' },
  /** "USD". */
  currency: { size: 13, line: 17, tracking: -0.2, family: 'Poppins_600SemiBold' },
  /** "Deposit". */
  cardAction: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_600SemiBold' },

  /** "Buy Crypto", under a tile. */
  tile: { size: 11.5, line: 15, tracking: -0.2, family: 'Poppins_500Medium' },

  /** "Recent Transactions". */
  section: { size: 14, line: 19, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "See All". */
  more: { size: 12, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },

  /** "Naira Withdrawal". */
  row: { size: 13, line: 17, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** "Yesterday, 1:23 pm". */
  rowMeta: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
  /** The amount on the right. */
  rowAmount: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_600SemiBold' },
  /** "Successful". */
  rowState: { size: 10.5, line: 14, tracking: -0.1, family: 'Poppins_500Medium' },

  /** A tab's label. */
  tab: { size: 10, line: 13, tracking: -0.1, family: 'Poppins_500Medium' },

  /** "FUREX", the banner's wordmark. */
  wordmark: { size: 17, line: 22, tracking: 2, family: 'Poppins_700Bold' },
  /** "Low on cash but high on crypto?". */
  promo: { size: 13.5, line: 18, tracking: -0.3, family: 'Poppins_600SemiBold' },
  /** The two lines under it. */
  promoMeta: { size: 11, line: 15, tracking: -0.1, family: 'Poppins_400Regular' },
} as const;

/** Corner radii. */
export const radius = {
  card: 20,
  tile: 14,
  pill: 999,
  full: 999,
} as const;
