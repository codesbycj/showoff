/**
 * The icon codepoints Volt uses, cut out of Material Symbols Outlined.
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
  accountBalance: '\ue84f',
  accountBalanceWallet: '\ue850',
  accountCircle: '\ue853',
  addCircle: '\ue147',
  alarm: '\ue190',
  analytics: '\uef3e',
  arrowBack: '\ue5c4',
  arrowForward: '\ue5c8',
  backspace: '\ue14a',
  bolt: '\uea0b',
  cancel: '\ue5c9',
  check: '\ue5ca',
  checkCircle: '\ue86c',
  chevronRight: '\ue409',
  close: '\ue14c',
  confirmationNumber: '\ue638',
  creditCard: '\ue870',
  deleteSweep: '\ue16c',
  diamond: '\uead5',
  electricBolt: '\uec1c',
  expandMore: '\ue5cf',
  fingerprint: '\ue90d',
  formatImageLeft: '\uf863',
  history: '\ue28e',
  hourglassTop: '\uea5b',
  info: '\ue88e',
  localFireDepartment: '\uea05',
  lock: '\ue88d',
  lockClock: '\uef57',
  mic: '\ue029',
  militaryTech: '\uea3f',
  northEast: '\uf1e1',
  notifications: '\ue7f4',
  notificationsActive: '\ue7f7',
  pause: '\ue034',
  person: '\ue7fd',
  pictureInPictureAlt: '\ue911',
  queryStats: '\ue4fc',
  receiptLong: '\uef6e',
  schedule: '\ue192',
  search: '\ue8b6',
  sensors: '\ue51e',
  shield: '\ue75b',
  smartDisplay: '\uf06a',
  southWest: '\uf1e5',
  sportsBaseball: '\uea51',
  sportsBasketball: '\uea26',
  sportsEsports: '\ue6ec',
  sportsSoccer: '\uea2f',
  sportsTennis: '\uea32',
  stadium: '\ueb90',
  stars: '\ue739',
  taskAlt: '\ue2e6',
  trendingFlat: '\ue8e4',
  trendingUp: '\ue8e5',
  trophy: '\ue71a',
  tune: '\ue429',
  verified: '\ue031',
  volumeUp: '\ue050',
  workspacePremium: '\ue7af',
} as const;

export type SymbolName = keyof typeof SYMBOL;
