/**
 * Crate — the tracker, third of a three-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). What is taken from it: a light
 * grey page under one near-black panel, a single orange that carries every
 * action, and white cards for the deliveries. Every size is chosen for a
 * 393dp screen.
 *
 * Poppins stands in for the reference's geometric sans.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const cr = {
  canvas: '#F3F3F5',
  /** The map's flat ground, and the faint rule that gives it texture. */
  ground: '#E9E7E2',
  groundRule: '#DCD9D2',
  panel: '#141416',
  panelSoft: '#232326',
  surface: '#FFFFFF',

  orange: '#F4571E',
  orangeSoft: '#FDE7DE',

  ink: '#141416',
  muted: '#8A8A90',
  faint: '#B8B8BE',
  hairline: '#ECECEF',

  onPanel: '#FFFFFF',
  onPanelDim: '#9A9AA0',
  onOrange: '#FFFFFF',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  label: { size: 10.5, line: 15, tracking: 0, family: 'Poppins_400Regular' },
  place: { size: 12.5, line: 17, tracking: -0.1, family: 'Poppins_600SemiBold' },
  courier: { size: 14, line: 19, tracking: -0.2, family: 'Poppins_600SemiBold' },

  field: { size: 13.5, line: 18, tracking: -0.1, family: 'Poppins_400Regular' },
  pill: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },

  section: { size: 15, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },

  rowId: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_600SemiBold' },
  rowName: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  chip: { size: 10, line: 14, tracking: 0, family: 'Poppins_500Medium' },
  node: { size: 10, line: 14, tracking: 0, family: 'Poppins_400Regular' },

  tab: { size: 10, line: 14, tracking: -0.1, family: 'Poppins_500Medium' },
} as const;

export const radius = {
  panel: 28,
  card: 20,
  field: 16,
  pill: 999,
  control: 999,
} as const;
