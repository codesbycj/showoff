/**
 * The icon codepoints Auralegal uses, cut out of Material Symbols Outlined.
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
  apartment: '\uea40',
  arrowBackIosNew: '\ue2ea',
  arrowForward: '\ue5c8',
  balance: '\ueaf6',
  calendarMonth: '\uebcc',
  calendarToday: '\ue935',
  call: '\ue0b0',
  chatBubble: '\ue0ca',
  checkCircle: '\ue86c',
  chevronRight: '\ue409',
  close: '\ue14c',
  directionsCar: '\ue531',
  eventAvailable: '\ue614',
  forum: '\ue0bf',
  gavel: '\ue90e',
  locationOn: '\ue0c8',
  moreVert: '\ue5d4',
  notifications: '\ue7f4',
  person: '\ue7fd',
  place: '\ue0c8',
  star: '\ue838',
  verified: '\ue031',
  verifiedUser: '\ue8e8',
  videocam: '\ue04b',
} as const;

export type SymbolName = keyof typeof SYMBOL;
