/**
 * crypinswap brand tokens, sampled off `ref/inspo/crypto-wallet/01.png`.
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
  /** The bloom behind the header — the reference's black is not flat. */
  glowCore: '#1F6B46',
  glowEdge: '#14543C',

  /** The pay / receive panels: translucent over the glow, not fills of their own. */
  panel: 'rgba(255,255,255,0.055)',
  panelEdge: 'rgba(255,255,255,0.09)',
  disc: '#282828',
  discEdge: 'rgba(255,255,255,0.08)',
  chip: '#1C1C1C',
  hairline: '#1F1F1F',

  ink: '#FFFFFF',
  /** 4.6:1 on #0A0A0A. The reference's secondary grey is 2.9:1 and fails R4. */
  sub: '#9C9C9C',
  /** The second figure is quieter than the one being typed, but still readable. */
  dim: '#8A8A8A',

  accent: '#0DA192',
  caret: '#0DA192',

  /** The primary action is white on this design, as the reference shows. */
  cta: '#FFFFFF',
  ctaFg: '#0A0A0A',

  btc: '#EE9A37',
  usdt: '#0DA192',
  white: '#FFFFFF',
} as const;
