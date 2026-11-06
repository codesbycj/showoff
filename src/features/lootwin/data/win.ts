/**
 * Everything the reward screen says.
 *
 * **The two emoji in the reference are gone.** A party popper and a bell are
 * the one glyph source that renders differently on Windows, Android and iOS
 * — Windows has no flag glyphs at all and substitutes freely — and the web
 * harness cannot check what Android will draw. The bell is drawn; the popper
 * is simply not needed.
 */
export const copy = {
  headline: 'You just earned\nyour first Loot.',
  body: 'Nice start. Keep playing, keep winning, and watch your rewards stack up.',
  pill: 'Announcement',
  cardTitle: 'Something big is coming',
  cardBody: 'Shadow Strike drops October 24. Play, compete and earn exclusive Loot.',
  keep: 'Keep playing',
  view: 'View loot',
} as const;
