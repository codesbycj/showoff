import type { ImageSourcePropType } from 'react-native';

/**
 * Everything this screen says, in one place, so the components stay
 * presentational and a copy change never touches a layout file.
 *
 * EliteBeauty is the name the reference gives its salon app and the only
 * string taken from it. The paragraph is the reference's own sentence, kept
 * because the line break is part of the composition — two balanced lines under
 * a two-line headline — and rewriting it to something of mine would change the
 * shape of the block for no reason.
 */

export type ClusterCard = {
  id: string;
  /** What the photograph shows, for the screen reader. */
  alt: string;
  image: ImageSourcePropType;
};

export const HERO: ImageSourcePropType =
  require('../../../../assets/images/elite/hero-stylist.jpg') as ImageSourcePropType;

/**
 * The three services under the hero, in paint order: the two that sit behind
 * and turned out, then the one in the middle that sits in front.
 *
 * `main` is which of them is the raised one — kept as a field rather than an
 * index so the order of this array stays a statement about content and not
 * about z-order.
 */
export const CLUSTER: ClusterCard[] = [
  {
    id: 'facial',
    alt: 'A facial treatment being applied',
    image: require('../../../../assets/images/elite/card-facial.jpg') as ImageSourcePropType,
  },
  {
    id: 'wash',
    alt: 'Hair being washed at the basin',
    image: require('../../../../assets/images/elite/card-wash.jpg') as ImageSourcePropType,
  },
  {
    id: 'cut',
    alt: 'A haircut in progress',
    image: require('../../../../assets/images/elite/card-cut.jpg') as ImageSourcePropType,
  },
];

/** Which card is raised to the front. */
export const CLUSTER_MAIN = 'wash';

export const INTRO = {
  /**
   * Split deliberately. The break after "Your" is a design decision — it sets
   * the two lines nearly the same width — not something a wrap would find.
   */
  title: ['EliteBeauty — Your', 'Salon, Your Schedule'],
  body: [
    "Whether you're looking for a stylish haircut, a",
    'refreshing facial, or a relaxing spa session',
  ],
  cta: 'Get Started',
} as const;

/**
 * The onboarding carousel.
 *
 * The reference shows four dots with the *second* one active, which is a page
 * two of four. This is page one, so it is three dots with the first active —
 * a first screen whose indicator says you are already past the start reads as
 * a mistake rather than as a detail.
 */
export const PAGES = { count: 3, active: 0 } as const;
