/**
 * Everything the feed says.
 *
 * The caption is one sentence. The reference's runs to four lines of the
 * same thought; R5 caps a run at 110 characters and the reason is visible
 * on the screen — the long version pushes the second post out of the frame
 * entirely.
 */
export const copy = {
  brand: 'Drift',
} as const;

const author = require('../../../../assets/images/driftfeed/author.jpg');

export const posts = [
  {
    id: 'p1',
    name: 'Jose Alvarez',
    avatar: author,
    when: '2h ago',
    caption: 'Chasing the last of the swell before the wind turns. Worth the 5am alarm.',
    photo: require('../../../../assets/images/driftfeed/post1.jpg'),
    likes: '1.2k',
    comments: '48',
    place: 'Ericeira',
  },
  {
    id: 'p2',
    name: 'Maya Ortiz',
    avatar: author,
    when: '5h ago',
    caption: 'Board repaired, sunrise booked.',
    photo: require('../../../../assets/images/driftfeed/post2.jpg'),
    likes: '640',
    comments: '12',
    place: 'Nazaré',
  },
];

export const tabs = [
  { id: 'feed', label: 'Feed', icon: 'wave' as const },
  { id: 'spots', label: 'Spots', icon: 'pin' as const },
  { id: 'post', label: 'Post', icon: 'plus' as const },
  { id: 'saved', label: 'Saved', icon: 'bookmark' as const },
  { id: 'me', label: 'Me', icon: 'person' as const },
];
