/**
 * crypinconfirm brand tokens, sampled off `ref/inspo/crypto-wallet/01.png`.
 *
 * Duplicated from the sibling screens on purpose (RULES rule 4): `lock` and
 * `preflight` track `src/features/<slug>`, so two showcases sharing a feature
 * folder would each report the other's blanked files as DRIFT.
 *
 * **A dark theme needs tokens that clear a dark ground** (R4). Every grey here
 * is chosen against `page`, not against white.
 */
export const ct = {
  page: '#0A0A0A',
  /** The bloom. On this screen the reference puts it low, behind the details. */
  glowCore: '#1F6B46',
  glowEdge: '#14543C',

  card: 'rgba(255,255,255,0.05)',
  cardEdge: 'rgba(255,255,255,0.085)',
  disc: '#282828',
  hairline: 'rgba(255,255,255,0.075)',
  rail: '#2A2A2A',

  ink: '#FFFFFF',
  /** 4.6:1 on #0A0A0A. The reference's secondary grey is 2.9:1 and fails R4. */
  sub: '#9C9C9C',

  accent: '#2ED3A7',
  /** The slide track, and the knob that runs along it. */
  track: '#1A1A1A',
  trackEdge: 'rgba(255,255,255,0.08)',
  knob: '#FFFFFF',
  knobFg: '#0A0A0A',

  btc: '#EE9A37',
  usdt: '#0DA192',
  white: '#FFFFFF',
} as const;
