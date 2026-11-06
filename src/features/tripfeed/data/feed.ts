/**
 * Everything the feed says.
 *
 * **"Joined joined Lisbon Roadtrip" is fixed.** The reference's second post
 * repeats the verb; a design shot is not an authority on grammar.
 *
 * The photo count in the first post's line is the length of its own photo
 * array, so it cannot say "4 new photos" beside three of them.
 */
export const copy = {
  addStory: 'Add story',
} as const;

export const me = require('../../../../assets/images/tripfeed/author.jpg');

export const stories = [
  { id: 's1', photo: require('../../../../assets/images/tripfeed/story1.jpg') },
  { id: 's2', photo: require('../../../../assets/images/tripfeed/story2.jpg') },
  { id: 's3', photo: require('../../../../assets/images/tripfeed/story3.jpg') },
];

const lisaPhotos = [
  require('../../../../assets/images/tripfeed/post1.jpg'),
  require('../../../../assets/images/tripfeed/photo2.jpg'),
  require('../../../../assets/images/tripfeed/post2.jpg'),
];

export const posts = [
  {
    id: 'p1',
    name: 'Lisa Haller',
    avatar: require('../../../../assets/images/tripfeed/author.jpg'),
    verb: 'Uploaded',
    tailLead: ` ${lisaPhotos.length} new photos to `,
    trip: 'Bali Trip',
    photos: lisaPhotos,
    likes: 10,
    comments: 3,
    trips: 1,
    when: '2hrs',
  },
  {
    id: 'p2',
    name: 'Joe Fester',
    avatar: require('../../../../assets/images/tripfeed/story3.jpg'),
    verb: 'Joined',
    tailLead: ' ',
    trip: 'Lisbon Roadtrip',
    photos: [require('../../../../assets/images/tripfeed/post2.jpg')],
    likes: 4,
    comments: 1,
    trips: 2,
    when: '5hrs',
  },
];

export const tabs = [
  { id: 'feed', label: 'Feed', icon: 'compass' as const },
  { id: 'map', label: 'Map', icon: 'map' as const },
  { id: 'new', label: 'New', icon: 'plus' as const },
  { id: 'trips', label: 'Trips', icon: 'plane' as const },
  { id: 'chat', label: 'Chat', icon: 'chat' as const },
];
