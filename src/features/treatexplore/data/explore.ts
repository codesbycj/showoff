import { tr } from '../theme';

/** Everything the explore screen says, kept out of the components. */

export const header = {
  title: 'Explore\nCollections',
} as const;

export const filters = [
  { key: 'all', label: 'All', badge: 'check' },
  { key: 'recent', label: 'Recent', badge: 'plus' },
  { key: 'offers', label: 'Offers', badge: 'plus' },
  { key: 'trending', label: 'Trending', badge: 'plus' },
] as const;

export const collections = [
  {
    key: 'crunchy',
    title: 'Crunchy Chips',
    meta: 'Crispy · salty · fun',
    color: tr.cream,
    pack: 'cream',
    snack: 1,
  },
  {
    key: 'cheese',
    title: 'Cheese Laius Chips',
    meta: 'Cheesy · crunchy · bold',
    color: tr.peach,
    pack: 'peach',
    snack: 2,
  },
  {
    key: 'rings',
    title: 'Onion Rings Funyuns',
    meta: 'Crispy · salty · tasty',
    color: tr.lemon,
    pack: 'lemon',
    snack: 3,
  },
  {
    key: 'sweet',
    title: 'Sweet & Salted',
    meta: 'Sugary · light · moreish',
    color: tr.cream,
    pack: 'peach',
    snack: 1,
  },
] as const;

/**
 * `solid` says whether the icon is a shape that can be filled. A compass or a
 * trolley filled at its own stroke becomes a black disc, which is what the
 * selected tab looked like before this flag existed.
 */
export const tabs = [
  { key: 'home', label: 'Home', icon: 'home', solid: true },
  { key: 'explore', label: 'Explore', icon: 'compass', solid: false },
  { key: 'cart', label: 'Cart', icon: 'cart', solid: false },
  { key: 'favorite', label: 'Favorite', icon: 'heart', solid: true },
] as const;

export const selectedTab = 'explore';
