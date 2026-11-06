/**
 * Everything the home screen says.
 *
 * **"Start your first reward is here!" is two sentences spliced.** The
 * reference's promo line does not parse; it says "Your first reward is
 * waiting." here. A design shot is not an authority on grammar.
 *
 * The balance is the same figure the opening showcase puts on its hero card,
 * so the two screens of this app agree.
 */
export const copy = {
  hello: 'Good Morning,',
  name: 'Jobayer Mahbub',
  balanceLabel: 'Total Balance',
  balance: '$ 3,200.00',
  delta: '12%',
  status: 'Status:',
  statusValue: 'Active',
  idLabel: 'ID:',
  id: '1657754',
  promoTitle: 'Daily Kickoff Bonus',
  promoNote: 'Your first reward is waiting.',
  promoLeft: '1 day left',
  promoCta: 'Claim',
  quickSend: 'Quick Send',
  seeAll: 'See All',
  newPerson: 'New',
} as const;

export const avatar = require('../../../../assets/images/fernhome/jobayer.jpg');

export const actions = [
  { id: 'in', label: 'Receive', icon: 'in' as const, tint: '#1E3A22' },
  { id: 'out', label: 'Send', icon: 'out' as const, tint: '#3B3517' },
  { id: 'add', label: 'Add money', icon: 'plus' as const, tint: '#16303D' },
  { id: 'more', label: 'More', icon: 'grid' as const, tint: '#FFFFFF' },
];

export const people = [
  { id: 'aliya', name: 'Aliya', photo: require('../../../../assets/images/fernhome/aliya.jpg') },
  { id: 'cody', name: 'Cody', photo: require('../../../../assets/images/fernhome/cody.jpg') },
  { id: 'wade', name: 'Wade', photo: require('../../../../assets/images/fernhome/wade.jpg') },
  {
    id: 'darrell',
    name: 'Darrell',
    photo: require('../../../../assets/images/fernhome/darrell.jpg'),
  },
];

export const tabs = [
  { id: 'home', label: 'Home', icon: 'home' as const },
  { id: 'stats', label: 'Report', icon: 'stats' as const },
  { id: 'goals', label: 'Goals', icon: 'target' as const },
  { id: 'profile', label: 'Profile', icon: 'person' as const },
];
