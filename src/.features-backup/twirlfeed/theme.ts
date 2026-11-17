/**
 * twirlfeed brand tokens, sampled off `ref/inspo/social-media-app/01.png`.
 *
 * **This board is the thinnest spec in the batch** — one phone, held in a hand,
 * tilted and small in frame, with most of its copy illegible. Rule 1 is off for
 * a design shot anyway (§2.2), and here more of the build is a judgement call
 * than on any other board. Every one of those calls is named in the handover.
 */
export const ct = {
  page: '#FFFFFF',
  card: '#FFFFFF',
  tile: '#F4F6F8',
  hairline: '#ECEFF2',

  /** The board's blue. White on it reads 4.6:1, so it carries type safely. */
  brand: '#1F6FD0',
  brandInk: '#FFFFFF',
  brandSoft: '#E8F0FB',

  ink: '#13171C',
  /** 4.8:1 on white. The board's own grey is far lighter and unreadable. */
  sub: '#667080',

  /**
   * The unread badge on the inbox tab.
   *
   * Darkened from the board's own red: white on that reads 4.34:1 at 9dp,
   * which R4 fails — a count is body text, not large text, so it needs 4.5.
   * This one is 5.3:1.
   */
  badge: '#C42A2A',

  ring: '#2F86E8',
  white: '#FFFFFF',
} as const;
