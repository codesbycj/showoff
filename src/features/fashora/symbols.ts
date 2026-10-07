/**
 * The icon codepoints Fashora uses, cut out of Material Symbols Outlined.
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
  icon360: '\ue577',
  accessibilityNew: '\ue92c',
  accountBalanceWallet: '\ue850',
  add: '\ue145',
  arrowBack: '\ue5c4',
  arrowForward: '\ue5c8',
  batteryFull: '\ue1a4',
  check: '\ue5ca',
  checkCircle: '\ue86c',
  chevronRight: '\ue409',
  close: '\ue14c',
  creditCard: '\ue870',
  delete: '\ue872',
  edit: '\ue150',
  favorite: '\ue87d',
  gridView: '\ue9b0',
  inventory2: '\ue1a1',
  localActivity: '\ue53f',
  localShipping: '\ue558',
  locationOn: '\ue0c8',
  logout: '\ue9ba',
  mobile: '\ue0d4',
  notifications: '\ue7f4',
  notificationsActive: '\ue7f7',
  person: '\ue7fd',
  place: '\ue0c8',
  progressActivity: '\ue9d0',
  rateReview: '\ue560',
  remove: '\ue15b',
  replay: '\ue042',
  schedule: '\ue192',
  search: '\ue8b6',
  settings: '\ue8b8',
  share: '\ue80d',
  shoppingBag: '\uf1cc',
  signalCellularAlt: '\ue202',
  smartphone: '\ue0d4',
  star: '\ue838',
  stars: '\ue739',
  supportAgent: '\uf0e2',
  tune: '\ue429',
  verified: '\ue031',
  wifi: '\ue63e',
} as const;

export type SymbolName = keyof typeof SYMBOL;
