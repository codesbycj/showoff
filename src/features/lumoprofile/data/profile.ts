/**
 * Everything lumoprofile says.
 *
 * **The board's bio names a company and a URL**; both are invented here, and
 * its dock's "Massage" is spelled Messages (I1).
 *
 * **R9: the counts are formatted from their own numbers**, with the same
 * helper the feed and the reel use — three screens, one truth about one
 * account.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time (RULES §5.4, I7).
 */

export const profile = {
  name: 'Aalone Chika',
  handle: '@alonechika',
  avatar: require('../../../../assets/images/lumoprofile/me.jpg'),
  following: 'Following',
  message: 'Message',
};

export type Stat = { id: string; label: string; value: number };

export const stats: Stat[] = [
  { id: 'posts', label: 'Posts', value: 3441 },
  // STEP 1.09 "Followers"
  // { id: 'followers', label: 'Followers', value: 2400000 },
  // STEP 1.10 "Views"
  // { id: 'views', label: 'Views', value: 2800000 },
  // STEP 1.11 "Likes"
  // { id: 'likes', label: 'Likes', value: 1600000 },
];

export type BioLine = { id: string; text: string; link?: boolean };

export const bio: BioLine[] = [
  { id: 'role', text: 'Night sets, blue light, one camera.' },
  // STEP 1.15 studio
  // { id: 'studio', text: 'Building Lumora Studio with friends.' },
  // STEP 1.16 link
  // { id: 'link', text: 'lumora.studio/chika', link: true },
];

export type GridTab = { id: string; glyph: 'grid' | 'reels' | 'liked' | 'save'; on?: boolean };

export const gridTabs: GridTab[] = [
  { id: 'grid', glyph: 'grid', on: true },
  // STEP 1.20 reels
  // { id: 'reels', glyph: 'reels' },
  // STEP 1.21 liked
  // { id: 'liked', glyph: 'liked' },
  // STEP 1.22 saved
  // { id: 'saved', glyph: 'save' },
];

/**
 * Nine, not six. Six filled two rows and left 115dp of empty canvas above the
 * dock - an R1 GAP FAIL, and I3 says the fix is the rows the board cropped,
 * never a spacer.
 */
export const grid: number[] = [
  require('../../../../assets/images/lumoprofile/g1.jpg'),
  require('../../../../assets/images/lumoprofile/g2.jpg'),
  require('../../../../assets/images/lumoprofile/g3.jpg'),
  require('../../../../assets/images/lumoprofile/g4.jpg'),
  require('../../../../assets/images/lumoprofile/g5.jpg'),
  require('../../../../assets/images/lumoprofile/g6.jpg'),
  require('../../../../assets/images/lumoprofile/g7.jpg'),
  require('../../../../assets/images/lumoprofile/g8.jpg'),
  require('../../../../assets/images/lumoprofile/g9.jpg'),
];

export type Tab = {
  id: string;
  label: string;
  glyph: 'home' | 'search' | 'plus' | 'messages' | 'profile';
};

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  // STEP 1.24 "Search"
  // { id: 'search', label: 'Search', glyph: 'search' },
  // STEP 1.25 "Post"
  // { id: 'post', label: 'Post', glyph: 'plus' },
  // STEP 1.26 "Messages"
  // { id: 'messages', label: 'Messages', glyph: 'messages' },
  // STEP 1.27 "Profile"
  // { id: 'profile', label: 'Profile', glyph: 'profile' },
];

/** 2400000 -> "2.4 M". A count is a label, so it is formatted, never typed. */
export function count(value: number) {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)} M`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)} K`;
  return String(value);
}
