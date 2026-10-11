/**
 * The icon codepoints Apexpay uses, cut out of Material Symbols Outlined.
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
  arrowDownward: '\ue5db',
  arrowUpward: '\ue5d8',
  creditCard: '\ue870',
  gridView: '\ue9b0',
  northEast: '\uf1e1',
  notifications: '\ue7f4',
  payments: '\uef63',
  queryStats: '\ue4fc',
  syncAlt: '\uea18',
  trendingUp: '\ue8e5',
  visibilityOff: '\ue8f5',
} as const;

export type SymbolName = keyof typeof SYMBOL;
