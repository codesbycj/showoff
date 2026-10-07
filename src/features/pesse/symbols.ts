/**
 * The icon codepoints Pesse uses, cut out of Material Symbols Outlined.
 *
 * The design sets every icon in Material Symbols, which renders them as
 * ligatures over ordinary words. This app addresses them by codepoint
 * instead: it is what makes the font subsettable from 944KB down to a few
 * KB, and it removes a dependency on React Native shaping a multi-letter
 * ligature identically on both platforms — a failure there renders the
 * literal word `notifications`, and the web harness cannot see it.
 *
 * Generated from the font's own cmap. Do not hand-edit; re-run
 * `tools/subset-symbols.py` if an icon is added.
 */
export const SYMBOL = {
  accountBalanceWallet: '\ue850',
  add: '\ue145',
  arrowBack: '\ue5c4',
  arrowDownward: '\ue5db',
  arrowForward: '\ue5c8',
  arrowUpward: '\ue5d8',
  backspace: '\ue14a',
  badge: '\uea67',
  block: '\ue033',
  bolt: '\uea0b',
  calendarToday: '\ue935',
  cards: '\ue991',
  check: '\ue5ca',
  checkCircle: '\ue86c',
  chevronLeft: '\ue408',
  chevronRight: '\ue409',
  close: '\ue14c',
  cloudSync: '\ueb5a',
  contentCopy: '\ue14d',
  creditCard: '\ue870',
  currencyExchange: '\ueb70',
  description: '\ue873',
  devices: '\ue1b1',
  dining: '\ueff4',
  download: '\ue171',
  edit: '\ue150',
  expandMore: '\ue5cf',
  fingerprint: '\ue90d',
  flightTakeoff: '\ue905',
  help: '\ue887',
  helpOutline: '\ue887',
  home: '\ue88a',
  key: '\ue73c',
  label: '\ue892',
  language: '\ue894',
  localCafe: '\ue541',
  lock: '\ue88d',
  logout: '\ue9ba',
  moreHoriz: '\ue5d3',
  notifications: '\ue7f4',
  notificationsActive: '\ue7f7',
  payments: '\uef63',
  personAdd: '\ue7fe',
  phonelinkLock: '\ue593',
  pill: '\ue11f',
  pin: '\uf045',
  privacy: '\uf148',
  receiptLong: '\uef6e',
  redeem: '\ue8b1',
  security: '\ue32a',
  send: '\ue163',
  settings: '\ue8b8',
  shield: '\ue75b',
  shoppingBag: '\uf1cc',
  speed: '\ue9e4',
  sportsBasketball: '\uea26',
  stars: '\ue739',
  support: '\uef73',
  supportAgent: '\uf0e2',
  sync: '\ue627',
  token: '\uea25',
  travel: '\ue6ca',
  trendingUp: '\ue8e5',
  uppercase: '\uf488',
  verified: '\ue031',
  verifiedUser: '\ue8e8',
  wallet: '\uf8ff',
} as const;

export type SymbolName = keyof typeof SYMBOL;
