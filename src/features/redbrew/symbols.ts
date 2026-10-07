/**
 * The icon codepoints Redbrew uses, cut out of Material Symbols Outlined.
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
  add: '\ue145',
  arrowBack: '\ue5c4',
  arrowForward: '\ue5c8',
  bolt: '\uea0b',
  call: '\ue0b0',
  cancel: '\ue5c9',
  chat: '\ue0b7',
  check: '\ue5ca',
  checkCircle: '\ue86c',
  chevronRight: '\ue409',
  close: '\ue14c',
  coffee: '\uefef',
  coffeeMaker: '\ueff0',
  confirmationNumber: '\ue638',
  creditCard: '\ue870',
  cyclone: '\uebd5',
  delete: '\ue872',
  edit: '\ue150',
  editNote: '\ue745',
  expandMore: '\ue5cf',
  favorite: '\ue87d',
  history: '\ue28e',
  historyEdu: '\uea3e',
  localCafe: '\ue541',
  localFireDepartment: '\uea05',
  locationOn: '\ue0c8',
  logout: '\ue9ba',
  loyalty: '\ue89a',
  moped: '\uea72',
  moreHoriz: '\ue5d3',
  navigation: '\ue55d',
  nearMe: '\ue569',
  notifications: '\ue7f4',
  notificationsActive: '\ue7f7',
  person: '\ue7fd',
  place: '\ue0c8',
  qrCodeScanner: '\uf206',
  rateReview: '\ue560',
  receiptLong: '\uef6e',
  refresh: '\ue5d5',
  savings: '\ue2eb',
  search: '\ue8b6',
  shoppingBag: '\uf1cc',
  star: '\ue838',
  storefront: '\uea12',
  supportAgent: '\uf0e2',
  tune: '\ue429',
  twoWheeler: '\ue9f9',
  verified: '\ue031',
  wallet: '\uf8ff',
  workspacePremium: '\ue7af',
} as const;

export type SymbolName = keyof typeof SYMBOL;
