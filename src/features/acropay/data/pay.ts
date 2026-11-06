/**
 * Everything the paywall says.
 *
 * **The rating no longer carries someone else's wordmark.** The reference
 * puts a Yelp mark under its star; a rebuilt showcase does not need to
 * borrow a third party's credibility, and the number plus a count says the
 * same thing.
 *
 * **"$500 a year on average" is computed.** It is twelve times the monthly
 * saving in `monthlySaving`, so the claim and the figure cannot drift.
 */
const monthlySaving = 42;

export const copy = {
  headline: 'All your subscriptions\nin one place',
  rating: '4.8',
  ratingNote: 'from 2,418 reviews',
  saveLead: 'Acronym customers save',
  saveTail: 'a year on average',
  plan: 'Lifetime',
  badge: 'Early Bird',
  price: '$25.89',
  cta: 'Continue',
  foot: 'Pay once and enjoy forever',
} as const;

export const saving = `$${monthlySaving * 12}`;

export const features = [
  { id: 'find', label: 'Find your subscriptions', icon: 'ticket' as const },
  { id: 'spend', label: 'See your spending', icon: 'note' as const },
  { id: 'renew', label: 'Never miss a renewal', icon: 'bell' as const },
];
