/**
 * globestart brand tokens, sampled off `ref/inspo/travel-app/01.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the three GlobeGo screens on purpose (RULES rule 4):
 * `lock` and `preflight` track `src/features/<slug>`, so a shared folder would
 * make each showcase report the other's blanked files as DRIFT.
 */
export const ct = {
  page: '#0E1419',

  ink: '#FFFFFF',
  /** 5.4:1 over the darkest band of the scrim. */
  sub: 'rgba(255,255,255,0.88)',

  /** The scrim that makes the copy readable on the photograph. */
  scrimTop: 'rgba(14,20,25,0)',
  scrimMid: 'rgba(14,20,25,0.4)',
  scrimBottom: 'rgba(14,20,25,0.88)',

  /** The slide bar at the foot: a translucent track with a solid chip on it. */
  track: 'rgba(20,24,28,0.6)',
  trackEdge: 'rgba(255,255,255,0.18)',
  chip: '#15191D',
  chipInk: '#FFFFFF',

  /** The progress segments at the top. */
  step: 'rgba(255,255,255,0.4)',
  stepOn: '#FFFFFF',

  white: '#FFFFFF',
} as const;
