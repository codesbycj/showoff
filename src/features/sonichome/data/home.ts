/**
 * Everything sonichome says.
 *
 * **Every artist, title and sleeve is invented.** The board uses The Weeknd's
 * *Starboy* artwork, an Eminem sleeve and those artists' names; a rebuild that
 * ships a real record's cover or a real artist's name is impersonation. The
 * sleeves here are free-licensed photography standing in for fictional
 * releases, credited in `CREDITS.md`.
 *
 * **The collection card's count is `tracks`, not a typed number** (R9), so the
 * card cannot promise more songs than the playlist holds.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const greeting = { hello: 'Hello,', name: 'John Smith' };

export const categories = {
  title: 'Select Categories',
  /** R5: a chip is two words at most. */
  items: ['All', 'Party', 'Blues', 'Sad', 'Hip Hop'] as const,
};

export const popular = { title: 'Popular Songs', more: 'See all' };

export type Song = { id: string; title: string; artist: string; cover: number };

export const songs: Song[] = [
  {
    id: 's1',
    title: 'Nightline',
    artist: 'Vela Hart',
    cover: require('../../../../assets/images/sonichome/c1.jpg'),
  },
  // STEP 1.05 "Paper Suns"
  // {
  //   id: 's2',
  //   title: 'Paper Suns',
  //   artist: 'Mono Kite',
  //   cover: require('../../../../assets/images/sonichome/c2.jpg'),
  // },
  // STEP 1.06 "We Don’t Stop"
  // {
  //   id: 's3',
  //   title: 'We Don’t Stop',
  //   artist: 'Kairo & Lune',
  //   cover: require('../../../../assets/images/sonichome/c3.jpg'),
  // },
  // STEP 1.07 "Slow Static"
  // {
  //   id: 's4',
  //   title: 'Slow Static',
  //   artist: 'Ardent',
  //   cover: require('../../../../assets/images/sonichome/c4.jpg'),
  // },
];

export const collection = {
  title: 'New Collection',
  cardTitle: ['TOP SONGS', 'GLOBAL'],
  photo: require('../../../../assets/images/sonichome/collection.jpg'),
  /** The number of songs the card promises. Derived — see the note above. */
  tracks: 85,
};

export const playlist = { title: 'Playlist', more: 'See all' };

export type Track = { id: string; title: string; artist: string; art: number; minutes: string };

export const tracks: Track[] = [
  {
    id: 't1',
    title: 'Green Room',
    artist: 'Vela Hart',
    art: require('../../../../assets/images/sonichome/p1.jpg'),
    minutes: '3:12',
  },
  // STEP 1.08 "Linework"
  // {
  //   id: 't2',
  //   title: 'Linework',
  //   artist: 'Mono Kite',
  //   art: require('../../../../assets/images/sonichome/p2.jpg'),
  //   minutes: '4:21',
  // },
  // STEP 1.09 "Open Mic"
  // {
  //   id: 't3',
  //   title: 'Open Mic',
  //   artist: 'Ardent',
  //   art: require('../../../../assets/images/sonichome/p3.jpg'),
  //   minutes: '2:58',
  // },
];

/**
 * How many track rows the layout reserves.
 *
 * Declared rather than read off `tracks.length`: the list's row height is
 * `listH / rows`, so taking `rows` from the live length makes every row
 * resize each time the reveal stages another entry in - the whole list
 * jumps on every beat (RULES 0.3).
 */
export const TRACK_ROWS = 3;

export type Tab = {
  id: string;
  label: string;
  glyph: 'home' | 'search' | 'add' | 'library' | 'user';
};

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  // STEP 1.10 "Search"
  // { id: 'search', label: 'Search', glyph: 'search' },
  // STEP 1.11 "Add"
  // { id: 'add', label: 'Add', glyph: 'add' },
  // STEP 1.12 "Library"
  // { id: 'library', label: 'Library', glyph: 'library' },
  // STEP 1.13 "Profile"
  // { id: 'me', label: 'Profile', glyph: 'user' },
];

/** The collection card's line. A count and a unit, never a sentence (R5). */
export function collectionLine() {
  return `Discover ${collection.tracks} songs`;
}
