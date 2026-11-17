import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for lumofeed, derived from the live window (I2).
 *
 * The post is the remainder and its photograph runs under the dock exactly as
 * the board crops it, which is what keeps the foot closed (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 18;

  const headerH = 56;
  const gapHeader = 14;

  const storyH = 92;
  const gapStory = 16;

  const featuredH = 104;
  const gapFeatured = 18;

  const postHeadH = 56;
  const actionsH = 44;
  const captionH = 24;

  const dockH = 66;
  const dockBottom = 0;
  /**
   * **A pinned, full-width bar does not reserve the indicator's strip.** R1b:
   * when the app is not edge-to-edge the system already holds that space, so a
   * bar padded by `insets.bottom` as well counts it twice - and what it looks
   * like is not a gap under the bar but a bar with 34dp of dead height inside
   * it, below its own labels. The bar is flush to the frame and its ink is
   * centred in its own band, which `dockcheck.js` measures as `under` (I11).
   */

  /**
   * **The dock is part of the budget.** Leaving it out pushed the post's
   * action row and caption under the bar - five R3 FAILs at once, every one of
   * them text covered by edge chrome.
   */
  const used =
    insets.top +
    headerH +
    gapHeader +
    storyH +
    gapStory +
    featuredH +
    gapFeatured +
    postHeadH +
    actionsH +
    captionH +
    dockH +
    dockBottom +
    14;
  const postImageH = Math.max(170, H - used);

  return {
    W,
    H,
    insets,
    margin,
    headerH,
    gapHeader,
    story: { h: storyH, size: 58 },
    gapStory,
    featured: { h: featuredH, radius: 20 },
    gapFeatured,
    post: { headH: postHeadH, imageH: postImageH, actionsH, captionH, radius: 22 },
    dock: { h: dockH, bottom: dockBottom },
  };
}
