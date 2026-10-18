/** Everything the discover screen says, kept out of the components. */

export const header = {
  meta: 'Good morning',
  name: 'Jenny Wilson',
  map: 'Map',
} as const;

export const categories = [
  { key: 'all', label: 'All', face: 1 },
  { key: 'new', label: 'New here', face: 2 },
  { key: 'online', label: 'Online', face: 3 },
  { key: 'today', label: 'Today', face: 4 },
  { key: 'favored', label: 'Favored', face: 0 },
] as const;

export const profile = {
  badge: 'New',
  match: '92% Match',
  name: 'Aisha, 26',
  role: 'Marketing Manager',
  interests: ['Coffee', 'Photography', 'Indie Music'],
} as const;

export const rail = [
  { key: 'chat', icon: 'chat' },
  { key: 'like', icon: 'heart' },
  { key: 'boost', icon: 'bolt' },
  { key: 'pass', icon: 'close' },
] as const;

export const tabs = [
  { key: 'home', label: 'Home', icon: 'home', solid: true },
  { key: 'explore', label: 'Explore', icon: 'search', solid: false },
  { key: 'camera', label: '', icon: 'camera', solid: false },
  { key: 'likes', label: 'Likes', icon: 'heart', solid: true },
  { key: 'profile', label: 'Profile', icon: 'user', solid: false },
] as const;

export const selectedTab = 'home';
