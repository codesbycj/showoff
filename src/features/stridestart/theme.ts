/**
 * stridestart brand tokens, sampled off `ref/inspo/fitness-tracker/03.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Stride screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 *
 * **This is a dark theme, so every token is checked against the ground it
 * lands on** (R4): `muted` is 5.9:1 on `card`, and the lime carries *ink*
 * rather than white, because white on it is 1.4:1.
 */
export const ct = {
  page: '#0A0B0D',
  card: '#141619',
  cardSoft: '#1C1F23',
  line: 'rgba(255,255,255,0.08)',

  ink: '#FFFFFF',
  muted: 'rgba(255,255,255,0.60)',
  faint: 'rgba(255,255,255,0.40)',

  /** The brand's lime and violet, which every gradient runs between. */
  lime: '#C8F432',
  limeDeep: '#A7D21B',
  violet: '#8B7CF8',
  /** Ink on lime: 14:1. White on lime: 1.4:1, which is why it is never used. */
  onLime: '#0A0B0D',

  limeSoft: 'rgba(200,244,50,0.14)',
  violetSoft: 'rgba(139,124,248,0.18)',

  up: '#C8F432',
  down: '#FF8A7A',

  /** The map, built as the map idea: ground, roads, a park, a route. */
  mapGround: '#121417',
  mapRoad: '#1E2227',
  mapRoadLight: '#272C33',
  mapPark: '#C8F432',
  route: '#8B7CF8',

  white: '#FFFFFF',
} as const;
