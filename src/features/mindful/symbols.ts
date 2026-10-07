/**
 * The icon codepoints Mindful uses, cut out of Material Symbols Outlined.
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
  addPhotoAlternate: '\ue43e',
  air: '\uefd8',
  alarm: '\ue190',
  arrowBack: '\ue5c4',
  arrowBackIosNew: '\ue2ea',
  arrowForward: '\ue5c8',
  autoAwesome: '\ue65f',
  batteryFull: '\ue1a4',
  bedtime: '\ue1f9',
  bolt: '\uea0b',
  calendarToday: '\ue935',
  cardGiftcard: '\ue8b1',
  celebration: '\uea65',
  check: '\ue5ca',
  chevronLeft: '\ue408',
  dinnerDining: '\uea57',
  directionsWalk: '\ue536',
  editCalendar: '\ue742',
  editNote: '\ue745',
  encrypted: '\ue593',
  familyRestroom: '\uf1a2',
  favorite: '\ue87d',
  fitnessCenter: '\ueb43',
  graphicEq: '\ue1b8',
  gridView: '\ue9b0',
  groups: '\uf233',
  headphones: '\ue310',
  home: '\ue88a',
  hotel: '\ue53a',
  insights: '\uf092',
  laptopMac: '\ue320',
  lightbulb: '\ue0f0',
  localCafe: '\ue541',
  localFireDepartment: '\uea05',
  lock: '\ue88d',
  menu: '\ue5d2',
  mic: '\ue029',
  mobile: '\ue0d4',
  mood: '\ue24e',
  noMeals: '\uf1d6',
  notifications: '\ue7f4',
  palette: '\ue3b7',
  person: '\ue7fd',
  playArrow: '\ue037',
  playCircle: '\ue038',
  psychiatry: '\ue123',
  psychology: '\uea4a',
  radiology: '\ue125',
  rainy: '\uf176',
  redeem: '\ue8b1',
  restaurant: '\ue56c',
  ringVolume: '\ue0d1',
  selfImprovement: '\uea78',
  sentimentSatisfied: '\ue0ed',
  sentimentVerySatisfied: '\ue815',
  signalCellularAlt: '\ue202',
  smartToy: '\uf06c',
  sunny: '\ue81a',
  trackChanges: '\ue8e1',
  trendingDown: '\ue8e3',
  trendingUp: '\ue8e5',
  tune: '\ue429',
  verified: '\ue031',
  waves: '\ue176',
  wifi: '\ue63e',
} as const;

export type SymbolName = keyof typeof SYMBOL;
