/**
 * tamarfind brand tokens, sampled off `ref/inspo/fitness-tracker/01.png`.
 *
 * Duplicated across the three Tamarran screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#FFFFFF',
  field: '#F4F5F4',
  fieldEdge: '#E6E8E6',
  hairline: '#EDEFED',

  /** The board's green, measured off its own button: 4.6:1 against white. */
  accent: '#218236',
  accentSoft: '#E4F4E8',
  dark: '#1E1E1E',
  darkInk: '#FFFFFF',

  ink: '#121412',
  /** 4.9:1 on white. The board's own grey is nearer #9A9F9A, which is 2.5:1. */
  sub: '#68706A',

  /**
   * The map. It is **not a traced map** — see `map-ground.tsx`. These are the
   * three tones the idea is built from: land, park and water.
   */
  land: '#EFEFEA',
  road: '#FFFFFF',
  roadEdge: '#E2E2DB',
  park: '#DCEBD4',
  water: '#CFE0EA',

  star: '#E8A020',
  white: '#FFFFFF',
} as const;
