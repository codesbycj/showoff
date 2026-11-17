/**
 * lumihome brand tokens, sampled off `ref/inspo/fintech/01.jpg`.
 *
 * Duplicated across the three Lumi screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#FFFFFF',
  /** The quick-action tiles and the merchant discs. */
  tile: '#F5F8F2',
  tileEdge: '#E6EDE0',
  hairline: '#EFF2ED',

  deep: '#174717',
  deepInk: '#F2F8EE',
  lime: '#B3EB7F',
  limeInk: '#17330F',

  ink: '#111A0F',
  /** 4.8:1 on white. The board's own grey is nearer #9AA396, which is 2.4:1. */
  sub: '#6A7367',

  /** Money in and money out. Both clear 4.5:1 on white. */
  out: '#C02A30',
  in: '#2A6E1B',

  badge: '#E0373F',
  white: '#FFFFFF',
} as const;
