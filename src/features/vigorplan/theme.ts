/**
 * Vigor — the plan, second of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. What is taken from it: a full-bleed orange page, a rail of day discs
 * with today in white, and white plan cards each carrying a progress rail, a
 * title, a meta line, a coloured Start pill and a photograph.
 *
 * Its own copy of the tokens, per "One showcase per screen". The orange is
 * the same value `vigorfind` uses for its selected chip — it is one brand —
 * but the file is duplicated so blanking one showcase cannot reach into the
 * other.
 */

export const vg = {
  orange: '#F5A623',
  orangeDeep: '#E09217',
  orangeSoft: '#F8BC5B',
  onOrange: '#FFFFFF',
  onOrangeDim: '#FCE3BC',

  card: '#FFFFFF',
  well: '#F2F4F7',

  blue: '#3B8DF5',
  purple: '#8B3FD9',
  teal: '#17A6A0',

  ink: '#15212E',
  muted: '#7A8794',
  faint: '#AFB9C3',
  hairline: '#E8ECF0',

  badge: '#15212E',
} as const;

/** The type ramp, in dp. */
export const type = {
  dateLine: { size: 13, line: 18, tracking: -0.2, family: 'Poppins_500Medium' },
  display: { size: 30, line: 38, tracking: -1, family: 'Poppins_700Bold' },

  dayNum: { size: 15, line: 20, tracking: -0.3, family: 'Poppins_600SemiBold' },
  dayName: { size: 10.5, line: 14, tracking: 0, family: 'Poppins_400Regular' },

  cardTitle: { size: 18, line: 24, tracking: -0.5, family: 'Poppins_700Bold' },
  meta: { size: 11.5, line: 16, tracking: -0.1, family: 'Poppins_400Regular' },
  start: { size: 12.5, line: 17, tracking: -0.2, family: 'Poppins_600SemiBold' },
  badge: { size: 10, line: 14, tracking: 0, family: 'Poppins_600SemiBold' },
} as const;

export const radius = {
  card: 20,
  photo: 14,
  pill: 999,
} as const;
