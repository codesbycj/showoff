/**
 * Paytin — statistics, the third screen of the same board as `paytinstart`.
 *
 * A **separate showcase on purpose**: it shares a brand with the other two and
 * duplicates their theme, layout, insets and text primitive rather than
 * importing them, so each films, blanks and locks entirely on its own
 * (AGENTS.md, "Showcase lifecycle").
 *
 * The reference is a **design shot**, so this is an inspo brief and rule 1 is
 * off. The palette and the order of the blocks are taken from it; every size
 * is chosen for a real 393dp screen.
 */

export const ps = {
  /** The page. */
  canvas: '#f3f3f1',
  /** Cards, pills, the round header buttons. */
  surface: '#ffffff',
  /** The spending card, the chart's dark blocks, the tooltip. */
  ink: '#141414',
  /** The hairlines in the chart's plot. */
  rule: '#ececea',

  /** The brand, and the earning card. */
  lime: '#c5f24e',
  /** The earning card's own body text, a step down from its figure. */
  limeInk: 'rgba(20, 20, 20, 0.62)',

  /** Headings and figures. */
  text: '#141414',
  /** Axis labels, captions, inactive pills. */
  muted: '#8d8d8a',
  /** On the black card. */
  onInk: '#ffffff',
  onInkMuted: 'rgba(255, 255, 255, 0.6)',

  /** The prism in the spending card, deepest face first. */
  prism: ['#1d6f7a', '#2a93a0', '#49bfc4', '#8fe3dd'],

  /** The goal meter's dots: done, then still to go. */
  dotOn: '#141414',
  dotOff: 'rgba(20, 20, 20, 0.22)',
} as const;

/** The type ramp, in dp, for a 393dp phone. */
export const type = {
  /** "Statistics". */
  title: { size: 17, line: 22, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },

  /** "Today", "Weekly", "Monthly", "Yearly". */
  pill: { size: 12.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_500Medium' },
  pillOn: { size: 12.5, line: 16, tracking: -0.1, family: 'PlusJakartaSans_700Bold' },

  /** "Earning", "Spending". */
  cardKind: { size: 11.5, line: 15, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
  /** "24%". */
  cardFigure: { size: 26, line: 33, tracking: -0.8, family: 'PlusJakartaSans_800ExtraBold' },
  /** "$3,250" — the same role, but a currency, so a touch smaller. */
  cardMoney: { size: 21, line: 28, tracking: -0.6, family: 'PlusJakartaSans_800ExtraBold' },
  /** The ".80" after it. */
  cardCents: { size: 12, line: 16, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
  /** The sentence under the figure. */
  cardBody: { size: 9.8, line: 13.5, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "Goal" and "$2567/$5000". */
  cardMeta: { size: 10, line: 13, tracking: 0, family: 'PlusJakartaSans_600SemiBold' },
  /** "Debit Card", "Credit Card" under the prism. */
  cardLegend: { size: 8.8, line: 12, tracking: 0, family: 'PlusJakartaSans_500Medium' },

  /** "Overview". */
  section: { size: 14.5, line: 19, tracking: -0.3, family: 'PlusJakartaSans_700Bold' },

  /** "Total Balance". */
  chartLabel: { size: 10.5, line: 14, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "$25,453.00". */
  chartValue: { size: 16, line: 21, tracking: -0.4, family: 'PlusJakartaSans_700Bold' },
  /** The chart's own key. */
  chartKey: { size: 8.8, line: 12, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "$3500" … "$0" up the left, and "JAN" … "JUN" along the bottom. */
  axis: { size: 8.5, line: 11, tracking: 0, family: 'PlusJakartaSans_400Regular' },
  /** "$2,410.00" in the callout. */
  tooltip: { size: 10, line: 13, tracking: -0.1, family: 'PlusJakartaSans_600SemiBold' },
} as const;

/** Corner radii. */
export const radius = {
  /** The two stat cards and the overview card. */
  card: 18,
  /** The period pills and the tooltip. */
  pill: 999,
  full: 999,
  /** One block of the chart. */
  block: 3,
} as const;

/**
 * The one shadow, under anything white sitting on the grey page.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is exactly what the web harness cannot check.
 */
export const shadow = {
  soft: {
    shadowColor: '#9b9b94',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.13,
    shadowRadius: 8,
    elevation: 2,
  },
} as const;
