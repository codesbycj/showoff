/**
 * Everything the home screen says.
 *
 * **"Goodafternoon Alex" is spelled "Good afternoon, Alex".** The reference
 * runs the two words together and drops the comma; a design shot is not an
 * authority on spelling.
 *
 * **Three cards under "Hangouts Near You", not two.** The reference crops its
 * second card against the dock, which is what a scrolling list looks like —
 * so the list here is long enough to actually scroll, and the foot of the
 * frame is a card running under the bar rather than a band of page.
 */
export const copy = {
  greeting: 'Good afternoon, Alex',
  welcome: 'Welcome back',
  placeholder: 'What do you need today?',
  trending: 'Trending Hangouts',
  near: 'Hangouts Near You',
  seeAll: 'See all',
} as const;

export const chips = [
  { id: 'all', label: 'All', icon: 'sparkle' as const, on: true },
  { id: 'music', label: 'Music', icon: 'music' as const },
  { id: 'food', label: 'Food & Cafe', icon: 'coffee' as const },
  { id: 'create', label: 'Create', icon: 'camera' as const },
];

export const hero = {
  title: 'Golden Hour\nAcoustic Session',
  when: 'Tonight, 7:00 PM',
  where: 'The Broadview Canopy, NY',
  photo: require('../../../../assets/images/huddlehome/hero.jpg'),
};

export const faces = [
  require('../../../../assets/images/huddlehome/face1.jpg'),
  require('../../../../assets/images/huddlehome/face2.jpg'),
  require('../../../../assets/images/huddlehome/face3.jpg'),
  require('../../../../assets/images/huddlehome/face4.jpg'),
];

export const avatar = require('../../../../assets/images/huddlehome/face5.jpg');

export type Hangout = {
  id: string;
  title: string;
  place: string;
  when: string;
  slots: number;
  photo: number;
};

export const hangouts: Hangout[] = [
  {
    id: 'h1',
    title: 'Neon & Craft Beer Night',
    place: 'Studio 404 Workshop',
    when: 'Sat, 8:00 PM',
    slots: 3,
    photo: require('../../../../assets/images/huddlehome/beer.jpg'),
  },
  {
    id: 'h2',
    title: 'Parkside Sunrise Yoga',
    place: 'McCarren Great Lawn',
    when: 'Sat, 7:00 AM',
    slots: 5,
    photo: require('../../../../assets/images/huddlehome/yoga.jpg'),
  },
  {
    id: 'h3',
    title: 'Golden Hour Acoustic Session',
    place: 'The Broadview Canopy',
    when: 'Tonight, 7:00 PM',
    slots: 2,
    photo: require('../../../../assets/images/huddlehome/hero.jpg'),
  },
];

export const tabs = [
  { id: 'home', label: 'Home', icon: 'home' as const },
  { id: 'explore', label: 'Explore', icon: 'compass' as const },
  { id: 'chats', label: 'Chats', icon: 'chat' as const },
  { id: 'profile', label: 'Profile', icon: 'person' as const },
];
