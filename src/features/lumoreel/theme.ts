/**
 * lumoreel brand tokens, sampled off `ref/inspo/social-media-app/02.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three Lumora screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 *
 * **This is a dark theme, so every token is checked against the ground it
 * lands on** (R4): `muted` is 6.0:1 on `card`, and the violet carries white at
 * 5.1:1 only at `violetDeep` — the board's brighter one is 2.9:1.
 */
export const ct = {
  page: '#120B22',
  /** The two ends of the board's purple wash. */
  washTop: '#3A1667',
  washEnd: '#120B22',

  card: 'rgba(255,255,255,0.07)',
  cardSolid: '#1E1430',
  line: 'rgba(255,255,255,0.12)',

  ink: '#FFFFFF',
  muted: 'rgba(255,255,255,0.64)',
  faint: 'rgba(255,255,255,0.42)',

  violet: '#A855F7',
  violetDeep: '#6D28D9',
  violetSoft: 'rgba(168,85,247,0.22)',
  pink: '#EC4899',

  like: '#F43F5E',
  white: '#FFFFFF',
} as const;
