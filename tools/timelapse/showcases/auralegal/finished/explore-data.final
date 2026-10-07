/**
 * Screen 2 content — the discovery feed.
 *
 * `CATEGORIES`, `DECK` and `EXPERTS` carry explicit element types rather than
 * leaning on `as const`: each is emptied one entry at a time for the timelapse,
 * and an array literal with nothing in it infers `never[]`, which typechecks
 * here and then fails at every call site.
 */

export const FEED = {
  eyebrow: 'Legal Help, Your Way',
  title: 'Find Top Class\nLawyers',
  sectionTitle: 'Top Rated Legal Experts',
  sectionCount: '12 Online',
  sectionAction: 'See All',
} as const;

export type Category = { key: string; label: string };

export const CATEGORIES: readonly Category[] = [
  { key: 'family', label: 'Family Lawyer' },
  { key: 'realestate', label: 'Real Estate Lawyer' },
  { key: 'corporate', label: 'Corporate Lawyer' },
  { key: 'criminal', label: 'Criminal Defense' },
  { key: 'ip', label: 'IP & Patent' },
];

/**
 * The two cards peeking out behind the hero.
 *
 * They are not a carousel the screen can advance — the export gives them fixed
 * rotations and scales and no state, and its only script is a drag that springs
 * back. So they are decoration, and are carried as data purely so the reveal
 * can bring them in one at a time.
 */
export type DeckCard = {
  key: string;
  name: string;
  casesLabel: string;
  cases: string;
  place: string | null;
  /** Which of the deck's three fills this card takes. */
  tone: 'ghost' | 'mint';
};

export const DECK: readonly DeckCard[] = [
  {
    key: 'claire',
    name: 'Claire M.',
    casesLabel: 'Cases Won',
    cases: '85+',
    place: null,
    tone: 'ghost',
  },
  {
    key: 'marcus',
    name: 'Marcus Vance',
    casesLabel: 'Cases Won',
    cases: '140+',
    place: 'Melbourne, Australia',
    tone: 'mint',
  },
];

/** The lavender card on top of the deck. */
export const HERO = {
  name: 'Alexi\nTurner',
  casesLabel: 'Cases Won',
  cases: '100+',
  place: 'Sydney, Australia',
  availability: 'Available for video consultation',
  portrait: require('../../../../assets/images/auralegal/alexi-portrait.jpg') as number,
} as const;

/** The three-up tray under the deck. `tone` picks emerald or lavender. */
export type Stat = {
  key: string;
  label: string;
  value: string;
  caption: string;
  tone: 'secondary' | 'primary';
};

export const STATS: readonly Stat[] = [
  {
    key: 'success',
    label: 'Success',
    value: '99.4%',
    caption: 'Verified Rate',
    tone: 'secondary',
  },
  {
    key: 'experience',
    label: 'Experience',
    value: '8+ Yrs',
    caption: 'Bar Admitted',
    tone: 'primary',
  },
  {
    key: 'endorsement',
    label: 'Endorsement',
    value: '50+',
    caption: 'Peer Reviews',
    tone: 'secondary',
  },
];

export const BRIEFING = {
  title: 'Instant 15-Min Briefing',
  subtitle: 'Next slot today at 2:30 PM',
  action: 'Book',
} as const;

export type Expert = {
  key: string;
  name: string;
  detail: string;
  rating: string;
  photo: number;
};

export const EXPERTS: readonly Expert[] = [
  {
    key: 'julian',
    name: 'Julian Rossi',
    detail: 'Commercial & IP Litigation • Sydney',
    rating: '4.9',
    photo: require('../../../../assets/images/auralegal/julian.jpg'),
  },
  {
    key: 'elena',
    name: 'Elena Rostova',
    detail: 'Real Estate & Title Deeds • Melbourne',
    rating: '5.0',
    photo: require('../../../../assets/images/auralegal/elena.jpg'),
  },
];

/** The floating dock. Only the active item shows its label. */
export type DockItem = {
  key: string;
  label: string;
  icon: 'balance' | 'forum' | 'notifications' | 'person';
};

export const DOCK: readonly DockItem[] = [
  { key: 'explore', label: 'Explore', icon: 'balance' },
  { key: 'consultations', label: 'Consultations', icon: 'forum' },
  { key: 'notifications', label: 'Notifications', icon: 'notifications' },
  { key: 'profile', label: 'Profile', icon: 'person' },
];
