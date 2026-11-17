/**
 * Everything globehome says.
 *
 * **The board sets a waving-hand emoji beside the greeting.** Emoji differ
 * across Windows / Android / iOS and the web render cannot see that (§4.4), so
 * it is drawn. Named in the handover.
 *
 * **Each card's rating is a number, and the star beside it follows from it**
 * (R9) — the board prints "5.0" on every card regardless.
 *
 * Arrays are annotated, never inferred: the reveal stages them one entry at a
 * time and an inferred type loses any field that only appears on a later row
 * (RULES §5.4, I7).
 */

export const greeting = { hello: 'Hi, Christopher' };

export type Region = { id: string; label: string; photo: number };

/** R5: a chip is one word here. */
export const regions: Region[] = [
  { id: 'asia', label: 'Asia', photo: require('../../../../assets/images/globehome/r-asia.jpg') },
  { id: 'europe', label: 'Europe', photo: require('../../../../assets/images/globehome/r-europe.jpg') },
  { id: 'america', label: 'America', photo: require('../../../../assets/images/globehome/r-america.jpg') },
];

export type Place = {
  id: string;
  name: string;
  country: string;
  photo: number;
  rating: number;
  /** Only the saved ones carry this — hence the annotation. */
  liked?: boolean;
};

/**
 * Three destinations, not the board's two-and-a-bit.
 *
 * The board crops its second card at the tab bar, so the list genuinely
 * continues (R6). I3's lever for that space is the row the board cut, never a
 * taller block above it.
 */
export const places: Place[] = [
  {
    id: 'p1',
    name: 'Positano',
    country: 'Italia',
    photo: require('../../../../assets/images/globehome/d1.jpg'),
    rating: 4.9,
    liked: true,
  },
  {
    id: 'p2',
    name: 'Santorini',
    country: 'Greece',
    photo: require('../../../../assets/images/globehome/d2.jpg'),
    rating: 4.8,
  },
  {
    id: 'p3',
    name: 'Kyoto',
    country: 'Japan',
    photo: require('../../../../assets/images/globehome/d3.jpg'),
    rating: 4.7,
  },
];

export type Tab = { id: string; label: string; glyph: 'home' | 'discover' | 'booking' | 'profile' };

export const tabs: Tab[] = [
  { id: 'home', label: 'Home', glyph: 'home' },
  { id: 'discover', label: 'Discover', glyph: 'discover' },
  { id: 'booking', label: 'Booking', glyph: 'booking' },
  { id: 'profile', label: 'Profile', glyph: 'profile' },
];
