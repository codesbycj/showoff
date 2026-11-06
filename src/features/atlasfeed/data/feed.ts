/**
 * Everything the feed says.
 *
 * **The caption is cut from five lines to two.** The reference's post runs
 * "Every big achievement starts with a small step. Keep showing up, stay
 * consistent, and trust the process.your progress is adding up even when it
 * doesn't feel like it." — 170 characters, a missing space after a full
 * stop, and the same thought three times. R5 puts the ceiling at 110 for one
 * run of body copy, and the reason is visible here: the long version pushes
 * the next post off the screen.
 */
export const copy = {
  brand: 'Atlantis',
  yourAtlases: 'Your',
  atlasesStrong: 'Atlases',
  addAtlas: 'Add Atlas',
} as const;

const f1 = require('../../../../assets/images/atlasfeed/face1.jpg');
const f2 = require('../../../../assets/images/atlasfeed/face2.jpg');
const f3 = require('../../../../assets/images/atlasfeed/face3.jpg');
const f4 = require('../../../../assets/images/atlasfeed/face4.jpg');
const f5 = require('../../../../assets/images/atlasfeed/face5.jpg');

export const stories = [
  { id: 's1', name: 'Alfredo', photo: f1 },
  { id: 's2', name: 'Korsgaard', photo: f2 },
  { id: 's3', name: 'Ashlynn', photo: f5 },
  { id: 's4', name: 'Adeline', photo: f4 },
];

export const posts = [
  {
    id: 'p1',
    name: 'Marley Korsgaard',
    avatar: f5,
    photo: require('../../../../assets/images/atlasfeed/post1.jpg'),
    likes: '12.1k',
    comments: '24',
    caption: 'Every big achievement starts with a small step. Keep showing up.',
    tags: '#KeepGoing  #ProgressOverPerfection',
    reactors: [f1, f2, f3],
  },
  {
    id: 'p2',
    name: 'Justin Lipshutz',
    avatar: f3,
    photo: require('../../../../assets/images/atlasfeed/post2.jpg'),
    likes: '3.4k',
    comments: '11',
    caption: '',
    tags: '',
    reactors: [],
  },
];

export const tabs = [
  { id: 'feed', label: 'Feed', icon: 'pentagon' as const },
  { id: 'photos', label: 'Photos', icon: 'image' as const },
  { id: 'history', label: 'History', icon: 'clock' as const },
  { id: 'friends', label: 'Friends', icon: 'friends' as const },
];
