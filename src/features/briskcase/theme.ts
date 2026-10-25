/**
 * Brisk — the task detail, second of a two-phone board.
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off (AGENTS.md, "Three kinds of reference"). What is taken from it: a
 * near-white page, one saturated blue, one lime, a near-black navy for the
 * bar and the primary button, and headlines that change weight mid-sentence.
 * Every size is chosen for a real 393dp screen.
 *
 * Inter stands in for the reference's grotesque, which is not obtainable. It
 * carries the four weights the headline needs, which matters more here than
 * the exact letterforms: the display line is the one place the design's
 * voice lives.
 *
 * Its own copy of the tokens, per "One showcase per screen".
 */

export const br = {
  canvas: '#F4F6FB',
  surface: '#FFFFFF',

  blue: '#2F4CF5',
  blueSoft: '#E4E9FE',
  lime: '#A3E635',
  navy: '#131C40',

  ink: '#111322',
  muted: '#8A90A6',
  faint: '#B6BBCC',
  hairline: '#E8EAF2',

  onBlue: '#FFFFFF',
  onNavy: '#FFFFFF',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  name: { size: 14, line: 19, tracking: -0.2, family: 'Inter_600SemiBold' },
  nameSub: { size: 11.5, line: 16, tracking: -0.1, family: 'Inter_400Regular' },

  /** The two display weights, set on one line each. */
  displayBold: { size: 29, line: 38, tracking: -1, family: 'Inter_700Bold' },
  displayLight: { size: 29, line: 38, tracking: -1, family: 'Inter_400Regular' },

  /** "Time spent" over "2h 14 min". */
  metaLabel: { size: 11, line: 15, tracking: -0.1, family: 'Inter_400Regular' },
  metaValue: { size: 12.5, line: 17, tracking: -0.2, family: 'Inter_600SemiBold' },

  /** "Sep 1" and "Sep 10" on the rail. */
  rail: { size: 12, line: 16, tracking: -0.1, family: 'Inter_500Medium' },

  /** A card's body copy, and a checklist line. */
  body: { size: 11.5, line: 18, tracking: -0.1, family: 'Inter_400Regular' },
  check: { size: 12, line: 17, tracking: -0.1, family: 'Inter_500Medium' },
  file: { size: 11, line: 15, tracking: -0.1, family: 'Inter_500Medium' },
  primary: { size: 14, line: 19, tracking: -0.2, family: 'Inter_600SemiBold' },

  chip: { size: 12.5, line: 17, tracking: -0.1, family: 'Inter_500Medium' },
  tag: { size: 11, line: 15, tracking: -0.1, family: 'Inter_600SemiBold' },

  cardTitle: { size: 16, line: 21, tracking: -0.4, family: 'Inter_700Bold' },
  cardSub: { size: 11.5, line: 16, tracking: -0.1, family: 'Inter_400Regular' },
  people: { size: 11.5, line: 16, tracking: -0.1, family: 'Inter_500Medium' },
  action: { size: 12.5, line: 17, tracking: -0.2, family: 'Inter_600SemiBold' },

  panelTitle: { size: 14, line: 19, tracking: -0.3, family: 'Inter_700Bold' },
  axis: { size: 10, line: 14, tracking: 0, family: 'Inter_500Medium' },

  promoTitle: { size: 14.5, line: 20, tracking: -0.3, family: 'Inter_700Bold' },
  promoLine: { size: 14.5, line: 20, tracking: -0.3, family: 'Inter_500Medium' },
  price: { size: 22, line: 29, tracking: -0.8, family: 'Inter_700Bold' },
  priceOff: { size: 11, line: 15, tracking: -0.1, family: 'Inter_500Medium' },
  promoFoot: { size: 10.5, line: 15, tracking: -0.1, family: 'Inter_400Regular' },

  tab: { size: 12, line: 16, tracking: -0.2, family: 'Inter_500Medium' },
} as const;

export const radius = {
  card: 20,
  chip: 999,
  control: 14,
  pill: 999,
} as const;
