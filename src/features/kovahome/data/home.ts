/**
 * Everything kovahome says.
 *
 * **R9: the three counts at the top are the lists below them.** "3 clients" is
 * the client rail's own length, "due today" counts the reminders dated today,
 * and "in queue" counts the upcoming jobs — the board types all three.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const greeting = {
  title: 'Good morning, Sofia',
  date: 'Today, 27 March',
  avatar: require('../../../../assets/images/kovahome/me.jpg'),
};

export type Client = { id: string; name: string; tag: string; image: number };

export const clients: Client[] = [
  {
    id: 'cara',
    name: 'Cara M.',
    tag: 'Fashion',
    image: require('../../../../assets/images/kovahome/c1.jpg'),
  },
  // STEP 1.05 "Nora D."
  // {
  //   id: 'nora',
  //   name: 'Nora D.',
  //   tag: 'Lifestyle',
  //   image: require('../../../../assets/images/kovahome/c2.jpg'),
  // },
  // STEP 1.06 "Studio K"
  // {
  //   id: 'studio',
  //   name: 'Studio K',
  //   tag: 'Design',
  //   image: require('../../../../assets/images/kovahome/c3.jpg'),
  // },
];

export type Reminder = {
  id: string;
  title: string;
  when: string;
  glyph: 'reel' | 'calendar';
  today?: boolean;
};

export const reminders: Reminder[] = [
  {
    id: 'reel',
    title: "Cara's reel approval due",
    when: 'Today · 3:00 PM',
    glyph: 'reel',
    today: true,
  },
  // STEP 1.07 "Studio K brand shoot"
  // {
  //   id: 'shoot',
  //   title: 'Studio K brand shoot',
  //   when: 'Today · 6:30 PM',
  //   glyph: 'calendar',
  //   today: true,
  // },
];

export type Upcoming = { id: string; chip: string; title: string; image: number };

export const upcoming: Upcoming[] = [
  {
    id: 'collab',
    chip: 'Collaboration',
    title: 'Spring capsule',
    image: require('../../../../assets/images/kovahome/u1.jpg'),
  },
  // STEP 1.08 "Festival set"
  // {
  //   id: 'promo',
  //   chip: 'Promotion',
  //   title: 'Festival set',
  //   image: require('../../../../assets/images/kovahome/u2.jpg'),
  // },
];

export const labels = {
  clients: 'Clients',
  manage: 'Manage',
  reminders: 'Reminders',
  upcoming: 'Upcoming',
  seeAll: 'See all',
  add: 'Add',
};

export type Tab = {
  id: string;
  label: string;
  glyph: 'home' | 'inbox' | 'stacks' | 'profile' | 'plus';
};

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  // STEP 1.23 "Inbox"
  // { id: 'inbox', label: 'Inbox', glyph: 'inbox' },
  // STEP 1.24 "Jobs"
  // { id: 'jobs', label: 'Jobs', glyph: 'stacks' },
  // STEP 1.25 "Account"
  // { id: 'me', label: 'Account', glyph: 'profile' },
  // STEP 1.26 "New"
  // { id: 'new', label: 'New', glyph: 'plus' },
];

/**
 * The three counts, computed from the lists on the screen (R9). `filter` and
 * `length` both survive an empty array, which the reveal will produce (I7).
 */
export function counts() {
  return [
    { id: 'clients', value: clients.length, label: 'clients' },
    { id: 'due', value: reminders.filter((row) => row.today).length, label: 'due today' },
    { id: 'queue', value: upcoming.length + reminders.length, label: 'in queue' },
  ];
}
