/**
 * Everything the ratings screen says, so the components stay presentational.
 *
 * **The figures add up, and the reference's do not.** It prints 65% BUY, 31%
 * HOLD and 2% SELL against counts of 29, 14 and 1 — which is 98% of a total
 * that is really 44 analysts, so none of the five numbers agrees with any
 * other. Here there are 40 analysts, 26 of them say buy, 12 say hold and 2 say
 * sell; the shares are computed from those counts, so the bars, the
 * percentages and the totals are the same fact told three ways.
 */

export const stock = { name: 'Halcyon Instruments', ticker: 'HLCN' } as const;

export const copy = {
  heading: ['ANALYST HLCN', 'RATINGS'],
} as const;

const counts = { buy: 26, hold: 12, sell: 2 } as const;
const total = counts.buy + counts.hold + counts.sell;

export const analysts = total;

export const ratings = (
  [
    { id: 'buy', verdict: 'BUY', count: counts.buy, tone: 'acid' },
    { id: 'hold', verdict: 'HOLD', count: counts.hold, tone: 'grey' },
    { id: 'sell', verdict: 'SELL', count: counts.sell, tone: 'coal' },
  ] as const
).map((r) => ({ ...r, share: Math.round((r.count / total) * 100) }));

/** The notes under the bars, as a rail you push sideways. */
export const notes = [
  {
    id: 'n1',
    title: 'Optimistic analysts',
    body: 'They think Halcyon is still finding new things to sell to the customers it already has, and that the services line has further to run than the hardware it grew out of.',
  },
  {
    id: 'n2',
    title: 'Cautious analysts',
    body: 'They think the next two quarters depend on one product launch, and that a single delayed shipment would take the growth rate with it.',
  },
] as const;
