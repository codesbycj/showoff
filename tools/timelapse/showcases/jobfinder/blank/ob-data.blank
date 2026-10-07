/**
 * The onboarding screen's content and the collage's geometry.
 *
 * The coordinates are the reference's own — the design lays the collage out as
 * absolute offsets inside a 475dp band, so they are transcribed rather than
 * derived. Items are listed top-to-bottom, which is also the order the timelapse
 * reveals them in.
 */
export const COLLAGE_HEIGHT = 475;

export type PhotoSpec = {
  key: string;
  top: number;
  left?: number;
  right?: number;
  size: number;
  ring?: number;
  shadow?: 'none' | 'soft' | 'lifted';
  source: number;
};

export const COLLAGE_PHOTOS: readonly PhotoSpec[] = [
  {
    key: 'hoodie',
    top: 24,
    left: 28,
    size: 70,
    shadow: 'soft',
    // MISTAKE 1.11 the first face came in wearing a picture frame
    ring: 11,
    source: require('../../../../assets/images/jobfinder/coll-hoodie-man.jpg'),
  },
  // STEP 1.03 and one over its shoulder
  // {
  //   key: 'senior',
  //   top: 32,
  //   left: 150,
  //   size: 28,
  //   source: require('../../../../assets/images/jobfinder/coll-senior-woman.jpg'),
  // },
  // STEP 1.04 one more up top
  // {
  //   key: 'curly',
  //   top: 40,
  //   right: 36,
  //   size: 36,
  //   source: require('../../../../assets/images/jobfinder/coll-curly-man.jpg'),
  // },
  // STEP 1.05 drift into the middle
  // {
  //   key: 'young',
  //   top: 104,
  //   left: 134,
  //   size: 26,
  //   source: require('../../../../assets/images/jobfinder/coll-young-woman.jpg'),
  // },
  // STEP 1.06 the second-biggest face
  // {
  //   key: 'grey',
  //   top: 138,
  //   left: 162,
  //   size: 64,
  //   ring: 2,
  //   shadow: 'soft',
  //   source: require('../../../../assets/images/jobfinder/coll-grey-man.jpg'),
  // },
  // STEP 1.07 a small one at the right
  // {
  //   key: 'micro',
  //   top: 170,
  //   right: 84,
  //   size: 24,
  //   shadow: 'none',
  //   source: require('../../../../assets/images/jobfinder/coll-micro-man.jpg'),
  // },
  // STEP 1.08 and its opposite number
  // {
  //   key: 'side',
  //   top: 198,
  //   left: 28,
  //   size: 22,
  //   shadow: 'none',
  //   source: require('../../../../assets/images/jobfinder/coll-side-woman.jpg'),
  // },
  // STEP 1.09 the one the screen is about
  // {
  //   key: 'hero',
  //   top: 210,
  //   left: 134,
  //   size: 98,
  //   ring: 3,
  //   shadow: 'lifted',
  //   source: require('../../../../assets/images/jobfinder/coll-hero.jpg'),
  // },
  // STEP 1.10 fill the last gap
  // {
  //   key: 'blonde',
  //   top: 220,
  //   left: 88,
  //   size: 32,
  //   source: require('../../../../assets/images/jobfinder/coll-blonde.jpg'),
  // },
];

export const ONBOARDING = {
  /** Split across two lines in the design, with the comet between the words. */
  headlineTop: 'Get your',
  headlineLeft: 'dream',
  headlineRight: 'job',
  body: 'Discover your ideal career with our job search app. Explore a vast database of job listings, tailor your search.',
  cta: 'Lets Start',
  /** The community counter floating to the right of the hero avatar. */
  counter: '+12k',
} as const;
