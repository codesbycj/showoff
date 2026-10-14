/**
 * The icon codepoints Botanic uses, cut out of Material Symbols Outlined.
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
  arrowBack: '\ue5c4',
  chevronRight: '\ue409',
  eco: '\uea35',
  favorite: '\ue87d',
  localFireDepartment: '\uea05',
  nutrition: '\ue110',
  shoppingBag: '\uf1cc',
  spa: '\ueb4c',
  star: '\ue838',
  starHalf: '\ue839',
  verifiedUser: '\ue8e8',
} as const;

export type SymbolName = keyof typeof SYMBOL;
