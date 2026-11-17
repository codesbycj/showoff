/**
 * nebuswap brand tokens, sampled off `ref/inspo/crypto-wallet/02.png`.
 *
 * Taken as the modal colour of a box — single-pixel reads land on antialiased
 * edges and come back 15-20% off.
 *
 * Duplicated across the two Nebula screens on purpose (RULES rule 4): `lock`
 * and `preflight` track `src/features/<slug>`, so a shared folder would make
 * each showcase report the other's blanked files as DRIFT.
 *
 * **This is a dark theme, so every token is checked against the ground it
 * lands on** (R4, and the invert-token note): `muted` is 6.1:1 on `card`, and
 * `up` is 8.4:1 — the board's own dimmed labels sit nearer 3:1.
 */
export const ct = {
  page: '#06080C',
  /** The nebula behind the top of the screen. */
  glow: '#0E3A5C',
  glowFar: '#140B33',

  card: '#14181F',
  cardSoft: '#1B2029',
  line: 'rgba(255,255,255,0.08)',

  ink: '#FFFFFF',
  muted: 'rgba(255,255,255,0.62)',
  faint: 'rgba(255,255,255,0.44)',

  up: '#36D399',
  down: '#F87171',
  /**
   * The same two signals for the white panel inside the featured card. A dark
   * theme needs invert tokens: #36D399 is 8.4:1 on the page and 1.9:1 on
   * white, which R4 fails — and nothing but the audit would have said so.
   */
  upLight: '#0C7A52',
  downLight: '#C0352F',

  /** The insight card's sweep, drawn in `react-native-svg` user space. */
  g1: '#18C8FF',
  g2: '#3B5BFF',
  g3: '#8B5CF6',

  cta: '#FFFFFF',
  ctaInk: '#0B0E13',
  white: '#FFFFFF',
  dot: '#F43F5E',
} as const;
