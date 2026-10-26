/**
 * Everything the event screen says and counts.
 *
 * **The reward badge is the sum of the badges below it.** The reference
 * promises "+150 XP" over four rewards worth 50, 20, 25 and 35 — which is
 * 130. `totalXp` adds them up, so the headline cannot promise what the list
 * does not pay.
 *
 * **The bar is the pair of numbers beside it**, and the date is the one the
 * home screen's hero card shows: the reference's two screens say 15 March and
 * 19 March for the same tournament.
 *
 * "Yeollin FC Open" is corrected — FC is a football club, and this is padel.
 */

export const copy = {
  kindChip: 'TOURNAMENT',
  levelChip: 'INTERMEDIATE',
  rewardLabel: 'REWARD',
  joinedLabel: 'Players Joined',
  spotsTail: ' spots left · fills quickly',
  about: 'About Event',
  reviewsTail: ' reviews',
  feeTail: ' entry fee',
  rewards: 'Event Rewards',
  cta: 'Join Event',
  organiser: 'Organised by',
  hostRole: 'Club host · 24 events run',
} as const;

export const hero = require('../../../../assets/images/volleyevent/hero.jpg');

export const avatars = [
  require('../../../../assets/images/volleyevent/face-1.jpg'),
  require('../../../../assets/images/volleyevent/face-2.jpg'),
  require('../../../../assets/images/volleyevent/face-3.jpg'),
  require('../../../../assets/images/volleyevent/face-4.jpg'),
];

export const event = {
  title: 'Yeollin Open',
  place: 'Amstelveen',
  time: '09:00 - 17:00',
  day: 15,
  monthName: 'March',
  year: 2026,
  joined: 12,
  capacity: 16,
  rating: 4.0,
  reviews: 132,
  fee: 25,
};

export const dateLine = `${event.day} ${event.monthName} ${event.year}`;
export const spotsLeft = event.capacity - event.joined;
export const joinedShare = event.joined / event.capacity;

export const about =
  'Join the Yeollin Open padel tournament in Amstelveen. Compete against players of a similar standard, earn XP, unlock badges and climb the leaderboard. All levels welcome in the mixed division.';

export const badges = [
  { id: 'champion', name: 'Champion', xp: 50, tone: 'gold' },
  { id: 'fairplay', name: 'Fair Play', xp: 20, tone: 'lime' },
  { id: 'defender', name: 'Defender', xp: 25, tone: 'sky' },
  { id: 'scorer', name: 'Top Scorer', xp: 35, tone: 'butter' },
] as const;

export const totalXp = badges.reduce((s, b) => s + b.xp, 0);

/**
 * Who is running it.
 *
 * The reference has no such block and its page stops a hand's width above the
 * Join button in consequence. Whoever is organising an event is the first
 * thing anyone deciding whether to turn up wants to know, so this is a block
 * the page wanted anyway rather than filler.
 */
export const host = {
  name: 'Amstelveen Padel Club',
  photo: require('../../../../assets/images/volleyevent/face-2.jpg'),
};
