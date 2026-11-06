/**
 * Everything the profile screen says.
 *
 * **The bio drops the brand name.** The reference reads "Binge movies on
 * Netflix | Fashion & Lifestyle"; a rebuilt showcase does not need to put
 * someone else's wordmark in a stranger's bio to make the same point.
 */
export const copy = {
  title: 'Profile',
  name: 'Bobby Gureoso',
  followers: '345',
  followersLabel: 'Followers',
  following: '230',
  followingLabel: 'Following',
  bio: 'Movie nights · Fashion & Lifestyle',
  memories: "Today's Memories",
  memoriesNote: 'Photos shared publicly with close friends',
} as const;

export const chips = [
  { id: 'shots', label: '24', icon: 'shots' as const },
  { id: 'pets', label: 'Pet Owner', icon: 'paw' as const },
  { id: 'design', label: 'Design', icon: 'spark' as const },
  { id: 'music', label: 'Music', icon: 'note' as const },
];

export const sky = require('../../../../assets/images/pallyprofile/sky.jpg');
export const avatar = require('../../../../assets/images/pallyprofile/bobby.jpg');

export const memories = [
  require('../../../../assets/images/pallyprofile/memory1.jpg'),
  require('../../../../assets/images/pallyprofile/memory2.jpg'),
  require('../../../../assets/images/pallyprofile/memory3.jpg'),
];

export const tabs = [
  { id: 'home', label: 'Home', icon: 'home' as const },
  { id: 'photos', label: 'Photos', icon: 'image' as const },
  { id: 'history', label: 'History', icon: 'clock' as const },
  { id: 'profile', label: 'Profile', icon: 'person' as const },
];
