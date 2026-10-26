/**
 * Everything the find screen says, so the components stay presentational.
 *
 * **The article art is photographic.** The reference draws its as flat
 * illustrations of people, and a drawn person is a picture *of* someone —
 * the bitmap side of the split (AGENTS.md). The plan screen in the same
 * reference already uses photographs for exactly this.
 *
 * The brand and every title are invented.
 */

export const copy = {
  eyebrow: 'With our Educational System',
  display: 'Discover how to Shape the Body',
  searchStrong: 'Find ',
  searchDim: 'Category',
  views: 'views',
} as const;

export const avatar = require('../../../../assets/images/vigorfind/face-1.jpg');

export const unread = 3;

export const chips = [
  { id: 'all', label: 'All' },
  { id: 'prep', label: 'Preparation' },
  { id: 'basic', label: 'Basic' },
  { id: 'advanced', label: 'Advanced' },
  { id: 'mobility', label: 'Mobility' },
] as const;

export const articles = [
  {
    id: 'a1',
    title: '5 Main Objectives of the Program',
    art: require('../../../../assets/images/vigorfind/art-1.jpg'),
    views: 311,
    comments: 12,
    likes: 47,
  },
  {
    id: 'a2',
    title: 'How to Breathe Through a Set',
    art: require('../../../../assets/images/vigorfind/art-2.jpg'),
    views: 479,
    comments: 23,
    likes: 86,
  },
  {
    id: 'a3',
    title: 'Warming Up Without Equipment',
    art: require('../../../../assets/images/vigorfind/art-3.jpg'),
    views: 264,
    comments: 9,
    likes: 38,
  },
] as const;
