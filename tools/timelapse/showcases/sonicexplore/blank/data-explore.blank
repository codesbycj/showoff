/**
 * Everything sonicexplore says.
 *
 * **"Explore Your SoundCloud" is renamed.** SoundCloud is a real service and
 * this is not its app; a rebuild that keeps the name is impersonation. The
 * section is "Explore Sonic", and every tile's artwork is free-licensed
 * photography standing in for a fictional release.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const search = { placeholder: 'Search for a song' };

/** FIX: the board names a real service here. */
export const explore = { title: 'Explore Sonic' };

export type Feature = { id: string; tag: string; artist: string; photo: number };

export const features: Feature[] = [
  {
    id: 'f1',
    tag: '#TechnoBeats',
    artist: 'Vela Hart',
    photo: require('../../../../assets/images/sonicexplore/t1.jpg'),
  },
  // STEP 1.07 f2
  // {
  //   id: 'f2',
  //   tag: '#BluesBeats',
  //   artist: 'Kairo & Lune',
  //   photo: require('../../../../assets/images/sonicexplore/t2.jpg'),
  // },
  // STEP 1.08 f3
  // {
  //   id: 'f3',
  //   tag: '#FolkTales',
  //   artist: 'Ardent',
  //   photo: require('../../../../assets/images/sonicexplore/t3.jpg'),
  // },
];

export const moods = { title: 'Mood & Genres' };

export type Genre = { id: string; label: string; art: number; tint: string };

/**
 * Six genres.
 *
 * Each tint is a fill, and the label on it is always white — every one of
 * these clears 4.5:1 against white, which the board's own pale pink and cyan
 * do not (R4: a design shot is not an authority on contrast).
 */
export const genres: Genre[] = [
  {
    id: 'g1',
    label: 'Hip Hop',
    art: require('../../../../assets/images/sonicexplore/g1.jpg'),
    tint: '#1A6FA8',
  },
  // STEP 1.16 "Electronic"
  // {
  //   id: 'g2',
  //   label: 'Electronic',
  //   art: require('../../../../assets/images/sonicexplore/g2.jpg'),
  //   tint: '#6B2AB8',
  // },
  // STEP 1.17 "Pop"
  // {
  //   id: 'g3',
  //   label: 'Pop',
  //   art: require('../../../../assets/images/sonicexplore/g3.jpg'),
  //   tint: '#1B7A52',
  // },
  // STEP 1.18 "Party"
  // {
  //   id: 'g4',
  //   label: 'Party',
  //   art: require('../../../../assets/images/sonicexplore/g4.jpg'),
  //   tint: '#B01C63',
  // },
  // STEP 1.19 "Blues"
  // {
  //   id: 'g5',
  //   label: 'Blues',
  //   art: require('../../../../assets/images/sonicexplore/g5.jpg'),
  //   tint: '#4A33C4',
  // },
  // STEP 1.20 "Techno"
  // {
  //   id: 'g6',
  //   label: 'Techno',
  //   art: require('../../../../assets/images/sonicexplore/g6.jpg'),
  //   tint: '#0F6E86',
  // },
];

export type Tab = {
  id: string;
  label: string;
  glyph: 'home' | 'search' | 'add' | 'library' | 'user';
};

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  // STEP 1.23 "Search"
  // { id: 'search', label: 'Search', glyph: 'search' },
  // STEP 1.24 "Add"
  // { id: 'add', label: 'Add', glyph: 'add' },
  // STEP 1.25 "Library"
  // { id: 'library', label: 'Library', glyph: 'library' },
  // STEP 1.26 "Profile"
  // { id: 'me', label: 'Profile', glyph: 'user' },
];
