import type { ImageSourcePropType } from 'react-native';

/**
 * Everything this screen says, in one place, so the components stay
 * presentational and a copy change never touches a layout file.
 *
 * Cargo is the shipping app the reference design invents. Its headline and its
 * sentence are the reference's own — the line break in the headline is part of
 * the composition rather than something a wrap would find.
 */

export const HERO: ImageSourcePropType =
  require('../../../../assets/images/cargo/hero-truck.jpg') as ImageSourcePropType;

export const INTRO = {
  /**
   * Two lines, broken deliberately. "Easy Shipping," and "Smarter Business"
   * are set to almost the same width, which is what makes the block read as a
   * shape rather than as a sentence that ran out of room.
   */
  title: ['Easy Shipping,', 'Smarter Business'],
  body: ['Smart shipping saves time, cuts costs, and', 'grows businesses faster.'],
  cta: 'Get Started',
} as const;

/**
 * The onboarding carousel.
 *
 * The reference shows three dots with the *last* one active, which is a page
 * three of three. This is page one, so it is three with the first active — a
 * first screen whose indicator says you have already finished reads as a
 * mistake rather than as a detail.
 */
export const PAGES = { count: 3, active: 0 } as const;
