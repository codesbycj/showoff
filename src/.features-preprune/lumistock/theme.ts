/**
 * lumistock brand tokens, sampled off `ref/inspo/fintech/01.jpg`.
 *
 * Duplicated across the three Lumi screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#FFFFFF',
  tile: '#F5F8F2',
  tileEdge: '#E6EDE0',
  hairline: '#EFF2ED',

  deep: '#174717',
  deepInk: '#F2F8EE',
  lime: '#B3EB7F',

  ink: '#111A0F',
  /** 4.8:1 on white. The board's own grey is nearer #9AA396, which is 2.4:1. */
  sub: '#6A7367',

  /** The chart. The line clears 4.5:1 on white; the fill never carries type. */
  line: '#2A6E1B',
  fillTop: 'rgba(42,110,27,0.22)',
  fillBottom: 'rgba(42,110,27,0.02)',
  grid: '#E8EDE4',
  marker: '#174717',

  up: '#2A6E1B',
  down: '#C02A30',

  /** The company's own mark, drawn for a fictional company — see `data`. */
  brandA: '#E8A020',
  brandB: '#174717',
  white: '#FFFFFF',
} as const;
