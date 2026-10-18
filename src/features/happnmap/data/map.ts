/** Everything the map screen says, kept out of the components. */

export const header = {
  title: 'Map',
} as const;

export const filters = [
  { key: 'all', label: 'All' },
  { key: 'recent', label: 'Recent' },
  { key: 'nearby', label: 'Nearby' },
  { key: 'hotspots', label: 'Hotspots' },
] as const;

export const selectedFilter = 'all';

/**
 * The people on the radar.
 *
 * `x` and `y` are fractions of the radar's own box, so the arrangement keeps
 * its shape on a 360dp phone as well as a 430dp one — a cluster laid out in dp
 * slides off the narrow one.
 */
export const pings = [
  { key: 'a', face: 1, match: '90%', x: 0.72, y: 0.22 },
  { key: 'b', face: 2, match: '92%', x: 0.24, y: 0.42 },
  { key: 'c', face: 3, match: '96%', x: 0.68, y: 0.6 },
  { key: 'd', face: 4, match: '88%', x: 0.4, y: 0.74 },
] as const;

export const profile = {
  name: 'Aisha, 26',
  role: 'Marketing Manager',
  place: 'Notting Hill, London',
} as const;

export const facts = [
  { key: 'away', value: '200m away', meta: 'from you' },
  { key: 'met', value: '2 Encounters', meta: 'with you' },
  { key: 'when', value: 'Today, 9:47', meta: 'last crossed' },
] as const;

export const about = {
  title: 'About',
  body: 'Coffee lover. Travel addict. Sunset chaser. I enjoy meaningful conversations, spontaneous adventures and good music — if our paths crossed twice this week, that is probably not an accident.',
} as const;

export const tabs = [
  { key: 'home', label: 'Home', icon: 'home', solid: true },
  { key: 'explore', label: 'Explore', icon: 'search', solid: false },
  { key: 'camera', label: '', icon: 'camera', solid: false },
  { key: 'likes', label: 'Likes', icon: 'heart', solid: true },
  { key: 'profile', label: 'Profile', icon: 'user', solid: false },
] as const;

export const selectedTab = 'home';
