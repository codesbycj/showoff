import keyArt from '@/assets/images/key-art.webp';
import trailers from '@/assets/images/trailers.webp';
import pressEpk from '@/assets/images/press-epk.webp';
import socialCutdowns from '@/assets/images/social-cutdowns.webp';
import editorial from '@/assets/images/editorial.webp';
import premieres from '@/assets/images/premieres.webp';

export type Service = {
  id: string;
  label: string;
  /** Read by screen readers in place of the photograph, which is decorative. */
  alt: string;
  image: string;
};

/**
 * The deck, in paint order: first in this list is furthest from the camera and
 * is the card still standing when the section ends; last is nearest, and is the
 * one on screen when it starts.
 *
 * Onesheet is invented, and so is its service list. The two names that look
 * borrowed — key art, EPK — are the trade's own words for a poster and a press
 * kit, not anybody's branding.
 */
export const SERVICES: Service[] = [
  {
    id: 'key-art',
    label: 'Key Art',
    alt: 'A performer lit in blue and magenta neon, seen in profile',
    image: keyArt,
  },
  {
    id: 'editorial',
    label: 'Editorial',
    alt: 'A woman sitting on a dirt track in sunglasses and an open shirt',
    image: editorial,
  },
  {
    id: 'press-epk',
    label: 'Press & EPK',
    alt: 'A singer in headphones at a studio condenser microphone',
    image: pressEpk,
  },
  {
    id: 'social-cutdowns',
    label: 'Social Cutdowns',
    alt: 'A phone held in one hand with a video player open on it',
    image: socialCutdowns,
  },
  {
    id: 'trailers',
    label: 'Trailers',
    alt: 'A camera operator framing a shot on a cinema rig',
    image: trailers,
  },
  {
    id: 'premieres',
    label: 'Premieres',
    alt: 'A crowd in silhouette against stage lights',
    image: premieres,
  },
];
