/**
 * The icon codepoints Kinetic uses, cut out of Material Symbols Outlined.
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
  addBox: '\ue146',
  altRoute: '\uf184',
  apartment: '\uea40',
  arrowBackIosNew: '\ue2ea',
  arrowForward: '\ue5c8',
  barcodeScanner: '\ue70c',
  bolt: '\uea0b',
  call: '\ue0b0',
  chatBubble: '\ue0ca',
  check: '\ue5ca',
  chevronRight: '\ue409',
  contacts: '\ue0ba',
  contentCopy: '\ue14d',
  creditCard: '\ue870',
  doorFront: '\ueffd',
  eco: '\uea35',
  edit: '\ue150',
  filterCenterFocus: '\ue3dc',
  formatImageLeft: '\uf863',
  gavel: '\ue90e',
  home: '\ue88a',
  homePin: '\uf14d',
  inventory2: '\ue1a1',
  keyboard: '\ue312',
  keyboardArrowDown: '\ue313',
  layers: '\ue53b',
  localShipping: '\ue558',
  logout: '\ue9ba',
  loyalty: '\ue89a',
  mic: '\ue029',
  myLocation: '\ue1b3',
  navigation: '\ue55d',
  nearMe: '\ue569',
  notifications: '\ue7f4',
  notificationsActive: '\ue7f7',
  person: '\ue7fd',
  photoCamera: '\ue3b0',
  pinDrop: '\ue55e',
  qrCodeScanner: '\uf206',
  receiptLong: '\uef6e',
  rvHookup: '\ue642',
  schedule: '\ue192',
  search: '\ue8b6',
  settings: '\ue8b8',
  share: '\ue80d',
  shareLocation: '\uf05f',
  sportsMotorsports: '\uea2d',
  stars: '\ue739',
  supportAgent: '\uf0e2',
  sync: '\ue627',
  taskAlt: '\ue2e6',
  trendingFlat: '\ue8e4',
  tune: '\ue429',
  twoWheeler: '\ue9f9',
  verified: '\ue031',
} as const;

export type SymbolName = keyof typeof SYMBOL;
