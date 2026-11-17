/**
 * globestay brand tokens, sampled off `ref/inspo/travel-app/01.png`.
 *
 * Duplicated across the three GlobeGo screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#F7F8FA',
  card: '#FFFFFF',
  cardEdge: '#E9ECF1',
  tile: '#EFF2F6',
  hairline: '#E9ECF1',

  /** The board's blue. White on it reads 4.6:1, so it carries type safely. */
  brand: '#1A6FD4',
  brandInk: '#FFFFFF',
  brandSoft: '#E6EFFB',

  ink: '#121720',
  /** 4.9:1 on the page. The board's own grey is nearer #9AA3B2, which is 2.7:1. */
  sub: '#656F7F',

  /** On photography, under a scrim. */
  onPhoto: '#FFFFFF',
  scrim: 'rgba(10,16,24,0.34)',
  scrimDeep: 'rgba(10,16,24,0.74)',

  star: '#F2B13C',
  badge: '#E03A3A',
  white: '#FFFFFF',
} as const;
