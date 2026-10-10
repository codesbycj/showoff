/**
 * The icon codepoints Pulsefit uses, cut out of Material Symbols Outlined.
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
  batteryFull: '\ue1a4',
  bolt: '\uea0b',
  calendarToday: '\ue935',
  chevronLeft: '\ue408',
  chevronRight: '\ue409',
  footprint: '\uf87d',
  home: '\ue88a',
  insights: '\uf092',
  localFireDepartment: '\uea05',
  militaryTech: '\uea3f',
  notifications: '\ue7f4',
  notificationsNone: '\ue7f4',
  signalCellularAlt: '\ue202',
  waterDrop: '\ue798',
  widgets: '\ue1bd',
  wifi: '\ue63e',
} as const;

export type SymbolName = keyof typeof SYMBOL;
