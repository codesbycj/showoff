/**
 * Everything the paywall says.
 *
 * **"Save 90%" is computed.** It is the yearly monthly-equivalent against
 * the weekly price over the same month, so the badge and the two prices
 * cannot drift apart — the reference prints a round 90% beside figures that
 * happen to agree, which is luck rather than design.
 */
const weekly = 9.99;
const yearlyMonthly = 4.16;
const weeksPerMonth = 4.345;

export const copy = {
  brand: 'PrimeFit',
  max: 'Max',
  count: '10k+',
  claim: 'Users transformed\ntheir physique',
  planTitle: 'Your transformation plan',
  locked: 'Locked',
  today: 'Today',
  todayWeight: '175lbs',
  later: '30 days',
  laterWeight: '150lbs',
  feature: 'Full access to all app features',
  weekly: 'Weekly',
  yearly: 'Yearly',
  weeklyPrice: `$${weekly.toFixed(2)}`,
  weeklyUnit: '/week',
  yearlyPrice: `$${yearlyMonthly.toFixed(2)}`,
  yearlyUnit: '/month',
  best: 'Best deal',
  fine: 'Cancel anytime · No hidden fee',
  cta: 'Start My Transformation',
} as const;

export const savePct = Math.round((1 - yearlyMonthly / (weekly * weeksPerMonth)) * 100);

export const faces = [
  require('../../../../assets/images/primeplan/u1.jpg'),
  require('../../../../assets/images/primeplan/u2.jpg'),
  require('../../../../assets/images/primeplan/u3.jpg'),
  require('../../../../assets/images/primeplan/u4.jpg'),
];
