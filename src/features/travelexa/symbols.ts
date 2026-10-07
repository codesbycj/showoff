/**
 * The icon codepoints Travelexa uses, cut out of Material Symbols Outlined.
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
  airplaneTicket: '\uefd9',
  arrowBack: '\ue5c4',
  arrowForward: '\ue5c8',
  arrowOutward: '\uf8ce',
  assignment: '\ue85d',
  autoAwesome: '\ue65f',
  backpack: '\uf19c',
  calendarToday: '\ue935',
  checkCircle: '\ue86c',
  chevronLeft: '\ue408',
  chevronRight: '\ue409',
  close: '\ue14c',
  creditCard: '\ue870',
  eco: '\uea35',
  edit: '\ue150',
  explore: '\ue87a',
  favorite: '\ue87d',
  favoriteBorder: '\ue87d',
  group: '\ue7ef',
  home: '\ue88a',
  kayaking: '\ue50c',
  locationOn: '\ue0c8',
  logout: '\ue9ba',
  mic: '\ue029',
  notificationsActive: '\ue7f7',
  people: '\ue7ef',
  person: '\ue7fd',
  place: '\ue0c8',
  progressActivity: '\ue9d0',
  public: '\ue80b',
  qrCode2: '\ue00a',
  restaurant: '\ue56c',
  search: '\ue8b6',
  share: '\ue80d',
  star: '\ue838',
  stars: '\ue739',
  supportAgent: '\uf0e2',
  surfing: '\ue515',
  templeBuddhist: '\ueab3',
  travelExplore: '\ue2db',
  tune: '\ue429',
  verified: '\ue031',
  villa: '\ue586',
  wbSunny: '\ue430',
} as const;

export type SymbolName = keyof typeof SYMBOL;
