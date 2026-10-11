/**
 * Every photograph, imported so Vite fingerprints and bundles it. Nothing is
 * hotlinked: the page has to work with the network unplugged.
 *
 * All of it is free-licensed work from Wikimedia Commons, credited file by
 * file in `images/CREDITS.md`, standing in for photography a real driver would
 * own. Refetch the whole folder with `python tools/commons.py batch
 * tools/images.tsv && python tools/optimise.py`.
 */
import calendarCar from './images/calendar-car.webp';
import gallery1 from './images/gallery-1.webp';
import gallery2 from './images/gallery-2.webp';
import gallery3 from './images/gallery-3.webp';
import gallery4 from './images/gallery-4.webp';
import gallery5 from './images/gallery-5.webp';
import gallery6 from './images/gallery-6.webp';
import heroDriver from './images/hero-driver.webp';
import media1 from './images/media-1.webp';
import media2 from './images/media-2.webp';
import media3 from './images/media-3.webp';
import statement1 from './images/statement-1.webp';
import statement2 from './images/statement-2.webp';
import story1 from './images/story-1.webp';
import story2 from './images/story-2.webp';
import story3 from './images/story-3.webp';
import story4 from './images/story-4.webp';
import story5 from './images/story-5.webp';
import videoStill from './images/video-still.webp';

export const IMAGES = {
  'hero-driver.webp': heroDriver,
  'statement-1.webp': statement1,
  'statement-2.webp': statement2,
  'story-1.webp': story1,
  'story-2.webp': story2,
  'story-3.webp': story3,
  'story-4.webp': story4,
  'story-5.webp': story5,
  'media-1.webp': media1,
  'media-2.webp': media2,
  'media-3.webp': media3,
  'gallery-1.webp': gallery1,
  'gallery-2.webp': gallery2,
  'gallery-3.webp': gallery3,
  'gallery-4.webp': gallery4,
  'gallery-5.webp': gallery5,
  'gallery-6.webp': gallery6,
  'calendar-car.webp': calendarCar,
  'video-still.webp': videoStill,
} as const;

export type ImageName = keyof typeof IMAGES;

/** Data files name a file; this turns that into the bundled URL. */
export const img = (name: string): string =>
  IMAGES[name.replace(/\.(jpg|jpeg|png)$/, '.webp') as ImageName] ?? '';
